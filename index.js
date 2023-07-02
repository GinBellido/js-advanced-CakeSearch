"use strict";

const cakeRecipes = require("./cake-recipes.json");
console.log(cakeRecipes[0]);

let allRecipes;

// Function to search recipes based on given search parameters
function searchRecipes(recipes, searchParams) {
  return recipes.filter(
    (recipe) =>
      (!searchParams.ingredients ||
        searchParams.ingredients.every((ingredient) =>
          recipe.Ingredients.some((recipeIngredient) =>
            recipeIngredient.toLowerCase().includes(ingredient.toLowerCase())
          )
        )) &&
      (!searchParams.author ||
        searchParams.author.some(
          (author) =>
            recipe.Author &&
            recipe.Author.toLowerCase().includes(author.toLowerCase())
        )) &&
      (!searchParams.searchterms ||
        searchParams.searchterms
          .split(" ")
          .every(
            (term) =>
              recipe.Name.toLowerCase().includes(term) ||
              (recipe.Description &&
                recipe.Description.toLowerCase().includes(term))
          ))
  );
}

// Example search parameters
const searchParams = {
  ingredients: ["egg"], // Removed the ingredients search parameter
  author: ["Sarah Cook"],
  searchterms: "pancakes",
};

// get recipes from json and save them in local constant
fetch("./cake-recipes.json")
  .then((response) => response.json())
  .then((cakeRecipes) => {
    allRecipes = cakeRecipes;
    const matchingRecipes = searchRecipes(allRecipes, searchParams);
    console.log(matchingRecipes);
  })
  .catch((error) => {
    console.error("Error:", error);
  });
