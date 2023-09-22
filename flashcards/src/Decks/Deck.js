import React, { useState, useEffect } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";

import { deleteDeck } from "../utils/api";

function Deck({deck, handleDecksChanged}) {
  const history = useHistory();
  const { url } = useRouteMatch();
  const [dlt, setDlt] = useState(false);

  useEffect(() => {
    if (dlt) {
      setDlt(false);
      deleteDeck(deck.id)
        .then((ignored) => handleDecksChanged());
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
    secondaryButton = (<button onClick={() => history.push(`/decks/${deck.id}/edit`) } className="btn btn-secondary">Edit</button>)
  } else {
    secondaryButton = (<button onClick={() => history.push(`/decks/${deck.id}`) } className="btn btn-secondary">View</button>)
  }

  return (
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{deck.name}</h5>
          <h6 className="card-subtitle mb-2 text-muted float-right">{(deck.cards) ? deck.cards.length : 0} cards</h6>
          <p className="card-text">{deck.description}</p>
          {secondaryButton}
          <button onClick={() => history.push(`/decks/${deck.id}/study`) } className="btn btn-primary">Study</button>
          {url.includes("decks") ? (<button onClick={() => history.push(`${url}/cards/new`) } className="btn btn-primary">Add Cards</button>) :<></> }
          <button onClick={handleDelete} className="btn btn-danger float-right">Delete</button>
        </div>
      </div>
  );
}

export default Deck;