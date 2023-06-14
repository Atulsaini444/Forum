import axios from "axios";

export const register = async (data: any) => {
  return await axios.post("https://api.realworld.io/api/users", data);
};

export const login = async (data: any) => {
  return await axios.post("https://api.realworld.io/api/users/login", data);
};

export const editProfile = async (data: any) => {
  return await axios.put("https://api.realworld.io/api/user", data);
};

export const createNewArticle = async (data: any) => {
  const res = await axios.get(`https://api.realworld.io/api/articles`, data);
};

export const getSingleArticle = async (slug: string | undefined) => {
  return await axios.get(`https://api.realworld.io/api/articles/${slug}`);
};

export const getUserProfile = async (slug: string | undefined) => {
  return await axios.get(`https://api.realworld.io/api/profiles/${slug}`);
};

export const getUserArticles = async (username: string) => {
  return await axios.get(
    `https://api.realworld.io/api/articles?author=${username}&limit=100&offset=0`
  );
};

export const postComment = async (slug: string | undefined,data: any) => {
  return await axios.post(
    `https://api.realworld.io/api/articles/${slug}/comments`,data
  );
};

export const getComments = async (slug: string| undefined) => {
  return await axios.get(
    `https://api.realworld.io/api/articles/${slug}/comments`
  );
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

