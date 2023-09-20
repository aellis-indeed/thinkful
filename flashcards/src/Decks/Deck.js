import React, { useState, useEffect } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import { deleteDeck } from "../utils/api";

function Deck({deck, handleDecksChanged}) {
  const history = useHistory();
  const { url } = useRouteMatch();
  const [dlt, setDlt] = useState(false);

  useEffect(() => {
    if (dlt) {
      setDlt(false);
      deleteDeck(deck.id);
      handleDecksChanged();
    }
  }, [dlt, deck.id, handleDecksChanged])

  const handleDelete = (event) => {
    event.preventDefault();
    const result = window.confirm("Delete this deck?\n\nYou will not be able to recover it.");
    if (result) {
      setDlt(true);
    }
  }

  let secondaryButton;

  if (url.includes("decks")) {
    secondaryButton = (<Button onClick={() => history.push(`/decks/${deck.id}/edit`) } variant="secondary">Edit</Button>)
  } else {
    secondaryButton = (<Button onClick={() => history.push(`/decks/${deck.id}`) } variant="secondary">View</Button>)
  }

  return (
      <Card>
        <Card.Body>
          <Card.Title>{deck.name}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted float-right">{(deck.cards) ? deck.cards.length : 0} cards</Card.Subtitle>
          <Card.Text>{deck.description}</Card.Text>
          {secondaryButton}
          <Button onClick={() => history.push(`/decks/${deck.id}/study`) } variant="primary">Study</Button>
          {url.includes("decks") ? (<Button onClick={() => history.push(`${url}/cards/new`) } variant="primary">Add Cards</Button>) :<></> }
          <Button onClick={handleDelete} variant="danger" className={"float-right"}>Delete</Button>
        </Card.Body>
      </Card>
  );
}

export default Deck;