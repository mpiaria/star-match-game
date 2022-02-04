import React from "react";
import { range } from "../utils/common";

type StarDisplayProps = {
	numberOfStars: number;
};

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
