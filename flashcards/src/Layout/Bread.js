import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Breadcrumb } from "react-bootstrap";

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

    const homeCrumb = (<Breadcrumb.Item href="/" active={crumbTracker.home.active}>Home</Breadcrumb.Item>);
    const studyCrumb = (<Breadcrumb.Item active>Study</Breadcrumb.Item>);
    const createDeckCrumb = (<Breadcrumb.Item active>Create Deck</Breadcrumb.Item>);
    const deckCrumb = (<Breadcrumb.Item href={`/decks/${crumbTracker.deck.id}`} active={crumbTracker.deck.active}>{deckName}</Breadcrumb.Item>);
    const editDeckCrumb = (<Breadcrumb.Item active>Edit</Breadcrumb.Item>);
    const addCardCrumb = (<Breadcrumb.Item active>Add Card</Breadcrumb.Item>);
    const editCardCrumb = (<Breadcrumb.Item active>Edit Card</Breadcrumb.Item>);


    return (
        <Breadcrumb>
            {(crumbTracker.home.valid) ? homeCrumb : <></>}
            {(crumbTracker.deck.valid) ? deckCrumb : <></>}
            {(crumbTracker.study.valid) ? studyCrumb : <></>}
            {(crumbTracker.createDeck.valid) ? createDeckCrumb : <></>}
            {(crumbTracker.editDeck.valid) ? editDeckCrumb : <></>}
            {(crumbTracker.addCard.valid) ? addCardCrumb : <></>}
            {(crumbTracker.editCard.valid) ? editCardCrumb : <></>}
        </Breadcrumb>
    );
}

export default Bread;