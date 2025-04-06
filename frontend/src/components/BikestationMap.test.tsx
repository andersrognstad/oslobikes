import { beforeEach, describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { BikestationMap } from "./BikestationMap.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { mockServer } from "../setupTests.ts";
import { http, HttpResponse } from "msw";
import { Bikestation } from "../types/bikestation.ts";

let testQueryClient: QueryClient

const testStation = {
  id: "1",
  name: "Test Station",
  lat: 59.9139,
  lon: 10.7522,
  availableBikes: 5,
  availableLocks: 10,
  capacity: 15,
};
const otherTestStation = {
  id: "2",
  name: "Other station",
  lat: 58.9139,
  lon: 11.7522,
  availableBikes: 0,
  availableLocks: 5,
  capacity: 5,
};
const mockResponse: Bikestation[] = [
  testStation,
  otherTestStation,
]

const mockApiResponse = (response: HttpResponse) =>
  mockServer.use(
    http.get("*/api/stations", () => response)
  )

const renderBikestationMap = () => render(
  <QueryClientProvider client={testQueryClient}>
    <BikestationMap />
  </QueryClientProvider>
);

describe("BikestationMap", () => {
  beforeEach(() => {
    testQueryClient = new QueryClient(
      {
        defaultOptions: { queries: { retry: false } },
      }
    );
  });
  it("renders 'Noe gikk galt...' when loading bike stations fails", async () => {
    mockApiResponse(HttpResponse.text("error", { status: 500 }))
    renderBikestationMap()

    expect(screen.getByText("Laster...")).to.exist
    expect(await screen.findByText("Noe gikk galt...")).to.exist
  });

  it("renders 'Laster...' when loading bike stations", () => {
    mockApiResponse(HttpResponse.json(mockResponse))
    renderBikestationMap()

    expect(screen.getByText("Laster...")).to.exist
  });

  it("renders map with markers after loading bike stations", async () => {
    mockApiResponse(HttpResponse.json(mockResponse))
    renderBikestationMap()

    expect(await screen.findByRole("button", {name: "Zoom in"})).to.exist
    expect(await screen.findByRole("button", {name: "Zoom out"})).to.exist

    const markers = await screen.findAllByRole("button", { name: "Marker" });
    expect(markers.length).to.equal(mockResponse.length);
  });

  it("click on marker renders name and available bikes and locks", async () => {
    mockApiResponse(HttpResponse.json([testStation]))
    renderBikestationMap()

    const marker = await screen.findByRole("button", { name: "Marker" });
    fireEvent.click(marker);

    expect(screen.getByText(testStation.name)).to.exist;
    expect(screen.getByText(`Ledige sykler: ${testStation.availableBikes}`)).to.exist;
    expect(screen.getByText(`Ledige låser: ${testStation.availableLocks}`)).to.exist;
  });
})