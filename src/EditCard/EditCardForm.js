import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { updateCard } from "../utils/api/index";

export default function EditCardForm({ card, deckId }) {

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
    const submitHandler = (newCard) => {
        //Abort controller for deckFunction API call
        const abortController = new AbortController()

        //use function passed from page
        const submittedCard = updateCard( newCard, abortController.signal);
        setNewCard(card);
        history.push(`/decks/${deckId}`);

        //Abort controller
        return () => abortController.abort();
    }

    return (
        <div>
        <form onSubmit={()=>submitHandler(newCard)}>
            <label htmlFor="front">
            Front:
            </label>
                <textarea
                id="front"
                name="front"
                onChange={changeHandler}
                value={newCard.front}
                placeholder={card.front} />

                <hr />
            <label htmlFor="back">
            Back:
            </label>
                <textarea
                id="back"
                name="back"
                onChange={changeHandler}
                value={newCard.back}
                placeholder={card.back} />
                <hr />
            <button type="submit">Submit</button>
            <button onClick={() => history.push("/")}>Cancel</button>
        </form>
        </div>
    )
};