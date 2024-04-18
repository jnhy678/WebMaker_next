// Alert.tsx
import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';

interface AlertProps {
  open: boolean;
  handleClose: () => void;
  message: string;
}

const Alert: React.FC<AlertProps> = ({ open, handleClose, message }) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle></DialogTitle>
      <DialogContent>{message}</DialogContent>
      <Button color="secondary" size="small" onClick={handleClose}>
        닫기
      </Button>
    </Dialog>
  );
};

export default Alert;
