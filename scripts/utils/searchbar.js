import { displayRecipes } from "../index.js"
import recipes from "../../data/recipes.js"

export function searchBarListener () {
    const searchBarInput = document.getElementById('search-bar')
    searchBarInput.addEventListener('input', handleSearchBarInputChange)
}

function handleSearchBarInputChange (event) {

    const searchTerm = event.target.value

    if (searchTerm.length < 3) {
        displayRecipes([])
        return
    }

    const datas = searchBarEngine(recipes, searchTerm)

    displayRecipes(datas)
}

function searchBarEngine (recipes, searchTerm) {

    const term = searchTerm.toLocaleLowerCase()

    const resultsBySearchTerms = recipes.filter(recipe => (
        titleEngine(recipe, term) || ingredientEngine(recipe, term) || descriptionEngine(recipe, term)
    ))

    const filteredResults = getResultsFilteredByTags (resultsBySearchTerms)

    return filteredResults
}

/****/

const titleEngine = (recipe, searchTerm) => recipe.name.toLocaleLowerCase().includes(searchTerm)

const ingredientEngine = (recipe, searchTerm) => {
    const ingredients = recipe.ingredients.filter(item => item.ingredient.toLocaleLowerCase().includes(searchTerm))
    return ingredients.length > 0
}

const descriptionEngine = (recipe, searchTerm) => recipe.description.toLocaleLowerCase().includes(searchTerm)

/*** Search with tags */

function getResultsFilteredByTags (results) {

    const tags = document.querySelectorAll('#tags li')
    if (tags.length === 0) {
        return results
    }

    const tagsGroupedByDropdownID = [...tags].reduce((acc, tag) => {

        const dropdownID = tag.getAttribute('data-origin')
        const tagValue = tag.getAttribute('value')

        return {...acc, [dropdownID] : [...acc[dropdownID] || [], tagValue]}

    }, {})

    console.log('gr', tagsGroupedByDropdownID)

    return results.filter(recipe => tagEngine(recipe, tagsGroupedByDropdownID))
}

const tagEngine = (recipe, tags) => (
    ingredientTagEngine(recipe, tags) && applianceTagEngine(recipe, tags) && ustensilTagEngine(recipe, tags)
)

const ingredientTagEngine = (recipe, tags) => {
    const ingredientTags = tags['ingredient-dropdown']
    console.log('ing', ingredientTags)
    if (!ingredientTags) return true
    return ingredientTags.includes(recipe.appliance)
}

const applianceTagEngine = (recipe, tags) => {
    const applianceTags = tags['appliance-dropdown']
    if (!applianceTags) return true
    return applianceTags.includes(recipe.appliance)
}

const ustensilTagEngine = (recipe, tags) => {
    const ustensilTags = tags['ustensil-dropdown']
    if (!ustensilTags) return true
    return ustensilTags.includes(recipe.appliance)
}