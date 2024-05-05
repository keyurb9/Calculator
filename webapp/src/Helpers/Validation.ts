const WS = ' ';

const validKeysForCardAndExpiryInput = [
  '0',
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  'Backspace',
  ' ',
];

export const validateName = (name: string) => {
  return name.trim().length >= 3;
};

export const validateEmail = (email: string) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

export const validatePassword = (password: string) => {
  return password.trim().length >= 6;
};

export const validateCardNumber = (cardNo: string) => {
  //Make sure there are 3 at specified indexes
  let cardArray = cardNo.split('');
  return cardArray[4] === WS && cardArray[9] === WS && cardArray[14] === WS;
};

export const validateExpiry = (expiry: string) => {
  //Make sure there is a space on 3rd index
  let expiryArray = expiry.split('');
  return expiryArray[2] === WS;
};

export const validateCVC = (cvc: string) => {
  //Make sure cvc is 3 digit
  return cvc.length === 3;
};

export const onlyNumberAndSpaceInput = (e: any) => {
  if (!validKeysForCardAndExpiryInput.includes(e.key)) {
    e.preventDefault();
  }
};

export const onlyNumberInput = (e: any) => {
  let validKeys = [...validKeysForCardAndExpiryInput];

  //remove space for CVC
  var index = validKeys.indexOf(' ');
  if (index !== -1) {
    validKeys.splice(index, 1);
  }

  if (!validKeys.includes(e.key)) {
    e.preventDefault();
  }
};
