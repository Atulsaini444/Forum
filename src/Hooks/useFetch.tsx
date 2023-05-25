import { useCallback, useEffect, useState } from "react"
import axios from 'axios';
import { useAppStore } from "../zustand/store";
function useFetch(offset:number) {
  const setArticles = useAppStore((state:any) => state.setArticles)
  const articlesData = useAppStore((state:any) => state.articlesData)
  const [loading,setLoading] = useState(false);
  const [error,setError] = useState(false);
  // const [list,setList] = useState([]);

  const sendQuery = useCallback(async()=>{
    try {
      await setLoading(true);
      await setError(false);
      const res = await axios.get(`https://api.realworld.io/api/articles?limit=10&offset=${offset}`)
      await setArticles(res.data.articles)
      // await setList((prev):any => [...prev,...res.data.articles])
      setLoading(false)
    }
    catch(err:any){
      setError(err)
    }
  },[offset])

  useEffect(()=> {
    sendQuery()
  },[offset])

  return{loading,error,articlesData}
}

export default useFetch