import React from "react";
import { Link } from "react-router-dom";

//Will take in an object where each key is a page, and it's value is the url to get there
    //Ex {"Home": "/", "Create Deck": "/decks/new", "Deck" : "/decks/:deckId"}
export default function NavBar({ navigation }) {

    //Get the entries of the navigation object
    const navEntries = Object.entries(navigation);

    //Map over navigation Entries
    const navLinks = navEntries.map((page, index) => {
        if (index < (navEntries.length - 1)) {
        return (
        <li className="breadcrumb-item" key={index}><Link to={page[1]}>{page[0]}</Link></li>
        )
        } else {
            return (
                <li className="breadcrumb-item active" key={index} aria-current="page">{page[0]}</li>
            )
        }
    });

    return (
        <>
        <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
                {navLinks}
            </ol>
        </nav>
        </>
    );

};