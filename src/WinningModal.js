import React from "react";
import { Button, Modal } from "semantic-ui-react";
import { Link } from "react-router-dom";
import PokemonCard from "./PokemonCard";

const WinningModal = ({ open, onPrizeAccepted, pokemon }) => {
    return (
        <Modal style={{ width: "80%" }} open={open}>
            <Modal.Header size="medium">You won a Pokemon card!</Modal.Header>{" "}
            {pokemon && <PokemonCard pokemon={pokemon} size="large" />}
            <Modal.Actions>
                <Link to="/collections">
                    <Button style={{ marginBottom: "5px" }} color="blue">
                        View my collection book
                    </Button>
                </Link>
                <Button
                    content="Solve more puzzles"
                    color="green"
                    labelPosition="right"
                    icon="checkmark"
                    onClick={() => onPrizeAccepted()}
                    positive
                />
            </Modal.Actions>
        </Modal>
    );
};

export default WinningModal;
