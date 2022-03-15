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
            dropdownID: 'ingredient-dropdown',
            dropdownLabel: 'Ingrédients',
            dropdownBtnClass: 'btn-primary',
            options: getIngredients(recipes)
        },
        {
            dropdownID: 'appliance-dropdown',
            dropdownLabel: 'Appareils',
            dropdownBtnClass: 'btn-success',
            options: getAppliances(recipes)
        },
        {
            dropdownID: 'ustensil-dropdown',
            dropdownLabel: 'Ustensils',
            dropdownBtnClass: 'btn-danger',
            options: getUstensils(recipes)
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