import React from "react";
import { GameStatus } from "../types/enums";

type PlayAgainProps = {
	gameStatus: GameStatus;
	handleClick: () => void;
};

/**
 * A JSX.Element to represent the Play Again button.  When clicked, it resets the game state.
 *
 * @param props - an instance of PlayAgainProps
 * @returns the PlayAgain component
 */
const PlayAgain: React.FC<PlayAgainProps> = ({ gameStatus, handleClick }: PlayAgainProps): JSX.Element => (
	<div className="game-done">
		<div className="message" style={{ color: gameStatus === GameStatus.Lost ? "red" : "green" }}>
			{gameStatus === GameStatus.Lost ? "Game Over" : "Nice"}
		</div>
		<button onClick={handleClick}>Play Again</button>
	</div>
);

export default PlayAgain;
