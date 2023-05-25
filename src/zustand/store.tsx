import { create } from 'zustand';
import { register } from '../services/auth-service';

interface userData {
  bio?: string,
  email: string,
  image: string,
  token:string,
  username: string
}

export const useAppStore = create((set) => ({
  articlesData: [],
  userData: {},
  token: "",
  // registerUser: (data: any) => set(async() => {
  //   try {
  //     const response = await register(data);
  //     console.log("store ka response", response);
  //     return true;
  //   } catch (error) {
  //     console.log("store ka error", error);
  //     return false;
  //   }
  // }    
  // ),
  setArticles: (data: any) => set((state:any) => ({articlesData: [...state.articlesData, ...data]}) ),
  setUser: (data:userData) => set((state:any)=> ({userData: data})),
  setToken: (data:string) => set((state:any)=> ({token: data}))
}))