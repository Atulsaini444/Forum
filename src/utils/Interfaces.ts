export interface UserData extends Author{
  email?: string,
  token?:string | null,
}

export interface AppState {
  articlesData: Array<ArticlesData>,
  userArticles:Array<ArticlesData>,
  userData: UserData,
  token: string | null,
  setArticles: (data: Array<ArticlesData>)=>void,
  setUser: (data:UserData)=>void,
  setToken: (data:string|null)=>void,
  setUserArticles: (data: Array<ArticlesData>)=>void,
  setUpdateFavourite: (slug:string,favourite: boolean)=>void
}

export interface Author {
  username?: string,
  bio?: null | string,
  image?: string,
  following?: boolean
}

export interface ArticlesData {
  slug: string,
  title: string,
  description: string,
  body: string,
  author: Author,
  createdAt: string,
  favorited: boolean,
  favoritesCount: number,
  tagList: Array<string>,
  updatedAt: string,
}

export interface Decoded {
  email: string,
  exp: number,
  iat: number,
  username: string,
}

export interface FormikType {
  initialValues: UserData | undefined;
  enableReinitialize: boolean;
  validationSchema: {
    username: string | undefined;
    email: string;
    password: string;
}
}

export interface CommentsDataType {
  author: UserData
  body: string
  createdAt: string
  id: number
  updatedAt: string
}

export interface IsDeleteCommentLoading {
  id: number 
  isShow: boolean
}

export interface CommentsDataProps {
  commentsData: Array<CommentsDataType>;
  loading: IsDeleteCommentLoading;
  handleCommentDelete: (id: number) => void;
}