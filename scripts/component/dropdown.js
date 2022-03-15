export const getDropdownComponent = ({props}) => {

    const dropdown = document.createElement('button')

    dropdown.id = props.dropdownID

    dropdown.classList.add('dropdown')
    dropdown.classList.add(props.dropdownBtnClass)

    dropdown.innerHTML = `
        <div class="dropdown-textsearch">
            <input class="dropdown-textsearch__input" type="text" placeholder="${props.dropdownLabel}"> 
            <span class="dropdown-textsearch__icon"> <i class="fas fa-chevron-down"></i> </span>
        </div>
        <ul class="dropdown__options">
            ${getDropdownOptionsInnerHTML(props.options)}
            <li value="jus-de-citron"> Jus de citron </li>
            <li value="lait-de-coco"> Lait de coco </li>
        </ul>
    `
    return dropdown

}

const getDropdownOptionsInnerHTML = (options) => (
    options.reduce((acc, option) => acc + getDropdownOptionItemInnerHTML(option), '')
)

const getDropdownOptionItemInnerHTML = (option) => `<li value="${option}"> ${option} </li>`

