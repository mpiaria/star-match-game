import React, { useState } from "react";
import "../styles/StarGame.css";
import { NumberStatus, random, randomSumIn, range, sum } from "../utils/common";
import NumberButton from "./NumberButton";
import StarDisplay from "./StarDisplay";

const StarGame: React.FC = (): JSX.Element => {
	const [availableNumbers, setAvailableNumbers] = useState(range(1, 9));
	const [candidateNumbers, setCandidateNumbers] = useState(new Array<number>());
	const [numberOfStars, setNumberOfStars] = useState(random(1, 9));

	const availableMinusCandidates = (candidates: number[]): number[] => availableNumbers.filter((availableNumber) => !candidates?.includes(availableNumber));

	const candidatesAreWrong = (): boolean => sum(candidateNumbers) > numberOfStars;

	const handleNumberClick = (num: number, currentStatus: NumberStatus): void => {
		if (currentStatus !== NumberStatus.Used) {
			const newCandidateNumbers = candidateNumbers.concat(num);
			if (sum(newCandidateNumbers) === numberOfStars) {
				const newAvailableNums = availableMinusCandidates(newCandidateNumbers);
				setAvailableNumbers(newAvailableNums);
				setCandidateNumbers([]);
				setNumberOfStars(randomSumIn(newAvailableNums, 9));
			} else {
				setCandidateNumbers(newCandidateNumbers);
			}
		}
	};

	const calculateNumberStatus = (num: number): NumberStatus => {
		let status: NumberStatus;
		if (!availableNumbers?.includes(num)) {
			status = NumberStatus.Used;
		} else if (candidateNumbers?.includes(num)) {
			status = candidatesAreWrong() ? NumberStatus.Wrong : NumberStatus.Candidate;
		} else {
			status = NumberStatus.Available;
		}
		return status;
	};

	return (
		<div className="game">
			<div className="help">Pick 1 or more numbers that sum to the number of stars</div>
			<div className="body">
				<div className="left">
					<StarDisplay numberOfStars={numberOfStars} />
				</div>
				<div className="right">
					{range(1, 9).map(
						(num: number): JSX.Element => (
							<NumberButton handleClick={handleNumberClick} key={num} num={num} status={calculateNumberStatus(num)} />
						),
					)}
				</div>
			</div>
			<div className="timer">Time Remaining: 10</div>
		</div>
	);
};

export default StarGame;
