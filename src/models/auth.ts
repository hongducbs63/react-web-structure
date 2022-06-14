export interface ILoginParams {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface ILoginValidation {
  email: string;
  password: string;
}

export interface ISignUpParams {
  email: string;
  password: string;
  repeatPassWord: string;
  name: string;
  gender: string;
  region: string;
  state: string;
}

export interface ISignUpValidation {
  email: string;
  password: string;
  repeatPassWord: string;
  name: string;
  gender: string;
  region: string;
  state: string;
}
export interface IGenderParams {
  label: string;
  value: string;
}

export interface ILocationsParams {
  id: string | number;
  name: string;
  pid: number | null;
}
