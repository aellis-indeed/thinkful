import React, { useState, useEffect } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";

import { deleteDeck } from "../utils/api";

function Deck({deck, handleDecksChanged}) {
  const history = useHistory();
  const { url } = useRouteMatch();
  const [dlt, setDlt] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    if (dlt) {
      setDlt(false);
      deleteDeck(deck.id, controller.signal);
      handleDecksChanged();
    }
    return () => controller.abort();
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
    secondaryButton = (<button onClick={() => history.push(`/decks/${deck.id}/edit`) } class="btn btn-secondary">Edit</button>)
  } else {
    secondaryButton = (<button onClick={() => history.push(`/decks/${deck.id}`) } class="btn btn-secondary">View</button>)
  }

  return (
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">{deck.name}</h5>
          <h6 class="card-subtitle mb-2 text-muted float-right">{(deck.cards) ? deck.cards.length : 0} cards</h6>
          <p class="card-text">{deck.description}</p>
          {secondaryButton}
          <button onClick={() => history.push(`/decks/${deck.id}/study`) } class="btn btn-primary">Study</button>
          {url.includes("decks") ? (<button onClick={() => history.push(`${url}/cards/new`) } class="btn btn-primary">Add Cards</button>) :<></> }
          <button onClick={handleDelete} class="btn btn-danger float-right">Delete</button>
        </div>
      </div>
  );
}

export default Deck;