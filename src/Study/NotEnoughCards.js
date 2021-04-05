import React from "react";
import { useHistory } from "react-router-dom";
import NavBar from "../NavBar/NavBar";

export default function NotEnoughCards({ deckName, deckId, cardsLength }) {

    //Pull history for later use
    const history = useHistory();

    //Create nav object for navbar
    const navigation = {Home: "/", [deckName]: `/decks/${deckId}/`, Study: " "};


    return (
        <>
        <NavBar 
        navigation={navigation}/>

        <h2>{deckName}: Study</h2>
        <hr />

        <h3>Not enough cards</h3>
        <br />

        <p>You need at least 3 cards to study. There are only {cardsLength} cards.</p>
        <br />

        <button onClick={() => history.push(`/decks/${deckId}/cards/new`)}>
            Add Cards
        </button>
        </>
        
    )
}