import recipes from "../../data/recipes.js"
import { DropdownFactory } from "../components/dropdown.js"
import { getAppliances, getIngredients, getUstensils } from "../getData.js"
import clearHTMLNode from "./clearHTML.js"


export function dropdownsInputsListener () {
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
        setDropdownTags(dropdown, [])
        return
    }

    const tags = dropdownSearchEngine(dropdown, searchTerm)

    setDropdownTags(dropdown, tags)

}

function setDropdownTags (dropdown, tags) {

    const dropdownTags = dropdown.querySelector('ul.dropdown__tags')

    clearHTMLNode(dropdownTags)

    tags.forEach(tag => {
        const props = {
            tag: tag,
            dropdownID: dropdown.getAttribute('id'),
            dataColor: dropdown.getAttribute('data-color')
        }
        const dropdownTag = DropdownFactory.getTagItemInnerHTML({props})
        dropdownTags.insertAdjacentHTML('beforeend', dropdownTag)
    })

    // restore eventlistener
    DropdownFactory.handleClickOnDropdownTags(dropdown)

    if (tags.length > 0) DropdownFactory.setDropdownActive(dropdown)

}

function dropdownSearchEngine (dropdown, searchTerm) {

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