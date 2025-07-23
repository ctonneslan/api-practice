import "./styles.css";

const API_KEY = "7hOvll3XDu1kqUu93k0dUM5O8IHoZaXN";
const gifContainer = document.getElementById("gif-container");
const searchBox = document.getElementById("search-box");
const searchBtn = document.getElementById("search-btn");
const newGifBtn = document.getElementById("new-gif-btn");
let currentQuery = "funny";

async function fetchGif(query) {
  const url = `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${encodeURIComponent(
    query
  )}&limit=25&offset=${Math.floor(Math.random() * 25)}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (!data.data.length) {
      displayError("No GIFs found. Try a different keyword.");
      return;
    }

    const gifUrl = data.data[0].images.original.url;
    displayGif(gifUrl);
  } catch (err) {
    displayError("An error occurred while fetching GIF.");
  }
}

function displayGif(url) {
  gifContainer.innerHTML = `<img src="${url}" alt="GIF">`;
}

function displayError(message) {
  gifContainer.innerHTML = `<p class="error">${message}</p>`;
}

searchBtn.addEventListener("click", () => {
  currentQuery = searchBox.value.trim();
  if (currentQuery) {
    fetchGif(currentQuery);
  }
});

newGifBtn.addEventListener("click", () => {
  if (currentQuery) {
    fetchGif(currentQuery);
  }
});

fetchGif(currentQuery);
