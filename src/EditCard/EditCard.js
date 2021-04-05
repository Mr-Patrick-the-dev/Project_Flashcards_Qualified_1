import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { readCard } from "../utils/api/index";
import CardForm from "../AddCard/CardForm";
import NavBar from "../NavBar/NavBar";


export default function EditCard({ deckName }) {

    //Gather the Card Id
    const { deckId, cardId } = useParams();

    //Create navigation for NavBar
    const navigation = {Home: "/", [deckName]: `/decks/${deckId}/`, [`Edit Card ${cardId}`] : " "}

    //Set an initial card
    const initialCard={front: "", back: ""};

    //Create a state for the card to be passed to the card form
    const [card, setCard] = useState(initialCard);

    useEffect(() => {
        //Reset the card
        setCard(initialCard);
        
        //Abort Controller
        const abortController = new AbortController();

        //Gather cards for deck
        async function getTheCard() {
            try{
                const thisCard = readCard(cardId, abortController.signal);
                thisCard.then((result)=> {
                    setCard(result);
                });
            } catch (error) {
                if (error=="AbortError") {
                    console.log(error);
                } else {
                    throw error;
                };
            };
        };

        getTheCard();

        return () => abortController.abort();
    }, [cardId])

    return (
        <div>
            <NavBar 
            navigation={navigation} />

            <h2>Edit Card</h2>

            <CardForm  
            card={card} 
            deckId={deckId} />

        </div>
    )
}