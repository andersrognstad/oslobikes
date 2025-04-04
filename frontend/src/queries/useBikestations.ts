import { useQuery } from "@tanstack/react-query";
import { Bikestation } from "../types/bikestation.ts";
import axios from "axios";

const getBikestations = async (): Promise<Bikestation[]> => {
  try {
    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";
    const response = await axios.get(`${apiBaseUrl}/api/stations`);
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch bikestations");
  }
}

export const useBikestations = () => {
  return useQuery<Bikestation[]>({
    queryKey: ["bikestations"],
    queryFn: getBikestations
  })
}