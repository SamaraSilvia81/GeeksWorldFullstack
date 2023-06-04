import axios from "axios";

const instance = axios.create({
  baseURL: 'https://worldsgeekbackend-production.up.railway.app', // URL do serviço web do Railway
});

// User

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

// Character 

export const getCharacter = () =>
  instance
    .get("/character")
    .then((res) => {
      console.log("MeusDados:", res.data);
      return res.data;
});

// List 

export const getList = () =>
  instance
    .get("/list")
    .then((res) => {
      console.log("MeusDados:", res.data);
      return res.data;
});

export const createList = ({ listname }) =>
  instance.post("/list", {
    listname
});