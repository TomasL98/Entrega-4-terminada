document.getElementById('pokemonForm').addEventListener('submit', async function(event) {
    event.preventDefault(); // Prevenir el envío del formulario
    
    // Obtener el valor del input
    const pokemonId = document.getElementById('pokemonId').value;
  
    // Verificar si el valor es un número
    if (isNaN(pokemonId) || pokemonId === '') {
      renderErrorMessage('Ingrese un número válido.');
      return;
    }
  
    try {
      // Llamada a la API de Pokémon
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
      if (!response.ok) {
        throw new Error('Pokémon no encontrado');
      }
      const pokemon = await response.json();
  
      // Renderizar la card del Pokémon
      renderPokemonCard(pokemon);
    } catch (error) {
      renderErrorMessage(error.message);
    }
  });
  
  // Función para renderizar la card del Pokémon
  function renderPokemonCard(pokemon) {
    const resultContainer = document.getElementById('resultContainer');
    resultContainer.innerHTML = ''; // Limpiar el contenedor
  
    const card = document.createElement('div');
    card.classList.add('card');
  
    const img = document.createElement('img');
    img.src = pokemon.sprites.front_default;
    img.alt = pokemon.name;
    card.appendChild(img);
  
    const name = document.createElement('h2');
    name.textContent = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
    card.appendChild(name);
  
    const type = document.createElement('p');
    type.classList.add('type');
    type.textContent = `Tipo: ${pokemon.types.map(typeInfo => typeInfo.type.name).join(', ')}`;
    card.appendChild(type);
  
    const height = document.createElement('p');
    height.classList.add('height');
    height.textContent = `Altura: ${(pokemon.height / 10).toFixed(1)} m`;
    card.appendChild(height);
  
    const weight = document.createElement('p');
    weight.classList.add('weight');
    weight.textContent = `Peso: ${(pokemon.weight / 10).toFixed(1)} kg`;
    card.appendChild(weight);
  
    resultContainer.appendChild(card);
  }
  
  // Función para renderizar mensajes de error
  function renderErrorMessage(message) {
    const resultContainer = document.getElementById('resultContainer');
    resultContainer.innerHTML = ''; // Limpiar el contenedor
  
    const error = document.createElement('p');
    error.textContent = message;
    error.classList.add('error-message');
  
    resultContainer.appendChild(error);
  }