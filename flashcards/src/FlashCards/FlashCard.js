import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
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

    useEffect(() => {
        if (dlt) {
          setDlt(false);
          deleteCard(card.id)
            .then(() => handleCardsChanged())
            .catch(console.error);
        }
      }, [dlt, card.id, handleCardsChanged])
    
    const handleDelete = (event) => {
        event.preventDefault();
        const result = window.confirm("Delete this card?\n\nYou will not be able to recover it.");
        if (result) {
            setDlt(true);
        }
    }

    return (
        <div className="card">
            <table>
                <tbody>
                    <tr>
                        <td style={style}>
                            {card.front}
                        </td>
                        <td style={style}>
                            {card.back}
                            <br />
                            <button onClick={handleDelete} className="btn btn-danger float-right">
                                Delete
                            </button>
                            <button onClick={handleEdit} className="btn btn-secondary float-right">
                                Edit
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default FlashCard;