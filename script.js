// déclare les cards
const cardsArray = [
    // On va utiliser name pour vérifier si deux cartes sont identiques.
    { name: 'apple', img: 'icons/apple.png' },
    { name: 'banana', img: 'icons/banana.png' },
    { name: 'blackberry', img: 'icons/blackberry.png' },
    { name: 'watermelon', img: 'icons/watermelon.png' },
    { name: 'pear', img: 'icons/pear.png' },
    { name: 'strawberry', img: 'icons/strawberry.png' },
    { name: 'lime', img: 'icons/lime.png' },
    { name: 'blueberry', img: 'icons/blueberry.png' }
];
// config des variables globales
const delay = 1200; //Temps (en ms) avant de retourner les cartes.
let firstGuess = ''; //la première carte retournée
let secondGuess = ''; 
let count = 0; //Compteur de cartes retournées.
let previousTarget = null; //Pr eviter de cliquer deux fois sur la mm carte

const game = document.querySelector('.game-board');
const gameGrid = shuffleArray(cardsArray.concat(cardsArray)); //Création de la grille + doubler les cartes

function shuffleArray(array) {
    return array.sort(() => 0.5 - Math.random());
}

function createCard(item){
    const card=document.createElement('div');
    card.classList.add=item.name;

    const front =document.createElement('div');
    black.style.backgroundImage =`url(${item.img})`;

    card.appendChild(front);
    card.appendChild(black);

    return card
}

function initGameBoard(){ //Parcourons les cartes mélangées et ajoutons chq au conteneur du jeu
    gameGrid.forEach(item => {
        const card = createCard(item);
        game.appendChild(card);
    });
}

function handleCardClick(event){  //Add un écouteur d'event pr les clics sur les cartes
    const clicked = event.target;

    if(count<2) {
        count++;
        clicked.parentNode.classList.add('selected','flipped');
        if (count===1){
            firstGuess=clicked.parentNode.dataset.name;
        } else {
            secondGuess=clicked.parentNode.dataset.name;

            if (firstGuess && secondGuess){
                if(firstGuess===secondGuess){
                    setTimeout(match,delay);
                }
                setTimeout(resetGuesses,delay);
            }
        }
        previousTarget=clicked
    }
}

//===réinitialisons les tentatives===
function match(){
    const selected= document.querySelectorAll('.selected');
    selected.forEach(card => card.classList.add('match'));
}

function resetGuesses(){
    firstGuess='';
    secondGuess='';
    count=0;
    previousTarget=null;

    const selected=document.querySelectorAll('.selected');
    selected.forEach(card => card.classList.remove('selected','flipped'));
}

game.addEventListener('click', handleCardClick);
initGameBoard();