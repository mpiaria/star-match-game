import React from "react";
import { NumberStatus } from "../types/enums";

type NumberButtonProps = {
	handleClick: (num: number, currentStatus: NumberStatus) => void;
	num: number;
	status: NumberStatus;
};

const NumberButton: React.FC<NumberButtonProps> = ({ handleClick, num, status }: NumberButtonProps): JSX.Element => (
	<button className="number" onClick={(_event: React.MouseEvent<HTMLButtonElement>): void => handleClick(num, status)} style={{ backgroundColor: status }}>
		{num}
	</button>
);

export default NumberButton;
