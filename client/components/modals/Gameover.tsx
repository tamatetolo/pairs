import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import React from 'react';
import RestartAltIcon from '@mui/icons-material/RestartAlt';

interface GameOverModalProps {
  score: number;
  open: boolean;
  onClose: () => void;
  onSubmitScore: () => void;
}

export default function GameOverModal(props: GameOverModalProps) {
  const { score, open, onClose, onSubmitScore } = props;

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Gameover</DialogTitle>
      <DialogContent>
        <Typography variant='body1' mb={1}>
          You ran out of time..
        </Typography>

        <Box display='flex' justifyContent='space-between' mt={1}>
          <Typography variant='h6'>Score</Typography>
          <Typography variant='h6'>{score}pts</Typography>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          endIcon={<RestartAltIcon />}
          onClick={onClose}
          color='primary'
          variant='contained'
        >
          Play again?
        </Button>
        <Button onClick={onSubmitScore} color='inherit' variant='outlined'>
          Submit score
        </Button>
      </DialogActions>
    </Dialog>
  );
}
