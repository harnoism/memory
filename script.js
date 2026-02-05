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
