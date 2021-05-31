import axios from "axios";

export const app = axios.create({
  baseURL: `https://api.github.com/users`,
  headers: {
    Authorization: "Iv1.9f64d545f8656a28",
  },
});
