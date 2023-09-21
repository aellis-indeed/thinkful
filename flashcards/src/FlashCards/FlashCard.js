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
        const controller = new AbortController();
        if (dlt) {
          setDlt(false);
          deleteCard(card.id, controller.signal).then(console.log);
          handleCardsChanged();
        }
        return () => controller.abort();
        // eslint-disable-next-line
      }, [dlt])
    
    const handleDelete = (event) => {
        event.preventDefault();
        const result = window.confirm("Delete this card?\n\nYou will not be able to recover it.");
        if (result) {
            setDlt(true);
        }
    }

    return (
        <div class="card">
            <table>
                <tbody>
                    <tr>
                        <td style={style}>
                            {card.front}
                        </td>
                        <td style={style}>
                            {card.back}
                            <br />
                            <button onClick={handleDelete} class="btn btn-danger float-right">
                                Delete
                            </button>
                            <button onClick={handleEdit} class="btn btn-secondary float-right">
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