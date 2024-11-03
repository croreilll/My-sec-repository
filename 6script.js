const totalCards = 5; // Total number of cards
const cards = []; // Array to hold card names
let dealtCards = new Set(); // Set to track dealt cards

// Initialize the cards array
function initCards() {
    for (let i = 1; i <= totalCards; i++) {
        cards.push(`${i}.png`); // Use your image names
    }
}

// Deal cards to the screen
function dealCards() {
    const container = document.getElementById('cards-container');
    container.innerHTML = ''; // Clear previous cards
    dealtCards.clear(); // Reset dealt cards

    for (let i = 0; i < totalCards; i++) { // Deal all available cards
        let card;
        do {
            card = cards[Math.floor(Math.random() * cards.length)];
        } while (dealtCards.has(card)); // Ensure the same card is not dealt twice
        dealtCards.add(card);
        const cardElement = createCardElement(card);
        container.appendChild(cardElement);
    }
}

// Create card element
function createCardElement(card) {
    const cardElement = document.createElement('img');
    cardElement.src = `cards/${card}`; // Path to your images
    cardElement.className = 'card';
    cardElement.draggable = true;

    cardElement.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text/plain', card);
        setTimeout(() => {
            cardElement.style.display = 'none';
        }, 0);
    });

    cardElement.addEventListener('dragend', () => {
        cardElement.style.display = 'block';
    });

    return cardElement;
}

// Handle the discard pile drop
const discardPile = document.getElementById('deck');
discardPile.addEventListener('dragover', (e) => {
    e.preventDefault();
});

discardPile.addEventListener('drop', (e) => {
    const card = e.dataTransfer.getData('text/plain');
    const cardElement = document.querySelector(`img[src='cards/${card}']`);
    if (cardElement) {
        cardElement.remove();
    }
});

// Set up event listeners
document.getElementById('deal-button').addEventListener('click', dealCards);

// Initialize cards on load
initCards();