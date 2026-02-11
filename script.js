// déclare les cards
const cardsArray = [
    [ // Niveau 1 - 8 paires
        // On va utiliser name pour vérifier si deux cartes sont identiques.
        { name: 'apple', img: 'icons/_apple.png' },
        { name: 'banana', img: 'icons/banana.png' },
        { name: 'blackberry', img: 'icons/blackberry.png' },
        { name: 'watermelon', img: 'icons/watermelon.png' },
        { name: 'pear', img: 'icons/pear.png' },
        { name: 'strawberry', img: 'icons/strawberry.png' },
        { name: 'lime', img: 'icons/lime.png' },
        { name: 'blueberry', img: 'icons/blueberry.png' }
    ],
    [ // Niveau 2 - 16 paires
        { name: 'apple', img: 'icons/_apple.png' },
        { name: 'banana', img: 'icons/banana.png' },
        { name: 'blackberry', img: 'icons/blackberry.png' },
        { name: 'watermelon', img: 'icons/watermelon.png' },
        { name: 'pear', img: 'icons/pear.png' },
        { name: 'strawberry', img: 'icons/strawberry.png' },
        { name: 'lime', img: 'icons/lime.png' },
        { name: 'blueberry', img: 'icons/blueberry.png' },
        { name: 'lemon', img: 'icons/lemon.png' },
        { name: 'grapes', img: 'icons/grapes.png' },
        { name: 'kiwi', img: 'icons/kiwi.png' },
        { name: 'pineapple', img: 'icons/pineapple.png' },
        { name: 'orange', img: 'icons/orange.png' },
        { name: 'dragonfruit', img: 'icons/dragonfruit.png' },
        { name: 'peach', img: 'icons/lime.png' },
        { name: 'raspberry', img: 'icons/raspberry.png' }
    ],
];
// config des variables globales
const delay = 500; //Temps (en ms) avant de retourner les cartes.
let firstGuess = ''; //la première carte retournée
let secondGuess = '';
let count = 0; //Compteur de cartes retournées.
let currentlvl = 0; //lvl actuel
let matchedPairs = 0 //paires trouvées
let previousTarget = null; //Pr eviter de cliquer deux fois sur la mm carte

const game = document.querySelector('.game-board');
let gameGrid = [];

// Mélange aléatoirement.
function shuffleArray(array) {
    return array.sort(() => 0.5 - Math.random());
}

function createCard(item) { //item = une carte du tableau.
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.name = item.name;

    const front = document.createElement('div');
    front.classList.add('front');

    const back = document.createElement('div');
    back.classList.add('back');
    back.style.backgroundImage = `url(${item.img})`;

    card.appendChild(front);
    card.appendChild(back);

    return card
}
// Fonction qui construit la grille.
function initGameBoard() { //Parcourons les cartes mélangées et ajoutons chq au conteneur du jeu
    matchedPairs = 0; //Réinitialise le compteur

    const levels = cardsArray[currentlvl];
    document.getElementById('level-display').textContent = currentlvl + 1;
    document.getElementById('pairs-display').textContent = 0;
    document.getElementById('total-pairs').textContent = levels[currentlvl].length;



    gameGrid = shuffleArray(levels.concat(levels));

    game.innerHTML = ""; // vider la grille avant reconstruction


    gameGrid.forEach(item => { //Pour chaque carte mélangée
        const card = createCard(item);
        game.appendChild(card); //Ajoute la carte au plateau.
    });
}

function handleCardClick(event) {  //Add un écouteur d'event pr les clics sur les cartes
    const clicked = event.target;

    if (!clicked.classList.contains('front') && !clicked.classList.contains('back')) return;
    if (previousTarget === clicked) return;
    if (clicked.parentNode.classList.contains('match')) return;

    if (count < 2) { //Empêche plus de deux cartes retournées.
        count++;
        clicked.parentNode.classList.add('selected', 'flipped'); //selected:carte choisie, flipped: animation
        if (count === 1) {
            firstGuess = clicked.parentNode.dataset.name; //Stocke le nom et compare ensuite
        } else {
            secondGuess = clicked.parentNode.dataset.name;

            if (firstGuess && secondGuess) {
                if (firstGuess === secondGuess) {
                    setTimeout(match, delay); //Marque comme paire
                }
                setTimeout(resetGuesses, delay); //reinitinialise
            }
        }
        previousTarget = clicked
    }
}

//===réinitialisons les tentatives===
function match() {
    const selected = document.querySelectorAll('.selected');
    selected.forEach(card => card.classList.add('match'));
    matchedPairs++;
    document.getElementById('pairs-display').textContent = matchedPairs;
    checkWin();
}

function checkWin() {
    const totalPairs = cardsArray[currentlvl].length;


    if (matchedPairs === totalPairs) {
        setTimeout(() => {
            if (currentlvl < cardsArray.length - 1) { // Le dernier index = length - 1 = 1, (les tableaux JavaScript commencent à l’index 0, pas à 1.)
                //Si il y a encore des niveaux
                if (confirm(`Niveau ${currentlvl + 1} terminé ! Passer au niveau suivant ?`)) {
                    //indique au navigateur d'afficher une boîte de dialogue avec un message facultatif,
                    //et d'attendre que l'utilisateur confirme ou annule la boîte de dialogue.
                    currentlvl++;
                    initGameBoard();
                }
            } else {
                //Dernier niveau terminé
                alert('Félicitation ! Vous avez terminé tous les niveaux !')
                if (confirm(`Rejouer depuis le début`)) {
                    currentlvl = 0;
                    initGameBoard();
                }
            }
        }, 500)
    }
}

function resetGuesses() {
    firstGuess = '';
    secondGuess = '';
    count = 0;
    previousTarget = null;

    const selected = document.querySelectorAll('.selected');
    selected.forEach(card => card.classList.remove('selected', 'flipped'));
}

game.addEventListener('click', handleCardClick);
initGameBoard();