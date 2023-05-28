import { Avatar, Box, Text } from '@chakra-ui/react';
import axios from 'axios';
import React,{useEffect, useState} from 'react'
import { ColorRing } from 'react-loader-spinner';
import { useParams } from 'react-router-dom';
import { userData } from '../../zustand/store';
import './userProfile.scss';

const UserProfile = () => {
  const param = useParams();
  const[profile, setProfile] = useState<userData|undefined>()
  const [loading, setLoading] = useState<boolean>(false)
  const getUserProfile = async(slug: string|undefined) => {
    const res = await axios.get(`https://api.realworld.io/api/profiles/${slug}`)
    setProfile(res.data.profile)
  }

  useEffect(() => {
    setLoading(true)
    getUserProfile(param.username).then(()=>{
      setLoading(false)
    }).catch((err)=>{
      console.log("error in fetching single article", err)
    })
  }, [])
  return (
    <>
    {loading ? <div className='loaderWrapper'><ColorRing
    visible={true}
    height="80"
    width="80"
    ariaLabel="blocks-loading"
    wrapperClass="blocks-wrapper"
    colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
  /></div> : (

    <Box className='profileWrapper'>
      <Box className='profileAvatarInformation '>
      <Avatar size='xl' src={profile?.image} />
      <Text fontSize="2xl" as="b" fontFamily="sans-serif" color="gray.700" marginTop="10px">{profile?.username}</Text>
      </Box>

    </Box>
  )}
    </>
  )
}

export default UserProfile