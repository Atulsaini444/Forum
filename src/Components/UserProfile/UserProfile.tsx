import { Avatar, Box, Button, Text } from '@chakra-ui/react';
import React,{useEffect, useState} from 'react'
import { ColorRing, ThreeDots } from 'react-loader-spinner';
import { useNavigate, useParams } from 'react-router-dom';
import { followUser, getUserArticles, getUserProfile, unFollowUser } from '../../services/auth-service';
import { createStandaloneToast } from '@chakra-ui/react'
import { getToast } from '../../utils/getToast';
import './userProfile.scss';
import { AppState, ArticlesData, Author, UserData } from '../../utils/Interfaces';
import { useAppStore } from '../../zustand/store';
import { handleLikeClick } from '../../utils/HandleLikeClick';

const UserProfile = () => {
  const param = useParams();
  const navigate = useNavigate();
  const { toast } = createStandaloneToast()
  const[profile, setProfile] = useState<UserData>()
  const [loading, setLoading] = useState<boolean>(false)
  const [loading2, setLoading2] = useState<boolean>(false)
  const [followLoader, setFollowLoader] = useState<boolean>(false)
  const [userArticles,setUserArticles] = useState<Array<ArticlesData>>([])
  const setUpdateFavourite = useAppStore(
    (state: AppState) => state.setUpdateFavourite
  );
  useEffect(() => {
    setLoading(true)
    getUserProfile(param.username).then((response: Author)=>{
      setProfile(response)
      setLoading(false)
      setLoading2(true)
      getUserArticles(response?.username).then((response:Array<ArticlesData>)=>{
        setUserArticles(response)
        setLoading2(false)
      }).catch(()=>{
        setLoading2(false)
      })
    }).catch(()=>{
      setLoading(false)
    })
  }, [])

  const handleTitleClick = (slug:string) =>{
    navigate(`/single-article/${slug}`)
  }

  const handleFollowClick = (username:string|undefined) => {
    setFollowLoader(true)
    if(profile?.following){
      unFollowUser(username).then(()=>{
        setFollowLoader(false)
        toast(getToast(`You have unfollowed ${username}`,"success"));
        setProfile({...profile, following: false})
      })
    } else {
      followUser(username).then(()=>{
        setFollowLoader(false)
        toast(getToast(`You are now following ${username}`,"success"));
        setProfile({...profile, following: true})
      })
    }
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
      <Box className='followButtonWrapper'>
        <Button isLoading={followLoader} onClick={()=>handleFollowClick(profile?.username)} variant="outline" color="white">➕ {profile?.following ? 'UnFollow' : 'Follow'} {profile?.username}</Button>
      </Box>
    </Box>
        <Text fontSize={{ base: "24px", md: "2xl", lg: "4xl" }} fontFamily="sans-serif" color="GrayText" className='articlesHeading'>My Articles</Text>
      <Box className='mainContainer'>
      {loading2 ? <div className='loaderWrapper'><ThreeDots
      color="#9F7AEA" visible={true} height={60} width={60}
    /></div> : userArticles && userArticles?.length>0 ? userArticles?.map((article: ArticlesData, index: number) => {
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
              <div onClick={() =>
                      handleLikeClick(article.favorited, article.slug, setUpdateFavourite)
                    }>
              <Text color="white" className={`favouritesCount ${article?.favorited && "favorited"}`}>❤️{article.favoritesCount}</Text>
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
                  return <Text className='singleTag' color='#419fff' key={index}>#{tag}</Text>
                })}
              </div>
            </div>
          </div>
        )
      }): <Text  color='white' marginLeft='22px' >
      No articles to show...
    </Text> }
      </Box>
    </>
  )}
    </>
  )
}

export default UserProfile