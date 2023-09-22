import React, { useEffect, useState } from "react";
import { useRouteMatch, useHistory } from "react-router-dom";
import { createDeck, readDeck, updateDeck } from "../utils/api";

function UpsertDeck() {
    const { url } = useRouteMatch();
    const history = useHistory();

    const title = (url.includes("edit")) ? "Edit Deck" : "Create Deck";
    const cancelUrl = (url.includes("edit")) ? url.replace("/edit", "") : "/";
    let id = -1;
    if (url.includes("edit")) {
        id = url.replace("/decks/", "").replace("/edit", "");
    }

    const [deckId] = useState(id);

    let intialFormData = {
        name: "",
        description: ""
    };

    useEffect(() => {
        const controller = new AbortController();
        if (url.includes("edit")) {
            readDeck(id, controller.signal)
                .then((res) => {
                    const data = {
                        name: res.name,
                        description: res.description
                    };
                    intialFormData = data;
                    setFormData(data);
                });
        }
        return () => controller.abort();
    }, [deckId]);

    const [formData, setFormData] = useState(intialFormData);

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (id === -1) {
            await createDeck(formData).then(res => id = res.id);
        } else {
            const updatedDeck = {
                ...formData,
                id: id,
            }
            await updateDeck(updatedDeck);
        }
        history.push(`/decks/${id}`);
    }

    return (
        <>
            <h1>{title}</h1>
            <form>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input className="form-control" value={formData.name} onChange={handleChange} id="name" name="name" type="name" placeholder="Deck Name" />
                </div>
                <br />
                <div className="form-group">
                    <label htmlFor="decsription">Description</label>
                    <textarea className="form-control" value={formData.description} onChange={handleChange} name="description" type="description" rows="3" placeholder="Brief description of the deck" />
                </div>
                <br />
                <button onClick={() => history.push(cancelUrl)} className="btn btn-secondary">Cancel</button>
                <button className="btn btn-primary" onClick={handleSubmit}>Submit</button>
            </form>
        </>  
    );
}

export default UpsertDeck;