import { addTodo, deleteTodoById } from "./utils";
import { describe, expect, it } from "vitest";

describe("User utilities", () => {
  it("should add a new todo to empty todos", () => {
    expect(
      addTodo([], {
        description: "test",
        isDone: false,
        id: 0,
        date: "2020-01-01",
      })
    ).toStrictEqual([
      { description: "test", isDone: false, id: 0, date: "2020-01-01" },
    ]);
  });

  it("should add a new todo to existing todos", () => {
    expect(
      addTodo(
        [{ description: "test", isDone: false, id: 0, date: "2020-01-01" }],
        {
          description: "test2",
          isDone: false,
          id: 1,
          date: "2020-01-01",
        }
      )
    ).toStrictEqual([
      {
        description: "test",
        isDone: false,
        id: 0,
        date: "2020-01-01",
      },
      {
        description: "test2",
        isDone: false,
        id: 1,
        date: "2020-01-01",
      },
    ]);
  });

  it("should add 2 todos then remove one of it", () => {
    expect(
      deleteTodoById(
        [
          {
            description: "test",
            isDone: false,
            id: 0,
            date: "2020-01-01",
          },
          {
            description: "test2",
            isDone: false,
            id: 1,
            date: "2020-01-01",
          },
        ],
        0
      )
    ).toStrictEqual([
      {
        description: "test2",
        isDone: false,
        id: 1,
        date: "2020-01-01",
      },
    ]);
  });
});
