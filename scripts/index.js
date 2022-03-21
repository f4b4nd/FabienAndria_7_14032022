import recipes from '../data/recipes.js'
import { getCardComponent } from './components/card.js'
import { DropdownFactory } from './components/dropdown.js'
import { getAppliances, getIngredients, getUstensils } from './getData.js'
import clearHTMLNode from './utils/clearHTML.js'
import { searchBarListener } from './utils/searchbar.js'
import { dropdownInputListener } from './utils/searchDropdown.js'

export function displayRecipes (recipesData) {

    const resultsDOM = document.querySelector('#results')
    clearHTMLNode(resultsDOM)

    recipesData.forEach(recipe => {
        const card = getCardComponent({props: recipe})
        resultsDOM.appendChild(card)
    })

}

function displayDropdowns () {
    const dropdowns = [
        {
            id: 'ingredient-dropdown',
            label: 'Ingrédient',
            dataColor: 'primary',
            optionsDatas: []
        },
        {
            id: 'appliance-dropdown',
            label: 'Appareil',
            dataColor: 'success',
            optionsDatas: []
        },
        {
            id: 'ustensil-dropdown',
            label: 'Ustensile',
            dataColor: 'danger',
            optionsDatas: []
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
    displayDropdowns()
    searchBarListener()
    dropdownInputListener()
    console.log(getIngredients(recipes).sort())
    console.log(getAppliances(recipes).sort())
    console.log(getUstensils(recipes).sort())
}

init ()