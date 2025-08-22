// --- DOM ELEMENT SELECTORS ---
const welcomeModal = document.getElementById('welcome-modal');
const startAppBtn = document.getElementById('start-app-btn');
const moodButtons = document.querySelectorAll('.mood-btn');
const quoteWrapper = document.querySelector('.quote-wrapper');
const quoteEl = document.querySelector('.quote');
const personEl = document.querySelector('.person');
const newQuoteBtn = document.getElementById('new-quote-btn');
// --- FIX: These two lines were missing and have been added back ---
const bg1 = document.getElementById('bg-1');
const bg2 = document.getElementById('bg-2');
const favoriteBtn = document.getElementById('favorite-btn');
const copyBtn = document.getElementById('copy-btn');
const twitterBtn = document.getElementById('twitter-btn');
const tooltip = document.getElementById('tooltip');
const viewFavoritesBtn = document.getElementById('view-favorites-btn');
const favoritesPanel = document.getElementById('favorites-panel');
const closePanelBtn = document.querySelector('#favorites-panel .close-panel-btn');
const favoritesList = document.getElementById('favorites-list');

// --- STATE & DATA ---
let activeBg = 1;
let currentQuote = {};
let currentMood = 'inspirational';
const quotesByMood = {
    love: [ { quote: "The best thing to hold onto in life is each other.", person: "Audrey Hepburn" },
        { quote: "To love and be loved is to feel the sun from both sides.", person: "David Viscott" }, 
        { quote: "You know you're in love when you can't fall asleep because reality is finally better than your dreams.", person: "Dr. Seuss" },
        { quote: "Love is composed of a single soul inhabiting two bodies.", person: "Aristotle" },
        { quote: "If I know what love is, it is because of you.", person: "Hermann Hesse" },
        { quote: "The giving of love is an education in itself.", person: "Eleanor Roosevelt" },
        { quote: "There is only one happiness in this life, to love and be loved.", person: "George Sand" }, 
        { quote: "A friend is someone who knows all about you and still loves you.", person: "Elbert Hubbard" }, 
        { quote: "Love is an irresistible desire to be irresistibly desired.", person: "Robert Frost" }, 
        { quote: "To the world you may be one person, but to one person you are the world.", person: "Dr. Seuss" } ],

    happiness: [ { quote: "For every minute you are angry you lose sixty seconds of happiness.", person: "Ralph Waldo Emerson" }, 
        { quote: "The purpose of our lives is to be happy.", person: "Dalai Lama" }, 
        { quote: "Happiness is not something ready made. It comes from your own actions.", person: "Dalai Lama" }, 
        { quote: "Be happy for this moment. This moment is your life.", person: "Omar Khayyam" }, 
        { quote: "It is not how much we have, but how much we enjoy, that makes happiness.", person: "Charles Spurgeon" }, 
        { quote: "Happiness is when what you think, what you say, and what you do are in harmony.", person: "Mahatma Gandhi" }, 
        { quote: "The greatest happiness you can have is knowing that you do not necessarily require happiness.", person: "William Saroyan" }, 
        { quote: "Sanity and happiness are an impossible combination.", person: "Mark Twain" }, 
        { quote: "Happiness depends upon ourselves.", person: "Aristotle" }, 
        { quote: "The only thing that will make you happy is being happy with who you are.", person: "Goldie Hawn" } ],

    inspirational: [ { quote: "The best way to predict the future is to create it.", person: "Peter Drucker" }, 
        { quote: "Believe you can and you're halfway there.", person: "Theodore Roosevelt" }, 
        { quote: "The only way to do great work is to love what you do.", person: "Steve Jobs" }, 
        { quote: "Success is not final, failure is not fatal: it is the courage to continue that counts.", person: "Winston Churchill" }, 
        { quote: "Everything you’ve ever wanted is on the other side of fear.", person: "George Addair" }, 
        { quote: "Hardships often prepare ordinary people for an extraordinary destiny.", person: "C.S. Lewis" }, 
        { quote: "The future belongs to those who believe in the beauty of their dreams.", person: "Eleanor Roosevelt" },
        { quote: "You are never too old to set another goal or to dream a new dream.", person: "C.S. Lewis" }, 
        { quote: "What you get by achieving your goals is not as important as what you become by achieving your goals.", person: "Zig Ziglar" }, 
        { quote: "Act as if what you do makes a difference. It does.", person: "William James" } ],

    wisdom: [ { quote: "The only true wisdom is in knowing you know nothing.", person: "Socrates" }, 
        { quote: "The journey of a thousand miles begins with a single step.", person: "Lao Tzu" }, 
        { quote: "Knowing yourself is the beginning of all wisdom.", person: "Aristotle" }, 
        { quote: "Count your age by friends, not years. Count your life by smiles, not tears.", person: "John Lennon" }, 
        { quote: "The unexamined life is not worth living.", person: "Socrates" }, 
        { quote: "Turn your wounds into wisdom.", person: "Oprah Winfrey" }, 
        { quote: "Yesterday I was clever, so I wanted to change the world. Today I am wise, so I am changing myself.", person: "Rumi" }, 
        { quote: "It is the mark of an educated mind to be able to entertain a thought without accepting it.", person: "Aristotle" }, 
        { quote: "The fool doth think he is wise, but the wise man knows himself to be a fool.", person: "William Shakespeare" }, 
        { quote: "Never let your sense of morals prevent you from doing what is right.", person: "Isaac Asimov" } ]
};
const backgroundsByMood = {
    love: 'linear-gradient(135deg, #ff0844 0%, #ffb199 100%)',
    happiness: 'linear-gradient(to right, #43e97b 0%, #38f9d7 100%)',
    inspirational: 'linear-gradient(120deg, #f6d365 0%, #fda085 100%)',
    wisdom: 'linear-gradient(to top, #30cfd0 0%, #330867 100%)'
};

