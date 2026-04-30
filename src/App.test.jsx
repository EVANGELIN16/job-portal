
import { render, screen } from "@testing-library/react";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";

test("renders login page initially", () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );

 expect(
    screen.getByRole("button", { name: /login/i })
  ).toBeInTheDocument();});