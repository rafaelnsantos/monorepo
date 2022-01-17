import { screen, render } from "@testing-library/react";
import Page from "../pages/index";

describe("Landing page", () => {
  it("should render", async () => {
    render(<Page />);

    expect(screen.getByText("Web")).toBeInTheDocument();
  });
});
