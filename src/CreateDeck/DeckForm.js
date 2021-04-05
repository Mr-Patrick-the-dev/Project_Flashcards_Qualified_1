import React, { useState } from "react";
import { useHistory } from "react-router-dom";

export default function DeckForm({ deck, deckFunction }) {
    //deck will have either the pre-filled default deck (new) or the current deck info (edit)

    //Grab history for later use
    const history = useHistory();

    //Set new blank deck state
    const [newDeck, setNewDeck] = useState(deck);

    //changeHandler
    const changeHandler = ({ target }) => {
        setNewDeck({
            ...newDeck,
            [target.name]: target.value
        });
    };
    
    //submitHandler
    const submitHandler = (event, newDeck) => {
        event.preventDefault();

        //Abort controller for deckFunction API call
        const abortController = new AbortController()

        //use function passed from page
        const submittedDeck = deckFunction(newDeck, abortController.signal);
        setNewDeck(deck);
        history.push(`/decks/${submittedDeck.id}/`);

        //Abort controller
        return () => abortController.abort();
    }

    return (
        <div>
        <form onSubmit={() => submitHandler(newDeck)}>
            <label htmlFor="name">Name:</label>
            <br />
                <input
                id="name"
                name={deck.name}
                type="text"
                onChange={changeHandler}
                value={deck.name}
                placeholder={deck.name}
                />
            <br />
            <label htmlFor="description">Description:</label>
            <br />
                <textarea
                id="description"
                name={deck.description}
                onChange={changeHandler}
                value={deck.description}
                placeholder={deck.description}
                rows={8}
                cols={45}
                />
            <hr />
            
            <button type="submit">Submit</button>

            <button onClick={() => history.push("/")}>Cancel</button>
        </form>
        </div>
    )
};