import { render, screen } from "@testing-library/react";
import Login from "./Login";
import { BrowserRouter } from "react-router-dom";

test("renders login button", () => {
  render(
    <BrowserRouter>
      <Login setUser={() => {}} />
    </BrowserRouter>
  );

//   expect(screen.getByText(/login/i)).toBeInTheDocument();
  expect(
    screen.getByRole("button", { name: /login/i })
  ).toBeInTheDocument();
});