import { moveTagToDropdownList } from "../utils/moveTag.js"


export const getTagComponent = ({props}) => {

    const tag = document.createElement('li')

    tag.classList.add('tag')
    tag.classList.add('tag-' + props.dataColor)

    tag.setAttribute('value', props.value)
    tag.setAttribute('data-origin', props.dataOrigin)
    tag.setAttribute('data-color', props.dataColor)

    tag.innerHTML = `
        <span class="text" > ${props.value} </span>
        <span class="icon"> <i class="fas fa-xmark"> </i> </span> `

    const tagIcon = tag.querySelector('.icon')
    tagIcon.addEventListener('click', moveTagToDropdownList)

    return tag

}