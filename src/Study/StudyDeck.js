import React, { useState, useEffect } from "react";
import NotEnoughCards from "./NotEnoughCards";
import StudyCards from "./StudyCards";
import NavBar from "../NavBar/NavBar";
import "./Study.css";

export default function StudyDeck({ deck }) {

    //Extract name and id from deck
    const { name, id, cards } = deck;

    //Create navigation for navbar
    const navigation = {Home: "/", [name]: `/decks/${id}/`, "Study": " "};


    if (cards.length < 3) {
        return <NotEnoughCards 
        deckName={name} 
        deckId={id} 
        cardsLength={cards.length}/>
     } else {
        return (
            <div>
            <NavBar 
            navigation={navigation} />

            <h2>Study: {name}</h2>

            <StudyCards
            cards={cards} />
            </div>
        )
    }
};