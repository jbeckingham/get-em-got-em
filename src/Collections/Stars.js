import React, { useState, useEffect } from "react";
import { Header, Icon, Grid } from "semantic-ui-react";
import ls from "local-storage";
const R = require("ramda");
const { Row, Column } = Grid;

const starsPerRow = 3;
const starData = [
    { id: "red", name: "Red" },
    { id: "orange", name: "Orange" },
    { id: "yellow", name: "Yellow" },
    { id: "olive", name: "Olive" },
    { id: "green", name: "Green" },
    { id: "teal", name: "Teal" },
    { id: "blue", name: "Blue" },
    { id: "violet", name: "Violet" },
    { id: "purple", name: "Purple" },
    { id: "pink", name: "Pink" },
    { id: "brown", name: "Brown" },
    { id: "grey", name: "Grey" },
];

const StarCollection = () => {
    const starCollection = ls("stars");
    const data = starData.map((item) => ({
        ...item,
        won: starCollection.find((i) => item.id == i.id)?.number ?? 0,
    }));

    const rows = R.splitEvery(starsPerRow, data);
    const complete = starCollection.length === starData.length;

    useEffect(() => {}, []);

    return (
        <>
            {complete ? (
                <Header>You've won all the stars! Congratulations!</Header>
            ) : (
                <Header>
                    You have won {starCollection.length} out of{" "}
                    {starData.length} stars!
                </Header>
            )}
            <Grid style={{ marginTop: "10px" }}>
                {rows.map((row, i) => (
                    <Row columns={starsPerRow}>
                        {row.map((star) => (
                            <Column>
                                {star.won ? (
                                    <Icon
                                        color={star.id}
                                        name="star"
                                        size="huge"
                                    ></Icon>
                                ) : (
                                    <Icon
                                        color={star.id}
                                        name="star outline"
                                        size="huge"
                                    ></Icon>
                                )}
                            </Column>
                        ))}
                    </Row>
                ))}
            </Grid>
        </>
    );
};

export default StarCollection;
