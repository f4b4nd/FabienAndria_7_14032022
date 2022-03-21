export function tagsEngine (recipes) {

    const tags = document.querySelectorAll('#tags li')
    if (tags.length === 0) {
        return recipes
    }

    const tagsGroupedByDataOrigin = [...tags].reduce((acc, tag) => {
        const tagOrigin = tag.getAttribute('data-origin')
        const tagValue = tag.getAttribute('value')
        return {
            ...acc,
            [tagOrigin] : [
                ...acc[tagOrigin] || [],
                tagValue
            ]
        }
    }, {})

    return recipes.filter(recipe => recipeTagEngine(recipe, tagsGroupedByDataOrigin))
}

const recipeTagEngine = (recipe, tags) => (
    ingredientTagEngine(recipe, tags) && applianceTagEngine(recipe, tags) && ustensilTagEngine(recipe, tags)
)

const ingredientTagEngine = (recipe, tags) => {
    const ingredientTags = tags['ingredient-dropdown']
    if (!ingredientTags) return true
    const filteredIngredients = recipe.ingredients.filter(ingredient => ingredientTags.includes(ingredient.ingredient))
    const recipeMatches = filteredIngredients.length >= ingredientTags.length
    return recipeMatches
}

const applianceTagEngine = (recipe, tags) => {
    const applianceTags = tags['appliance-dropdown']
    if (!applianceTags) return true
    if (applianceTags.length !== 1) return false
    const recipeMatches = applianceTags[0] === recipe.appliance
    return recipeMatches
}

const ustensilTagEngine = (recipe, tags) => {
    const ustensilTags = tags['ustensil-dropdown']
    if (!ustensilTags) return true
    const filteredUstensils = recipe.ustensils.filter(ustensil => ustensilTags.includes(ustensil))
    const recipeMatches = filteredUstensils.length >= ustensilTags.length
    return recipeMatches
}