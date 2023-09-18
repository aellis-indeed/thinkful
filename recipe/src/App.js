import React, { useState } from "react";
import "./App.css";
import RecipeCreate from "./RecipeCreate";
import RecipeList from "./RecipeList";
import RecipeData from "./RecipeData"

function App() {
  const [recipes, setRecipes] = useState(RecipeData);

  // TODO: Add the ability for the <RecipeList /> component to list and delete an existing recipe.
  // TODO: Add the ability for the <RecipeCreate /> component to create new recipes.

  const handleCreate = (recipe) => {
    recipe.key = recipe.name.replace(/\s/g, "-") + "-" + recipe.cuisine.replace(/\s/g,"-");
    setRecipes([...recipes, recipe]);
  };

  const deleteRecipe = (indexToDelete) => {
    setRecipes(recipes.filter((ignored, index) => index !== indexToDelete));
  }
  
  return (
    <div className="App">
      <header><h1>Delicious Food Recipes</h1></header>
      <RecipeList recipes={recipes} deleteRecipe={deleteRecipe} />
      <RecipeCreate handleCreate={handleCreate} />
    </div>
  );
}

export default App;
