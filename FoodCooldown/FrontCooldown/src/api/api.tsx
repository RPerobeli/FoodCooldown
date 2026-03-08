import axios from 'axios';

const isDevelopment = import.meta.env.DEV;
const url = isDevelopment ? 'http://localhost:8080/api' : '/api';
const api = axios.create({
  baseURL: url,
  //futuramente substituir pelo endereco do backend em producao
});

export default api;