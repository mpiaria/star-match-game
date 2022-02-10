import React from "react";
import { NumberStatus } from "../types/enums";

type NumberButtonProps = {
	handleClick: (num: number, currentStatus: NumberStatus) => void;
	num: number;
	status: NumberStatus;
};

/**
 * JSX.Element to represent a button with a number on it.  Each NumberButton updates the game state, which renders the buttons in different colors.
 * Correct choices, possible candidates, incorrect choices, and unused buttons all have different colors.
 *
 * @param props - instance of NumberButtonProps
 * @returns the NumberButton component
 */
const NumberButton: React.FC<NumberButtonProps> = ({ handleClick, num, status }: NumberButtonProps): JSX.Element => (
	<button className="number" onClick={(_event: React.MouseEvent<HTMLButtonElement>): void => handleClick(num, status)} style={{ backgroundColor: status }}>
		{num}
	</button>
);

export default NumberButton;
