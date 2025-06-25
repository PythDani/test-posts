export default class UserDto {
  
  name: string;
  lastname: string;
  username: string;

  constructor(name: string, lastname: string, username: string) {
    this.name = name;
    this.lastname = lastname;
    this.username = username;
  }
  
}