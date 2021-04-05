import React from "react";
import { deleteCard } from "../utils/api/index";

/*This function will:
    1)Take in cards and URL (for buttons)
    2)Map through them and return the JSX for each card
        Buttons should include:
            Edit card
            Delete
*/
export default function ShowCards({ deck, url, history }) {

    //delete handler
    async function deleteHandler(card) {

        //Abort controller for deleteDeck API call
        const abortController = new AbortController()

        //Confirm window to make sure they want to delete deck
        const confirm = window.confirm("Do you want to delete this deck?");

        //If "ok" clicked, delete the deck and refresh the home screen
        if (confirm) {
            deleteCard(card.id, abortController.signal);
            window.location.reload();

            return () => abortController.abort();
        } else {
            history.push({url});
        };
    };

    const deckCards = deck.cards.map((card, index) => (
        <tbody>
            <tr key={index}>
                <td>{card.front}</td>
                <td>{card.back}</td>
                <button onClick={() => history.push(`${url}cards/${card.id}/edit`)}>Edit</button>
                <br />
                <button onClick={() => deleteHandler(card)}>Delete</button>
                <br />
            </tr>
        </tbody>
    ));

    return (
        <table>
            <thead>
                <tr>
                <th>Cards:</th>
                </tr>
            </thead>
            <thead>
            <tr style={{fontSize: 20}}>
                <td>Front:</td>
                <td>Back:</td>
            </tr>
            </thead>
            {deckCards}
        </table>
    )
};