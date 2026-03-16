import type IFoodItem from '../Interfaces/Home/IFoodItem';
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


export const consumeFood = async (foodId: string) => {
  try {
    // Como a baseURL já tem "/api", só passamos a rota final
    const response = await api.post(`/Food/Consume/id/${foodId}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar alimentos:", error);
    throw error; // Repassa o erro para ser tratado no componente
  }
};


export const addFood = async (food: IFoodItem) => {
  try {
    // Como a baseURL já tem "/api", só passamos a rota final
    const response = await api.post(`/Food/Add`, food);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar alimentos:", error);
    throw error; // Repassa o erro para ser tratado no componente
  }
};

export const removeFood = async (foodId: string) => {
  try {
    // Como a baseURL já tem "/api", só passamos a rota final
    const response = await api.delete(`/Food/id/${foodId}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar alimentos:", error);
    throw error; // Repassa o erro para ser tratado no componente
  }
};