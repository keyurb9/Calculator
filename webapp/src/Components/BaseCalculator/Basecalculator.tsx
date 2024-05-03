import { Box, Container, Divider, Grid } from '@mui/material';

import style from './Basecalculator.module.css';
import Keypad from '../KeyPad/Keypad';
import Display from '../Display/Display';
import { useEffect, useState } from 'react';
import Login from '../Login/Login';

const BaseCalculator = () => {
  const [display, setDisplay] = useState<string>('0');
  const [operand1, setOperand1] = useState<number>(0);
  const [operand2, setOperand2] = useState<number>(0);
  const [lastOperation, setLastOperation] = useState<string>('');

  let resetDisplay = () => {
    setDisplay('0');
  };

  let addition = (num1: number, num2: number) => {
    return num1 + num2;
  };

  let subtract = (num1: number, num2: number) => {
    return num1 - num2;
  };

  let divide = (num1: number, num2: number) => {
    return num1 / num2;
  };

  let multiply = (num1: number, num2: number) => {
    return num1 * num2;
  };

  let resetOperands = (res: number) => {
    setDisplay(res.toString());
    setOperand1(0);
    setOperand2(0);
  };

  useEffect(() => {
    if (operand1 && operand2) {
      let sym = lastOperation;
      let res = 0;
      if (sym === '+') res = addition(operand1, operand2);
      else if (sym === '-') res = subtract(operand1, operand2);
      else if (sym === '÷') res = divide(operand1, operand2);
      else if (sym === 'X') res = multiply(operand1, operand2);
      resetOperands(res);
    }
  }, [operand1, operand2, lastOperation]);

  let userInput = (n: number) => {
    let str: string = display + n.toString();
    while (str.charAt(0) === '0' && str.length !== 1) {
      str = str.substring(1);
    }
    setDisplay(str);
  };

  let funcInput = (sym: string) => {
    switch (sym) {
      case '<':
        let str = display;
        str = str.substring(0, str.length - 1);

        setDisplay(str ? str : '0');
        break;

      case 'C':
        resetOperands(0);
        break;

      case 'CE':
        resetDisplay();
        break;

      case '+':
      case '-':
      case 'X':
      case '÷':
        if (!operand1) {
          setOperand1(Number(display));
          resetDisplay();
        } else if (!operand2) {
          setOperand2(Number(display));
          resetDisplay();
        }
        setLastOperation(sym);

        break;

      case '1/X':
        let num = Number(display);
        if (num === 0) {
          setDisplay('Can not divide by Zero');
        } else {
          setOperand1(1);
          setOperand2(num);

          setLastOperation('÷');
        }

        break;

      case 'X2':
        setOperand1(Number(display));
        setOperand2(Number(display));
        setLastOperation('X');
        break;

      case 'SQRT':
        let res = Math.sqrt(Number(display));
        resetOperands(res);
        break;

      case '.':
        let disp = display + '.';
        setDisplay(disp);
        break;

      case '+/-':
        let value: number = Number(display);
        value *= -1;
        setDisplay(value.toString());
        break;

      case '=':
        if (operand1 && !operand2) {
          setOperand2(Number(display));
        }
        break;

      default:
        alert('symbol not found');
    }
  };

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{ minHeight: '100vh' }}
    >
      <Grid item xs={3} className={style.box}>
        <Box>
          <Grid item container spacing={1}>
            <Grid item alignContent={'center'} xs={9}>
              <div className={style.title}>Calculator</div>
            </Grid>

            <Grid item alignContent={'center'} xs={3}>
              <Login></Login>
            </Grid>
          </Grid>
        </Box>
        <Divider orientation="horizontal" />
        <Container maxWidth={'md'}>
          <Display value={display?.toString() ?? ''}></Display>
          <Keypad
            isPremiumUser={false}
            userInput={userInput}
            funcInput={funcInput}
          ></Keypad>
        </Container>
      </Grid>
    </Grid>
  );
};

export default BaseCalculator;
