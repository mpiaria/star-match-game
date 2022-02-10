import { GameStatus, NumberStatus } from "../types/enums";

/**
 * The game is finished when there are no available numbers or the timer has expired.
 *
 * @returns GameStatus.Won if there are no available numbers left.  GameStatus.Lost if the timer has expired.  GameStatus.InProgress otherwise.
 */
export const gameStatus = (availableNumbers: number[], secondsRemaining: number): GameStatus => {
	let status: GameStatus;
	if (!availableNumbers || availableNumbers.length === 0) {
		status = GameStatus.Won;
	} else if (Number.isNaN(secondsRemaining) || secondsRemaining === 0) {
		status = GameStatus.Lost;
	} else {
		status = GameStatus.InProgress;
	}
	return status;
};

/**
 * Determines the new NumberStatus for the given num.
 *
 * @param num - the number to be evaluated
 * @returns
 * <ul>
 *   <li>Used: if not in availableNumbers</li>
 *   <li>Candidate: if included in candidateNumbers and their sum is less than or equal to numberOfStars</li>
 *   <li>Wrong: if included in candidateNumbers and their sum is greater than numberOfStars</li>
 *   <li>Available: otherwise</li>
 * </ul>
 */
export const numberStatus = (availableNumbers: number[], candidateNumbers: number[], numberOfStars: number, num: number): NumberStatus => {
	let status: NumberStatus;
	if (!availableNumbers || !availableNumbers.includes(num)) {
		status = NumberStatus.Used;
	} else if (candidateNumbers && candidateNumbers.includes(num)) {
		status = sum(candidateNumbers) <= numberOfStars ? NumberStatus.Candidate : NumberStatus.Wrong;
	} else {
		status = NumberStatus.Available;
	}
	return status;
};

/**
 * Pick a random number between min and max with the edges included.
 *
 * @param min - the minimum value of the random number
 * @param max - the maximum value of the random number
 * @returns a random number between min and max with the edges included
 */
export const random = (min: number, max: number): number => (min || 0) + Math.floor(Math.random() * ((max || 0) - (min || 0) + 1));

/**
 * Give an array of numbers and a max value, pick a random sum that is less than max from the set of all available sums in numbers.
 *
 * @param numbers - an arry of numbers
 * @param max - the maximum value of the sum
 * @returns a random sum from the set of all available sums in numbers
 */
export const randomSumIn = (numbers: number[], max: number): number => {
	const sets: number[][] = [[]];
	const sums: number[] = [];
	for (let i = 0; i < numbers.length; i++) {
		for (let j = 0, len = sets.length; j < len; j++) {
			const candidateSet = sets[j].concat(numbers[i]);
			const candidateSum = sum(candidateSet);
			if (candidateSum <= max) {
				sets.push(candidateSet);
				sums.push(candidateSum);
			}
		}
	}
	return sums[random(0, sums.length - 1)];
};

/**
 * Create an array of numbers between min and max with the edges included.
 *
 * @param min - the minimum value of the range of numbers
 * @param max - the maximum value of the range of numbers
 * @returns an array of numbers between min and max with the edges included
 */
export const range = (min: number, max: number): number[] => {
	let numbers: number[];
	if (max >= min) {
		numbers = Array.from({ length: max - min + 1 }, (_element: number, index: number): number => min + index);
	} else {
		numbers = [];
	}
	return numbers;
};

/**
 * The sum of the numbers in numbers.
 *
 * @param numbers - the numbers to add together
 * @returns the sum of the numbers in numbers
 */
export const sum = (numbers: number[]): number => numbers?.reduce((previous: number, current: number): number => (previous || 0) + (current || 0), 0) || 0;
