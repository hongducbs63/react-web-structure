import {
  Alert,
  AlertTitle,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from '@mui/material';
import { Box } from '@mui/system';
import { ErrorMessage } from 'formik';
import React, { useCallback, useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'typesafe-actions';
import { API_PATHS } from '../../../configs/api';
import { ILocationsParams, ISignUpParams, ISignUpValidation } from '../../../models/auth';
import { AppState } from '../../../redux/reducer';
import { RESPONSE_STATUS_SUCCESS } from '../../../utils/httpResponseCode';
import { fetchThunk } from '../../common/redux/thunk';
import { validateSignUp } from '../utils';

interface Props {
  onSignUp(values: ISignUpParams): void;
  loading: boolean;
  errorMessage: string;
  locations: Array<ILocationsParams>;
  states: Array<ILocationsParams>;
  HandleIdLocation(values: string): void;
}

const Register = (props: Props) => {
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const { onSignUp, HandleIdLocation, loading, errorMessage, locations, states } = props;
  // const [idLocation, setIdLocation] = useState(1);
  const [state, setState] = useState([]);
  const [formValues, setFormValues] = React.useState<ISignUpParams>({
    email: '',
    password: '',
    repeatPassWord: '',
    name: '',
    gender: '',
    region: '',
    state: '',
  });

  const [validate, setValidate] = React.useState<ISignUpValidation>();
  // const getState = useCallback(async () => {
  //   // setLoading(true);
  //   // loading = true;
  //   const json = await dispatch(fetchThunk(`${API_PATHS.getState}=${idLocation}`, 'get'));
  //   // setLoading(false);
  //   if (json?.code === RESPONSE_STATUS_SUCCESS) {
  //     setState(json.data);
  //     return;
  //   }
  // }, []);

  // useEffect(() => {
  //   getState();
  // }, [idLocation]);
  console.log(state);

  const onSubmit = useCallback(() => {
    const validate = validateSignUp(formValues);
    setValidate(validate);
    if (!validateSignUp(formValues)) {
      return;
    }
    console.log('formvalue', formValues);

    onSignUp(formValues);
  }, [formValues, onSignUp]);

  const handleChangeRegion = (event: SelectChangeEvent) => {
    setFormValues({ ...formValues, region: event.target.value + '' });
    // console.log('id', event.target.value);
    // console.log(typeof event.target.value);

    HandleIdLocation(event.target.value);
    // setIdLocation(event.target.value);
  };

  // const renderRegion = () => {
  //   const arrRegion: JSX.Element[] = [
  //     <option disabled selected value={''} key={''}>
  //       {''}
  //       ---Select an option---
  //     </option>,
  //   ];
  //   locations.map((location: ILocationsParams, index: number) => {
  //     arrRegion.push(
  //       <option value={location.id} key={index}>
  //         {location.name}
  //       </option>,
  //     );
  //   });
  //   return arrRegion;
  // };
  // const handleClick = (location: ILocationsParams) => {
  //   setIdLocation(location.id);
  // };
  return (
    <form
      style={{ maxWidth: '560px', width: '100%' }}
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        console.log(locations);

        console.log(state);
        onSubmit();
      }}
      className="row g-3 needs-validation"
    >
      {!!errorMessage && (
        <Alert severity="error">
          <AlertTitle>{errorMessage}</AlertTitle>
        </Alert>
      )}

      <div>
        <TextField
          id="outlined-basic"
          label={<FormattedMessage id="email" />}
          variant="outlined"
          style={{ width: '550px' }}
          value={formValues.email}
          onChange={(e) => setFormValues({ ...formValues, email: e.target.value })}
        />
        {!!validate?.email && (
          <Box sx={{ color: 'red' }}>
            <FormattedMessage id={validate?.email} />
          </Box>
        )}
      </div>
      <div>
        <TextField
          id="outlined-basic"
          type="password"
          label={<FormattedMessage id="password" />}
          variant="outlined"
          style={{ width: '550px' }}
          value={formValues.password}
          onChange={(e) => setFormValues({ ...formValues, password: e.target.value })}
        />
        {!!validate?.password && (
          <Box sx={{ color: 'red' }}>
            <FormattedMessage id={validate?.password} />
          </Box>
        )}
      </div>
      <div>
        <TextField
          type="password"
          id="outlined-basic"
          label={<FormattedMessage id="repeatPassWord" />}
          variant="outlined"
          style={{ width: '550px' }}
          value={formValues.repeatPassWord}
          onChange={(e) => setFormValues({ ...formValues, repeatPassWord: e.target.value })}
        />
        {!!validate?.repeatPassWord && (
          <Box sx={{ color: 'red' }}>
            <FormattedMessage id={validate?.repeatPassWord} />
          </Box>
        )}
      </div>
      <div>
        <TextField
          id="outlined-basic"
          label={<FormattedMessage id="name" />}
          variant="outlined"
          style={{ width: '550px' }}
          value={formValues.name}
          onChange={(e) => setFormValues({ ...formValues, name: e.target.value })}
        />
        {!!validate?.name && (
          <Box sx={{ color: 'red' }}>
            <FormattedMessage id={validate?.name} />
          </Box>
        )}
      </div>
      <div>
        <FormControl fullWidth style={{ width: '550px' }}>
          <InputLabel id="demo-simple-select-label">{<FormattedMessage id="gender" />}</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={formValues.gender}
            label={<FormattedMessage id="gender" />}
            onChange={(e) => setFormValues({ ...formValues, gender: e.target.value })}
          >
            <MenuItem value="nam">Nam</MenuItem>
            <MenuItem value="nu">Nữ</MenuItem>
          </Select>
        </FormControl>
        {!!validate?.gender && (
          <Box sx={{ color: 'red' }}>
            <FormattedMessage id={validate?.gender} />
          </Box>
        )}
      </div>
      <div>
        <FormControl fullWidth style={{ width: '550px' }}>
          <InputLabel id="demo-simple-select-label">{<FormattedMessage id="region" />}</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={formValues.region}
            label={<FormattedMessage id="region" />}
            onChange={(e) => handleChangeRegion(e)}
          >
            {locations.map((location: ILocationsParams, index: number) => {
              return (
                <MenuItem value={location.id} key={index}>
                  {location.name}
                </MenuItem>
              );
            })}
          </Select>
          {!!validate?.region && (
            <Box sx={{ color: 'red' }}>
              <FormattedMessage id={validate?.region} />
            </Box>
          )}
        </FormControl>
      </div>
      <div>
        <FormControl fullWidth style={{ width: '550px' }}>
          <InputLabel id="demo-simple-select-label">{<FormattedMessage id="state" />}</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={formValues.state}
            label={<FormattedMessage id="state" />}
            onChange={(e) => setFormValues({ ...formValues, state: e.target.value + '' })}
          >
            {/* <MenuItem value={1}>Nam</MenuItem> */}
            {states?.map((state: ILocationsParams, index: number) => {
              return (
                <MenuItem value={state.id} key={index}>
                  {state.name}
                </MenuItem>
              );
            })}
          </Select>
          {!!validate?.state && (
            <Box sx={{ color: 'red' }}>
              <FormattedMessage id={validate?.state} />
            </Box>
          )}
        </FormControl>
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
            <FormattedMessage id="register" />
          </button>
        </div>
      </div>
    </form>
  );
};

export default Register;
