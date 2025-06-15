const API_BASE = 'https://forkify-api.herokuapp.com/api/search?q=';
const container = document.getElementById('recipes-container');
const loader = document.getElementById('loader');
const buttonsContainer = document.getElementById('buttons-container');
const backButtonContainer = document.getElementById('back-button-container');
const backButton = document.getElementById('back-button');

function showLoader() {
  loader.classList.remove('hidden');
  container.innerHTML = ''; 
}

function hideLoader() {
  loader.classList.add('hidden');
}

async function fetchRecipes(query) {
  showLoader();

  try {
    const response = await fetch(`${API_BASE}${query}`);
    const data = await response.json();

    hideLoader();

    if (!data.recipes || data.recipes.length === 0) {
      container.innerHTML = `<p class="placeholder">No recipes found for "${query}".</p>`;
      return;
    }

    container.innerHTML = data.recipes.map(recipe => `
      <div class="card">
        <img src="${recipe.image_url}" alt="${recipe.title}" />
        <div class="card-content">
          <h3 class="card-title">${recipe.title}</h3>
          <p class="card-description">Publisher: ${recipe.publisher}</p>
        </div>
      </div>
    `).join('');

    backButtonContainer.classList.remove('hidden');
  } catch (err) {
    hideLoader();
    container.innerHTML = `<p class="placeholder">Error loading data. Please try again later.</p>`;
    console.error('Fetch error:', err);
  }
}

document.querySelectorAll('nav button').forEach(button => {
  button.addEventListener('click', () => {
    const query = button.dataset.query;

    buttonsContainer.style.display = 'none'; 
    fetchRecipes(query);                   
  });
});

backButton.addEventListener('click', () => {
  buttonsContainer.style.display = 'block';
  container.innerHTML = ''; 
  backButtonContainer.classList.add('hidden'); 
});