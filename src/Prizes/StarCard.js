import React from "react";
import { Header, Modal, Icon } from "semantic-ui-react";
import ls from "local-storage";

const StarCard = ({ prize }) => {
    const totalCollected = ls("stars")?.length;
    return (
        <Modal.Content image>
            <Icon
                color={prize.id}
                name="star"
                size="massive"
                style={{ width: "auto", margin: "30px" }}
            />
            <Modal.Description>
                <Header>
                    You won a {prize.name} star! You have collected{" "}
                    {totalCollected} out of 12 stars!{" "}
                </Header>
            </Modal.Description>
        </Modal.Content>
    );
};

export default StarCard;
