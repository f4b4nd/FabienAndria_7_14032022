import { displayRecipes } from "../index.js"
import { launchSearch } from "../index.js"

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
    const props = {useSearchBarInput: true, searchTerm}
    launchSearch({props})

}


export function searchBarEngine (recipes, searchTerm) {

    const searchTermLowerCase = searchTerm.toLocaleLowerCase()

    return recipes.filter(recipe => (
        titleEngine(recipe, searchTermLowerCase) || ingredientEngine(recipe, searchTermLowerCase) || descriptionEngine(recipe, searchTermLowerCase)
    ))
}

/****/

const titleEngine = (recipe, searchTerm) => recipe.name.toLocaleLowerCase().includes(searchTerm)

const ingredientEngine = (recipe, searchTerm) => {
    const ingredients = recipe.ingredients.filter(item => item.ingredient.toLocaleLowerCase().includes(searchTerm))
    return ingredients.length > 0
}

const descriptionEngine = (recipe, searchTerm) => recipe.description.toLocaleLowerCase().includes(searchTerm)
