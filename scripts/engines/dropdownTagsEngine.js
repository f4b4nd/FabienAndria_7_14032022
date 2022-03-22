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
        displayDropdownTags(dropdown, [])
        return
    }

    const tags = dropdownTagsEngine(dropdown, searchTerm)

    displayDropdownTags(dropdown, tags)

}

function displayDropdownTags (dropdown, tags) {

    const dropdownTags = dropdown.querySelector('ul.dropdown__tags')

    clearHTMLNode(dropdownTags)

    tags.forEach(tag => {
        const props = {
            tag: tag,
            origin: dropdown.getAttribute('id'),
            color: dropdown.getAttribute('data-color')
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


/*** ENGINES */
const ingredientEngine = (searchTerm) => {
    const recipes = searchEngine.results
    const ingredients = getIngredients(recipes)
    return ingredients.filter(ingredient => ingredientMatches(ingredient, searchTerm))
}

const applianceEngine = (searchTerm) => {
    const recipes = searchEngine.results
    const appliances = getAppliances(recipes)
    return appliances.filter(appliance => applianceMatches(appliance, searchTerm))
}

const ustensilEngine = (searchTerm) => {
    const recipes = searchEngine.results
    const ustensils = getUstensils(recipes)
    return ustensils.filter(ustensil => ustensilMatches(ustensil, searchTerm))
}

/****/
const ingredientMatches = (ingredient, searchTerm) => {
    const selectedTags = searchEngine.tags['ingredient-dropdown']
    // prevent tag to be selected twice
    if (selectedTags && selectedTags.includes(ingredient)) {
        return false
    }
    return ingredient.toLocaleLowerCase().includes(searchTerm)
}

const applianceMatches = (appliance, searchTerm) => {
    const selectedTags = searchEngine.tags['appliance-dropdown']
    // prevent tag to be selected twice
    if (selectedTags && selectedTags.includes(appliance)) {
        return false
    }
    return appliance.toLocaleLowerCase().includes(searchTerm)
}

const ustensilMatches = (ustensil, searchTerm) => {
    const selectedTags = searchEngine.tags['ustensil-dropdown']
    // prevent tag to be selected twice
    if (selectedTags && selectedTags.includes(ustensil)) {
        return false
    }
    return ustensil.toLocaleLowerCase().includes(searchTerm)
}