// --- CORE FUNCTIONS ---
function displayNewQuote(tag) {
    currentMood = tag;
    moodButtons.forEach(btn => btn.classList.toggle('active', btn.dataset.tag === tag));
    const quoteLibrary = quotesByMood[tag];
    if (!quoteLibrary) return;
    const quoteData = quoteLibrary[Math.floor(Math.random() * quoteLibrary.length)];
    currentQuote = { id: quoteData.quote, quote: quoteData.quote, person: quoteData.person };
    updateQuoteText(currentQuote.quote, currentQuote.person);
    checkIfFavorited();
    const newBackground = backgroundsByMood[tag];
    if (newBackground) { changeBackground(newBackground); }
}

function updateQuoteText(quote, person) {
    quoteWrapper.style.opacity = 0;
    setTimeout(() => {
        quoteEl.textContent = `“${quote}”`;
        personEl.textContent = `—${person}`;
        quoteWrapper.style.opacity = 1;
    }, 400);
}

function changeBackground(newBackground) {
    const hiddenBg = (activeBg === 1) ? bg2 : bg1;
    const activeBgEl = (activeBg === 1) ? bg1 : bg2;
    hiddenBg.style.backgroundImage = newBackground;
    activeBgEl.style.opacity = 0;
    hiddenBg.style.opacity = 1;
    activeBg = (activeBg === 1) ? 2 : 1;
}

// --- SHARE AND COPY FUNCTIONS ---
function copyQuote() {
    if (currentQuote.quote) {
        const quoteText = `“${currentQuote.quote}” —${currentQuote.person}`;
        navigator.clipboard.writeText(quoteText).then(() => {
            tooltip.classList.add('visible');
            setTimeout(() => tooltip.classList.remove('visible'), 2000);
        }).catch(err => console.error('Failed to copy: ', err));
    }
}

function shareOnTwitter() {
    if (currentQuote.quote) {
        const quoteText = `“${currentQuote.quote}” —${currentQuote.person}`;
        const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(quoteText)}`;
        window.open(twitterUrl, '_blank');
    }
}


// --- FAVORITES (localStorage) FUNCTIONS ---
function getFavorites() { return JSON.parse(localStorage.getItem('favoriteQuotes')) || []; }
function toggleFavorite() {
    if (!currentQuote.id) return;
    let favorites = getFavorites();
    const isFavorited = favorites.some(fav => fav.id === currentQuote.id);
    if (isFavorited) { favorites = favorites.filter(fav => fav.id !== currentQuote.id); } 
    else { favorites.push(currentQuote); }
    localStorage.setItem('favoriteQuotes', JSON.stringify(favorites));
    checkIfFavorited();
}
function checkIfFavorited() {
    const favorites = getFavorites();
    const isFavorited = currentQuote.id && favorites.some(fav => fav.id === currentQuote.id);
    favoriteBtn.classList.toggle('favorited', isFavorited);
}
function displayFavorites() {
    const favorites = getFavorites();
    favoritesList.innerHTML = '';
    if (favorites.length === 0) {
        favoritesList.innerHTML = '<p>You haven\'t saved any favorites yet.</p>';
        return;
    }
    favorites.forEach((fav, index) => {
        const item = document.createElement('div');
        item.classList.add('panel-list-item');
        item.innerHTML = `<p>"${fav.quote}"</p><span>—${fav.person}</span><button class="delete-item-btn" data-index="${index}" title="Remove Favorite">&times;</button>`;
        favoritesList.appendChild(item);
    });
}
function removeFavorite(indexToRemove) {
    let favorites = getFavorites();
    favorites.splice(indexToRemove, 1);
    localStorage.setItem('favoriteQuotes', JSON.stringify(favorites));
    displayFavorites();
    checkIfFavorited();
}

// --- EVENT LISTENERS ---
startAppBtn.addEventListener('click', () => {
    welcomeModal.classList.add('hidden');
    displayNewQuote('inspirational');
});
moodButtons.forEach(button => button.addEventListener('click', () => displayNewQuote(button.dataset.tag)));
newQuoteBtn.addEventListener('click', () => displayNewQuote(currentMood));
favoriteBtn.addEventListener('click', toggleFavorite);
copyBtn.addEventListener('click', copyQuote);
twitterBtn.addEventListener('click', shareOnTwitter);
viewFavoritesBtn.addEventListener('click', () => {
    displayFavorites();
    favoritesPanel.classList.add('open');
});
closePanelBtn.addEventListener('click', () => {
    favoritesPanel.classList.remove('open');
});
favoritesList.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete-item-btn')) {
        removeFavorite(parseInt(e.target.dataset.index, 10));
    }
});