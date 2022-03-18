import recipes from '../data/recipes.js'
import { getCardComponent } from './component/card.js'
import { DropdownFactory } from './component/dropdown.js'
import { getIngredients, getAppliances, getUstensils } from './getData.js'
import clearHTMLNode from './utils/clearHTML.js'
import { searchBarListener } from './utils/search.js'

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
            optionsDatas: getIngredients(recipes).sort()
        },
        {
            id: 'appliance-dropdown',
            label: 'Appareil',
            dataColor: 'success',
            optionsDatas: getAppliances(recipes).sort()
        },
        {
            id: 'ustensil-dropdown',
            label: 'Ustensile',
            dataColor: 'danger',
            optionsDatas: getUstensils(recipes).sort()
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
}

init ()