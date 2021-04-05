import React from "react";
import { useHistory } from "react-router-dom";
import DeckDisplay from "./DeckDisplay";
import "./Home.css";

export default function HomePage({ decks }) {

    //Load history
    const history = useHistory();

    //Check to see if decks is empty
    if (decks) {
        return (
            <>
            <button
            type="button"
            onClick={() => history.push("/decks/new")}>Create Deck</button>
            <hr />
            <DeckDisplay decks={decks} />
            </>
        )
    } else {
        //No decks
        return <h3>...Loading Decks</h3>
    };
};
