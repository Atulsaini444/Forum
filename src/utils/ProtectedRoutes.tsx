import React from 'react'
import { Outlet, Navigate } from 'react-router-dom';
import { useAppStore } from '../zustand/store'

const ProtectedRoutes = () => {
  // const token = useAppStore((state:any) => state.token)
  const token = localStorage.getItem("token")
  return token ? <Outlet/> : <Navigate to="/login" />;
}

export default ProtectedRoutes