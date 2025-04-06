require("dotenv").config();
const express = require("express");
const path = require("path");
const axios = require("axios");
const cors = require("cors");

const app = express();

const PORT = 5000;
const BYSYKKEL_API_BASE_URL = "https://gbfs.urbansharing.com/oslobysykkel.no";
const CLIENT_ID = "andersrognstad-oslobikes"

app.use(cors());

async function fetchBysykkelData(url) {
    return axios.get(url, { headers: { "Client-Identifier": CLIENT_ID } });
}

app.get("/api/stations", async (req, res) => {
    try {
        const [stationInfoList, stationStatusList] = await Promise.all([
            fetchBysykkelData(`${BYSYKKEL_API_BASE_URL}/station_information.json`),
            fetchBysykkelData(`${BYSYKKEL_API_BASE_URL}/station_status.json`),
        ]);

        const stations = []
        stationInfoList.data.data.stations.forEach((station) => {
            const status = stationStatusList.data.data.stations.find((s) => s.station_id === station.station_id);
            if (status) {
                stations.push({
                    id: station.station_id,
                    name: station.name,
                    lat: station.lat,
                    lon: station.lon,
                    capacity: station.capacity,
                    availableBikes: status.num_bikes_available,
                    availableLocks: status.num_docks_available,
                })
            } else {
                console.warn(`No status found for station ${station.station_id}`);
            }
        })

        res.json(stations);
    } catch (error) {
        console.error("Error fetching data", error);
        res.status(500).json({ error: "Failed to fetch station data" });
    }
});

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.use(express.static(path.join(__dirname, "public")));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
