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

export class AdmUser {
  public userId!: number;
  public email!: string;
  public password!: string;
  public fullName!: string;
  public userRoles: AdmUserRole[] = [];
}

export class AdmRole {
  public roleId!: number;
  public name!: string;
  public description!: string;
}

export class AdmUserRole {
  public userRoleId!: number;
  public user!: AdmUser;
  public role!: AdmRole;
}
