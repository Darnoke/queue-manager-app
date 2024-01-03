import { ClientStatus } from "../enums/ClientStatus";

export interface Client {
  assignedNumber: number,
  category: string,
  createdAt: Date,
  status: ClientStatus,
}