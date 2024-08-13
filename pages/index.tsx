import { useState, useEffect, useMemo } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Chip from '@mui/material/Chip';
import Badge from '@mui/material/Badge';
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
  const [moves, setMoves] = useState(0);
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
  };

  const updateActiveCards = (i) => {
    // algorthm to check if the cards are matched
    if (!flippedCards.includes(i)) {
      if (flippedCards.length == 1) {
        const firstIdx = flippedCards[0];
        const secondIdx = i;
        if (boardData[firstIdx] == boardData[secondIdx]) {
          setMatchedCards((prev) => [...prev, firstIdx, secondIdx]);
        }
        setFlippedCards([...flippedCards, i]);
      } else if (flippedCards.length == 2) {
        setFlippedCards([i]);
      } else {
        setFlippedCards([...flippedCards, i]);
      }

      setMoves((v) => v + 1);
    }
  };

  useEffect(() => {
    // useHook check
    if (matchedCards.length == 16) {
      setGameOver(true);
    }
  }, [moves]);

  useEffect(() => {
    // useHook initialize
    initialize();
  }, []);

  return (
    <Grid container mx={1} width='100%'>
      <Box display='flex' justifyContent='flex-end' width='100%'>
        <Box mr={1}>
          <Badge badgeContent={moves} color='info'>
            <Chip label={`Flips`} variant='outlined' color='info' />
          </Badge>
        </Box>

        <Badge badgeContent={pairsFoundCount} color='success'>
          <Chip label={`Pairs`} variant='outlined' color='success' />
        </Badge>
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
        open={gameOver}
        onClose={initialize}
        onRestart={initialize}
        moves={moves}
      />
    </Grid>
  );
}
