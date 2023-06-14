import { render, screen } from "@testing-library/react";

import Home from "@/src/pages/index";

import "@testing-library/jest-dom";

describe("Home", () => {
  beforeAll(() => {
    window.matchMedia = jest.fn().mockImplementation((query) => {
      return {
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
      };
    });
  });

  it("renders a heading", () => {
    render(<Home />);

    const heading = screen.getByRole("heading", {
      name: /Metaverse Markup Language/,
    });

    expect(heading).toBeInTheDocument();
  });
});
