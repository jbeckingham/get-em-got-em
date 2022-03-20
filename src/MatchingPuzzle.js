import { Input, Form, Header, Grid } from "semantic-ui-react";
import React, { useState, useEffect } from "react";

const { Row, Column } = Grid;

const MatchingPuzzle = ({ config, onPuzzleCorrect, i }) => {
    let [number1, number2, correct] = config;
    const correctAnswer = number1 * number2;

    const onChange = (event) => {
        const submittedAnswer = parseInt(event.target.value);
        if (submittedAnswer === correctAnswer) {
            event.target.value = "";
            onPuzzleCorrect(i);
        }
    };

    return (
        <div className="puzzle">
            <Grid columns={2} style={{ height: "100px", minWidth: "400px" }}>
                <Row verticalAlign="middle">
                    <Column width="8">
                        <Header size="small">
                            {number1} x {number2} ={" "}
                        </Header>
                    </Column>
                    <Column width="4">
                        {correct ? (
                            <Header size="small" style={{ color: "green" }}>
                                {correctAnswer}
                            </Header>
                        ) : (
                            <Input
                                size="small"
                                onChange={onChange}
                                style={{ height: "45px", width: "150px" }}
                            ></Input>
                        )}
                    </Column>
                </Row>
            </Grid>
        </div>
    );
};

export default MatchingPuzzle;
