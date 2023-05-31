import axios from "axios";

/*const instance = axios.create({
  baseURL: process.env.DATABASE_URL, // URL do banco ElephantSQL
  headers: {
    "X-Api-Key": process.env.API_KEY, // API Key do ElephantSQL
  },
});*/

const instance = axios.create({
  baseURL: 'https://worldsgeekbackend-production.up.railway.app', // URL do serviço web do Railway
});

export const getUsers = () =>
  instance
    .get("/user")
    .then((res) => {
      console.log("MeusDados:", res.data);
      return res.data;
    });

export const createUser = ({ username, email, password }) =>
  instance.post("/user", {
    username,
    email,
    password,
});
