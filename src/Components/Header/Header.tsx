import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Header.scss'
import { Avatar, Button, Popover, PopoverBody, PopoverCloseButton, PopoverContent, PopoverHeader, PopoverTrigger, Text } from '@chakra-ui/react'
import { useAppStore } from '../../zustand/store'
import jwt_decode from "jwt-decode";

const Header = () => {
  const [decoded, setDecoded] = useState<any>()
  const token = useAppStore((state: any) => state.token)
  const setToken = useAppStore((state: any) => state.setToken)
  const userData = useAppStore((state: any) => state.userData)
  const setUser = useAppStore((state: any) => state.setUser)
  const navigate = useNavigate();


  useEffect(() => {
    if (token) {
      const decoded = jwt_decode(token);
      setDecoded(decoded)
    }
  }, [token])

  const handleSignInClick = () => {
    navigate('/login')
  }

  const handleLogOut = () => {
    setUser({});
    localStorage.clear();
    setToken(null)
    navigate('/login')
  }

  const handleProfileButton = () => {
    navigate(`/${decoded.username}`)
  }

  const handleEditProfile = () => {
    navigate('/edit-profile')
  }
  const handleCreateArticle = () => {
    navigate('/create-article')
  }

  const handleLogo = () => {
    navigate('/')
  }

  return (
    <div className='headerWrapper'>
      <div className='logoWrapper' onClick={handleLogo}>
        <Text as="b" fontSize="2xl" fontFamily="monospace" color="purple.400">FORUM</Text>
      </div>
      <div className='headerButtonsWrapper'>
        {token ? (
        <>
          <Button color="GrayText" variant="unstyled" onClick={handleCreateArticle} marginRight="5">Create Article</Button>
          <Button color="GrayText" variant="unstyled" onClick={handleEditProfile} marginRight="5">Edit Profile</Button>
          <Popover direction='ltr'>
            <PopoverTrigger>
              <Avatar className="avatarClass" size='sm' src={userData.image} />
            </PopoverTrigger>
            <PopoverContent maxWidth="100px">
              <PopoverBody onClick={handleProfileButton}>Profile</PopoverBody>
              <PopoverBody onClick={handleLogOut}>Logout</PopoverBody>
            </PopoverContent>
          </Popover>
        </>
        ) : (
          <Button variant="solid" colorScheme="messenger" onClick={handleSignInClick}>Log in</Button>
        )}

      </div>
    </div>
  )
}

export default Header