import { render, screen } from "@testing-library/react";
import Game from "../components/Game";

test("renders learn react link", () => {
	render(<Game />);
	const pickOneOrMore = screen.getByText("Pick 1 or more numbers that sum to the number of stars");
	const timeRemaining = screen.getByText("Time Remaining: 10");
	expect(timeRemaining).toBeInTheDocument();
	expect(pickOneOrMore).toBeInTheDocument();
});
