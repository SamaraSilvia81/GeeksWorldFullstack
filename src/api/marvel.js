import axios from "axios";

const instance = axios.create({
  baseURL: "https://parseapi.back4app.com/classes",
  headers: {
    "X-Parse-Application-Id": "gzRhZWVb8EIzxhyvj9ixjrBjv5hYqcEpZ2HqOJYA",
    "X-Parse-REST-API-Key": "CX4W388OoKPBOC60wvWAwWRLg5RFyr3HiPnaKLkF",
  },
});

export const getHeroes = () =>
  instance
    .get("Marvel", {
      params: {
        keys: ["name", "image"]
      },
    })
    .then((res) => {
      console.log("MeusDados:", res.data);
      return res.data.results;
});
