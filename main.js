fetch('https://api.openweathermap.org/data/2.5/weather?q=India,IN&appid=9fd7a449d055dba26a982a3220f32aa2')
  .then(response => response.json())
  .then(data => {
    // Extract weather data from API response
    const temperature = Math.round(data.main.temp - 273.15); // Convert Kelvin to Celsius
    const feelsLike = Math.round(data.main.feels_like - 273.15); // Convert Kelvin to Celsius
    const humidity = data.main.humidity;
    const windSpeed = data.wind.speed;
    const description = data.weather[0].description;
    const sunrise = new Date(data.sys.sunrise * 1000).toLocaleTimeString(); // Convert UNIX timestamp to local time
    const sunset = new Date(data.sys.sunset * 1000).toLocaleTimeString(); // Convert UNIX timestamp to local time

    // Display weather data on webpage
    document.getElementById('temperature').textContent = `${temperature}°C`;
    document.getElementById('feels-like').textContent = `${feelsLike}°C`;
    document.getElementById('humidity').textContent = `${humidity}%`;
    document.getElementById('wind-speed').textContent = `${windSpeed} m/s`;
    document.getElementById('description').textContent = description;
    document.getElementById('sunrise').textContent = sunrise;
    document.getElementById('sunset').textContent = sunset;
  })
  .catch(error => {
    console.error('Failed to fetch weather data', error);
  });
// Fetch Indian meals data from MealDB API
fetch('https://www.themealdb.com/api/json/v1/1/filter.php?a=Indian')
  .then(response => response.json())
  .then(data => {
    const meals = data.meals.slice(0, 5); // Extract first 5 meals

    // Display meals on webpage
    const mealList = document.querySelector('#meals ul');
    meals.forEach(meal => {
      fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal.idMeal}`)
        .then(response => response.json())
        .then(data => {
          const ingredients = data.meals[0];
          const ingredientList = [];
          // Extract first 5 ingredients
          for (let i = 1; i <= 5; i++) {
            if (ingredients[`strIngredient${i}`]) {
              ingredientList.push(ingredients[`strIngredient${i}`]);
            } else {
              break;
            }
          }
          // Display meal with ingredients on webpage
          const mealItem = `
            <li>
              <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
              <h3>${meal.strMeal}</h3>
              <p>Ingredients: ${ingredientList.join(', ')}</p>
            </li>
          `;
          mealList.innerHTML += mealItem;
        })
        .catch(error => {
          console.error(`Failed to fetch ingredients for ${meal.strMeal}`, error);
        });
    });
  })
  .catch(error => {
    console.error('Failed to fetch Indian meals data', error);
  });
