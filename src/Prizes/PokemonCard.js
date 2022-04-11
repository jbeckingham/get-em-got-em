import React from "react";
import { Header, Image, Modal } from "semantic-ui-react";

const parseApiText = (text) => {
    const newText = text.charAt(0).toUpperCase() + text.slice(1);
    return newText.replace("-", " ");
};

const PokemonCard = ({ prize, size }) => {
    const name = parseApiText(prize.name);
    const imageUrl = prize.sprites.other["official-artwork"]["front_default"];
    const types = prize.types.map((type) => parseApiText(type.type.name));
    const typeText = types.join(", ");
    const moves = prize.moves
        .map((move) => parseApiText(move.move.name))
        .slice(0, 3)
        .join(", ");
    console.log(prize);
    return (
        <Modal.Content image>
            <Image
                size="medium"
                src={imageUrl}
                wrapped
                style={{ maxWidth: "80%" }}
            />
            <Modal.Description>
                {size === "small" ? (
                    <div className="card-small">
                        <strong>{name}</strong>
                        <br />
                        <strong>Type:</strong> {typeText}
                    </div>
                ) : (
                    <>
                        <Header>{name}</Header>
                        <p>Pokemon type: {typeText}</p>
                        <p>Key moves: {moves}</p>
                        <p>Weight: {prize.weight}kg</p>
                    </>
                )}
            </Modal.Description>
        </Modal.Content>
    );
};

export default PokemonCard;
