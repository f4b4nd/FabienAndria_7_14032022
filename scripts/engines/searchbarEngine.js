import { searchEngine } from "../index.js"

export function searchBarListener () {
    const searchBarInput = document.querySelector('#search-bar-input')
    searchBarInput.addEventListener('input', handleSearchBarInputChange)
}

function handleSearchBarInputChange (event) {

    const inputValue = event.target.value
    if (inputValue === '') {
        searchEngine.searchTerm = ''
    }

    const inputNewCharacter = event.data || null

    if (inputNewCharacter) {
        searchEngine.addCharacterToSearchTerm(inputNewCharacter)
    }
    else {
        searchEngine.removeLastCharacterFromSearchTerm()
    }

    searchEngine.setResults()

}

export function searchBarEngine (recipes, searchTerm) {

    const searchTermLowerCase = searchTerm.toLocaleLowerCase()

    const results = []

    for (let i=0; i < recipes.length; i++) {

        let recipe = recipes[i]

        if (recipeMatches(recipe, searchTermLowerCase)) results.push(recipe)

    }

    return results

}

const recipeMatches = (recipe, searchTerm) => (
    titleEngine(recipe, searchTerm) || ingredientEngine(recipe, searchTerm) || descriptionEngine(recipe, searchTerm)
)

/****/

const titleEngine = (recipe, searchTerm) => recipe.name.toLocaleLowerCase().includes(searchTerm)

const ingredientEngine = (recipe, searchTerm) => {

    const ingredients = recipe.ingredients
    let i = 0
    while (i < ingredients.length) {
        let item = ingredients[i]
        const ingredientMatches = item.ingredient.toLocaleLowerCase().includes(searchTerm)
        if (ingredientMatches) {
            return true
        }
        i++
    }

    return false
}

const descriptionEngine = (recipe, searchTerm) => recipe.description.toLocaleLowerCase().includes(searchTerm)