import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

export default function StudyCards({ cards }) {


    console.log(cards)
    //Create initial card state
    const initialCard = {number: 1, side:"front"};

    //Set card state
    const [studyCard, setStudyCard] = useState(initialCard);

    //Get history for later use
    const history = useHistory();
    
    //Next card click function
    const nextCard = () => {
        //Check if studyCard.number < cards length
        if(studyCard.number < cards.length) {
            //Add to studyCard number and switch the side to back
            setStudyCard({...studyCard, number: studyCard.number+1, side: "front"});
        } else {
            //StudyCard number is equal to cards length
            const confirm = window.confirm("Do you want to restart?");

            //Check user input for confirm
            if (confirm) {
                setStudyCard(initialCard);
            }
            else {
                setStudyCard(initialCard);
                history.push("/");
            };
        };
    };

    
    //Iterate through cards
    for (let i=0; i<cards.length; i++) {
        const card = cards[i];
        
        //Check that card id matches with studyCard id
        if(i+1 === studyCard.number) {

            //Check studyCard side
            if(studyCard.side==="front") {

                return (
                    <div>
                        <h4>Card {studyCard.number} of {cards.length}</h4>
                        <p>{card.front}</p>
                        <button onClick={()=> 
                            setStudyCard({...studyCard, side: "back"})}>
                                Flip
                        </button>
                    </div>
                );
            } else {
                //Side = back

                return (
                    <div>
                        <h4>Card {studyCard.number} of {cards.length}</h4>
                        <p>{card.back}</p>
                        <button onClick={() =>
                            setStudyCard({...studyCard, side: "front"})}>
                                Flip
                        </button>
                        <button onClick={() =>nextCard()}>
                                Next
                        </button>
                    </div>
                );
            };
        };
    };
};