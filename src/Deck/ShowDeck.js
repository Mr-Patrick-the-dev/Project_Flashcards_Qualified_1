import React from "react";
import { deleteDeck } from "../utils/api/index";
import NavBar from "../NavBar/NavBar";


/*
    This function will:
        1)Take in deck and url (for buttons)
        2)Display the name and description of the deck
        3)Provide buttons for:
            Edit
            Study
            Add cards
            Delete
*/

export default function ShowDeck({ deck, url, history}) {

    //Extract properties from deck
    const { name, description, id } = deck;

    //Create navigation object for NavBar
    const navigation = {Home: "/", [name]: " "};

    //delete handler
    async function deleteHandler(id) {

        //Abort controller for deleteDeck API call
        const abortController = new AbortController()

        //Confirm window to make sure they want to delete deck
        const confirm = window.confirm("Do you want to delete this deck?");

        //If "ok" clicked, delete the deck and refresh the home screen
        if (confirm) {
            deleteDeck(id, abortController.signal);
            history.push("/");

            return () => abortController.abort();
        } else {
            history.push({url});
        };
    };

    //Call history to use later
    
    return (
        <div>
        <NavBar 
        navigation={navigation} />
        <h3>{name}</h3>
        <p>{description}</p>
        <button onClick={()=>history.push(`${url}edit`)}>Edit</button>
        <button onClick={()=>history.push(`${url}study`)}>Study</button>
        <button onClick={()=>history.push(`${url}cards/new`)}>Add Cards</button>
        <button onClick={()=>(deleteHandler(id))}>Delete</button>
        </div>
    )
};