import { getTagComponent } from "../components/tag.js"
import { DropdownFactory } from "../components/dropdown.js"
import { resetSearchOnEmptyParameters, searchEngine } from "../index.js"

// from .dropdown__tags to #tags
export function moveDropdownTagItemToTags () {

    const props = {
        tagValue: this.getAttribute('value'),
        origin : this.getAttribute('data-origin'),
        color: this.getAttribute('data-color'),
    }

    // append to tags
    const li = getTagComponent({props})
    const tags = document.querySelector('#tags')
    tags.appendChild(li)

    // remove from dropdown__options
    const ul = this.closest('ul.dropdown__tags')
    ul.removeChild(this)

    // add tag to searchEngine
    searchEngine.addTag({tagValue: this.getAttribute('value'), origin: this.getAttribute('data-origin')})

}

// from #tags to .dropdown__tags
export function moveTagToDropdown () {

    const tag = this.closest('.tag')
    const dropdownID = tag.getAttribute('data-origin')
    const dropdown = document.getElementById(dropdownID)

    const props = {
        tag: tag.getAttribute('value'),
        origin: tag.getAttribute('data-origin'),
        color: tag.getAttribute('data-color'),
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

    // remove tag from searchEngine
    searchEngine.removeTag({tagValue: tag.getAttribute('value'), origin: tag.getAttribute('data-origin')})

    resetSearchOnEmptyParameters({})

}
