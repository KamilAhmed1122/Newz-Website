// Dark Mode Toggle
const darkModeToggle = document.getElementById('darkModeToggle');
darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
});
if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-mode');
}

// Fetch and Display News from API
const API_KEY = 'YOUR_NEWSAPI_KEY';
const newsList = document.getElementById('newsList');

async function fetchNews() {
    const response = await fetch(`https://newsapi.org/v2/top-headlines?country=us&category=technology&apiKey=cb44d54bfed04c3fa4867a3762c7eab4`);
    const data = await response.json();
    newsList.innerHTML = data.articles.map(article => `
        <div class="news-item">
            <h3>${article.title}</h3>
            <p>${article.description}</p>
            <a href="${article.url}" target="_blank">Read more</a>
        </div>
    `).join('');
}

fetchNews();

document.getElementById('searchInput').addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    document.querySelectorAll('.news-item').forEach(item => {
        item.style.display = item.innerText.toLowerCase().includes(searchTerm) ? '' : 'none';
    });
});