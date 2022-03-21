export function getResultsFilteredByTags (results) {

    const tags = document.querySelectorAll('#tags li')
    if (tags.length === 0) {
        return results
    }

    const tagsGroupedByDropdownID = [...tags].reduce((acc, tag) => {
        const dropdownID = tag.getAttribute('data-origin')
        const tagValue = tag.getAttribute('value')
        return {
            ...acc,
            [dropdownID] : [
                ...acc[dropdownID] || [],
                tagValue
            ]
        }
    }, {})

    return results.filter(recipe => tagEngine(recipe, tagsGroupedByDropdownID))
}

const tagEngine = (recipe, tags) => (
    ingredientTagEngine(recipe, tags) && applianceTagEngine(recipe, tags) && ustensilTagEngine(recipe, tags)
)

const ingredientTagEngine = (recipe, tags) => {
    const ingredientTags = tags['ingredient-dropdown']
    if (!ingredientTags) return true
    return recipe.ingredients.filter(ingredient => ingredientTags.includes(ingredient.ingredient)).length > 0
}

const applianceTagEngine = (recipe, tags) => {
    const applianceTags = tags['appliance-dropdown']
    if (!applianceTags) return true
    return applianceTags.includes(recipe.appliance)
}

const ustensilTagEngine = (recipe, tags) => {
    const ustensilTags = tags['ustensil-dropdown']
    if (!ustensilTags) return true
    return recipe.ustensils.filter(ustensil => ustensilTags.includes(ustensil)).length > 0
}