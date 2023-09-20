import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useRouteMatch, useHistory } from "react-router-dom";
import { createCard, readDeck, readCard, updateCard } from "../utils/api";

function UpsertFlashCard() {
    const history = useHistory();
    const { url } = useRouteMatch();
    const [deck, setDeck] = useState({});
    const [cardToCreate, setCardToCreate] = useState({});
    const [cardToUpdate, setCardToUpdate] = useState({});
    let title, deckId, id;
    let newCard = false;

    if (url.includes("new")) {
        title = ": Add Card";
        deckId = url.replace("/decks/", "").replace("/cards/new", "");
        newCard = true;
    } else {
        title = "Edit Card";
        const ids = url.replace("/decks/", "").replace("cards/", "").replace("/edit", "").split("/");
        deckId = ids[0];
        id = parseInt(ids[1]);
    }

    useEffect(() => {
        const controller = new AbortController();
        readDeck(deckId, controller.signal)
            .then(setDeck)
            .catch(console.log);
        return () => controller.abort();
    }, [deckId]);

    useEffect(() => {
        const controller = new AbortController();
        if (cardToCreate.keys && cardToCreate.keys.length > 0) {
            createCard(deckId, cardToCreate, controller.signal)
                .then(console.log);
        }
        return () => controller.abort();
        // eslint-disable-next-line
    }, [cardToCreate]);

    useEffect(() => {
        const controller = new AbortController();
        if (cardToUpdate.keys && cardToUpdate.keys.length > 0) {
            updateCard(cardToUpdate, controller.signal)
                .then(console.log);
            }
        return () => controller.abort();
    }, [cardToUpdate]);

    let intialFormData = {
        front: "",
        back: ""
    };

    useEffect(() => {
        const controller = new AbortController();
        if (id !== undefined) {
            readCard(id, controller.signal)
                .then((res) => {
                    const data = {
                        front: res.front,
                        back: res.back
                    };
                    // eslint-disable-next-line
                    intialFormData = data;
                    setFormData(data)
                })
                .catch(console.log);
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

    const handleDone = (event) => {
        event.preventDefault();
        history.push(`/decks/${deckId}`);
    }

    const handleSave = (event) => {
        event.preventDefault();
        setCardToCreate(formData);
        setFormData(intialFormData);
    }

    const handleCancel = (event) => {
        event.preventDefault();
        history.push(`/decks/${deckId}`);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const updatedCard = {
            ...formData,
            id: id,
            deckId: parseInt(deckId)
        }
        setCardToUpdate(updatedCard);
        history.push(`/decks/${deckId}`);
    }

    const doneButton = (<Button onClick={handleDone} variant="secondary">Done</Button>);;
    const saveButton = (<Button onClick={handleSave}>Save</Button>);
    const cancelButton = (<Button onClick={handleCancel} variant="secondary">Cancel</Button>);
    const submitButton = (<Button onClick={handleSubmit}>Submit</Button>);

    const buttons = (newCard) ? (<>{doneButton}{saveButton}</>) : (<>{cancelButton}{submitButton}</>)

    return (
        <>
            <h1>{(newCard && deck && deck.name) ? deck.name : ""}{title}</h1>
            <Form>
                <Form.Group>
                    <Form.Label>Front</Form.Label>
                    <Form.Control value={formData.front} onChange={handleChange} name="front" type="text" as="textarea" rows="2" placeholder="Front side of card" />
                </Form.Group>
                <br />
                <Form.Group>
                    <Form.Label>Back</Form.Label>
                    <Form.Control value={formData.back} onChange={handleChange} name="back" type="text" as="textarea" rows="2" placeholder="Back side of card" />
                </Form.Group>
                <br />
                {buttons}
            </Form>
        </>  
    );
}

export default UpsertFlashCard;