import Role from "./role";

export interface IUser{
    id: number;
    unique_id: string;
    first_name: string;
    last_name: string;
    user_name: string;
    password: string;
    confirmPassword?: string;
    role: Role;
}

export class User implements IUser {
    public id: number = 0;
    public unique_id: string = "";
    public first_name: string = "";
    public last_name: string = "";
    public user_name: string = "";
    public password: string = "";
    public confirmPassword?: string = "";
    public role: Role = 0;
}

