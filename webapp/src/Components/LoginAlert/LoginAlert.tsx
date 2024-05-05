import { Snackbar } from '@mui/material';
import { useState } from 'react';

interface ILoginAlert {
  message: string;
  onAlertClose: Function;
}
const LoginAlert = (props: ILoginAlert) => {
  const [open, setOpen] = useState(true);

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);

    props.onAlertClose();
  };

  return (
    <div>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        message={props.message}
        //action={action}
      />
    </div>
  );
};
export default LoginAlert;
