import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

let initialCrumbTracker = {
    home: {
        valid: true,
        active: false
    },
    study: {
        valid: false,
    },
    createDeck: {
        valid: false,
    },
    deck: {
        valid: false,
        active: false,
        id: 0
    },
    editDeck: {
        valid: false,
    },
    addCard: {
        valid: false,
    },
    editCard: {
        valid: false,
        id: 0
    }
}

function Bread({decks}) {
    const location = useLocation();
    const [deckName, setDeckName] = useState("");
    const [crumbTracker, setCrumbTracker] = useState(initialCrumbTracker);

    useEffect(() => {
        const url = location.pathname;
        const matches = url.match(/(\d+)/);
        const deckId = (matches) ? matches[0] : 0;
        switch (url) {
            case "/":
                setCrumbTracker({
                    ...initialCrumbTracker,
                    home: {
                        active: true,
                        valid: true
                    }
                })
                break;
            case "/decks/new":
                setCrumbTracker({
                    ...initialCrumbTracker,
                    createDeck: {
                        valid: true,
                    }
                })
                break;
            case url.match(/\/decks\/[0-9]+\/study/)?.input:
                setCrumbTracker({
                    ...initialCrumbTracker,
                    deck: {
                        active: false,
                        valid: true,
                        id: deckId
                    },
                    study: {
                        valid: true
                    }
                })
                break;
            case url.match(/\/decks\/[0-9]+\/edit/)?.input:
                setCrumbTracker({
                    ...initialCrumbTracker,
                    deck: {
                        active: false,
                        valid: true,
                        id: deckId
                    },
                    editDeck: {
                        valid: true
                    }
                })
                break;
            case url.match(/\/decks\/[0-9]+\/cards\/new/)?.input:
                setCrumbTracker({
                    ...initialCrumbTracker,
                    deck: {
                        active: false,
                        valid: true,
                        id: deckId
                    },
                    addCard: {
                        valid: true
                    }
                })
                break;
            case url.match(/\/decks\/[0-9]+\/cards\/[0-9]+\/edit/)?.input:
                setCrumbTracker({
                    ...initialCrumbTracker,
                    deck: {
                        active: false,
                        valid: true,
                        id: deckId
                    },
                    editCard: {
                        valid: true
                    }
                })
                break;
            case url.match(/\/decks\/[0-9]+/)?.input:
                setCrumbTracker({
                    ...initialCrumbTracker,
                    deck: {
                        active: true,
                        valid: true,
                        id: deckId
                    }
                })
                break;
            default:
                break;
            
        }
        if (decks) {
            const name = decks.find((deck) => deck.id === parseInt(deckId))?.name;
            setDeckName(name);
        }
    }, [decks, location]);

    const homeCrumb = (<li className="breadcrumb-item">{(!crumbTracker.home.active) ? (<a href="/">Home</a>) : "Home"}</li>);
    const studyCrumb = (<li className="breadcrumb-item">Study</li>);
    const createDeckCrumb = (<li className="breadcrumb-item">Create Deck</li>);
    const deckCrumb = (<li className="breadcrumb-item">{(!crumbTracker.deck.active) ? (<a href={`/decks/${crumbTracker.deck.id}`}>{deckName}</a>) : deckName}</li>);
    const editDeckCrumb = (<li className="breadcrumb-item">Edit</li>);
    const addCardCrumb = (<li className="breadcrumb-item">Add Card</li>);
    const editCardCrumb = (<li className="breadcrumb">Edit Card</li>);


    return (
        <nav>
          <ol className="breadcrumb">
            {(crumbTracker.home.valid) ? homeCrumb : <></>}
            {(crumbTracker.deck.valid) ? deckCrumb : <></>}
            {(crumbTracker.study.valid) ? studyCrumb : <></>}
            {(crumbTracker.createDeck.valid) ? createDeckCrumb : <></>}
            {(crumbTracker.editDeck.valid) ? editDeckCrumb : <></>}
            {(crumbTracker.addCard.valid) ? addCardCrumb : <></>}
            {(crumbTracker.editCard.valid) ? editCardCrumb : <></>}
          </ol>
        </nav>
    );
}

export default Bread;