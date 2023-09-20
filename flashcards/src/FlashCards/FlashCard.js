import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Card, Button } from "react-bootstrap";
import { deleteCard } from "../utils/api";

function FlashCard({card, handleCardsChanged}) {
    const history = useHistory();
    const style = {
        width: "50%"
    }
    const [dlt, setDlt] = useState(false);

    const handleEdit = () => {
        history.push(`/decks/${card.deckId}/cards/${card.id}/edit`)
    };

    useEffect(async () => {
        if (dlt) {
          setDlt(false);
          await deleteCard(card.id);
          handleCardsChanged();
        }
      }, [dlt])
    
    const handleDelete = (event) => {
        event.preventDefault();
        const result = window.confirm("Delete this card?\n\nYou will not be able to recover it.");
        if (result) {
            setDlt(true);
        }
    }

    return (
        <Card>
            <table>
                <tbody>
                    <tr>
                        <td style={style}>
                            {card.front}
                        </td>
                        <td style={style}>
                            {card.back}
                            <br />
                            <Button onClick={handleDelete} variant="danger" className={"float-right"}>
                                Delete
                            </Button>
                            <Button onClick={handleEdit} variant="secondary" className={"float-right"}>
                                Edit
                            </Button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </Card>
    );
}

export default FlashCard;