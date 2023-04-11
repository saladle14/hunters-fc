export class Player {
  username: string;
  password: string;
  avatar: string;
  name: string;
  fullName: string;
  shirtNum: number;
  coin: number;
  facebookLink: string;

  constructor(
    username: string,
    password: string,
    avatar: string,
    name: string,
    fullName: string,
    shirtNum: number,
    coin: number,
    facebookLink: string
  ) {
    this.username = username;
    this.password = password;
    this.avatar = avatar;
    this.name = name;
    this.fullName = fullName;
    this.shirtNum = shirtNum;
    this.coin = coin;
    this.facebookLink = facebookLink;
  }
}
