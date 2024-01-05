export type User = {
    id: string;
    name: string;
    email: string;
    password: string;
  };
  
  export interface UserInterface {
    CreateUser(user: User): Promise<User | Error>;
    UpdateUser(user: User): User | Error;
    GetUser(user: User): User | Error;
  }
  