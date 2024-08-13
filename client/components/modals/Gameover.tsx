import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from '@mui/material';

interface GameOverModalProps {
  open: boolean;
  onClose: () => void;
  onRestart: () => void;
  moves: number;
}

export default function GameOverModal(props: GameOverModalProps) {
  const { open, onClose, onRestart, moves } = props;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby='game-over-dialog-title'
      aria-describedby='game-over-dialog-description'
    >
      <DialogTitle id='game-over-dialog-title'>Game Over</DialogTitle>
      <DialogContent>
        <Typography id='game-over-dialog-description' variant='body1'>
          Congratulations! You completed the game in {moves} moves.
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onRestart} color='primary' variant='contained'>
          Play Again
        </Button>
        <Button onClick={onClose} color='secondary' variant='outlined'>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
