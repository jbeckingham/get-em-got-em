import WinningModal from "./WinningModal";
import React, { useState, useEffect } from "react";
import { Progress, Header, Grid, Button } from "semantic-ui-react";
import ls from "local-storage";
import Pokedex from "pokedex-promise-v2";
const P = new Pokedex();

const { Row, Column } = Grid;

const defaultCollectionType = "stars";
const puzzlesPerPage = 6;
const pagesPerPrize = 5;
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

const getNumbers = () =>
    [...Array(puzzlesPerPage)].map(() => ({
        no1: Math.floor(Math.random() * 13),
        no2: Math.floor(Math.random() * 13),
        correct: false,
        wrong: false,
    }));

const getNewNumbers = () => {
    const numbers = getNumbers();
    return isNoDuplicates(numbers) ? numbers : getNewNumbers();
};

const isNoDuplicates = (numbers) => {
    const answersSet = new Set(numbers.map((i) => i.no1 * i.no2));
    return answersSet.size === puzzlesPerPage;
};

const getJumlbedAnswers = (numbers) =>
    [...numbers]
        .map((line, i) => ({
            answer: line.no1 * line.no2,
            sumId: i,
            wrong: false,
        }))
        .sort(() => 0.5 - Math.random());

const MatchingGame = () => {
    const numbers = getNewNumbers();
    const [currentNumbers, setCurrentNumbers] = useState(numbers);
    const [jumbledAnswers, setJumbledAnswers] = useState(
        getJumlbedAnswers(numbers)
    );
    const [pagesComplete, setPagesComplete] = useState(0);
    const [winningModalOpen, setWinningModalOpen] = useState(false);
    const [selectedSum, setSelectedSum] = useState(null);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [prize, setPrize] = useState(null);
    const collectionType =
        ls("settings")?.collectionType ?? defaultCollectionType;

    const progress = (pagesComplete / pagesPerPrize) * 100;

    const onSumSelected = (e) => {
        const sumClicked = e.target.id;
        const newValue = selectedSum === sumClicked ? null : sumClicked;
        setSelectedSum(newValue);
        if (newValue && selectedAnswer) checkForMatch(newValue, selectedAnswer);
    };

    const getNewPokemon = () => {
        P.getPokemonByName(Math.floor(Math.random() * 151)).then((response) => {
            setPrize(response);
        });
    };

    const getNewStar = () => {
        const starPrize =
            starData[Math.floor(Math.random() * (starData.length - 1))];
        setPrize(starPrize);
    };

    const refreshNumbers = () => {
        const newNumbers = getNewNumbers();
        setCurrentNumbers(newNumbers);
        setJumbledAnswers(getJumlbedAnswers(newNumbers));
    };

    const onAnswerSelected = (e) => {
        const answerClicked = e.target.id;
        const newValue =
            selectedAnswer === answerClicked ? null : answerClicked;
        setSelectedAnswer(newValue);
        if (newValue && selectedSum) checkForMatch(selectedSum, newValue);
    };

    const checkForMatch = (sumIndex, answerIndex) => {
        const correct =
            parseInt(sumIndex) === parseInt(jumbledAnswers[answerIndex].sumId);
        if (correct) {
            onPuzzleCorrect(sumIndex);
        } else {
            onPairWrong(sumIndex, answerIndex);
        }
    };

    const onPairWrong = (sumIndex, answerIndex) => {
        setCurrentNumbers(
            currentNumbers.map((n, i) =>
                parseInt(sumIndex) === i ? { ...n, wrong: true } : n
            )
        );
        setJumbledAnswers(
            jumbledAnswers.map((n, i) =>
                parseInt(answerIndex) === i ? { ...n, wrong: true } : n
            )
        );
        setTimeout(() => {
            setSelectedSum(null);
            setSelectedAnswer(null);
            setJumbledAnswers(
                jumbledAnswers.map((n, i) => ({ ...n, wrong: false }))
            );
            setCurrentNumbers(
                currentNumbers.map((n, i) => ({ ...n, wrong: false }))
            );
        }, 300);
    };

    const onPrizeComplete = () => {
        setWinningModalOpen(true);
        addToCollection(collectionType);
    };

    const addToCollection = (collectionType) => {
        const collection = ls(collectionType) ?? [];
        console.log(prize);
        const exists = collection.find((item) => item.id == prize.id);
        if (exists) {
            const newCollection = collection.map((item) =>
                item.id == prize.id
                    ? { ...item, number: item.number + 1 }
                    : item
            );
            ls(collectionType, newCollection);
        } else {
            ls(collectionType, [...collection, { id: prize.id, number: 1 }]);
        }
    };

    const onPrizeAccepted = () => {
        setWinningModalOpen(false);
        setPagesComplete(0);
        refreshNumbers();
        getNewPrize();
    };

    const onPageComplete = () => {
        refreshNumbers();
        const completedPages = pagesComplete + 1;
        setPagesComplete(completedPages);
        if (completedPages === pagesPerPrize) onPrizeComplete();
    };
    const onPuzzleCorrect = (key) => {
        const newNumbers = currentNumbers.map((n, i) =>
            parseInt(key) === i ? { ...n, correct: true } : n
        );
        setCurrentNumbers(newNumbers);
        setSelectedSum(null);
        setSelectedAnswer(null);
        const numbersCorrect = newNumbers.filter((i) => i.correct);
        if (numbersCorrect.length === puzzlesPerPage) onPageComplete();
    };

    const getNewPrize = () => {
        if (collectionType === "pokemon") getNewPokemon();
        if (collectionType === "stars") getNewStar();
    };

    useEffect(() => getNewPrize(), []);

    return (
        <div className="puzzles">
            <Header>Get 'em, got 'em!</Header>
            <Progress
                percent={progress}
                color="blue"
                autoSuccess
                size="medium"
                style={{ width: "50%" }}
            />
            <WinningModal
                open={winningModalOpen}
                onPrizeAccepted={onPrizeAccepted}
                prize={prize}
                collectionType={collectionType}
            />
            <p>Match the times tables with their answer!</p>
            <Grid columns={2} style={{ height: "100px", minWidth: "400px" }}>
                {currentNumbers.map((config, i) => (
                    <Row columns={2} key={i} verticalAlign="middle">
                        <Column>
                            <Button
                                style={{ width: "125px" }}
                                color={
                                    config.wrong
                                        ? "red"
                                        : selectedSum == i
                                        ? "blue"
                                        : config.correct
                                        ? "green"
                                        : null
                                }
                                size="huge"
                                onClick={onSumSelected}
                                id={i}
                                disabled={config.correct ? true : false}
                            >
                                {config.no1} x {config.no2}
                            </Button>
                        </Column>
                        <Column>
                            <Button
                                style={{ width: "90px" }}
                                color={
                                    jumbledAnswers[i].wrong
                                        ? "red"
                                        : selectedAnswer == i
                                        ? "blue"
                                        : currentNumbers[
                                              jumbledAnswers[i].sumId
                                          ].correct
                                        ? "green"
                                        : null
                                }
                                size="huge"
                                onClick={onAnswerSelected}
                                id={i}
                                disabled={
                                    currentNumbers[jumbledAnswers[i].sumId]
                                        .correct
                                        ? true
                                        : false
                                }
                            >
                                {jumbledAnswers[i].answer}
                            </Button>
                        </Column>
                    </Row>
                ))}
            </Grid>
        </div>
    );
};

export default MatchingGame;
