import TypingPuzzle from "./Puzzle.js";
import WinningModal from "./WinningModal";
import React, { useState } from "react";
import { Progress, Transition, Header } from "semantic-ui-react";

const puzzlesPerPage = 4;
const pagesPerPrize = 5;

const getNumbers = () =>
    [...Array(puzzlesPerPage)].map((n) => [
        Math.floor(Math.random() * 13),
        Math.floor(Math.random() * 13),
        false,
    ]);

const Puzzles = () => {
    const [currentNumbers, setCurrentNumbers] = useState(getNumbers());
    const [pagesComplete, setPagesComplete] = useState(0);
    const [puzzlesComplete, setPuzzlesComplete] = useState(0);
    const [winningModalOpen, setWinningModalOpen] = useState(false);

    const progress = (pagesComplete / pagesPerPrize) * 100;

    const onPrizeComplete = () => {
        setWinningModalOpen(true);
    };

    const onPrizeAccepted = () => {
        setWinningModalOpen(false);
        setPagesComplete(0);
        setCurrentNumbers(getNumbers());
    };

    const onPageComplete = () => {
        setCurrentNumbers(null);

        setTimeout(setCurrentNumbers(getNumbers()), 50000);

        setPuzzlesComplete(0);
        const completedPages = pagesComplete + 1;
        setPagesComplete(completedPages);
        if (completedPages === pagesPerPrize) onPrizeComplete();
    };
    const onPuzzleCorrect = (key) => {
        const numberPuzzlesComplete = puzzlesComplete + 1;
        setCurrentNumbers(
            currentNumbers.map((n, i) => (key === i ? [n[0], n[1], true] : n))
        );
        setPuzzlesComplete(numberPuzzlesComplete);
        if (numberPuzzlesComplete === puzzlesPerPage) onPageComplete();
    };

    const PuzzleDiv = () =>
        currentNumbers.map((config, i) => (
            <TypingPuzzle
                config={config}
                onPuzzleCorrect={onPuzzleCorrect}
                i={i}
                key={i}
            ></TypingPuzzle>
        ));

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
                setOpen={setWinningModalOpen}
                onPrizeAccepted={onPrizeAccepted}
            />
            <Transition animation="bounce" duration={1200}>
                {currentNumbers && <PuzzleDiv />}
            </Transition>
        </div>
    );
};

export default Puzzles;
