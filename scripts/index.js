import recipes from '../data/recipes.js'
import { getCardComponent } from './component/card.js'
import { DropdownFactory } from './component/dropdown.js'
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
            dataColor: 'primary',
            options: getIngredients(recipes).sort()
        },
        {
            id: 'appliance-dropdown',
            label: 'Appareils',
            dataColor: 'success',
            options: getAppliances(recipes).sort()
        },
        {
            id: 'ustensil-dropdown',
            label: 'Ustensiles',
            dataColor: 'danger',
            options: getUstensils(recipes).sort()
        }
    ]

    const sectionDOM = document.querySelector('#dropdowns')
    dropdowns.forEach(props => {
        const dropdown = new DropdownFactory({props})
        const dropdownComponent = dropdown.getComponent()
        dropdown.handleEvents()
        sectionDOM.appendChild(dropdownComponent)
    })
}


function init () {
    displayResults()
    displayDropdowns()
}

init ()