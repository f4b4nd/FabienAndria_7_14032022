import { displayRecipes } from "../index.js"
import recipes from "../../data/recipes.js"

export function handleInputChange (event) {

    const searchTerm = event.target.value

    if (searchTerm.length < 3) {
        displayRecipes([])
        return
    }

    const datas = recipes.filter(recipe => searchEngine(recipe, searchTerm))
    //console.log('search', searchTerm, datas)
    displayRecipes(datas)
}


function searchEngine (recipe, searchTerm) {

    const term = searchTerm.toLocaleLowerCase()

    const applianceEngine = recipe.appliance.toLocaleLowerCase().includes(term)

    const ingredientEngine = recipe.ingredients.filter(item => item.ingredient.toLocaleLowerCase().includes(term)).length > 0

    const ustensilEngine = recipe.ustensils.filter(ustensil => ustensil.toLocaleLowerCase().includes(term)).length > 0

    return applianceEngine || ingredientEngine || ustensilEngine

}

export function searchBarListener () {
    const searchBarInput = document.getElementById('search-bar')
    searchBarInput.addEventListener('input', handleInputChange)
}