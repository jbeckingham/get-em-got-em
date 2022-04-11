import React from "react";
import { Button, Modal } from "semantic-ui-react";
import { Link } from "react-router-dom";
import PokemonCard from "./Prizes/PokemonCard";
import StarCard from "./Prizes/StarCard";

const WinningModal = ({ open, onPrizeAccepted, prize, collectionType }) => {
    return (
        <Modal style={{ width: "80%" }} open={open}>
            {collectionType === "pokemon" && (
                <>
                    <Modal.Header size="medium">
                        You won a Pokemon card!
                    </Modal.Header>
                    <PokemonCard prize={prize} size="large" />
                </>
            )}
            {collectionType === "stars" && (
                <>
                    <Modal.Header size="medium">You won a Star!</Modal.Header>
                    <StarCard prize={prize} />
                </>
            )}
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
