import recipes from "../../data/recipes.js"
import { getIngredients } from "../getData"


export function DropdownInputListener () {
    const input = document.querySelector('#ingredient-dropdown input')
    input.addEventListener('input', handleDropdownInputChange)
}

function handleDropdownInputChange (event) {

    const searchTerm = event.target.value

    if (searchTerm.length < 3) {
        setDropdownData([])
        return
    }

    const datas = searchDropdownEngine(recipes, searchTerm)

    setDropdownData(datas)
}

function setDropdownData () {
    const dropdownOptionsDOM = document.querySelector('ul.dropdown__options')

}

function searchDropdownEngine (recipes, searchTerm) {

    const term = searchTerm.toLocaleLowerCase()

    const datas = getIngredients(recipes)

    //return datas.filter(item => )
}