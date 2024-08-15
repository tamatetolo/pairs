import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';
import React, { useEffect, useMemo } from 'react';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import Box from '@mui/material/Box';

interface LevelCompleteModalProps {
  level: number;
  setScore: (score: number) => void;
  score: number;
  timer: number;
  open: boolean;
  onClose: () => void;
  onContinue: () => void;
  moves: number;
  comboHistory: number[];
}

export default function LevelCompleteModal(props: LevelCompleteModalProps) {
  const { score, setScore, timer, level, open, onClose, moves, comboHistory } =
    props;
  const [showUpgrades, setShowUpgrades] = React.useState(false);

  const moveScore = () => {
    // 50 moves is the par for each stage
    let score = 2500;

    if (moves > 16) {
      score -= (moves - 16) * 50;
    } else if (moves === 16) {
      score = 9001;
    }

    return score > 0 ? score : 0;
  };

  const onContinue = () => {
    setScore(score + moveScore() + timer);
    props.onContinue();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Stage {level} Complete!</DialogTitle>
      <DialogContent>
        <Typography variant='body1' mb={2}>
          Congratulations, You completed the stage!
        </Typography>

        <Box display='flex' justifyContent='space-between'>
          <Typography variant='body1'>Best combo</Typography>
          <Typography variant='body1' fontWeight='600'>
            {Math.max(...comboHistory)}
          </Typography>
        </Box>

        <Box display='flex' justifyContent='space-between'>
          <Typography variant='body1'>Flip score</Typography>
          <Typography variant='body1' fontWeight='600'>
            {moveScore()}pts
          </Typography>
        </Box>

        <Box display='flex' justifyContent='space-between' mb={2}>
          <Typography variant='body1'>Time bonus</Typography>
          <Typography variant='body1' fontWeight='600'>
            {timer}pts
          </Typography>
        </Box>

        <hr />

        <Box display='flex' justifyContent='space-between' mt={1}>
          <Typography variant='h6'>Score</Typography>
          <Typography variant='h6'>{score + moveScore() + timer}pts</Typography>
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
        {/* <Button
          onClick={() => setShowUpgrades(true)}
          color='inherit'
          variant='outlined'
        >
          Upgrades
        </Button> */}
      </DialogActions>
    </Dialog>
  );
}
