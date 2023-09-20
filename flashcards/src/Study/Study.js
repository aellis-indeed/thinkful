import React, { useEffect, useState } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import StudyCard from "./StudyCard";
import { Button } from "react-bootstrap";

import { readDeck } from "../utils/api";

function Study() {
  const { url } = useRouteMatch();
  const [index, setIndex] = useState(0);
  const [card, setCard] = useState({});
  const history = useHistory();

  let id = -1;
  const [deck, setDeck] = useState({cards: []});

  useEffect(() => {
    const controller = new AbortController();
    readDeck(id, controller.signal)
      .then(setDeck);
    return () => controller.abort();
  }, [id]);

  id = url.replace("/decks/", "").replace("/study", "");

  useEffect(() => {
    if (deck.cards.length === 0) return;
    if (index < deck.cards.length) {
      setCard(deck.cards[index]);
    } else {
      const result = window.confirm("Restart cards?\n\nClick 'cancel' to return to the home page.");
      (result) ? setIndex(0) : history.push("/") ;
    }
    
  }, [deck.cards, index, history]);

  const handleNextCard = () => {
    setIndex((currentIndex) => currentIndex + 1)
  }

  if (deck.cards.length < 3) {
    return (
      <>
        <h1>Study: {deck.name}</h1>
        <h2>Not enough cards.</h2>  
        <p>You need at least 3 cards to study. There are {deck.cards.length} cards in this deck.</p>
        <Button onClick={() => history.push(`/decks/${deck.id}/cards/new`)}>Add Cards</Button>
      </>
    );
  }

  return (
    <>
      <h1>Study: {deck.name}</h1>
      <StudyCard card={card} index={index} length={deck.cards.length} handleNextCard={handleNextCard}/>
    </>
  );
}

export default Study;