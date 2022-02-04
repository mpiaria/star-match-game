import { render, screen } from "@testing-library/react";
import StarGame from "../components/StarGame";

test("renders learn react link", () => {
	render(<StarGame />);
	const pickOneOrMore = screen.getByText("Pick 1 or more numbers that sum to the number of stars");
	const timeRemaining = screen.getByText("Time Remaining: 10");
	expect(timeRemaining).toBeInTheDocument();
	expect(pickOneOrMore).toBeInTheDocument();
});
