import React, { useCallback, useEffect, useState } from 'react';
import logo from '../../../logo-420-x-108.png';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'typesafe-actions';
import { AppState } from '../../../redux/reducer';
import Register from '../components/SignUpForm';
import { fetchThunk } from '../../common/redux/thunk';
import { API_PATHS } from '../../../configs/api';
import { RESPONSE_STATUS_SUCCESS } from '../../../utils/httpResponseCode';
import { ISignUpParams } from '../../../models/auth';
import { ROUTES } from '../../../configs/routes';
import { replace } from 'connected-react-router';
import { getErrorMessageResponse } from '../../../utils';

type Props = {};

const SignUpPage = (props: Props) => {
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const [loading, setLoading] = useState(false);
  const [errorMessages, setErrorMessages] = useState('');
  const [locations, setLocations] = useState([]);
  const [idLocation, setIdLocation] = useState('');
  const [states, setStates] = useState([]);
  const getLocation = useCallback(async () => {
    setLoading(true);
    const json = await dispatch(fetchThunk(API_PATHS.getLocation, 'get'));
    setLoading(false);
    if (json?.code === RESPONSE_STATUS_SUCCESS) {
      setLocations(json.data);
      return;
    }
  }, []);
  useEffect(() => {
    getLocation();
  }, [getLocation]);
  const getState = useCallback(async (idLocation) => {
    setLoading(true);
    const json = await dispatch(fetchThunk(`${API_PATHS.getState}${idLocation}`, 'get'));
    setLoading(false);
    if (json?.code === RESPONSE_STATUS_SUCCESS) {
      // console.log('state' + json.data);
      setStates(json.data);
      return;
    }
  }, []);
  useEffect(() => {
    getState(idLocation);
  }, [idLocation]);
  const HandleIdLocation = (idLocation: string) => {
    console.log('handleid', idLocation);

    setIdLocation(idLocation);
  };
  const onSignUp = useCallback(
    async (values: ISignUpParams) => {
      setErrorMessages('');
      setLoading(true);
      const json = await dispatch(fetchThunk(API_PATHS.signUp, 'post', values));
      setLoading(false);
      console.log(json.code);

      if (json?.code === RESPONSE_STATUS_SUCCESS) {
        console.log(json.data);

        alert('Chúc mừng bạn đã đăng kí thành công');
        dispatch(replace(ROUTES.login));
        return;
      }
      setErrorMessages(getErrorMessageResponse(json));
    },
    [dispatch],
  );

  return (
    <div
      className="container"
      style={{
        height: '120vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
      }}
    >
      <img src={logo} alt="" style={{ minWidth: '250px', margin: '32px' }}></img>
      <Register
        onSignUp={onSignUp}
        HandleIdLocation={HandleIdLocation}
        loading={loading}
        errorMessage={errorMessages}
        locations={locations}
        states={states}
      ></Register>
    </div>
  );
};
export default SignUpPage;
