import { getTagComponent } from "../component/tag.js"
import { DropdownFactory } from "../component/dropdown.js"

export function moveDropdownItemToTags () {

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
    const ul = this.closest('ul.dropdown__options')
    ul.removeChild(this)

}


export function moveTagToDropdownList () {

    const tag = this.closest('.tag')
    const dropdownID = tag.getAttribute('data-origin')
    const dropdown = document.getElementById(dropdownID)

    const props = {
        optionData: tag.getAttribute('value'),
        dropdownID: tag.getAttribute('data-origin'),
        dataColor: tag.getAttribute('data-color'),
    }

    // add tag to dropdown__options
    const optionInnerHTML = DropdownFactory.getOptionItemInnerHTML({props})
    const dropdownOptions = dropdown.querySelector('.dropdown__options')
    dropdownOptions.insertAdjacentHTML('beforeend', optionInnerHTML)

    // restore eventlistener
    DropdownFactory.handleClickOnListItems(dropdown)

    // remove tag from tags
    const tags = this.closest('ul')
    tags.removeChild(tag)

}