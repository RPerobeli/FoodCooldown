import api from './api';

export const getFoods = async () => {
  try {
    // Como a baseURL já tem "/api", só passamos a rota final
    const response = await api.get('/Food'); 
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar alimentos:", error);
    throw error; // Repassa o erro para ser tratado no componente
  }
};