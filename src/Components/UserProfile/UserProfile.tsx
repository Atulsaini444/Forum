import { Avatar, Box, Text } from '@chakra-ui/react';
import axios from 'axios';
import React,{useEffect, useState} from 'react'
import { ColorRing } from 'react-loader-spinner';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppStore, userData } from '../../zustand/store';
import './userProfile.scss';

const UserProfile = () => {
  const param = useParams();
  const navigate = useNavigate();
  const[profile, setProfile] = useState<userData|undefined>()
  const [loading, setLoading] = useState<boolean>(false)
  const setUserArticles = useAppStore((state: any) => state.setUserArticles)
  const userArticles = useAppStore((state: any) => state.userArticles)
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

  const getUserArticles = async() => {
    const res = await axios.get(`https://api.realworld.io/api/articles?author=${profile?.username}&limit=10&offset=0`)
    console.log(res)
    setUserArticles(res?.data?.articles)
  }
  useEffect(()=>{
    if(profile){
      getUserArticles()
    }
  },[profile])

  const handleTitleClick = (slug:string) =>{
    navigate(`/single-article/${slug}`)
  }

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
    <>
    <Box className='profileWrapper'>
      <Box className='profileAvatarInformation '>
      <Avatar size='xl' src={profile?.image} />
      <Text fontSize="2xl" as="b" fontFamily="sans-serif" color="GrayText" marginTop="10px">{profile?.username}</Text>
      </Box>

    </Box>
      <Box className='mainContainer'>
      {userArticles && userArticles.map((article: any, index: number) => {
        return (
          <div key={index} className="container">
            <div className='usrnameFavouriteCountConatainer'>
              <div className='usernameAvatarConatainer'>
                <div>
                  <Avatar size='sm' src={article.author.image} />
                </div>
                <div className='userName'>
                  {article.author.username}
                </div>
              </div>
              <div className='favouritesCount'>
              <Text color="white">❤️{article.favoritesCount}</Text>
              </div>
            </div>
            <div className='titleAndDescriptionConatainer'>
              <Text onClick={()=>handleTitleClick(article.slug)} className="titleConatiner" fontSize="xl" color="white" fontWeight="bold">
                {article.title}
              </Text>
              <Text className='questiondescription' color='white' fontWeight="thin">
                {article.description}
              </Text>
            </div>
            <div className="articleFooter">
              <div className='tagsContainer'>
                {article.tagList.map((tag: string, index: number) => {
                  return <Text className='singleTag' color='white' key={index}>{tag}</Text>
                })}
              </div>
            </div>
          </div>
        )
      })}
      </Box>
    </>
  )}
    </>
  )
}

export default UserProfile