import { addFavourite, deleteFavourite } from "../services/auth-service";
import { useAppStore } from "../zustand/store";
import { AppState } from "./Interfaces";

export const handleLikeClick = async (favourite: boolean, slug: string, setUpdateFavourite:any) => {
  if (favourite) {
    addFavourite(slug)
    setUpdateFavourite(slug, false);
  } else {
    deleteFavourite(slug)
    setUpdateFavourite(slug, true);
  }
};