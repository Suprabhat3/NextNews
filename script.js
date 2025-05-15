const API_CONFIG = {
baseUrl: 'https://newsapi.org/v2/everything',
apiKey: '4595bf9101284994b437245ab828d05b',
defaultQuery: 'India',
defaultFrom: '2025-04-15',
defaultSortBy: 'publishedAt'
};

// State variables
let currentQuery = API_CONFIG.defaultQuery;
let currentCategory = 'general';
let currentPage = 1;
let totalPages = 1;
let articlesPerPage = 9;

// DOM Elements
const newsContainer = document.getElementById('news-container');
const loadingElement = document.getElementById('loading');
const errorContainer = document.getElementById('error-container');
const categoryTitle = document.getElementById('current-category');
const paginationContainer = document.getElementById('pagination');
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const navLinks = document.querySelectorAll('.nav-links a');

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
// Set default search input value
searchInput.value = currentQuery;

// Fetch news on load
fetchNews();

// Event listeners
searchButton.addEventListener('click', handleSearch);
searchInput.addEventListener('keypress', (e) => {
if (e.key === 'Enter') {
handleSearch();
}
});

// Add click event listeners to navigation links
navLinks.forEach(link => {
link.addEventListener('click', (e) => {
e.preventDefault();

// Update active class
navLinks.forEach(nav => nav.classList.remove('active'));
link.classList.add('active');

// Update current category
currentCategory = link.getAttribute('data-category');
currentPage = 1;

// Update category title
if (currentCategory === 'general') {
categoryTitle.textContent = `Top Stories from ${currentQuery || 'India'}`;
} else {
categoryTitle.textContent = `${capitalizeFirstLetter(currentCategory)} News about ${currentQuery || 'India'}`;
}

// Fetch news for the selected category
fetchNews();
});
});
});

// Handle search
function handleSearch() {
const searchTerm = searchInput.value.trim();
if (searchTerm) {
currentQuery = searchTerm;
currentPage = 1;

// Update category title
if (currentCategory === 'general') {
categoryTitle.textContent = `Top Stories from ${currentQuery}`;
} else {
categoryTitle.textContent = `${capitalizeFirstLetter(currentCategory)} News about ${currentQuery}`;
}

fetchNews();
}
}

// Fetch news from API
async function fetchNews() {
showLoading(true);
clearError();

try {
// Construct API URL with query parameters
const url = new URL(API_CONFIG.baseUrl);
url.searchParams.append('q', currentQuery);
url.searchParams.append('from', API_CONFIG.defaultFrom);
url.searchParams.append('sortBy', API_CONFIG.defaultSortBy);
url.searchParams.append('apiKey', API_CONFIG.apiKey);

// Fetch data from API
const response = await fetch(url);
const data = await response.json();

if (data.status === 'error') {
throw new Error(data.message || 'Failed to fetch news');
}

if (data.articles && data.articles.length > 0) {
// Calculate total pages
totalPages = Math.ceil(data.articles.length / articlesPerPage);

// Get articles for current page
const startIndex = (currentPage - 1) * articlesPerPage;
const endIndex = startIndex + articlesPerPage;
const paginatedArticles = data.articles.slice(startIndex, endIndex);

// Display articles
displayNews(paginatedArticles);

// Update pagination
updatePagination();
} else {
newsContainer.innerHTML = '<p class="error-message">No articles found for your query. Try another search term.</p>';
}
} catch (error) {
showError(error.message);
} finally {
showLoading(false);
}
}

// Display news articles
function displayNews(articles) {
newsContainer.innerHTML = '';

articles.forEach(article => {
const articleDate = new Date(article.publishedAt);
const formattedDate = articleDate.toLocaleDateString('en-US', {
year: 'numeric',
month: 'long',
day: 'numeric'
});

// Create article card
const articleCard = document.createElement('div');
articleCard.className = 'news-card';

// Add placeholder if image is not available or null
const imageUrl = article.urlToImage || '/api/placeholder/400/320';

articleCard.innerHTML = `
<div class="news-image">
<img src="${imageUrl}" alt="${article.title}" onerror="this.src='/api/placeholder/400/320'">
</div>
<div class="news-content">
<p class="news-source">${article.source.name || 'Unknown Source'}</p>
<h3 class="news-title">${article.title}</h3>
<p class="news-desc">${article.description || 'No description available'}</p>
<p class="news-date">${formattedDate}</p>
<a href="${article.url}" class="read-more" target="_blank">Read Full Story</a>
</div>
`;

newsContainer.appendChild(articleCard);
});
}

// Update pagination controls
function updatePagination() {
paginationContainer.innerHTML = '';

// Only show pagination if there are multiple pages
if (totalPages <= 1) return;

// Previous button
const prevButton = document.createElement('button');
prevButton.textContent = '← Previous';
prevButton.disabled = currentPage === 1;
prevButton.addEventListener('click', () => {
if (currentPage > 1) {
currentPage--;
fetchNews();
window.scrollTo(0, 0);
}
});
paginationContainer.appendChild(prevButton);

// Page number buttons (show up to 5 page numbers)
const maxPagesToShow = 5;
let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

// Adjust startPage if needed
if (endPage - startPage + 1 < maxPagesToShow) {
startPage = Math.max(1, endPage - maxPagesToShow + 1);
}

for (let i = startPage; i <= endPage; i++) {
const pageButton = document.createElement('button');
pageButton.textContent = i;
pageButton.className = i === currentPage ? 'active' : '';
pageButton.addEventListener('click', () => {
currentPage = i;
fetchNews();
window.scrollTo(0, 0);
});
paginationContainer.appendChild(pageButton);
}

// Next button
const nextButton = document.createElement('button');
nextButton.textContent = 'Next →';
nextButton.disabled = currentPage === totalPages;
nextButton.addEventListener('click', () => {
if (currentPage < totalPages) {
currentPage++;
fetchNews();
window.scrollTo(0, 0);
}
});
paginationContainer.appendChild(nextButton);
}

// Show/hide loading spinner
function showLoading(isLoading) {
loadingElement.style.display = isLoading ? 'flex' : 'none';

if (isLoading) {
newsContainer.innerHTML = '';
}
}

// Show error message
function showError(message) {
errorContainer.innerHTML = `
<div class="error-message">
<p>${message}</p>
</div>
`;
}

// Clear error message
function clearError() {
errorContainer.innerHTML = '';
}

// Helper function to capitalize first letter
function capitalizeFirstLetter(string) {
return string.charAt(0).toUpperCase() + string.slice(1);
}
