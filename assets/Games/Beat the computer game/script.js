let humanScore = 0;
let computerScore = 0;
let currentRoundNumber = 1;

const generateTarget = () => {
    const randomDecimal = Math.random();
    const randomInteger = Math.floor(randomDecimal * 10);

    return randomInteger;
}
//console.log(generateTarget());


const compareGuesses = (humanGuess, computerGuess, targetGuess) => {
    const humanDifference = Math.abs(targetGuess - humanGuess)
    const computerDifference = Math.abs(targetGuess - computerGuess)
    return humanDifference <= computerDifference;
}
//console.log(compareGuesses(4, 2, 2));

const updateScore = winner => {
    if ("humanScore" === winner) {
        humanScore++;
    } else if ("computerScore" === winner) {
        computerScore++;
    }
}

const advanceRound = () => {
    currentRoundNumber++;
}