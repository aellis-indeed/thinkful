import React, { useState } from "react";
import { Button, Card } from "react-bootstrap";

function StudyCard({card, index, length, handleNextCard}) {
    const [flipped, setFlipped] = useState(false);

    const handleFlip = () => {
        setFlipped(!flipped);
    };

    const handleNext = () => {
        setFlipped(false);
        handleNextCard();
    }

    const flipButton = (<Button onClick={handleFlip} variant="secondary">Flip</Button>);
    const nextButton = (<Button onClick={handleNext} variant="primary">Next</Button>);

    const front = card.front;
    const back = card.back;

    return (
        <>
        <Card>
            <Card.Title>
                Card {index + 1} of {length}
            </Card.Title>
            <Card.Body>
            {(flipped) ? back : front}
            </Card.Body>
            {flipButton}
            {(flipped) ? nextButton : <></>}
        </Card>
        </>
    );
}

export default StudyCard;