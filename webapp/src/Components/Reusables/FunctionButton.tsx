import { Button } from '@mui/material';
import { red } from '@mui/material/colors';

interface IFunctionButton {
  name: string;
}

const FunctionButton = (props: IFunctionButton) => {
  const clickHandle = (ev: any) => {
    alert('button pressed');
  };

  return (
    <Button
      sx={{ width: '80px', margin: '6px', backgroundColor: '#FFFFFF' }}
      onClick={clickHandle}
    >
      <b>{props.name}</b>
    </Button>
  );
};

export default FunctionButton;
