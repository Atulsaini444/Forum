import React from 'react'
import { useNavigate } from 'react-router-dom'
import './Header.scss'
import { Button } from '@chakra-ui/react'
import { useAppStore } from '../../zustand/store'

const Header = () => {
  const token = useAppStore((state: any) => state.token)
  const setToken = useAppStore((state: any) => state.setToken)
  const setUser= useAppStore((state:any)=>state.setUser)
  const navigate = useNavigate();
  const handleSignInClick = () => {
    navigate('/login')
  }
  const handleLogOut = () => {
    setUser({});
    localStorage.clear();
    setToken(null)
    navigate('/login')
  }
  return (
    <div className='headerWrapper'>
      <div className='logoWrapper'>
        Hey it&apos;s me
      </div>
      <div className='headerButtonsWrapper'>
        {token ? (
          <Button colorScheme="messenger" onClick={()=>handleLogOut()}>Log out</Button>
        ) : (
          <Button variant="solid" colorScheme="messenger" onClick={handleSignInClick}>Log in</Button>
        )}

      </div>
    </div>
  )
}

export default Header