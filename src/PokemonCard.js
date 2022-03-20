import React from "react";
import { Header, Image, Modal } from "semantic-ui-react";

const parseApiText = (text) => {
    const newText = text.charAt(0).toUpperCase() + text.slice(1);
    return newText.replace("-", " ");
};

const PokemonCard = ({ pokemon, size }) => {
    const name = parseApiText(pokemon.name);
    const imageUrl = pokemon.sprites.other["official-artwork"]["front_default"];
    const types = pokemon.types.map((type) => parseApiText(type.type.name));
    const typeText = types.join(", ");
    const moves = pokemon.moves
        .map((move) => parseApiText(move.move.name))
        .slice(0, 3)
        .join(", ");
    console.log(pokemon);
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
                        <p>Weight: {pokemon.weight}kg</p>
                    </>
                )}
            </Modal.Description>
        </Modal.Content>
    );
};

export default PokemonCard;
