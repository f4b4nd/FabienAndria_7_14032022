import recipes from "../../data/recipes.js"
import { DropdownFactory } from "../components/dropdown.js"
import { getAppliances, getIngredients, getUstensils } from "../getData.js"
import clearHTMLNode from "./clearHTML.js"


export function dropdownInputListener () {
    const dropdowns = document.querySelectorAll('.dropdown')
    dropdowns.forEach(dropdown => {
        const input = dropdown.querySelector('input')
        input.addEventListener('input', handleDropdownInputChange)
    })
}

function handleDropdownInputChange (event) {

    const dropdown = this.closest('.dropdown')
    const searchTerm = event.target.value

    if (searchTerm.length < 3) {
        setDropdownData(dropdown, [])
        return
    }

    const datas = searchDropdownEngine(dropdown, searchTerm)

    setDropdownData(dropdown, datas)

}

function setDropdownData (dropdown, datas) {

    const dropdownOptions = dropdown.querySelector('ul.dropdown__options')

    clearHTMLNode(dropdownOptions)

    datas.forEach(data => {
        const props = {
            optionData: data,
            dropdownID: dropdown.getAttribute('id'),
            dataColor: dropdown.getAttribute('data-color')
        }
        const option = DropdownFactory.getOptionItemInnerHTML({props})
        dropdownOptions.insertAdjacentHTML('beforeend', option)
    })
    // restore eventlistener
    DropdownFactory.handleClickOnListItems(dropdown)

}

function searchDropdownEngine (dropdown, searchTerm) {
    const term = searchTerm.toLocaleLowerCase()
    const dropdownID = dropdown.getAttribute('id')
    switch (dropdownID) {
        case 'ingredient-dropdown':
            return ingredientEngine(term)
        case 'appliance-dropdown':
            return applianceEngine(term)
        case 'ustensil-dropdown':
            return ustensilEngine(term)
    }
}

const ingredientEngine = (searchTerm) => {
    const data = getIngredients(recipes)
    return data.filter(ingredient => ingredient.toLocaleLowerCase().includes(searchTerm))
}

const applianceEngine = (searchTerm) => {
    const data = getAppliances(recipes)
    return data.filter(appliance => appliance.toLocaleLowerCase().includes(searchTerm))
}

const ustensilEngine = (searchTerm) => {
    const data = getUstensils(recipes)
    return data.filter(ustensil => ustensil.toLocaleLowerCase().includes(searchTerm))
}