import React, { useEffect, useState } from "react";
import Header from "./Header";
import NotFound from "./NotFound";
import Home from "../Home/Home";
import HostDeck from "../Deck/Deck";
import CreateDeck from "../CreateDeck/CreateDeck";
import { listDecks } from "../utils/api/index";
import { Route, Switch } from "react-router-dom";

function Layout() {

  //Initial state for decks
  const initialDecks = [];
  
   //Set state for decks
   const [decks, setDecks] = useState(initialDecks);
  
   //Load the decks and cards to be displayed after initial render
   useEffect(() => {
    //Set decks And Cards to empty values
    setDecks(initialDecks);

    //Abort controller for API fetch
    const abortController = new AbortController();

    //Load the cards and decks
    async function getDecks() {
        try {
            const pulledDecks = await listDecks(abortController.signal)
            setDecks(pulledDecks);
        } catch (error) {
            //Handle the error
            if (error=="AbortError") {
                console.log("Aborted");
            } else {
                throw error;
            };
        };
    };

    //Call getDecksAndCards
    getDecks()

    //Abort Controller return
    return () => abortController.abort();
},[]);

  return (
    <>
      <Header />
      <div className="container">
        {/* TODO: Implement the screen starting here */}
        <Switch>

        <Route exact={true} path="/">
          <Home decks={decks} />
        </Route>

        <Route path="/decks/new">
          <CreateDeck /> 
        </Route>

        <Route path="/decks/:deckId">
          <HostDeck />
        </Route>

        <Route>
          <NotFound />
        </Route>

        </Switch>
      </div>
    </>
  );
}

export default Layout;
