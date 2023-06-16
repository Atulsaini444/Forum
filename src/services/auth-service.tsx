import axios from "axios";

export const register = async (data: any) => {
  return await axios.post("https://api.realworld.io/api/users", data);
};

export const login = async (data: any) => {
  return await axios.post("https://api.realworld.io/api/users/login", data);
};

export const getCurrentUser = async () => {
  const result =  await axios.get(`https://api.realworld.io/api/user`)
  return result.data.user
}
export const editProfile = async (data: any) => {
  return await axios.put("https://api.realworld.io/api/user", data);
};



export const addFavourite = async (slug: any) => {
  return await axios.post(`https://api.realworld.io/api/articles/${slug}/favorite`);
};
export const deleteFavourite = async (slug: any) => {
  return await axios.delete(`https://api.realworld.io/api/articles/${slug}/favorite`);
};

export const createNewArticle = async (data: any) => {
  const res = await axios.get(`https://api.realworld.io/api/articles`, data);
};

export const getSingleArticle = async (slug: string | undefined) => {
  const result = await axios.get(`https://api.realworld.io/api/articles/${slug}`);
  return result.data.article
};

export const getUserProfile = async (slug: string | undefined) => {
  const result = await axios.get(`https://api.realworld.io/api/profiles/${slug}`);
  return result.data.profile
};

export const getUserArticles = async (username: string | undefined) => {
  const result = await axios.get(
    `https://api.realworld.io/api/articles?author=${username}&limit=100&offset=0`
  );
  return result.data.articles
};

export const postComment = async (slug: string | undefined,data: any) => {
  return await axios.post(
    `https://api.realworld.io/api/articles/${slug}/comments`,data
  );
};

export const getComments = async (slug: string| undefined) => {
  const result = await axios.get(
    `https://api.realworld.io/api/articles/${slug}/comments`
  );
  return result.data.comments
};

export const deleteComment = async (slug: string | undefined, id:number) => {
  return await axios.delete(
    `https://api.realworld.io/api/articles/${slug}/comments/${id}`
  );
};

export const followUser = async (username:string| undefined) => {
  return await axios.post(
    `https://api.realworld.io/api/profiles/${username}/follow`
  );
};

export const unFollowUser = async (username:string | undefined) => {
  return await axios.delete(
    `https://api.realworld.io/api/profiles/${username}/follow`
  );
};

