import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Avatar, Text } from '@chakra-ui/react';
import './Dashboard.scss'
const Dashboard = () => {
  const [articles, setArticles] = useState([])
  const getPost = async () => {
    const response = await axios.get('https://api.realworld.io/api/articles?limit=10&offset=0')
    console.log(response.data.articles)
    setArticles(response.data.articles)

  }
  useEffect(() => {
    getPost()
  }, [])
  return (
    <>
      Dashboard
      {articles.map((article: any, index) => {
        return (
          <div key={index} className="mainContainer">
            <div className='usrnameFavouriteCountConatainer'>
              <div className='usernameAvatarConatainer'>
                <div>
                  <Avatar size='sm' name={article.author.username} src={article.author.image} />
                </div>
                <div>
                  {article.author.username}
                </div>
              </div>
              <div className='favouritesCount'>
                {article.favoritesCount}
              </div>
            </div>
            <div className='titleAndDescriptionConatainer'>
              <Text className="titleConatiner" fontSize="xl" color="gray.800" fontWeight="bold">
                {article.title}
              </Text>
              <Text className='questiondescription' color='gray.500' fontWeight="thin">
                {article.description}
              </Text>
            </div>
            <div className="articleFooter">
              <Text color='gray.500'>
                Read more...
              </Text>
              <div className='tagsContainer'>
                {article.tagList.map((tag:string, index:number) => {
                  return <Text className='singleTag' color='gray.500' key={index}>{tag}</Text>
                })}
              </div>
            </div>
          </div>
        )
      })}
    </>
  )
}

export default Dashboard