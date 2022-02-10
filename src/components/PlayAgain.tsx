import React from "react";
import { GameStatus } from "../types/enums";

type PlayAgainProps = {
	gameStatus: GameStatus;
	handleClick: () => void;
};

const PlayAgain: React.FC<PlayAgainProps> = ({ gameStatus, handleClick }: PlayAgainProps): JSX.Element => (
	<div className="game-done">
		<div className="message" style={{ color: gameStatus === GameStatus.Lost ? "red" : "green" }}>
			{gameStatus === GameStatus.Lost ? "Game Over" : "Nice"}
		</div>
		<button onClick={handleClick}>Play Again</button>
	</div>
);

export default PlayAgain;
