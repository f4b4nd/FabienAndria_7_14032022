export const getDropdownComponent = ({props}) => {

    const dropdown = document.createElement('button')

    dropdown.id = props.id

    dropdown.classList.add('dropdown')
    dropdown.classList.add(props.btnClass)

    dropdown.innerHTML = `
        <div class="dropdown-textsearch">
            <input class="dropdown-textsearch__input" type="text" placeholder="${props.label}"> 
            <span class="dropdown-textsearch__icon"> <i class="fas fa-chevron-down"></i> </span>
        </div>
        <ul class="dropdown__options">
            ${getDropdownOptionsInnerHTML(props.options)}
        </ul>
    `
    return dropdown

}

const getDropdownOptionsInnerHTML = (options) => (
    options.reduce((acc, option) => acc + getDropdownOptionItemInnerHTML(option), '')
)

const getDropdownOptionItemInnerHTML = (option) => `<li value="${option}"> ${option} </li>`

