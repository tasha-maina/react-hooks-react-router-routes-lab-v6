import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import routes from "../routes";
import { vi, beforeEach } from "vitest";

beforeEach(() => {
  global.fetch = vi.fn(() =>
    Promise.resolve({
      ok: true,
      json: () =>
        Promise.resolve({
          id: 1,
          title: "Doctor Strange",
          time: 115,
          genres: ["Action", "Adventure", "Fantasy"],
        }),
    })
  );
});

const id = 1;
const router = createMemoryRouter(routes, {
  initialEntries: [`/movies/${id}`],
  initialIndex: 0,
});

test("renders without any errors", () => {
  const errorSpy = vi.spyOn(global.console, "error");

  render(<RouterProvider router={router} />);

  expect(errorSpy).not.toHaveBeenCalled();
  errorSpy.mockRestore();
});

test("renders movie's title in an h1", async () => {
  render(<RouterProvider router={router} />);
  const h1 = await screen.findByText(/Doctor Strange/);
  expect(h1).toBeInTheDocument();
  expect(h1.tagName).toBe("H1");
});

test("renders movie's time within a p tag", async () => {
  render(<RouterProvider router={router} />);
  const p = await screen.findByText(/115/);
  expect(p).toBeInTheDocument();
  expect(p.tagName).toBe("P");
});

test("renders a span for each genre", async () => {
  render(<RouterProvider router={router} />);
  const genres = ["Action", "Adventure", "Fantasy"];
  for (const genre of genres) {
    const span = await screen.findByText(genre);
    expect(span).toBeInTheDocument();
    expect(span.tagName).toBe("SPAN");
  }
});

test("renders the <NavBar /> component", async () => {
  render(<RouterProvider router={router} />);
  expect(await screen.findByRole("navigation")).toBeInTheDocument();
});
