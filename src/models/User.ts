import { UserRole } from "../enums/UserRole";

export interface User {
    _id: string,
    username: string,
    role?: UserRole
} 