import { create } from 'zustand';
import { register } from '../services/auth-service';

export interface userData {
  bio?: string | undefined,
  email: string,
  image: string,
  token:string,
  username: string
}

export const useAppStore = create((set) => ({
  articlesData: [],
  singleArticle:[],
  userData: {},
  token: "",
  setArticles: (data: any) => set((state:any) => ({articlesData: [...state.articlesData, ...data]}) ),
  setUser: (data:userData) => set((state:any)=> ({userData: data})),
  setToken: (data:string) => set((state:any)=> ({token: data})),
  setSingleArticle: (data:any) => set((state:any)=> ({singleArticle: data}))
}))