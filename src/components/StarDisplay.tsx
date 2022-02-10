import React from "react";
import { range } from "../utils/common";

type StarDisplayProps = {
	numberOfStars: number;
};

/**
 * A JSX.Element used to represent a star on the left side of the game.
 *
 * @param props - an instance of StarDisplayProps
 * @returns the StarDisplay component
 */
const StarDisplay: React.FC<StarDisplayProps> = ({ numberOfStars }: StarDisplayProps): JSX.Element => {
	return (
		<>
			{range(1, numberOfStars).map(
				(starId: number): JSX.Element => (
					<div key={starId} className="star" />
				),
			)}
		</>
	);
};

export default StarDisplay;
