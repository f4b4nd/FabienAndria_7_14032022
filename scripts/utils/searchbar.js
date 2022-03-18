import { displayRecipes } from "../index.js"
import recipes from "../../data/recipes.js"

function handleInputChange (event) {

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

    return recipes.filter(recipe => titleEngine(recipe, term) || ingredientEngine(recipe, term) || descriptionEngine(recipe, term))

}

const titleEngine = (recipe, term) => recipe.name.toLocaleLowerCase().includes(term)

const ingredientEngine = (recipe, term) => {
    const ingredients = recipe.ingredients.filter(item => item.ingredient.toLocaleLowerCase().includes(term))
    return ingredients.length > 0
}

const descriptionEngine = (recipe, term) => recipe.description.toLocaleLowerCase().includes(term)

export function searchBarListener () {
    const searchBarInput = document.getElementById('search-bar')
    searchBarInput.addEventListener('input', handleInputChange)
}