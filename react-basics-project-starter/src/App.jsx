import React, { useState } from "react";
import { RecipeListPage } from "./pages/RecipeListPage";
import { RecipePage } from "./pages/RecipePage";

export const App = () => {
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const handleSelectRecipe = (recipe) => {
    setSelectedRecipe(recipe);
  };

  const handleBack = () => {
    setSelectedRecipe(null);
  };

  return (
    <>
      {selectedRecipe ? (
        <RecipePage recipe={selectedRecipe} onBack={handleBack} />
      ) : (
        <RecipeListPage onSelectRecipe={handleSelectRecipe} />
      )}
    </>
  );
};

export default App;
