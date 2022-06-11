import { afterEach, describe, expect, it } from "vitest";
import { User } from ".";
import "../../test/mock";

describe("User class", () => {
  afterEach(() => {
    localStorage.clear();
  });

  it("should get its data from localStorage", () => {
    const username = "test";
    const user = new User(username);

    localStorage.setItem("todos" + username, JSON.stringify(["test"]));
    expect(user.todos).toStrictEqual(["test"]);
  });

  it("should write its data to localstorage", () => {
    const username = "test";
    const user = new User(username);

    user.todos = ["test"];
    expect(localStorage.getItem("todos" + username)).toStrictEqual(
      JSON.stringify(["test"])
    );
  });

  it("should write data then get the same data back", () => {
    const username = "test";
    const user = new User(username);

    user.todos = ["test"];
    expect(user.todos).toStrictEqual(["test"]);
  });

  it("should add a new todo to empty todos", () => {
    const username = "test";
    const user = new User(username);
    user.addTodo({ description: "test", isDone: false });

    expect(user.todos).toStrictEqual([
      { description: "test", isDone: false, id: 0 },
    ]);

    expect(user.lastId).toBe(0);
  });

  it("should add a new todo to existing todos", () => {
    const username = "test";
    const user = new User(username);
    user.addTodo({ description: "test", isDone: false, date: "10-10-2021" });
    user.addTodo({ description: "test2", isDone: false, date: "10-10-2021" });

    expect(user.todos).toStrictEqual([
      { description: "test", isDone: false, id: 0, date: "10-10-2021" },
      { description: "test2", isDone: false, id: 1, date: "10-10-2021" },
    ]);

    expect(user.lastId).toBe(1);
  });

  it("should add a todo then remove it", () => {
    const username = "test";
    const user = new User(username);
    user.addTodo({ description: "test", isDone: false, date: "10-10-2021" });
    user.removeTodo(0);

    expect(user.todos).toStrictEqual([]);
  });

  it("should categorize todos", () => {
    const username = "test";
    const user = new User(username);
    user.addTodo({ description: "test", isDone: false, date: "10-10-2021" });
    user.addTodo({ description: "test2", isDone: false, date: "10-10-2021" });
    user.addTodo({ description: "test3", isDone: false, date: "10-12-2021" });

    expect(user.categorizedTodos).toStrictEqual({
      "10-10-2021": [
        { description: "test", isDone: false, id: 0, date: "10-10-2021" },
        { description: "test2", isDone: false, id: 1, date: "10-10-2021" },
      ],
      "10-12-2021": [
        { description: "test3", isDone: false, id: 2, date: "10-12-2021" },
      ],
    });
  });
});
