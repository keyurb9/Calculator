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
import { IClient } from '../../Models/IClient';
import { settings } from '../../config';
import axios from 'axios';
import {
  onlyNumberInput,
  onlyNumberAndSpaceInput,
  validateCardNumber,
  validateEmail,
  validateName,
  validatePassword,
  validateExpiry,
  validateCVC,
} from '../../Helpers/Validation';

interface ISignUp {
  onSignUp: Function;
}

const SignUp = (props: ISignUp) => {
  const name = useRef<any>();
  const email = useRef<any>();
  const password = useRef<any>();
  const cardNo = useRef<any>();
  const expiration = useRef<any>();
  const cvc = useRef<any>();
  const [country, setCountry] = useState<string>('Afghanistan');

  //vlaidation states
  const [isNameError, setIsNameError] = useState<boolean>(false);
  const [isEmailError, setIsEmailError] = useState<boolean>(false);
  const [isPasswordError, setIsPasswordError] = useState<boolean>(false);
  const [isCardError, setIsCardError] = useState<boolean>(false);
  const [isExpiryError, setIsExpiryError] = useState<boolean>(false);
  const [isCvcError, setIsCvcError] = useState<boolean>(false);

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

  const dataValidation = () => {
    if (!validateName(name.current.value)) {
      setIsNameError(true);
      return false;
    } else {
      setIsNameError(false);
    }

    if (!validateEmail(email.current.value)) {
      setIsEmailError(true);
      return false;
    } else {
      setIsEmailError(false);
    }

    if (!validatePassword(password.current.value)) {
      setIsPasswordError(true);
      return false;
    } else {
      setIsPasswordError(false);
    }

    if (!validateCardNumber(cardNo.current.value)) {
      setIsCardError(true);
      return false;
    } else {
      setIsCardError(false);
    }

    if (!validateExpiry(expiration.current.value)) {
      setIsExpiryError(true);
      return false;
    } else {
      setIsExpiryError(false);
    }

    if (!validateCVC(cvc.current.value)) {
      setIsCvcError(true);
      return false;
    } else {
      setIsCvcError(false);
    }

    return true;
  };

  const signUpHandler = () => {
    if (!dataValidation()) {
      return;
    }

    let client: IClient = {
      clientId: 0,
      name: name.current.value,
      email: email.current.value,
      password: password.current.value,
      cardNo: cardNo.current.value,
      expiry: expiration.current.value.replace(/\s/g, ''),
      cvc: cvc.current.value,
      country: country,
    };

    axios
      .post(settings.API_ENDPPOINT + 'Client/SignUp', client, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(function (response) {
        let status = response.status;
        props.onSignUp(status, client.name);
      })
      .catch(function (error) {
        console.log(error);

        props.onSignUp(error.response.status, client.email);
      });

    //props.onSignUp(200, client.name);
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
            error={isNameError}
            helperText={
              isNameError ? 'Name must be more than 3 characters' : ''
            }
            inputRef={name}
            label="Name"
            variant="outlined"
            fullWidth
          />
        </div>

        <div className={styles.inp}>
          <TextField
            id="email"
            error={isEmailError}
            helperText={
              isEmailError ? 'Please enter a valid email address' : ''
            }
            inputRef={email}
            label="E-mail"
            variant="outlined"
            fullWidth
          />
        </div>

        <div className={styles.inp}>
          <TextField
            id="password"
            error={isPasswordError}
            inputRef={password}
            helperText={
              isPasswordError ? 'Name must be more than 6 characters' : ''
            }
            label="Password"
            variant="outlined"
            type="password"
            fullWidth
          />
        </div>

        <div className={styles.inp}>
          <TextField
            id="cardNo"
            error={isCardError}
            inputRef={cardNo}
            placeholder="0000 0000 0000 0000"
            helperText={
              isCardError ? 'Please provide card details in given format' : ''
            }
            inputProps={{ maxLength: 19 }}
            label="Card Number"
            variant="outlined"
            onKeyDown={onlyNumberAndSpaceInput}
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
            error={isExpiryError}
            inputRef={expiration}
            placeholder="DD MM"
            helperText={
              isExpiryError ? 'Please provide expiry in given format' : ''
            }
            label="Expiration"
            variant="outlined"
            inputProps={{ maxLength: 5 }}
            onKeyDown={onlyNumberAndSpaceInput}
          />
          <TextField
            id="cvc"
            error={isCvcError}
            inputRef={cvc}
            helperText={isCvcError ? 'CVC must be 3 digit' : ''}
            label="CVC"
            variant="outlined"
            inputProps={{ maxLength: 3 }}
            onKeyDown={onlyNumberInput}
          />
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
