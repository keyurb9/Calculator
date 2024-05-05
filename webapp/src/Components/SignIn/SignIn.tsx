import { Box, Button, TextField } from '@mui/material';

import styles from './SignIn.module.css';
import { useRef } from 'react';
import axios from 'axios';
import { settings } from '../../config';
import { IClient } from '../../Models/IClient';

interface ISignIn {
  onSignIn: Function;
}
const SignIn = (props: ISignIn) => {
  const email = useRef<any>();
  const password = useRef<any>();

  const signInHandler = () => {
    let userEmail = email.current.value;
    let userPassword = password.current.value;

    axios
      .get(
        settings.API_ENDPPOINT + `Client/SignIn/${userEmail}/${userPassword}`
      )
      .then(function (response) {
        let status = response.status;
        let client: IClient = response.data;
        props.onSignIn(status, client.name);
      })
      .catch(function (error) {
        console.log(error);
        props.onSignIn(error.response.status, undefined);
      });
  };

  return (
    <div style={{ width: '100%' }}>
      <Box
        sx={{
          justifyContent: 'space-evenly',
          borderRadius: 1,
          margin: 4,
        }}
      >
        <div className={styles.inp}>
          <TextField
            inputRef={email}
            id="email"
            label="email"
            variant="outlined"
            fullWidth
          />
        </div>

        <div className={styles.inp}>
          <TextField
            inputRef={password}
            id="password"
            label="password"
            type="password"
            variant="outlined"
            fullWidth
          />
        </div>

        <div className={styles.inp}>
          <Button
            sx={{
              margin: '6px',
              width: '80px',
              backgroundColor: '#c0c0c0',
              color: 'black',
            }}
            onClick={signInHandler}
          >
            Sign In
          </Button>
        </div>
      </Box>
    </div>
  );
};

export default SignIn;
