import { DropdownFactory } from "../components/dropdown.js"
import { getAppliances, getIngredients, getUstensils } from "../utils/getData.js"
import clearHTMLNode from "../utils/clearHTML.js"
import { searchEngine } from "../index.js"


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

    if (searchTerm.length > 0) DropdownFactory.setDropdownActive(dropdown)

    if (searchTerm.length < 3) {
        setDropdownTags(dropdown, [])
        return
    }

    const tags = dropdownTagsEngine(dropdown, searchTerm)

    setDropdownTags(dropdown, tags)

}

function getTagsNotSelected (tags) {
    const selectedTags = document.querySelectorAll('#tags li')
    const selectedTagsValues = [...selectedTags].map(tag => tag.getAttribute('value'))
    return tags.filter(tag => !selectedTagsValues.includes(tag))
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

}

function dropdownTagsEngine (dropdown, searchTerm) {

    const searchTermLowerCase = searchTerm.toLocaleLowerCase()

    const dropdownID = dropdown.getAttribute('id')

    switch (dropdownID) {

        case 'ingredient-dropdown':
            return ingredientEngine(searchTermLowerCase)

        case 'appliance-dropdown':
            return applianceEngine(searchTermLowerCase)

        case 'ustensil-dropdown':
            return ustensilEngine(searchTermLowerCase)

    }
}


const ingredientEngine = (searchTerm) => {
    const recipes = searchEngine.results
    const ingredients = getIngredients(recipes)
    return ingredients.filter(ingredient => ingredient.toLocaleLowerCase().includes(searchTerm))
}

const applianceEngine = (searchTerm) => {
    const recipes = searchEngine.results
    const appliances = getAppliances(recipes)
    return appliances.filter(appliance => appliance.toLocaleLowerCase().includes(searchTerm))
}

const ustensilEngine = (searchTerm) => {
    const recipes = searchEngine.results
    const ustensils = getUstensils(recipes)
    return ustensils.filter(ustensil => ustensil.toLocaleLowerCase().includes(searchTerm))
}