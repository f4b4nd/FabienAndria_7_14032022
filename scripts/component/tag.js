export const getTagComponent = ({props}) => {

    console.log(props)
    const tag = document.createElement('li')

    tag.classList.add('tag')

    tag.classList.add(props.tagClass)

    tag.setAttribute('value', props.value)

    tag.innerHTML = `
        <span class="text" > ${props.value} </span>
        <span class="icon"> <i class="fas fa-xmark"> </i> </span> `

    return tag

}