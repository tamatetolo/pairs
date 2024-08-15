import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';
import React from 'react';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import Box from '@mui/material/Box';

interface LevelCompleteModalProps {
  level: number;
  score: number;
  timer: number;
  open: boolean;
  onClose: () => void;
  onContinue: () => void;
  moves: number;
  comboHistory: number[];
}

export default function LevelCompleteModal(props: LevelCompleteModalProps) {
  const {
    score,
    timer,
    level,
    open,
    onClose,
    onContinue,
    moves,
    comboHistory,
  } = props;

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Stage {level} Complete!</DialogTitle>
      <DialogContent>
        <Typography variant='body1' mb={1}>
          Congratulations, You completed the stage!
        </Typography>

        <Box display='flex' justifyContent='space-between'>
          <Typography variant='body1'>Number of moves</Typography>
          <Typography variant='body1' fontWeight='600'>
            {moves}
          </Typography>
        </Box>

        <Box display='flex' justifyContent='space-between'>
          <Typography variant='body1'>Your best combo was</Typography>
          <Typography variant='body1' fontWeight='600'>
            {Math.max(...comboHistory)}
          </Typography>
        </Box>

        <Box display='flex' justifyContent='space-between'>
          <Typography variant='body1'>Time bonus</Typography>
          <Typography variant='body1' fontWeight='600'>
            {timer}pts
          </Typography>
        </Box>

        <Box display='flex' justifyContent='space-between' mt={1}>
          <Typography variant='h6'>Score</Typography>
          <Typography variant='h6'>{score + timer}pts</Typography>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          endIcon={<ArrowOutwardIcon />}
          onClick={onContinue}
          color='primary'
          variant='contained'
        >
          Continue to Level {level + 1}
        </Button>
        <Button onClick={onClose} color='inherit' variant='outlined'>
          Upgrades
        </Button>
      </DialogActions>
    </Dialog>
  );
}
