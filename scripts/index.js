import { getCardComponent } from './components/card.js'
import { DropdownFactory } from './components/dropdown.js'
import clearHTMLNode from './utils/clearHTML.js'

import { searchBarListener } from './engines/searchbarEngine.js'
import { dropdownsInputsListener } from './engines/dropdownTagsEngine.js'
import { SearchEngine } from './engines/engine.js'

export const searchEngine = new SearchEngine ()

export function displayRecipes (results) {

    const resultsDOM = document.querySelector('#results')
    clearHTMLNode(resultsDOM)

    results.forEach(recipe => {
        const card = getCardComponent({props: recipe})
        resultsDOM.appendChild(card)
    })

}

export function displayNoResultsMessage (results) {
    const errorMessage = document.querySelector('#no-results')
    errorMessage.style.display = results.length === 0 ? 'block' : 'none'
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
}

init ()