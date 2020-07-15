import fetch from "isomorphic-fetch";
import { API } from "../config";

export const userPublicProfile = (username) => {
  return fetch(`${API}/user/${username}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
    },
    body: blog,
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};
