import React from "react";
import FlashCard from "./FlashCard";

function FlashCardList({cards = [], handleCardsChanged}) {
    return (
        <>
            <h1>Cards</h1>
                {
                    cards.map((c) => {
                        return (<FlashCard key={c.id} card={c} handleCardsChanged={handleCardsChanged}/>)
                    })
                }
        </>
        
    );
}

export default FlashCardList;