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

        const newIngredients = recipe.ingredients.reduce((newAcc, item) => {
            if (!acc.includes(item.ingredient)) {
                newAcc.push(item.ingredient)
            }
            return newAcc
        }, [])

        return [...acc, ...newIngredients]
    }, [])
)

function init () {
    displayResults()
    const ing = getIngredients()
    console.log(ing)

}

init ()