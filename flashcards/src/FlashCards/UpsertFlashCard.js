import React, { useEffect, useState } from "react";
import { useRouteMatch, useHistory } from "react-router-dom";
import { createCard, readDeck, readCard, updateCard } from "../utils/api";

function UpsertFlashCard({handleCardsChanged}) {
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
            .catch(console.error);
        return () => controller.abort();
    }, [deckId]);

    useEffect(() => {
        const controller = new AbortController();
        if (Object.keys(cardToCreate).length > 0) {
            createCard(deckId, cardToCreate, controller.signal)
                .then(() => handleCardsChanged());
        }
        return () => controller.abort();
    }, [cardToCreate]);

    useEffect(() => {
        const controller = new AbortController();
        if (Object.keys(cardToUpdate).length > 0) {
            updateCard(cardToUpdate, controller.signal)
                .then(() => handleCardsChanged());
            history.push(`/decks/${deckId}`);
        }
        return () => controller.abort();
    }, [cardToUpdate, deckId, history]);

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
                    intialFormData = data;
                    setFormData(data)
                })
                .catch(console.error);
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
    }

    const doneButton = (<button onClick={handleDone} className="btn btn-secondary">Done</button>);;
    const saveButton = (<button onClick={handleSave} className="btn btn-primary">Save</button>);
    const cancelButton = (<button onClick={handleCancel} className="btn btn-secondary">Cancel</button>);
    const submitButton = (<button onClick={handleSubmit} className="btn btn-primary">Submit</button>);

    const buttons = (newCard) ? (<>{doneButton}{saveButton}</>) : (<>{cancelButton}{submitButton}</>)

    return (
        <>
            <h1>{(newCard && deck && deck.name) ? deck.name : ""}{title}</h1>
            <form>
                <div className="form-group">
                    <label htmlFor="front">Front</label>
                    <textarea value={formData.front} className="form-control" onChange={handleChange} name="front" type="text" id="front" rows="2" placeholder="Front side of card" />
                </div>
                <br />
                <div className="form-group">
                    <label htmlFor="back">Back</label>
                    <textarea value={formData.back} className="form-control" onChange={handleChange} name="back" type="text" id="back" rows="2" placeholder="Back side of card" />
                </div>
                <br />
                {buttons}
            </form>
        </>  
    );
}

export default UpsertFlashCard;