import React from "react";
import { Color } from "../utils/common";

type NumberButtonProps = {
	num: number;
	status: Color;
};

const NumberButton: React.FC<NumberButtonProps> = ({ num, status }: NumberButtonProps): JSX.Element => (
	<button className="number" onClick={(event: React.MouseEvent<HTMLButtonElement>): void => console.log("event:", event)} style={{ backgroundColor: status }}>
		{num}
	</button>
);

export default NumberButton;
