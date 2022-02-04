import React, { useState } from "react";
import "../styles/StarMatch.css";
import { Color, random, range, sum } from "../utils/common";
import NumberButton from "./NumberButton";
import StarDisplay from "./StarDisplay";

const StarGame: React.FC = (): JSX.Element => {
	const [availableNumbers, setAvailableNumbers] = useState(range(1, 9));
	const [candidateNumbers, setCandidateNumbers] = useState(new Array<number>());
	const [numberOfStars, setNumberOfStars] = useState(random(1, 9));

	const candidatesAreWrong = (candidates: Array<number>): boolean => sum(candidates) > numberOfStars;

	const numberStatus = (num: number): Color => {
		let status: Color;
		if (!availableNumbers?.includes(num)) {
			status = Color.Used;
		} else if (candidateNumbers?.includes(num)) {
			status = candidatesAreWrong(candidateNumbers) ? Color.Wrong : Color.Candidate;
		} else {
			status = Color.Available;
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
							<NumberButton key={num} num={num} status={numberStatus(num)} />
						),
					)}
				</div>
			</div>
			<div className="timer">Time Remaining: 10</div>
		</div>
	);
};

export default StarGame;
