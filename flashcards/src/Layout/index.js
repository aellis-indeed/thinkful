import React, { useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";

import Header from "./Header";
import NotFound from "./NotFound";
import Home from "../Home/Home";
import UpsertDeck from "../Decks/UpsertDeck";
import DeckView from "../Decks/DeckView";

import { listDecks } from "../utils/api";
import Bread from "./Bread";
import { useHistory } from "react-router-dom/cjs/react-router-dom";


function Layout() {
  const [decks, setDecks] = useState([]);
  const [decksChanged, setDecksChanged] = useState(false);
  const history = useHistory();

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    listDecks(signal)
      .then(setDecks);
    return () => controller.abort();
  }, [decksChanged]);

  const handleDecksChanged = () => {
    setDecksChanged(!decksChanged);
    history.push("/");
  };

  return (
    <div>
      <Header />
      <div className="container">
        <Bread decks={decks}/>
        <Switch>
          <Route path={"/decks/new"}>
            <UpsertDeck />
          </Route>
          <Route path={"/decks/:deckId"}>
            <DeckView decks={decks} handleDecksChanged={handleDecksChanged}/>
          </Route>
          <Route exact path="/">
            <Home decks={decks} handleDecksChanged={handleDecksChanged} />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default Layout;
