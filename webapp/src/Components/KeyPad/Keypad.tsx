import { Box, BoxProps, Button, ButtonProps, Container } from '@mui/material';

import styled from '@emotion/styled';
interface IKeypad {
  isPremiumUser: boolean;
  userInput: Function;
  funcInput: Function;
}

const CBox = styled(Box)<BoxProps>(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-evenly',
  borderRadius: 1,
}));

const CButton = styled(Button)<ButtonProps>(({ theme }) => ({
  margin: '6px',
  fontWeight: 'bold',
}));

const Keypad = (props: IKeypad) => {
  const BTN_WIDTH = '80px';

  const digitHandler = (n: number) => {
    props.userInput(n);
  };

  const funcHandler = (symbol: string) => {
    props.funcInput(symbol);
  };

  const funcBtn = (name: string, isSpecial = false) => {
    let isEqual = name === '=';
    return (
      <CButton
        sx={{
          width: isSpecial ? '30px' : BTN_WIDTH,
          backgroundColor: isEqual ? '#875121' : '#c0c0c0',
          color: isEqual ? 'white' : 'black',
        }}
        onClick={(e) => funcHandler(name)}
      >
        {name}
      </CButton>
    );
  };

  const dgtBtn = (digit: number) => {
    return (
      <CButton
        sx={{
          width: BTN_WIDTH,
          backgroundColor: '#ffffff',
          color: 'black',
        }}
        onClick={(e) => digitHandler(digit)}
      >
        {digit}
      </CButton>
    );
  };

  return (
    <Container sx={{ alignContent: 'center' }}>
      <div style={{ width: '100%' }}>
        {props.isPremiumUser && (
          <CBox sx={{ marginTop: 1 }}>
            {funcBtn('MC', true)}
            {funcBtn('MR', true)}
            {funcBtn('M+', true)}
            {funcBtn('M-', true)}
            {funcBtn('MS', true)}
            {funcBtn('M↓', true)}
          </CBox>
        )}

        <CBox>
          {funcBtn('%')}
          {funcBtn('CE')}
          {funcBtn('C')}
          {funcBtn('<')}
        </CBox>

        <CBox>
          {funcBtn('1/X')}
          {funcBtn('X2')}
          {funcBtn('SQRT')}
          {funcBtn('÷')}
        </CBox>

        <CBox>
          {dgtBtn(7)}
          {dgtBtn(8)}
          {dgtBtn(9)}
          {funcBtn('X')}
        </CBox>

        <CBox>
          {dgtBtn(4)}
          {dgtBtn(5)}
          {dgtBtn(6)}
          {funcBtn('-')}
        </CBox>

        <CBox>
          {dgtBtn(1)}
          {dgtBtn(2)}
          {dgtBtn(3)}
          {funcBtn('+')}
        </CBox>

        <CBox>
          {funcBtn('+/-')}
          {dgtBtn(0)}
          {funcBtn('.')}
          {funcBtn('=')}
        </CBox>
      </div>
    </Container>
  );
};

export default Keypad;
