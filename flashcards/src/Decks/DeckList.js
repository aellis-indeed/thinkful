import React from "react";
import { useHistory } from "react-router-dom";
import Button from 'react-bootstrap/Button';

import Deck from "./Deck";

function DeckList({decks = [], handleDecksChanged}) {
  const history = useHistory();
  return (
    <>
      <Button onClick={() => history.push("/decks/new") }>Create Deck</Button>
        {
          decks.map((deck) => {
            return (<Deck key={deck.id} deck={deck} handleDecksChanged={handleDecksChanged} />)
          })
        }
    </>
  );
}

export default DeckList;