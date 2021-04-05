import React, { useState } from "react";
import DeckForm from "./DeckForm"
import NavBar from "../NavBar/NavBar";
import "./CreateDeck.css";

//Add nav bars and states to each later

//Create deck page
export default function CreateDeck() {

    //Create nav object for navbar
    const navigation = {Home: "/", "Create Deck": " "};


    //Set deck state to be passed
    const [deck, setDeck] = useState({name: "Enter a name", description: "Enter a description"});
    
    return (
        <div>
            <NavBar 
            navigation={navigation} />

            <h2>Create Deck</h2>

            <DeckForm 
            deck={deck} /> 
        </div>
    )
};