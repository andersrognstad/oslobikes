import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import App from "./App.tsx";

describe("App", () => {
  it("renders headers", () => {
    render(<App />);
    expect(screen.getByRole("heading", { name: "Oslo bysykkel-stasjoner" })).to.exist
    expect(screen.getByRole("heading", { name: "Klikk på markørene for å se status på ledige låser og sykler" })).to.exist
  })
})
