export const tagsEngine = (recipes, tags) => {
    return recipes.filter(recipe => recipeMatches(recipe, tags))
}

const recipeMatches = (recipe, tags) => (
    ingredientTagEngine(recipe, tags) && applianceTagEngine(recipe, tags) && ustensilTagEngine(recipe, tags)
)

const ingredientTagEngine = (recipe, tags) => {
    const ingredientTags = tags['ingredient-dropdown']
    if (!ingredientTags) return true
    const filteredIngredients = recipe.ingredients.filter(ingredient => ingredientTags.includes(ingredient.ingredient))
    const recipeMatchesAllIngredients = filteredIngredients.length >= ingredientTags.length
    return recipeMatchesAllIngredients
}

const applianceTagEngine = (recipe, tags) => {
    const applianceTags = tags['appliance-dropdown']
    if (!applianceTags) return true
    if (applianceTags.length !== 1) return false
    const recipeMatchesAppliance = applianceTags[0] === recipe.appliance
    return recipeMatchesAppliance
}

const ustensilTagEngine = (recipe, tags) => {
    const ustensilTags = tags['ustensil-dropdown']
    if (!ustensilTags) return true
    const filteredUstensils = recipe.ustensils.filter(ustensil => ustensilTags.includes(ustensil))
    const recipeMatchesAllUstensils = filteredUstensils.length >= ustensilTags.length
    return recipeMatchesAllUstensils
}