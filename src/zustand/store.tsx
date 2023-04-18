import { create } from 'zustand';
import { register } from '../services/auth-service';

export const useAppStore = create((set) => ({
  registerUser: async(data: any) => set(async() => {
    try {
      const response = await register(data);
      console.log("store ka response", response);
      return Promise.resolve();
    } catch (error) {
      console.log("store ka error", error);
      return Promise.reject(error);
    }
  }    
  )
}))