import React from 'react';
import { FormattedMessage } from 'react-intl';

interface Props {
  getInputMail(values: string, key: string): void;
  id: string;
  value: string;
  errorMessage: string | undefined;
}

const Input = (props: Props) => {
  const { value, getInputMail, id, errorMessage } = props;
  if (id.includes('email')) {
    return (
      <div className="col-md-12">
        <label htmlFor="inputEmail" className="form-label">
          <FormattedMessage id={`${id}`} />
        </label>
        <input
          autoComplete="off"
          type="text"
          className="form-control"
          id="inputEmail"
          value={value}
          onChange={(e) => getInputMail(id, e.target.value)}
        />
        {!!errorMessage && (
          <small className="text-danger">
            <FormattedMessage id={errorMessage} />
          </small>
        )}
      </div>
    );
  } else {
    return (
      <div className="col-md-12">
        <label htmlFor="inputPassword" className="form-label">
          <FormattedMessage id={`${id}`} />
        </label>
        <input
          autoComplete="off"
          type="password"
          className="form-control"
          id="inputPassword"
          value={value}
          onChange={(e) => getInputMail(id, e.target.value)}
        />
        {!!errorMessage && (
          <small className="text-danger">
            <FormattedMessage id={errorMessage} />
          </small>
        )}
      </div>
    );
  }
};

export default Input;
