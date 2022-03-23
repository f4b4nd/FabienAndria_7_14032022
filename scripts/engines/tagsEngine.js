export const tagsEngine = (recipes, tags) => {
    /** TO COMPLETE */
}

const recipeMatches = (recipe, tags) => (
    ingredientTagEngine(recipe, tags) && applianceTagEngine(recipe, tags) && ustensilTagEngine(recipe, tags)
)

const ingredientTagEngine = (recipe, tags) => {
    const ingredientTags = tags['ingredient-dropdown']
    if (!ingredientTags) return true
    /** TO COMPLETE */
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
    /** TO COMPLETE */
}