import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from '@mui/material';

import styles from './SignUp.module.css';
import { countryList } from '../../Helpers/CountryList';
import { useRef, useState } from 'react';
import { IClientSignUp } from '../../Models/ICustomerSignUp';
import { settings } from '../../config';
import axios from 'axios';
const SignUp = () => {
  const name = useRef<any>();
  const email = useRef<any>();
  const password = useRef<any>();
  const cardNo = useRef<any>();
  const expiration = useRef<any>();
  const cvc = useRef<any>();

  const [country, setCountry] = useState<string>('Afghanistan');

  const getCountries = () => {
    let menuItems: any = [];
    countryList.forEach((value: string, index: number) => {
      menuItems.push(
        <MenuItem key={index} value={value}>
          {value}
        </MenuItem>
      );
    });

    return menuItems;
  };

  const countryHandler = (event: SelectChangeEvent) => {
    setCountry(event.target.value as string);
  };

  const signUpHandler = () => {
    let client: IClientSignUp = {
      clientId: 0,
      name: name.current.value,
      email: email.current.value,
      password: password.current.value,
      cardNo: cardNo.current.value,
      expiry: expiration.current.value,
      cvc: cvc.current.value,
      country: country,
    };

    axios
      .post(settings.API_ENDPPOINT + 'Client', client, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
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
            id="name"
            inputRef={name}
            label="Name"
            variant="outlined"
            fullWidth
          />
        </div>

        <div className={styles.inp}>
          <TextField
            id="email"
            inputRef={email}
            label="E-mail"
            variant="outlined"
            fullWidth
          />
        </div>

        <div className={styles.inp}>
          <TextField
            id="password"
            inputRef={password}
            label="Password"
            variant="outlined"
            type="password"
            fullWidth
          />
        </div>

        <div className={styles.inp}>
          <TextField
            id="cardNo"
            inputRef={cardNo}
            label="Card Number"
            variant="outlined"
            fullWidth
          />
        </div>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            borderColor: 'red',
            p: 1,
          }}
        >
          <TextField
            id="expiration"
            inputRef={expiration}
            label="Expiration"
            variant="outlined"
            inputProps={{ maxLength: 5 }}
          />
          <TextField id="cvc" inputRef={cvc} label="CVC" variant="outlined" />
        </Box>

        <div className={styles.inp}>
          <FormControl fullWidth>
            <InputLabel id="country">Country</InputLabel>
            <Select
              labelId="country"
              id="countrySelect"
              label="Country"
              value={country}
              onChange={countryHandler}
              MenuProps={{ PaperProps: { sx: { maxHeight: 200 } } }}
            >
              {getCountries()}
            </Select>
          </FormControl>
        </div>

        <div className={styles.inp} style={{ textAlign: 'center' }}>
          <Button
            sx={{
              margin: '6px',
              width: '80px',
              backgroundColor: '#c0c0c0',
              color: 'black',
            }}
            onClick={signUpHandler}
          >
            Sign Up
          </Button>
        </div>
      </Box>
    </div>
  );
};

export default SignUp;
