import React, {useEffect} from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Register from './Components/Register/Register';
import Login from './Components/Login/Login';
import Dashboard from './Components/Dashboard/Dashboard';
import { theme } from './utils/theme';
import Header from './Components/Header/Header';
import ProtectedRoutes from './utils/ProtectedRoutes';
import { useAppStore } from './zustand/store';
import SingleArticle from './Components/SingleArticle/SingleArticle';
import UserProfile from './Components/UserProfile/UserProfile';
import EditProfile from './Components/EdiProfile/EditProfile';
import CreateArticle from './Components/CreateArticle/CreateArticle';
import authHeader from './services/auth-header';
import { AppState } from './utils/Interfaces';
function App() {
  const setToken = useAppStore((state:AppState) => state.setToken)
  useEffect(() => {
    const token = localStorage.getItem("token");
    if(token) {
      setToken(token)
    }
    
  }, [])

  useEffect(()=> {
    authHeader()
  },[])
  

  return (
    <>
      <ChakraProvider theme={theme}>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path='/signup' element={<Register />}></Route>
            <Route path='/login' element={<Login />}></Route>
            <Route element={<ProtectedRoutes />}>
              <Route path='/' element={<Dashboard />}></Route>
              <Route path='/single-article/:slug' element={<SingleArticle />}></Route>
              <Route path='/:username' element={<UserProfile />}></Route>
              <Route path='/edit-profile' element={<EditProfile />}></Route>
              <Route path='/create-article' element={<CreateArticle />}></Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </ChakraProvider>
    </>
  );
}

export default App;
