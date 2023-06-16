import { useCallback, useEffect, useState } from "react"
import axios from 'axios';
import { useAppStore } from "../zustand/store";
import { AppState } from "../utils/Interfaces";
function useFetch(offset:number) {
  const setArticles = useAppStore((state:AppState) => state.setArticles)
  const articlesData = useAppStore((state:AppState) => state.articlesData)
  const [loading,setLoading] = useState(false);
  const [error,setError] = useState(false);

  const sendQuery = useCallback(async()=>{
    try {
      await setLoading(true);
      await setError(false);
      const res = await axios.get(`https://api.realworld.io/api/articles?limit=10&offset=${offset}`)
      await setArticles(res.data.articles)
      setLoading(false)
    }
    catch(err:any){
      setLoading(false)
      setError(err.message)
    }
  },[offset])

  useEffect(()=> {
    sendQuery()
  },[offset])

  return{loading,error,articlesData}
}

export default useFetch