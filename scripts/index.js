import recipes from '../data/recipes.js'
import { getCardComponent } from './component/card.js'
import { getDropdownComponent } from './component/dropdown.js'
import { getIngredients, getAppliances, getUstensils } from './getData.js'

function displayResults () {

    const resultsDOM = document.querySelector('#results')

    recipes.forEach(recipe => {
        const card = getCardComponent({props: recipe})
        resultsDOM.appendChild(card)
    })

}

function displayDropdowns () {
    const dropdowns = [
        {
            id: 'ingredient-dropdown',
            label: 'Ingrédients',
            btnClass: 'btn-primary',
            options: getIngredients(recipes).sort()
        },
        {
            id: 'appliance-dropdown',
            label: 'Appareils',
            btnClass: 'btn-success',
            options: getAppliances(recipes).sort()
        },
        {
            id: 'ustensil-dropdown',
            label: 'Ustensiles',
            btnClass: 'btn-danger',
            options: getUstensils(recipes).sort()
        }
    ]

    const dropdownsDOM = document.querySelector('#dropdowns')
    dropdowns.forEach(item => {
        const dropdown = getDropdownComponent({props: item})
        dropdownsDOM.appendChild(dropdown)
    })
}


function init () {
    displayResults()
    const ingredients = getIngredients(recipes)
    const appliances = getAppliances(recipes)
    const ustensils = getUstensils(recipes)
    console.log(ingredients)
    console.log(appliances)
    console.log(ustensils)
    displayDropdowns()
}

init ()