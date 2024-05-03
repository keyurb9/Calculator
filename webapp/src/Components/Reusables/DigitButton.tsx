import { Button } from '@mui/material';

interface IdigitButton {
  digit: number;
}

const DigitButton = (props: IdigitButton) => {
  const clickHandle = (ev: any) => {
    alert(props.digit);
  };

  return (
    <Button
      onClick={clickHandle}
      sx={{ width: '80px', margin: '6px', backgroundColor: '#FFFFFF' }}
    >
      <b>{props.digit}</b>
    </Button>
  );
};

export default DigitButton;
