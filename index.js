const form = document.querySelector('form')
const randomNumber = Math.floor(Math.random() * 100 + 1)
console.log(randomNumber);
let guessArray = [];
let guessCount = 10;

newGame()

function newGame(){
    form.addEventListener('submit',(e)=>{
        e.preventDefault();
        const input = document.querySelector('#answer').value
        const [goAhead, num] = validateGuess(input)
        if(goAhead){
            handleGuess(num,randomNumber)
        }
    })
}

function validateGuess(input){
    const num = parseInt(input)
    // console.log(num)
    if(num>100 || num<1 || isNaN(num)){
        const response = document.querySelector('#serverResponse')
        response.innerText = "Invalid input"
        return false;
    }
    return [true ,num];
}

function handleGuess(input,randomNumber){
    updateGuessCount(--guessCount)
    updatePrevGuesses(input)

    if(input===randomNumber){
        handleGameEnd('win')
    }else{
        const response = document.querySelector('#serverResponse')
        response.innerText = "Incorrect guess"
    }
}

function updateGuessCount(guessCount){
    document.querySelector("#guessCount").innerText = guessCount
    if(guessCount<=0) handleGameEnd('loss')
}

function updatePrevGuesses(input){
    guessArray.push(input)
    const prevGuess = document.querySelector("#prevGuess")
    // console.log(String(guessArray));
    prevGuess.innerText = String(guessArray) 
}

function handleGameEnd(reason){
    const result = document.querySelector("#result")
    if(reason === 'win'){
        result.innerText = "You Won!!" 
    }else{
        result.innerText = "You Lost!!"
    }
    playAgain()
}

function playAgain(){
    const button = document.querySelector('button')
    button.innerText = "Play Again!"
    button.addEventListener('click',()=>{
        location.reload()
    })
}