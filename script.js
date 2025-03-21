const apiURL = "https://www.themealdb.com/api/json/v1/1/search.php?s=";

const formSearch = document.querySelector(".searchForm");
const searchBtn = document.querySelector("#searchBtn");
const input = document.querySelector("#input");

formSearch.addEventListener("submit", (event) => {
  event.preventDefault();
  clearContent();
  let searchMeal = input.value.trim();
  if (searchMeal === "") {
    alert("Please enter the name of the recipe you want to search");
  }

  fetch(apiURL + searchMeal)
    .then((response) => response.json())
    .then((data) => {
      const meal = data.meals[0];
      const recipeName = meal.strMeal;
      const recipeCategory = meal.strCategory;
      const recipeOrigin = meal.strArea;
      const ingredients = [];

      for (let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}`]?.trim();
        const measure = meal[`strMeasure${i}`]?.trim();

        if (ingredient && ingredient !== "") {
          ingredients.push(`${ingredient} - ${measure}`.trim());
        }
      }

      const instructions = meal.strInstructions
        .split("\r\n\r\n") // Split steps by double line breaks
        .map((step) => `<p>${step}</p><br>`) // Wrap each step in <p> tags
        .join(""); // Join everything into a single string

      const contentMeal = document.querySelector(".contentMeal");

      // Create a panel for facts
      const factsPanel = document.createElement("div");
      factsPanel.classList.add("factsPanel");
      contentMeal.appendChild(factsPanel);

      const listFacts = document.createElement("ul");
      listFacts.classList.add("listFacts");
      factsPanel.appendChild(listFacts);
      const li1 = document.createElement("li");
      li1.innerText = `Recipe Name: ${recipeName}`;
      listFacts.appendChild(li1);
      const li2 = document.createElement("li");
      li2.innerText = `Recipe Category: ${recipeCategory}`;
      listFacts.appendChild(li2);
      const li3 = document.createElement("li");
      li3.innerText = `Recipe Origin: ${recipeOrigin}`;
      listFacts.appendChild(li3);

      // create a panel for ingredients
      const ingredientsPanel = document.createElement("div");
      ingredientsPanel.classList.add("ingredientsPanel");
      contentMeal.appendChild(ingredientsPanel);

      const ingredientList = document.createElement("ul");
      ingredientList.classList.add("ingredientList");

      ingredientsPanel.innerHTML = `<h3>Ingredients</h3>`;
      for (let i = 0; i < ingredients.length; i++) {
        const ingredient = ingredients[i];
        const item = document.createElement("li");
        item.innerText = ingredient;
        ingredientList.append(item);
      }
      ingredientsPanel.append(ingredientList);

      // create a panel for instructions
      instructionsPanel = document.createElement("div");
      instructionsPanel.classList.add("instructionsPanel");
      contentMeal.appendChild(instructionsPanel);

      instructionsPanel.innerHTML = `<h3>Instructions</h3>`;
      instructionsPanel.innerHTML += instructions;

      const recipe = {
        name: recipeName,
        category: recipeCategory,
        origin: recipeOrigin,
        ingredients: ingredients,
        instructions: instructions,
      };
      //need to know if the user is logged in, than save the recipe

      const logToSave = document.createElement("a");
      logToSave.innerHTML = `<a href="login.html" target="_blank">Log to save recipe</a>`;
      contentMeal.appendChild(logToSave);

      if (isLogged()) {
        saveRecipeOrLogOut(recipe, contentMeal);
        contentMeal.removeChild(logToSave);
      } else {
        document.addEventListener("visibilitychange", () => {
          if (document.visibilityState === "hidden") {
            saveRecipeOrLogOut(recipe, contentMeal);
            contentMeal.removeChild(logToSave);
          }
        });
      }

      input.value = "";
    })
    .catch((error) => {
      const contentMeal = document.querySelector(".contentMeal");
      contentMeal.innerHTML = `<p>The recipe you searched for does not exist or could not be found.</p>`;
      contentMeal.classList.add("error");
      input.value = "";
      console.log(error);
    });
});

function clearContent() {
  const contentMeal = document.querySelector(".contentMeal");
  contentMeal.innerHTML = "";
}

function saveRecipeOrLogOut(recipe, contentMeal) {
  const saveRecipeBtn = document.createElement("button");
  saveRecipeBtn.innerText = "Save Recipe";
  saveRecipeBtn.classList.add("saveRecipeBtn");

  saveRecipeBtn.addEventListener("click", () => onClickedSave(recipe));
  contentMeal.appendChild(saveRecipeBtn);

  const logOut = document.createElement("button");
  logOut.innerText = "Log Out";
  logOut.classList.add("logOut");
  logOut.addEventListener("click", () => onClickedLogOut(logOut));
  contentMeal.appendChild(logOut);
}

function onClickedSave(recipe) {
  const users = JSON.parse(localStorage.getItem("users"));

  const user = users.find((user) => user.status === "loggedIn");
  if (user) {
    user.savedRecipes.push(recipe);
    console.log(user);
    localStorage.setItem("users", JSON.stringify(users));
    alert("Recipe saved successfully!");
  }
}

function onClickedLogOut(logOut) {
  const users = JSON.parse(localStorage.getItem("users"));
  const user = users.find((user) => user.status === "loggedIn");
  if (user) {
    user.status = "notLoggedIn";
    localStorage.setItem("users", JSON.stringify(users));
    logOut.remove();
    window.location.reload();
  }
}

function isLogged() {
  const users = JSON.parse(localStorage.getItem("users"));
  const user = users.find((user) => user.status === "loggedIn");
  if (user) {
    return true;
  } else {
    return false;
  }
}
