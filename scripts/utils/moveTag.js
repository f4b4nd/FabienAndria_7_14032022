import { getTagComponent } from "../components/tag.js"
import { DropdownFactory } from "../components/dropdown.js"
import { displayRecipes, searchEngine, launchSearch } from "../index.js"

// from .dropdown__tags to #tags
export function moveDropdownTagItemToTags () {

    const props = {
        value: this.getAttribute('value'),
        dataOrigin : this.getAttribute('data-origin'),
        dataColor: this.getAttribute('data-color'),
    }

    // append to tags
    const li = getTagComponent({props})
    const tags = document.querySelector('#tags')
    tags.appendChild(li)

    // remove from dropdown__options
    const ul = this.closest('ul.dropdown__tags')
    ul.removeChild(this)

    // launch search if search-bar input is not empty
    updateSearchOnTagEvent()
    searchEngine.addTag({value: this.getAttribute('value'), origin: this.getAttribute('data-origin')})

}

// from #tags to .dropdown__tags
export function moveTagToDropdown () {

    const tag = this.closest('.tag')
    const dropdownID = tag.getAttribute('data-origin')
    const dropdown = document.getElementById(dropdownID)

    const props = {
        tag: tag.getAttribute('value'),
        dropdownID: tag.getAttribute('data-origin'),
        dataColor: tag.getAttribute('data-color'),
    }

    // add tag to dropdown__tags
    const tagInnerHTML = DropdownFactory.getTagItemInnerHTML({props})
    const dropdownTags = dropdown.querySelector('.dropdown__tags')
    dropdownTags.insertAdjacentHTML('beforeend', tagInnerHTML)

    // restore eventlistener
    DropdownFactory.handleClickOnDropdownTags(dropdown)

    // remove tag from tags
    const tags = this.closest('ul')
    tags.removeChild(tag)

    // launch search if search-bar input is not empty
    updateSearchOnTagEvent()

}

function updateSearchOnTagEvent () {

    const hasSelectedTags = document.querySelectorAll('#tags li').length > 0
    const inputSearchValue = document.querySelector('#search-bar-input').value || null

    // reset display if the last tag is removed and no search-bar-input
    if (!hasSelectedTags && !inputSearchValue) {
        displayRecipes([])
        return
    }

    const props = {
        useSearchBarInput: inputSearchValue,
        searchTerm: inputSearchValue
    }
    launchSearch({props})

}