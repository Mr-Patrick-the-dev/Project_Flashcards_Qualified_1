import React, { useEffect, useState } from "react";
import { Route, Switch, useParams, useRouteMatch, useHistory } from "react-router-dom";
import ShowDeck from "./ShowDeck";
import DeckCards from "./DeckCards";
import EditDeck from "../EditDeck/EditDeck";
import EditCard from "../EditCard/EditCard";
import StudyDeck from "../Study/StudyDeck";
import AddCards from "../AddCard/AddCard";
import { readDeck, listCards } from "../utils/api";
import "./Deck.css";


//This function will host:
    //A component rendering the deck and cards (2 separate components)
    //A component rendering the Study Page
    //A componenent rendering the EditDeck Page
    //A component rendering the EditCard Page
    //A component rendering the AddCard Page

export default function HostDeck({ decks }) {

    const history = useHistory();

    //Gather the deckId param. used for initailDeck
    const { deckId } = useParams()

    //Gather Route match for URL
    const { url, path } = useRouteMatch();

    //Create initial deck and cards array
    const initialDeck = {name: "", description: "", id:{deckId}, cards: []}

    //Deck state will be passed to ShowDeck
    const [deck, setDeck] = useState(initialDeck);

    //useEffect for after initial render to read the deck
    
    useEffect(() => {

        //Reset the deck
        setDeck(initialDeck);
        
        //Abort Controller
        const abortController = new AbortController();

        //Read the deck
        async function readTheDeck() {
            try{
                const pulledDeck = await readDeck(deckId, abortController.signal);
                setDeck(pulledDeck);
                
            } catch (error) {
                if (error=="AbortError") {
                    console.log(error);
                } else {
                    throw error;
                };
            };
        };

        readTheDeck();

        return () => abortController.abort();
    },[deckId]);

    //Check that deck is not an empty value
    if(deck) {
        return (
            <div>
            <Switch>
                <Route exact={true} path={url}>
                    <ShowDeck 
                    deck={deck}
                    url={url} 
                    history={history} />

                    <DeckCards 
                    deck={deck}
                    url={url} 
                    history={history}/>
                </Route>
                <Route path={`${path}/study`}>
                    <StudyDeck 
                    deck={deck} />
                </Route>
                <Route path={`${path}/edit`}>
                    <EditDeck 
                    deck={deck}/>
                </Route>
                <Route path={`${path}/cards/new`}>
                    <AddCards 
                    deckName={deck.name} 
                    deckId={deckId} />
                </Route>
                <Route path={`${path}/cards/:cardId/edit`}>
                    <EditCard 
                    deckName={deck.name}
                    deckUrl={url}/>
                </Route>
            </Switch>
            </div>
        );
    } else {
       return <h3>.....Loading deck and cards</h3>
    }
};