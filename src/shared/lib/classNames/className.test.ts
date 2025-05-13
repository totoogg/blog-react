import { classNames } from "./classNames";

describe("classNames", () => {
  test("with only first param", () => {
    expect(classNames("someClass")).toBe("someClass");
  });

  test("with additional class", () => {
    expect(classNames("someClass", {}, ["class1", "class2"])).toBe(
      "someClass class1 class2"
    );
  });

  test("with mods", () => {
    expect(classNames("someClass", { hover: true }, ["class1", "class2"])).toBe(
      "someClass class1 class2 hover"
    );
  });

  test("with mods false", () => {
    expect(
      classNames("someClass", { hover: false }, ["class1", "class2"])
    ).toBe("someClass class1 class2");
  });

  test("with mods undefined", () => {
    expect(
      classNames("someClass", { hover: undefined }, ["class1", "class2"])
    ).toBe("someClass class1 class2");
  });
});
