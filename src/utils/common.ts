export const enum GameStatus {
	InProgress,
	Lost,
	Won,
}

export const enum NumberStatus {
	Available = "lightgray",
	Used = "lightgreen",
	Wrong = "lightcoral",
	Candidate = "deepskyblue",
}

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
