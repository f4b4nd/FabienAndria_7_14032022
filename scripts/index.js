import recipes from '../data/recipes.js'
import { getCardComponent } from './component/card.js'

function displayResults () {

    const resultsDOM = document.querySelector('#results')

    recipes.forEach(recipe => {
        const card = getCardComponent({props: recipe})
        resultsDOM.appendChild(card)
    })

}

const getIngredients = () => (
    recipes.reduce((acc, recipe) => {

        const newIngredients = recipe.ingredients.reduce((newAcc, item) => (
            acc.includes(item.ingredient) ? newAcc : [...newAcc, item.ingredient]
        ), [])

        return [...acc, ...newIngredients]
    }, [])
)

const getAppliances = () => (
    recipes.reduce((acc, recipe) => acc.includes(recipe.appliance) ? acc : [...acc, recipe.appliance], [])
)

const getUstensils = () => (
    recipes.reduce((acc, recipe) => {

        const newUstensils = recipe.ustensils.reduce((newAcc, ustensil) => (
            acc.includes(ustensil) ? newAcc : [...newAcc, ustensil]
        ), [])

        return [...acc, ...newUstensils]
    }, [])
)

function init () {
    displayResults()
    const ingredients = getIngredients()
    const appliances = getAppliances()
    const ustensils = getUstensils()
    console.log(ingredients)
    console.log(appliances)
    console.log(ustensils)

}

init ()