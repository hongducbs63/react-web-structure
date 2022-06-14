import { ILoginParams, ILoginValidation, ISignUpParams, ISignUpValidation } from '../../models/auth';
import { validEmailRegex } from '../../utils';

const validateEmail = (email: string) => {
  if (!email) {
    return 'emailRequire';
  }

  if (!validEmailRegex.test(email)) {
    return 'emailInvalid';
  }

  return '';
};

const validatePassword = (password: string) => {
  if (!password) {
    return 'passwordRequire';
  }

  if (password.length < 4) {
    return 'minPasswordInvalid';
  }

  return '';
};

export const validateLogin = (values: ILoginParams): ILoginValidation => {
  return {
    email: validateEmail(values.email),
    password: validatePassword(values.password),
  };
};

export const validateSignUp = (values: ISignUpParams): ISignUpValidation => {
  return {
    email: validateEmail(values.email),
    password: validatePassword(values.password),
    repeatPassWord: validateRepeatPassword(values.password, values.repeatPassWord),
    name: validateField('name', values.name),
    gender: validateField('gender', values.gender),
    region: validateField('region', values.region),
    state: validateField('state', values.state),
  };
};

export const validLogin = (values: ILoginValidation) => {
  return !values.email && !values.password;
};

const validateRepeatPassword = (password: string, repeatPassWord: string) => {
  if (!repeatPassWord) {
    return 'repeatPassWord';
  }
  if (password !== repeatPassWord) {
    return 'matchPasswordInvalid';
  }
  return '';
};

const validateField = (field: string, value: string) => {
  if (value) return '';
  let feildRequire = '';
  switch (field) {
    case 'name':
      feildRequire = 'nameRequired';
      break;
    case 'gender':
      feildRequire = 'genderRequired';
      break;
    case 'region':
      feildRequire = 'regionRequired';
      break;
    case 'state':
      feildRequire = 'stateRequired';
      break;
  }
  return feildRequire;
};
