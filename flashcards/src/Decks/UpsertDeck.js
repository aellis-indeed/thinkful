import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
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
    const [deckId, setDeckId] = useState(id);

    let intialFormData = {
        name: "",
        description: ""
    };

    useEffect(async () => {
        if (deckId !== -1) {
            await readDeck(id)
                .then((res) => {
                    const data = {
                        name: res.name,
                        description: res.description
                    };
                    intialFormData = data;
                    setFormData(data);
                });
            
        }
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
            <Form>
                <Form.Group>
                    <Form.Label>Name</Form.Label>
                    <Form.Control value={formData.name} onChange={handleChange} name="name" type="name" placeholder="Deck Name" />
                </Form.Group>
                <br />
                <Form.Group>
                    <Form.Label>Description</Form.Label>
                    <Form.Control value={formData.description} onChange={handleChange} name="description" type="description" as="textarea" rows="3" placeholder="Brief description of the deck" />
                </Form.Group>
                <br />
                <Button onClick={() => history.push(cancelUrl)} variant="secondary">Cancel</Button>
                <Button onClick={handleSubmit}>Submit</Button>
            </Form>
        </>  
    );
}

export default UpsertDeck;