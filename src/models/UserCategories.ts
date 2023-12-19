import { Category } from "./Category";

export interface UserCategories {
  _id: string,
  username: string,
  categories: Category[]
}