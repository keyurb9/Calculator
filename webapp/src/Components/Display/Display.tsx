import { Box } from '@mui/material';

interface IDisplay {
  value: string;
}

const Display = (props: IDisplay) => {
  return (
    <Box
      sx={{
        textAlign: 'right',
        minWidth: '80%',
        backgroundColor: '#FFFFFF',
        marginTop: 3,
        padding: 2,
        fontWeight: 'bold',
      }}
    >
      {props.value}
    </Box>
  );
};

export default Display;
