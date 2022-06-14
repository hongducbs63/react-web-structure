import React from 'react';
import { FormattedMessage } from 'react-intl';
import { NavLink } from 'react-router-dom';
import { ROUTES } from '../../../configs/routes';
import { ILoginParams, ILoginValidation } from '../../../models/auth';
import { validateLogin, validLogin } from '../utils';
import Input from './Input';

interface Props {
  onLogin(values: ILoginParams): void;
  loading: boolean;
  errorMessage: string;
}

const LoginForm = (props: Props) => {
  const { onLogin, loading, errorMessage } = props;
  const [formValues, setFormValues] = React.useState<ILoginParams>({ email: '', password: '', rememberMe: false });
  const [validate, setValidate] = React.useState<ILoginValidation>();

  const onSubmit = React.useCallback(() => {
    const validate = validateLogin(formValues);
    setValidate(validate);

    if (!validLogin(validate)) {
      return;
    }

    onLogin(formValues);
  }, [formValues, onLogin]);

  const HandleOnChangeInputValue = (key: string, value: string) => {
    setFormValues({ ...formValues, [key]: value });
  };
  const onClick = () => {};
  return (
    <form
      style={{ maxWidth: '560px', width: '100%' }}
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
      className="row g-3 needs-validation"
    >
      {!!errorMessage && (
        <div className="alert alert-danger" role="alert" style={{ width: '100%' }}>
          {errorMessage}
        </div>
      )}
      <>
        <Input
          value={formValues.email}
          getInputMail={HandleOnChangeInputValue}
          id="email"
          errorMessage={validate?.email}
        ></Input>
        <Input
          value={formValues.password}
          getInputMail={HandleOnChangeInputValue}
          id="password"
          errorMessage={validate?.password}
        ></Input>
      </>

      <div
        className="col-12 container-formcheck-btnsignin"
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
      >
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            id="invalidCheck"
            value=""
            checked={formValues.rememberMe}
            onChange={(e) => setFormValues({ ...formValues, rememberMe: !!e.target.checked })}
          />
          <label className="form-check-label" htmlFor="invalidCheck">
            <FormattedMessage id="rememberMe" />
          </label>
        </div>
        <div className="btn-login">
          <NavLink to={ROUTES.register} style={{ paddingLeft: '10px', paddingRight: '10px' }}>
            <FormattedMessage id="register" />
          </NavLink>
        </div>
      </div>

      <div className="row justify-content-md-center" style={{ margin: '16px 0' }}>
        <div className="col-md-auto">
          <button
            className="btn btn-primary"
            type="submit"
            style={{ minWidth: '160px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            disabled={loading}
          >
            {loading && <div className="spinner-border spinner-border-sm text-light mr-2" role="status" />}
            <FormattedMessage id="logIn" />
          </button>
        </div>
      </div>
    </form>
  );
};

export default LoginForm;
