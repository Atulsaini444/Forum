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
  userArticles:[],
  userData: {},
  token: "",
  setArticles: (data: any) => set((state:any) => ({articlesData: [...state.articlesData, ...data]}) ),
  setUser: (data:userData) => set((state:any)=> ({userData: data})),
  setToken: (data:string) => set((state:any)=> ({token: data})),
  setSingleArticle: (data:any) => set((state:any)=> ({singleArticle: data})),  
  setUserArticles: (data: any) => set((state:any) => ({userArticles: [...state.userArticles, ...data]}) ),
  setUpdateFavourite: (slug:string,favourite: boolean)=> set((state:any) => {
    const data = state.articlesData.map((item:any)=>{
      if(item.slug===slug){
        console.log("inside if")
        if(favourite){
          return {...item, favoritesCount: item.favoritesCount + 1, favorited: true}
        } else {
          return {...item, favoritesCount: item.favoritesCount - 1, favorited: false}
        }
      }
      return item
    })

    console.log("data is ===> ",data)
    return ({articlesData: [...data]})
  })
}))