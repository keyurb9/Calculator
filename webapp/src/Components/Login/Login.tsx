import { Button, Dialog, Tab, Tabs } from '@mui/material';
import { useState } from 'react';
import SignIn from '../SignIn/SignIn';
import SignUp from '../SignUp/SignUp';

interface SimpleDialogProps {
  open: boolean;
  onClose: () => void;
  onSignIn: Function;
  onSignUp: Function;
}

const LoginDialog = (props: SimpleDialogProps) => {
  const { open, onClose, onSignIn, onSignUp } = props;
  const [tab, setTab] = useState(0);

  const handleClose = () => {
    onClose();
  };

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  return (
    <Dialog fullWidth onClose={handleClose} open={open}>
      <Tabs value={tab} variant="fullWidth" onChange={handleChange} centered>
        <Tab label="Sign In" />
        <Tab label="Sign Up" />
      </Tabs>
      {tab === 0 && <SignIn onSignIn={onSignIn}></SignIn>}
      {tab === 1 && <SignUp onSignUp={onSignUp}></SignUp>}
    </Dialog>
  );
};

interface ILogin {
  onSignIn: Function;
  onSignUp: Function;
  isRegistered: boolean;
}

const Login = (props: ILogin) => {
  const { onSignIn, onSignUp, isRegistered } = props;
  const [open, setOpen] = useState<boolean>(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button disabled={isRegistered} onClick={handleClickOpen}>
        Go Premium
      </Button>
      <LoginDialog
        open={open}
        onClose={handleClose}
        onSignIn={(status: number, name: string) => {
          if (status === 200) {
            handleClose();
          }
          props.onSignIn(status, name);
        }}
        onSignUp={(status: number, name: string) => {
          if (status === 200) {
            handleClose();
          }

          props.onSignUp(status, name);
        }}
      />
    </div>
  );
};

export default Login;
