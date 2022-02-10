import React, { useState } from "react";
import StarMatch from "./StarMatch";

/**
 * Parent JSX.Element of the entire Star Match Game.  To reset the game, increment the key by 1.
 *
 * @returns the parent JSX.Element
 */
const Game: React.FC = (): JSX.Element => {
	const [gameId, setGameId] = useState(1);
	return <StarMatch key={gameId} startNewGame={(): void => setGameId(gameId + 1)} />;
};

export default Game;
