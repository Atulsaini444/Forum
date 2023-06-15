import { create } from 'zustand';
import { AppState, ArticlesData, UserData } from '../utils/Interfaces';

export const useAppStore = create<AppState>((set) => ({
  articlesData: [],
  userArticles:[],
  userData: {},
  token: "",
  setArticles: (data: Array<ArticlesData>) => set((state:AppState) => ({articlesData: [...state.articlesData, ...data]}) ),
  setUser: (data:UserData) => set(()=> ({userData: data})),
  setToken: (data:string| null) => set(()=> ({token: data})),
  setUserArticles: (data: Array<ArticlesData>) => set((state:AppState) => ({userArticles: [...state.userArticles, ...data]}) ),
  setUpdateFavourite: (slug:string,favourite: boolean)=> set((state:AppState) => {
    const data = state.articlesData.map((item:ArticlesData)=>{
      if(item.slug===slug){
        if(favourite){
          return {...item, favoritesCount: item.favoritesCount + 1, favorited: true}
        } else {
          return {...item, favoritesCount: item.favoritesCount - 1, favorited: false}
        }
      }
      return item
    })

    return ({articlesData: [...data]})
  })
}))