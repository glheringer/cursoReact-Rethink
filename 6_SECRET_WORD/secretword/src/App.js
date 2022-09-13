//CSS
import "./App.css";
//React'
import { useCallback, useEffect, useState } from "react";

//data
import { wordsList } from "./data/word";

//Components
import StartScreen from "./components/StartScreen";
import Game from "./components/Game";
import GameOver from "./components/GameOver";

const stages = [
  { id: 1, name: "start" },
  { id: 2, name: "game" },
  { id: 3, name: "end" },
];
const guessesQtd = 3;
function App() {
  const [gameStage, setGameStage] = useState(stages[0].name);
  const [words] = useState(wordsList);

  const [pickWord, setPickWord] = useState("");
  const [pickCategory, setPickCategory] = useState("");
  const [pickLetter, setPickLetter] = useState([]);

  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wrongtLetters, setWrongLetters] = useState([]);
  const [guesses, setGuesses] = useState(guessesQtd);
  const [score, setScore] = useState(0);

  const pickWordAndCategory = useCallback(() => {
    const categories = Object.keys(words);
    //Pick a random category
    const category =
      categories[Math.floor(Math.random() * Object.keys(categories).length)];

    //console.log(category);

    //Pick a random word
    const word =
      words[category][[Math.floor(Math.random() * words[category].length)]];
    //console.log(word);

    return { word, category };
  }, [words]);
  
  //start the secret word game
  const startGame = useCallback(() => {
    //clear all letters
    clearLetterStates();

    // pick a word and a category
    const { word, category } = pickWordAndCategory();

    //create an array of letters
    let wordLetters = word.split(""); // split separa a string em uma lista de letras, colocando nenhum saparador: " "
    console.log(wordLetters);

    //Percorrendo as letras e transformando-as em minusculas
    wordLetters = wordLetters.map((l) => l.toLowerCase());

    //settar estados(fills)
    setPickWord(word);
    setPickCategory(category);
    setPickLetter(wordLetters);

    setGameStage(stages[1].name);
  }, [pickWordAndCategory]);

  //process the letter input
  const verifyLetter = (letter) => {
    const normalizedLetter = letter.toLowerCase();

    //check if letter has already been utilizied
    if (
      guessedLetters.includes(normalizedLetter) ||
      wrongtLetters.includes(normalizedLetter)
    ) {
      return;
    }

    // push guessed letter or remove a guess
    if (pickLetter.includes(normalizedLetter)) {
      //se a letra está certa
      setGuessedLetters((actualGueseedLetters) => [
        ...actualGueseedLetters,
        normalizedLetter,
      ]);
    } else {
      //senao...
      setWrongLetters((actualWrongLetters) => [
        ...actualWrongLetters,
        normalizedLetter,
      ]);
      setGuesses((actualGuesses) => actualGuesses - 1);
    }
  };
  const clearLetterStates = () => {
    setGuessedLetters([]);
    setWrongLetters([]);
  };
  useEffect(() => {
    if (guesses <= 0) {
      //reset all states
      clearLetterStates();

      setGameStage(stages[2].name);
    }
  }, [guesses]);
  //restart game
  const retry = () => {
    setScore(0);
    setGuesses(guessesQtd);
    setGameStage(stages[0].name);
  };

  //Check win condition
  useEffect(() => {
    //criando um array sem letras repetidas, o set cria um array com coisa unicas
    const uniqueLetters = [...new Set(pickLetter)];

    // win condition
    if (guessedLetters.length === uniqueLetters.length) {
      //add score
      setScore((actualScore) => (actualScore += 100));

      //restart game with new word
      startGame();
    }
  }, [guessedLetters, pickLetter, startGame]);
  return (
    <div className="App">
      {gameStage === "start" && <StartScreen startGame={startGame} />}
      {gameStage === "game" && (
        <Game
          verifyLetter={verifyLetter}
          pickedWord={pickWord}
          pickedCategory={pickCategory}
          wordLetters={pickLetter}
          guessedLetters={guessedLetters}
          wrongtLetters={wrongtLetters}
          guesses={guesses}
          score={score}
        />
      )}
      {gameStage === "end" && <GameOver retry={retry} score={score} />}
    </div>
  );
}

export default App;
