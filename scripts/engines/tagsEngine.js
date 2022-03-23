export const tagsEngine = (recipes, tags) => {

    const recipesFound = []

    for (let i=0; i < recipes.length; i++) {
        let recipe = recipes[i]
        if (recipeMatches(recipe, tags)) recipesFound.push(recipe)
    }

    return recipesFound
}

const recipeMatches = (recipe, tags) => (
    ingredientTagEngine(recipe, tags) && applianceTagEngine(recipe, tags) && ustensilTagEngine(recipe, tags)
)

const ingredientTagEngine = (recipe, tags) => {

    const ingredientTags = tags['ingredient-dropdown']

    if (!ingredientTags) return true

    const ingredientsFound = []

    for (let i=0; i < recipe.ingredients.length; i++) {

        let item = recipe.ingredients[i]

        if (ingredientTags.includes(item.ingredient)) ingredientsFound.push(item)

    }

    const recipeMatchesAllIngredients = ingredientsFound.length >= ingredientTags.length

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

    const ustensilsFound = []

    for (let i=0; i < recipe.ustensils.length; i++) {

        let ustensil = recipe.ustensils[i]

        if (ustensilTags.includes(ustensil)) ustensilsFound.push(ustensil)

    }

    const recipeMatchesAllUstensils = ustensilsFound.length >= ustensilTags.length

    return recipeMatchesAllUstensils

}