import { ClientStatus } from "../enums/ClientStatus";

export interface Client {
  _id: string,
  assignedNumber: number,
  category: string,
  createdAt: Date,
  status: ClientStatus,
}