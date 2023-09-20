import React from "react";

import DeckList from "../Decks/DeckList";

function Home({decks, handleDecksChanged}) {
  return (<DeckList decks={decks} handleDecksChanged={handleDecksChanged} />);
}

export default Home;