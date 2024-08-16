import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';
import React from 'react';
import DialogContentText from '@mui/material/DialogContentText';

interface StartModalProps {
  score?: number;
  open: boolean;
  onStart: () => void;
}

export default function StartModal(props: StartModalProps) {
  const { score, open, onStart } = props;

  return (
    <Dialog open={open} aria-labelledby='start-game-dialog'>
      <DialogTitle id='start-game-dialog' sx={{ textAlign: 'center' }}>
        <Typography
          variant='h4'
          sx={{ fontWeight: 'bold', color: 'primary.main' }}
        >
          Pairs
        </Typography>
      </DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ textAlign: 'center', fontSize: '1.2rem' }}>
          Can you find all the matching pairs?
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'center', paddingBottom: '2rem' }}>
        <Button
          variant='contained'
          color='primary'
          onClick={onStart}
          sx={{ fontSize: '1.5rem', padding: '10px 20px' }}
        >
          Play
        </Button>
      </DialogActions>
    </Dialog>
  );
}
