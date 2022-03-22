import recipes from '../data/recipes.js'
import { getCardComponent } from './components/card.js'
import { DropdownFactory } from './components/dropdown.js'
import { getAppliances, getIngredients, getUstensils } from './utils/getData.js'
import clearHTMLNode from './utils/clearHTML.js'

import { searchBarListener } from './engines/searchbarEngine.js'
import { dropdownsInputsListener } from './engines/dropdownTagsEngine.js'
import { SearchEngine } from './engines/engine.js'

export const searchEngine = new SearchEngine ()

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
            tags: []
        },
        {
            id: 'appliance-dropdown',
            label: 'Appareil',
            dataColor: 'success',
            tags: []
        },
        {
            id: 'ustensil-dropdown',
            label: 'Ustensile',
            dataColor: 'danger',
            tags: []
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
    dropdownsInputsListener()
    console.log(getIngredients(recipes).sort())
    console.log(getAppliances(recipes).sort())
    console.log(getUstensils(recipes).sort())
}

init ()