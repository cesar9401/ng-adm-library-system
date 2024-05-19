export class AuthReqDto {
  public username!: string;
  public password!: string;
}

export class JwtResDto {
  public token!: string;
}

export class AdmBook {
  public bookId!: number;
  public isbn!: string;
  public title!: string;
  public author!: string;
  public publicationDate!: string;
  public editorial!: string;
  public stock!: number;
}

export class AdmCareer {
  public careerId!: number;
  public code!: string;
  public name!: string;
}
