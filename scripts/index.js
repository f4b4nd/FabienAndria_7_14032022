import recipes from '../data/recipes.js'
import { getCardComponent } from './component/card.js'
import { DropdownComponent } from './component/dropdown.js'
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
            btnClass: 'primary',
            options: getIngredients(recipes).sort()
        },
        {
            id: 'appliance-dropdown',
            label: 'Appareils',
            btnClass: 'success',
            options: getAppliances(recipes).sort()
        },
        {
            id: 'ustensil-dropdown',
            label: 'Ustensiles',
            btnClass: 'danger',
            options: getUstensils(recipes).sort()
        }
    ]

    const dropdownsDOM = document.querySelector('#dropdowns')
    dropdowns.forEach(item => {
        const dropdown = new DropdownComponent({props: item})
        const dropdownDOM = dropdown.getComponent()
        DropdownComponent.setEventListeners(dropdownDOM)
        dropdownsDOM.appendChild(dropdownDOM)
    })
}


function init () {
    displayResults()
    displayDropdowns()
}

init ()