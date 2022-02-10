import React from "react";
import "../styles/StarMatch.css";
import { GameStatus } from "../types/enums";
import { gameStatus, numberStatus, range } from "../utils/common";
import { useGameState } from "../utils/hooks";
import NumberButton from "./NumberButton";
import PlayAgain from "./PlayAgain";
import StarDisplay from "./StarDisplay";

type StarMatchProps = {
	startNewGame: () => void;
};

/**
 * The component responsible for maintaining the game state.
 *
 * @returns the component representing the entire game
 */
const StarMatch: React.FC<StarMatchProps> = ({ startNewGame }: StarMatchProps): JSX.Element => {
	const { availableNumbers, candidateNumbers, numberOfStars, secondsRemaining, setGameState } = useGameState();

	return (
		<div className="game">
			<div className="help">Pick 1 or more numbers that sum to the number of stars</div>
			<div className="body">
				<div className="left">
					{gameStatus(availableNumbers, secondsRemaining) === GameStatus.InProgress ? (
						<StarDisplay numberOfStars={numberOfStars} />
					) : (
						<PlayAgain gameStatus={gameStatus(availableNumbers, secondsRemaining)} handleClick={startNewGame} />
					)}
				</div>
				<div className="right">
					{range(1, 9).map(
						(num: number): JSX.Element => (
							<NumberButton handleClick={setGameState} key={num} num={num} status={numberStatus(availableNumbers, candidateNumbers, numberOfStars, num)} />
						),
					)}
				</div>
			</div>
			<div className="timer">Time Remaining: {secondsRemaining}</div>
		</div>
	);
};

export default StarMatch;
