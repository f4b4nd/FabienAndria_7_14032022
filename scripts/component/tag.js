import { DropdownComponent, moveDropdownListItemToTags } from "./dropdown.js"

export const getTagComponent = ({props}) => {

    console.log(props)
    const tag = document.createElement('li')

    tag.classList.add('tag')

    tag.classList.add(props.tagClass)

    tag.setAttribute('value', props.value)
    tag.setAttribute('data-origin', props.dataOrigin)

    tag.innerHTML = `
        <span class="text" > ${props.value} </span>
        <span class="icon"> <i class="fas fa-xmark"> </i> </span> `

    const tagIcon = tag.querySelector('.icon')
    tagIcon.addEventListener('click', moveTagToDropdownList)

    return tag

}

function moveTagToDropdownList () {

    const tag = this.closest('.tag')
    const dropdownID = tag.getAttribute('data-origin')
    const dropdown = document.getElementById(dropdownID)

    const props = {
        option: tag.getAttribute('value'),
        btnClass: tag.classList[1],
        dropdownID: tag.getAttribute('data-origin')
    }

    // add tag to dropdown__options
    const optionInnerHTML = DropdownComponent.getOptionItemInnerHTML(props)
    const dropdownOptions = dropdown.querySelector('.dropdown__options')
    dropdownOptions.insertAdjacentHTML('beforeend', optionInnerHTML)

    // restore eventlistener
    DropdownComponent.handleClickOnListItems(dropdown)

    // remove tag from tags
    const tags = this.closest('ul')
    tags.removeChild(tag)

}