import { useState, useEffect, useMemo } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Chip from '@mui/material/Chip';
import Badge from '@mui/material/Badge';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import GameOverModal from '../client/components/modals/Gameover';

interface Card {
  index: number;
  flipped: boolean;
  matched: boolean;
  text: string;
  src?: string;
}

export default function Home() {
  const [boardData, setBoardData] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [level, setLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(99);
  const [moves, setMoves] = useState(40);
  const [combo, setCombo] = useState(0);
  const [comboHistory, setComboHistory] = useState([4]);
  const [gameOver, setGameOver] = useState(false);

  const pairsFoundCount = useMemo(() => {
    if (matchedCards.length >= 2) {
      return matchedCards.length / 2;
    } else return 0;
  }, [matchedCards]);

  const renderCard = (data: Card, index: number) => {
    const classes = [
      'card',
      data.flipped || data.matched ? 'active' : '',
      data.matched ? 'matched' : '',
      gameOver ? 'gameover' : '',
    ];
    return (
      <Box
        onClick={() => {
          updateActiveCards(index);
        }}
        key={index}
        className={classes.join(' ')}
      >
        {data.src ? (
          <img src={data.src} className='card-front' />
        ) : (
          <div className='card-front'>{data.text}</div>
        )}
        <div className='card-back'></div>
      </Box>
    );
  };

  const shuffle = () => {
    const board = ['🤖', '👽', '👻', '🤡', '🐧', '🦚', '😄', '🚀'];

    const shuffledCards = [...board, ...board]
      .sort(() => Math.random() - 0.5)
      .map((v) => v);

    setBoardData(shuffledCards);
  };

  const initialize = async () => {
    // Part 1: Game Setup
    shuffle();
    setGameOver(false);
    setFlippedCards([]);
    setMatchedCards([]);
    setMoves(0);
    setCombo(0);
  };

  const updateActiveCards = (i) => {
    // algorthm to check if the cards are matched
    if (!flippedCards.includes(i)) {
      if (flippedCards.length == 1) {
        const firstIdx = flippedCards[0];
        const secondIdx = i;
        if (boardData[firstIdx] == boardData[secondIdx]) {
          setCombo(combo + 1);
          const multiplier = combo > 0 ? combo : 1;
          setScore((score + 10) * multiplier);
          setMatchedCards((prev) => [...prev, firstIdx, secondIdx]);
        } else {
          // reset the combo
          if (combo > 1) {
            setComboHistory([...comboHistory, combo]);
          }
          setCombo(0);
        }
        setFlippedCards([...flippedCards, i]);
      } else if (flippedCards.length === 2) {
        setFlippedCards([i]);
      } else {
        setFlippedCards([...flippedCards, i]);
      }
      setMoves((v) => v + 1);
    }
  };

  useEffect(() => {
    // useHook check
    if (matchedCards.length === 16) {
      if (combo > 1) {
        // last move of the game
        setComboHistory([...comboHistory, combo]);
        setCombo(0);
      }
      setGameOver(true);
    }
  }, [moves]);

  useEffect(() => {
    if (timer > 0) {
      const timerId = setInterval(() => {
        setTimer((prevSeconds) => prevSeconds - 1);
      }, 1000);

      // Cleanup function to clear the interval when the component unmounts or when seconds changes
      return () => clearInterval(timerId);
    }
  }, [timer]);

  useEffect(() => {
    // useHook initialize
    initialize();
  }, []);

  return (
    <Grid container mx={1} width='100%'>
      <Box display='flex' justifyContent='center' mx='auto' width='90%'>
        <Box
          display='flex'
          justifyContent='space-between'
          alignItems='center'
          width='100%'
        >
          <Box width='33%'>
            <Chip
              sx={{ marginRight: 1 }}
              label={`Stage ${level}`}
              variant='outlined'
              color='info'
            />
            <Chip label={`Score ${score}`} variant='outlined' color='info' />
          </Box>
          <Box position='relative'>
            <Box position='relative'>
              <CircularProgress
                variant='determinate'
                value={100}
                size='4rem'
                sx={{ position: 'absolute', color: 'darkgray' }}
              />
              <CircularProgress
                size='4rem'
                variant='determinate'
                value={timer}
              />
            </Box>
            <Box
              sx={{
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                position: 'absolute',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Typography variant='h5' component='div' color='primary'>
                {timer}
              </Typography>
            </Box>
          </Box>

          <Box
            width='33%'
            display='flex'
            alignItems='center'
            justifyContent='flex-end'
          >
            <Box mr={1}>
              <Badge badgeContent={combo > 1 ? combo : 0} color='primary'>
                <Chip label={`Combo`} variant='outlined' color='info' />
              </Badge>
            </Box>
            <Box mr={1}>
              <Badge badgeContent={moves} color='warning'>
                <Chip label={`Flips`} variant='outlined' color='info' />
              </Badge>
            </Box>
          </Box>
        </Box>
      </Box>

      <Grid item container maxWidth='sm' mt={1}>
        {boardData.map((data, i) => {
          const flipped = flippedCards.includes(i) ? true : false;
          const matched = matchedCards.includes(i) ? true : false;
          const card = {
            flipped,
            matched,
            text: data,
            index: i,
          };

          return (
            <Grid xs={3} py={1} px={1}>
              {renderCard(card, i)}
            </Grid>
          );
        })}
      </Grid>
      <GameOverModal
        level={level}
        open={gameOver}
        onClose={initialize}
        onRestart={initialize}
        moves={moves}
        comboHistory={comboHistory}
      />
    </Grid>
  );
}
