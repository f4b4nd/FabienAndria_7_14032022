import { displayRecipes, searchEngine } from "../index.js"

export function searchBarListener () {
    const searchBarInput = document.querySelector('#search-bar-input')
    searchBarInput.addEventListener('input', handleSearchBarInputChange)
}

function handleSearchBarInputChange (event) {

    const searchTerm = event.target.value

    if (searchTerm.length < 3) {
        displayRecipes([])
        return
    }

    searchEngine.setResultsFromSearchBar(searchTerm)

}


export function searchBarInputEngine (recipes, searchTerm) {

    const searchTermLowerCase = searchTerm.toLocaleLowerCase()

    return recipes.filter(recipe => recipeMatches(recipe, searchTermLowerCase))

}

const recipeMatches = (recipe, searchTerm) => (
    titleEngine(recipe, searchTerm) || ingredientEngine(recipe, searchTerm) || descriptionEngine(recipe, searchTerm)
)

/****/

const titleEngine = (recipe, searchTerm) => recipe.name.toLocaleLowerCase().includes(searchTerm)

const ingredientEngine = (recipe, searchTerm) => {
    const ingredients = recipe.ingredients.filter(item => item.ingredient.toLocaleLowerCase().includes(searchTerm))
    return ingredients.length > 0
}

const descriptionEngine = (recipe, searchTerm) => recipe.description.toLocaleLowerCase().includes(searchTerm)