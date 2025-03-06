import { render, screen, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import Wishlist from "./Wishlist";
import { BrowserRouter } from "react-router-dom";

// Mock localStorage
beforeEach(() => {
  vi.spyOn(Storage.prototype, "getItem");
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe("Wishlist Component", () => {
  test("renders Wishlist component correctly", () => {
    render(
      <BrowserRouter>
        <Wishlist />
      </BrowserRouter>
    );
    expect(screen.getByText("MY WISHLIST")).toBeInTheDocument();
  });

  test("displays message when wishlist is empty", () => {
    Storage.prototype.getItem.mockReturnValueOnce(null);
    render(
      <BrowserRouter>
        <Wishlist />
      </BrowserRouter>
    );
    expect(screen.getByText("Add something to your Wishlist")).toBeInTheDocument();
  });

})
