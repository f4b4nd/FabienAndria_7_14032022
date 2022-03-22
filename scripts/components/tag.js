import { moveTagToDropdown } from "../utils/moveTag.js"


export const getTagComponent = ({props}) => {

    const tag = document.createElement('li')

    tag.classList.add('tag')
    tag.classList.add('tag-' + props.color)

    tag.setAttribute('value', props.tagValue)
    tag.setAttribute('data-origin', props.origin)
    tag.setAttribute('data-color', props.color)

    tag.innerHTML = `
        <span class="text" > ${props.tagValue} </span>
        <span class="icon"> <i class="fas fa-xmark"> </i> </span> `

    const tagIcon = tag.querySelector('.icon')
    tagIcon.addEventListener('click', moveTagToDropdown)

    return tag

}