import recipes from "../../data/recipes.js"
import { DropdownFactory } from "../components/dropdown.js"
import { getIngredients } from "../getData.js"
import clearHTMLNode from "./clearHTML.js"


export function dropdownInputListener () {
    const input = document.querySelector('#ingredient-dropdown input')
    input.addEventListener('input', handleDropdownInputChange)
}

function handleDropdownInputChange (event) {

    const searchTerm = event.target.value

    if (searchTerm.length < 3) {
        setDropdownData([])
        return
    }

    const datas = searchDropdownEngine(searchTerm)

    setDropdownData(datas)
}

function setDropdownData (datas) {
    const dropdownOptions = document.querySelector('ul.dropdown__options')

    clearHTMLNode(dropdownOptions)

    datas.forEach(data => {
        const props = {optionData: data, dropdownID: 'ingredient-dropdown', dataColor: 'primary'}
        const option = DropdownFactory.getOptionItemInnerHTML({props})
        dropdownOptions.insertAdjacentHTML('beforeend', option)
    })
}

function searchDropdownEngine (searchTerm) {
    const term = searchTerm.toLocaleLowerCase()
    const filteredIngredients = ingredientEngine(term)
    return filteredIngredients

}

function ingredientEngine (searchTerm) {
    const data = getIngredients(recipes)
    return data.filter(ingredient => ingredient.toLocaleLowerCase().includes(searchTerm))
}