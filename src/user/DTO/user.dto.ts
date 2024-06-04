export class UserCreateDTO {
  idRole: string;
  name: string;
  email: string;
  password: string;
}

export class UserUpdateDTO {
  idRole?: string;
  name?: string;
  email?: string;
  password?: string;
}
