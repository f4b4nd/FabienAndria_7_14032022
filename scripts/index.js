import recipes from '../data/recipes.js'
import { getCardComponent } from './component/card.js'

function displayResults () {
    const resultsDOM = document.querySelector('#results')
    recipes.forEach(recipe => {
        const card = getCardComponent({props: recipe})
        resultsDOM.appendChild(card)
    })
}

function init () {
    displayResults ()
}

init ()

console.log(recipes)