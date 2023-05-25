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
function App() {
  const setToken = useAppStore((state:any) => state.setToken)
  useEffect(() => {
    const token = localStorage.getItem("token");
    if(token) {
      setToken(token)
    }
    
  }, [])
  

  return (
    <>
      <ChakraProvider theme={theme}>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path='/signup' element={<Register />}></Route>
            <Route path='/login' element={<Login />}></Route>
            <Route element={<ProtectedRoutes />}>
              <Route path='/dashboard' element={<Dashboard />}></Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </ChakraProvider>
    </>
  );
}

export default App;
