import { DropdownComponent } from "./dropdown.js"

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

    const dropdownOptions = dropdown.querySelector('.dropdown__options')

    const props = {
        option: tag.getAttribute('value'),
        btnClass: tag.classList[1],
        dropdownID: tag.getAttribute('data-origin')
    }
    const innerHTML = DropdownComponent.getOptionItemInnerHTML(props)
    const doc = document.createElement('span')
    doc.innerHTML = innerHTML

    DropdownComponent.setEventListeners(dropdown)

    console.log('doc', doc)
    dropdownOptions.appendChild(doc)

}