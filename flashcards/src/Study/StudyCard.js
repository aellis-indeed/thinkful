import React, { useState } from "react";

function StudyCard({card, index, length, handleNextCard}) {
    const [flipped, setFlipped] = useState(false);

    const handleFlip = () => {
        setFlipped(!flipped);
    };

    const handleNext = () => {
        setFlipped(false);
        handleNextCard();
    }

    const flipButton = (<button onClick={handleFlip} class="btn btn-secondary">Flip</button>);
    const nextButton = (<button onClick={handleNext} class="btn btn-primary">Next</button>);

    const front = card.front;
    const back = card.back;

    return (
        <>
        <div class="card">
            <h5 class="card-title">
                Card {index + 1} of {length}
            </h5>
            <p class="card-text">
            {(flipped) ? back : front}
            </p>
            {flipButton}
            {(flipped) ? nextButton : <></>}
        </div>
        </>
    );
}

export default StudyCard;