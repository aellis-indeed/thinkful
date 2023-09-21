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
    // eslint-disable-next-line
    const [deckId, setDeckId] = useState(id);

    let intialFormData = {
        name: "",
        description: ""
    };

    useEffect(() => {
        const controller = new AbortController();
        if (deckId !== -1) {
            readDeck(id, controller.signal)
                .then((res) => {
                    const data = {
                        name: res.name,
                        description: res.description
                    };
                    // eslint-disable-next-line
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
                <div class="form-group">
                    <label for="name">Name</label>
                    <input class="form-control" value={formData.name} onChange={handleChange} id="name" name="name" type="name" placeholder="Deck Name" />
                </div>
                <br />
                <div class="form-group">
                    <label for="decsription">Description</label>
                    <textarea class="form-control" value={formData.description} onChange={handleChange} name="description" type="description" rows="3" placeholder="Brief description of the deck" />
                </div>
                <br />
                <button onClick={() => history.push(cancelUrl)} class="btn btn-secondary">Cancel</button>
                <button class="btn btn-primary" onClick={handleSubmit}>Submit</button>
            </form>
        </>  
    );
}

export default UpsertDeck;