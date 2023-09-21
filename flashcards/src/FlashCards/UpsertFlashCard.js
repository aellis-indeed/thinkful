import React, { useEffect, useState } from "react";
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
        title = "";
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

    const doneButton = (<button onClick={handleDone} class="btn btn-secondary">Done</button>);;
    const saveButton = (<button onClick={handleSave} class="btn btn-primary">Save</button>);
    const cancelButton = (<button onClick={handleCancel} class="btn btn-secondary">Cancel</button>);
    const submitButton = (<button onClick={handleSubmit} class="btn btn-primary">Submit</button>);

    const buttons = (newCard) ? (<>{doneButton}{saveButton}</>) : (<>{cancelButton}{submitButton}</>)

    return (
        <>
            <h1>{(newCard && deck && deck.name) ? deck.name : ""}{title}</h1>
            <form>
                <div class="form-group">
                    <label for="front">Front</label>
                    <textarea value={formData.front} class="form-control" onChange={handleChange} name="front" type="text" id="front" rows="2" placeholder="Front side of card" />
                </div>
                <br />
                <div class="form-group">
                    <label for="back">Back</label>
                    <textarea value={formData.back} class="form-control" onChange={handleChange} name="back" type="text" id="back" rows="2" placeholder="Back side of card" />
                </div>
                <br />
                {buttons}
            </form>
        </>  
    );
}

export default UpsertFlashCard;