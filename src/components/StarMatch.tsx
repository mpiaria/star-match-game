import React, { useEffect, useState } from "react";
import "../styles/StarMatch.css";
import { GameStatus, NumberStatus, random, randomSumIn, range, sum } from "../utils/common";
import NumberButton from "./NumberButton";
import PlayAgain from "./PlayAgain";
import StarDisplay from "./StarDisplay";

type StarMatchProps = {
	startNewGame: () => void;
};

/**
 * The parent component for the entire Star Game.
 *
 * @returns parent JSX.Element
 */
const StarMatch: React.FC<StarMatchProps> = ({ startNewGame }: StarMatchProps): JSX.Element => {
	/** State variable representing the numbers available to be chosen */
	const [availableNumbers, setAvailableNumbers] = useState(range(1, 9));

	/** State variable representing chosen numbers that could be part of the correct answer */
	const [candidateNumbers, setCandidateNumbers] = useState([] as number[]);

	/** State variable representing the number of stars in the StarDisplay component */
	const [numberOfStars, setNumberOfStars] = useState(random(1, 9));

	/** State variable representing the number of seconds left on the timer */
	const [secondsRemaining, setSecondsRemaining] = useState(10);

	/**
	 * Runs every second decrementing the secondsRemaining by 1 each time until secondsRemaining equals zero or there are no availableNumbers.
	 */
	useEffect((): void | (() => void) => {
		if (secondsRemaining > 0 && availableNumbers.length > 0) {
			const timerId = setTimeout((): void => {
				setSecondsRemaining(secondsRemaining - 1);
			}, 1000);
			return (): void => clearTimeout(timerId);
		}
	}, [availableNumbers, secondsRemaining]);

	/**
	 * Removes the candidates from the availableNumbers state variable.
	 *
	 * @param candidates - an array of candidate numbers
	 * @returns a shallow copy of the availableNumbers state variable without numbers present in candidates
	 */
	const availableMinusCandidates = (candidates: number[]): number[] =>
		candidates ? availableNumbers.filter((availableNumber: number): boolean => !candidates.includes(availableNumber)) : [...availableNumbers];

	/**
	 * The game is finished when there are no available numbers or the timer has expired.
	 *
	 * @returns GameStatus.Won if there are no available numbers left.  GameStatus.Lost if the timer has expired.  GameStatus.InProgress otherwise.
	 */
	const calculateGameStatus = (): GameStatus => {
		let gameStatus: GameStatus;
		if (availableNumbers.length === 0) {
			gameStatus = GameStatus.Won;
		} else if (secondsRemaining === 0) {
			gameStatus = GameStatus.Lost;
		} else {
			gameStatus = GameStatus.InProgress;
		}
		return gameStatus;
	};

	/**
	 * Determines the new NumberStatus for the given num.
	 *
	 * @param num - the number to be evaluated
	 * @returns a NumberStatus based on the state variables and the value of num
	 */
	const calculateNumberStatus = (num: number): NumberStatus => {
		let status: NumberStatus;
		if (!availableNumbers.includes(num)) {
			status = NumberStatus.Used;
		} else if (candidateNumbers.includes(num)) {
			status = candidatesAreWrong() ? NumberStatus.Wrong : NumberStatus.Candidate;
		} else {
			status = NumberStatus.Available;
		}
		return status;
	};

	/**
	 * Determines whether or not the sum of candidateNumbers from the state variable equals the numberOfStars state variable.
	 *
	 * @returns true if the sum of candidateNumbers equals numberOfStars.  false otherwise.
	 */
	const candidatesAreWrong = (): boolean => sum(candidateNumbers) > numberOfStars;

	/**
	 * A function to be passed to the NumberButton component for its onClick property.  When a NumberButton is clicked, the NumberStatus changes.
	 * This function handles the state variables for situations such as the correct answer is reached or the NumberButton is not part of the solution.
	 *
	 * @param num - the number value of the NumberButton being clicked
	 * @param currentStatus - the status of that number
	 */
	const updateStateOfNumbers = (num: number, currentStatus: NumberStatus): void => {
		if (currentStatus === NumberStatus.Used || Number.isNaN(num) || calculateGameStatus() !== GameStatus.InProgress) {
			return;
		}
		const newCandidateNumbers =
			currentStatus === NumberStatus.Available ? candidateNumbers.concat(num) : candidateNumbers.filter((candidateNumber) => candidateNumber !== num);
		if (sum(newCandidateNumbers) === numberOfStars) {
			const newAvailableNums = availableMinusCandidates(newCandidateNumbers);
			setAvailableNumbers(newAvailableNums);
			setCandidateNumbers([]);
			setNumberOfStars(randomSumIn(newAvailableNums, 9));
		} else {
			setCandidateNumbers(newCandidateNumbers);
		}
	};

	return (
		<div className="game">
			<div className="help">Pick 1 or more numbers that sum to the number of stars</div>
			<div className="body">
				<div className="left">
					{calculateGameStatus() === GameStatus.InProgress ? (
						<StarDisplay numberOfStars={numberOfStars} />
					) : (
						<PlayAgain gameStatus={calculateGameStatus()} handleClick={startNewGame} />
					)}
				</div>
				<div className="right">
					{range(1, 9).map(
						(num: number): JSX.Element => (
							<NumberButton handleClick={updateStateOfNumbers} key={num} num={num} status={calculateNumberStatus(num)} />
						),
					)}
				</div>
			</div>
			<div className="timer">Time Remaining: {secondsRemaining}</div>
		</div>
	);
};

export default StarMatch;
