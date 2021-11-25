import { render, screen, cleanup } from "@testing-library/react";
import renderer from "react-test-renderer";
import "@testing-library/jest-dom";
import TodoForm from "../TodoForm";
import { test } from "@jest/globals";

afterEach(() => {
  cleanup();
});

test("should render non-completed TodoForm component ", () => {
  const todo = { id: 1, title: "send status email", completed: false };

  render(<TodoForm todo={todo} />);
  const todoElement = screen.getByTestId("todo-1");
  expect(todoElement).toBeInTheDocument();
  expect(todoElement).toHaveTextContent("send status email");
});

test("should render completed TodoForm component ", () => {
  const todo = { id: 2, title: "enter timesheet", completed: true };

  render(<TodoForm todo={todo} />);
  const todoElement = screen.getByTestId("todo-2");
  expect(todoElement).toBeInTheDocument();
  expect(todoElement).toHaveTextContent("enter timesheet");
});

test("matches snapshot", () => {
  const todo = { id: 1, title: "send status email", completed: false };
  const tree = renderer.create(<TodoForm todo={todo} />).toJSON();
  expect(tree).toMatchSnapshot();
});

test("matches snapshot1", () => {
  const todo = { id: 2, title: "enter timesheet", completed: true };
  const tree = renderer.create(<TodoForm todo={todo} />).toJSON();
  expect(tree).toMatchSnapshot();
});
