export type User = {
    id: string,
    name: string,
    email: string,
    password: string,
  };

export type UserInfo = {
    id: string,
    email: string,
    iat: number,
    exp: number
}
  
  export interface UserInterface {
    CreateUser(user: User): Promise<User | Error>;
    UpdateUser(user: User): User | Error;
    GetUser(email: string, password: string): Promise<string | Error>;
  }
  