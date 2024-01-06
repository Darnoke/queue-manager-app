import { CategoryStatus } from "../enums/CategoryStatus";
import { ClientStatus } from "../enums/ClientStatus";
import { Category } from "./Category";

export interface Client {
  _id: string,
  assignedNumber: number,
  category: Category,
  createdAt: string,
  status: ClientStatus,
  categoryStatus?: CategoryStatus,
  score?: number
}