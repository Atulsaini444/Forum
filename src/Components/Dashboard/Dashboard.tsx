import React, { useEffect, useRef, useState, useCallback } from 'react'
import { ColorRing } from 'react-loader-spinner'
import { Avatar, Text } from '@chakra-ui/react';
import './Dashboard.scss'
import useFetch from '../../Hooks/useFetch';
import { useNavigate } from 'react-router-dom';
import ScrollToTopButton from '../ScrollToTop/ScrollToTopButton';
const Dashboard = () => {
  const [offset, setOffset] = useState(0)
  const loader = useRef(null);
  const navigate = useNavigate();
  const { loading, error, articlesData } = useFetch(offset)
  const handleObserver = useCallback((entries: any) => {
    const target = entries[0];
    if (target.isIntersecting) {
      setOffset((prev) => prev + 10)
    }
  }, []);
  const handleTitleClick = (slug:string) =>{
    navigate(`/single-article/${slug}`)
  }

  const handleUserName = (username:string) => {
    navigate(`/${username}`)

  }

  useEffect(() => {
    const option = {
      root: null,
      rootMargin: "20px",
      threshold: 0
    };
    const observer = new IntersectionObserver(handleObserver, option);
    if (loader.current) observer.observe(loader.current);
  }, [handleObserver]);
  return (
    <>
     <div className='mainContainer'>

      {articlesData && articlesData.map((article: any, index: number) => {
        return (
          <div key={index} className="container">
            <div className='usrnameFavouriteCountConatainer'>
              <div className='usernameAvatarConatainer'>
                <div>
                  <Avatar size='sm' src={article.author.image} />
                </div>
                <div className='userName' onClick={()=>handleUserName(article.author.username)}>
                  {article.author.username}
                </div>
              </div>
              <div className='favouritesCount'>
              ❤️{article.favoritesCount}
              </div>
            </div>
            <div className='titleAndDescriptionConatainer'>
              <Text onClick={()=>handleTitleClick(article.slug)} className="titleConatiner" fontSize="xl" color="gray.800" fontWeight="bold">
                {article.title}
              </Text>
              <Text className='questiondescription' color='gray.500' fontWeight="thin">
                {article.description}
              </Text>
            </div>
            <div className="articleFooter">
              <div className='tagsContainer'>
                {article.tagList.map((tag: string, index: number) => {
                  return <Text className='singleTag' color='gray.500' key={index}>{tag}</Text>
                })}
              </div>
            </div>
          </div>
        )
      })}
      <ScrollToTopButton />
        </div>
      {loading && <div className='loaderWrapper'><ColorRing
        visible={true}
        height="80"
        width="80"
        ariaLabel="blocks-loading"
        wrapperClass="blocks-wrapper"
        colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
      /></div>}
      {error && <p>Error!</p>}
      <div ref={loader} />

    </>
  )
}

export default Dashboard