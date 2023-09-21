import React from "react";
import { useHistory } from "react-router-dom";

import Deck from "./Deck";

function DeckList({decks = [], handleDecksChanged}) {
  const history = useHistory();
  return (
    <>
      <button class="btn btn-secondary" onClick={() => history.push("/decks/new") }>Create Deck</button>
        {
          decks.map((deck) => {
            return (<Deck key={deck.id} deck={deck} handleDecksChanged={handleDecksChanged} />)
          })
        }
    </>
  );
}

export default DeckList;