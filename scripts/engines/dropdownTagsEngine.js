import { DropdownFactory } from "../components/dropdown.js"
import { getAppliances, getIngredients, getUstensils } from "../utils/getData.js"
import clearHTMLNode from "../utils/clearHTML.js"
import { searchEngine } from "../index.js"


export function dropdownsInputsListener () {
    const dropdowns = document.querySelectorAll('.dropdown')
    dropdowns.forEach(dropdown => {
        const input = dropdown.querySelector('input')
        const dropdownIcon = dropdown.querySelector('i')
        input.addEventListener('input', updateDropdownTags)
        dropdownIcon.addEventListener('click', handleDropdownIconClick)
    })
}

function handleDropdownIconClick () {
    // display results when click on dropdown icon
    const dropdown = this.closest('.dropdown')
    const tags = dropdownTagsEngine(dropdown, '')
    displayDropdownTags(dropdown, tags)
}

function updateDropdownTags (event) {

    const dropdown = this.closest('.dropdown')
    const searchTerm = event.target.value

    if (searchTerm.length > 0) DropdownFactory.setDropdownActive(dropdown)

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
    const ingredients = getIngredients(recipes).sort()
    const ingredientsFound = []
    for (let i=0; i < ingredients.length; i++) {
        let ingredient = ingredients[i]
        if (engineMatches({ingredient, searchTerm})) ingredientsFound.push(ingredient)
    }
    return ingredientsFound
}

const applianceEngine = (searchTerm) => {
    const recipes = searchEngine.results
    const appliances = getAppliances(recipes).sort()
    const appliancesFound = []
    for (let i=0; i < appliances.length; i++) {
        let appliance = appliances[i]
        if (engineMatches({appliance, searchTerm})) appliancesFound.push(appliance)
    }
    return appliancesFound
}

const ustensilEngine = (searchTerm) => {
    const recipes = searchEngine.results
    const ustensils = getUstensils(recipes).sort()
    const ustensilsFound = []
    for (let i=0; i < ustensils.length; i++) {
        let ustensil = ustensils[i]
        if (engineMatches({ustensil, searchTerm})) ustensilsFound.push(ustensil)
    }
    return ustensilsFound
}

/****/
const engineMatches = (props) => {

    let itemToMatch = ''
    let selectedTags = null

    if (props.ingredient) {
        itemToMatch = props.ingredient
        selectedTags = searchEngine.tags['ingredient-dropdown']
    }
    else if (props.appliance) {
        itemToMatch = props.appliance
        selectedTags = searchEngine.tags['appliance-dropdown']
    }
    else if (props.ustensil) {
        itemToMatch = props.ustensil
        selectedTags = searchEngine.tags['ustensil-dropdown']
    }
    else {
        return false
    }

    // prevent tag to be selected twice
    if (selectedTags && selectedTags.includes(itemToMatch)) {
        return false
    }

    return itemToMatch.toLocaleLowerCase().includes(props.searchTerm)
}
