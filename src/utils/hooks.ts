import { useEffect, useState } from "react";
import { GameStatus, NumberStatus } from "../types/enums";
import { gameStatus, random, randomSumIn, range, sum } from "./common";

export type GameState = {
	availableNumbers: number[];
	candidateNumbers: number[];
	numberOfStars: number;
	secondsRemaining: number;
	setGameState: (num: number, currentStatus: NumberStatus) => void;
};

export const useGameState = (): GameState => {
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
	 * A function to be passed to the NumberButton component for its onClick property.  When a NumberButton is clicked, the NumberStatus changes.
	 * This function handles the state variables for situations such as the correct answer is reached or the NumberButton is not part of the solution.
	 *
	 * @param num - the number value of the NumberButton being clicked
	 * @param currentStatus - the status of that number
	 */
	const setGameState = (num: number, currentStatus: NumberStatus): void => {
		if (currentStatus === NumberStatus.Used || Number.isNaN(num) || gameStatus(availableNumbers, secondsRemaining) !== GameStatus.InProgress) {
			return;
		}
		const newCandidateNumbers =
			currentStatus === NumberStatus.Available ? candidateNumbers.concat(num) : candidateNumbers.filter((candidateNumber) => candidateNumber !== num);
		if (sum(newCandidateNumbers) === numberOfStars) {
			const newAvailableNumbers = availableNumbers.filter((availableNumber: number): boolean => !newCandidateNumbers.includes(availableNumber));
			setAvailableNumbers(newAvailableNumbers);
			setCandidateNumbers([]);
			setNumberOfStars(randomSumIn(newAvailableNumbers, 9));
		} else {
			setCandidateNumbers(newCandidateNumbers);
		}
	};

	return { availableNumbers, candidateNumbers, numberOfStars, secondsRemaining, setGameState };
};
