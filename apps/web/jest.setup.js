import("test/jest.setup");

jest.mock("next/dist/client/router", () => require("next-router-mock"));
