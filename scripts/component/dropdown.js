import { moveDropdownItemToTags } from "../utils/tagMovement.js"

export class DropdownComponent {

    constructor ({props}) {
        this.dropdown = document.createElement('button')
        this.id = props.id
        this.label = props.label
        this.dataColor = props.dataColor
        this.options = props.options
    }

    getComponent () {

        this.dropdown.id = this.id

        this.dropdown.classList.add('dropdown')
        this.dropdown.classList.add('dropdown--active')
        this.dropdown.classList.add('btn-' + this.dataColor)

        this.dropdown.innerHTML = `
            <div class="dropdown-textsearch">
                <input class="dropdown-textsearch__input" type="text" placeholder="${this.label}"> 
                <span class="dropdown-textsearch__icon"> <i class="fas fa-chevron-down"></i> </span>
            </div>
            <ul class="dropdown__options">
                ${this.getOptionsInnerHTML(this.options)}
            </ul>
        `

        return this.dropdown

    }

    getOptionsInnerHTML () {
        return this.options.reduce((acc, option) => {
            const props = {option, dataColor: this.dataColor, dropdownID: this.dropdown.id}
            return acc + DropdownComponent.getOptionItemInnerHTML(props)
        }, '')
    }

    static getOptionItemInnerHTML (props) {
        return `
            <li 
                value="${props.option}"
                class="${'btn-' + props.dataColor}"
                data-origin="${props.dropdownID}"
                data-color="${props.dataColor}"
            > 
                ${props.option}
            </li>`
    }

    handleEvents () {
        this.handleClickDropdownActive()
        DropdownComponent.handleClickOnListItems(this.dropdown)
    }

    static handleClickOnListItems (dropdown) {
        // List Items are moved to tags on click
        const listItems = dropdown.querySelectorAll('li')
        listItems.forEach(li => li.addEventListener('click', moveDropdownItemToTags))
    }

    handleClickDropdownActive () {
        // Dropdown switch from Active to Unactive when click on arrow
        const dropdownIcon = this.dropdown.querySelector('.dropdown-textsearch__icon')
        dropdownIcon.addEventListener('click', () => this.setDropdownActive())
    }

    setDropdownActive () {

        if ([...this.dropdown.classList].includes('dropdown--active')) {
            this.dropdown.classList.remove('dropdown--active')
        }
        else {
            this.dropdown.classList.add('dropdown--active')
        }

    }

}
