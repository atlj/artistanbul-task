import { describe, expect, it } from "vitest";
import { sortDates } from "./utils";

describe("Main screen utils", () => {
  it("should sort dates", () => {
    const dates = ["2020-01-01", "2021-02-03", "2020-01-02", "2020-02-02"];
    expect(sortDates(dates)).toStrictEqual([
      "2021-02-03",
      "2020-02-02",
      "2020-01-02",
      "2020-01-01",
    ]);
  });
});
