import { displayRecipes } from "../index.js"
import recipes from "../../data/recipes.js"
import { getResultsFilteredByTags } from "./searchTags.js"

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

    launchSearch(recipes, searchTerm)

}

export function launchSearch(recipes, searchTerm) {
    const results = searchBarEngine(recipes, searchTerm)
    displayRecipes(results)
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
