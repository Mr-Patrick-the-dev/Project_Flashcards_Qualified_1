import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { createCard } from "../utils/api/index";

export default function NewCardForm({ deckId, card }) {
    //deck will have either the pre-filled default deck (new) or the current deck info (edit)

    //Grab history for later use
    const history = useHistory();

    //Set new blank deck state
    const [newCard, setNewCard] = useState(card);

    //changeHandler
    const changeHandler = ({ target }) => {
        setNewCard({
            ...newCard,
            [target.name]: target.value
        });
    };
    
    //submitHandler
    const submitHandler = (newCard, deckId) => {
        //Abort controller for deckFunction API call
        const abortController = new AbortController()

        //use function passed from page
        const submittedCard = createCard(deckId, newCard, abortController.signal);
        setNewCard(card);
        history.push(`/decks/${deckId}/cards/new`);

        //Abort controller
        return () => abortController.abort();
    }

    return (
        <>
        <form onSubmit={()=>submitHandler(newCard, deckId)}>
            <label htmlFor="front">
            Front:
            </label>
            <br />
                <textarea
                id="front"
                name="front"
                onChange={changeHandler}
                placeholder={card.front}
                required
                cols={40}
                rows={5}
                value={card.front} />

                <hr />
            <label htmlFor="back">
            Back:
            </label>
            <br />
                <textarea
                id="back"
                name="back"
                onChange={changeHandler}
                placeholder={card.back}
                required 
                cols={40}
                rows={5}
                value={card.back}/>
                <hr />
            <button type="submit">Submit</button>
            <button onClick={() => history.push("/")}>Cancel</button>
        </form>
        </>
    )
};