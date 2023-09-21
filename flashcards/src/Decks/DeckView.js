import React, { useEffect, useState } from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";

import Deck from "./Deck";
import UpsertDeck from "./UpsertDeck";
import Study from "../Study/Study";
import UpsertFlashCard from "../FlashCards/UpsertFlashCard";
import FlashCardList from "../FlashCards/FlashCardList";
import { readDeck } from "../utils/api";

function DeckView() {
    const { url } = useRouteMatch();
    const id = url.replace("/decks/", "").replace("/edit", "");
    const [deck, setDeck] = useState({});
    const [cardsChanged, setCardsChanged] = useState(false);

    const handleCardsChanged = () => setCardsChanged(!cardsChanged);

    useEffect(() => {
        const controller = new AbortController();
        readDeck(id, controller.signal)
            .then(setDeck);
        return () => controller.abort();
    }, [id, cardsChanged]);

    return (
        <>
            <Switch>
                <Route path={`${url}/cards/new`}>
                    <UpsertFlashCard />
                </Route>
                <Route path={`${url}/cards/:cardId/edit`}>
                    <UpsertFlashCard />
                </Route>
                <Route path={`${url}/study`}>
                    <Study deck={deck}/>
                </Route>
                <Route path={`${url}/edit`}>
                    <UpsertDeck />
                </Route>
                <Route exact path={url}>
                    <Deck deck={deck} />
                    <FlashCardList cards={deck.cards} handleCardsChanged={handleCardsChanged}/>
                </Route>
            </Switch>
        </>
    );
}

export default DeckView;