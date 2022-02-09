import React, { useState } from "react";
import StarMatch from "./StarMatch";

const Game: React.FC = (): JSX.Element => {
	const [gameId, setGameId] = useState(1);
	return <StarMatch key={gameId} startNewGame={(): void => setGameId(gameId + 1)} />;
};

export default Game;
