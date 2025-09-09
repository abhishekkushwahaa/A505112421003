import axios from "axios";

const BASE_URL = "http://localhost:8080";

export const createShortURL = (data: {
  url: string;
  validity: number;
  shortcode?: string;
}) => axios.post(`${BASE_URL}/shorturls`, data);

export const getShortURLStats = async (shortcode: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/shorturls/${shortcode}`);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      return { error: error.response.data.error || "Unknown error" };
    }
    return { error: "Network error" };
  }
};
