import { Button, Dialog, Tab, Tabs } from '@mui/material';
import { useState } from 'react';
import SignIn from '../SignIn/SignIn';
import SignUp from '../SignUp/SignUp';

interface SimpleDialogProps {
  open: boolean;
  selectedValue: string;
  onClose: (value: string) => void;
}

const emails = ['username@gmail.com', 'user02@gmail.com'];

const LoginDialog = (props: SimpleDialogProps) => {
  const { onClose, selectedValue, open } = props;
  const [tab, setTab] = useState(0);

  const handleClose = () => {
    onClose(selectedValue);
  };

  //   const handleListItemClick = (value: string) => {
  //     onClose(value);
  //   };

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  return (
    <Dialog fullWidth onClose={handleClose} open={open}>
      <Tabs value={tab} variant="fullWidth" onChange={handleChange} centered>
        <Tab label="Sign In" />
        <Tab label="sIGN Up" />
      </Tabs>
      {tab === 0 && <SignIn></SignIn>}
      {tab === 1 && <SignUp></SignUp>}
    </Dialog>
  );
};

const Login = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [selectedValue, setSelectedValue] = useState(emails[1]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value: string) => {
    setOpen(false);
    setSelectedValue(value);
  };

  return (
    <div>
      <Button onClick={handleClickOpen}>Go Premium</Button>
      <LoginDialog
        selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
      />
    </div>
  );
};

export default Login;
