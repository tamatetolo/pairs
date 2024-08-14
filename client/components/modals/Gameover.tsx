import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';
import React from 'react';
import RestartAltIcon from '@mui/icons-material/RestartAlt';

interface GameOverModalProps {
  level: number;
  open: boolean;
  onClose: () => void;
  onRestart: () => void;
  moves: number;
  comboHistory: number[];
}

export default function GameOverModal(props: GameOverModalProps) {
  const { level, open, onClose, onRestart, moves, comboHistory } = props;

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Level {level} Complete!</DialogTitle>
      <DialogContent>
        <Typography variant='body1'>
          Congratulations! You completed the game in {moves} moves.
        </Typography>

        <Typography variant='body1'>
          Your best combo was {Math.max(...comboHistory)}.
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button
          endIcon={<RestartAltIcon />}
          onClick={onRestart}
          color='primary'
          variant='contained'
        >
          Play Again
        </Button>
        <Button onClick={onClose} color='inherit' variant='outlined'>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
