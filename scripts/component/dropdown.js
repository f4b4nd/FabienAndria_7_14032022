import { moveDropdownItemToTags } from "../utils/moveTag.js"

export class DropdownFactory {

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
        this.dropdown.classList.add('btn-' + this.dataColor)

        this.dropdown.innerHTML = `
            <div class="dropdown__header">
                <input class="dropdown__input" type="text" placeholder="${this.label}"> 
                <span class="dropdown__arrowIcon"> <i class="fas fa-chevron-down"></i> </span>
            </div>
            <ul class="dropdown__options">
                ${this.getOptionsInnerHTML(this.options)}
            </ul> `

        return this.dropdown

    }

    getOptionsInnerHTML () {
        return this.options.reduce((acc, option) => {
            const props = {option, dataColor: this.dataColor, dropdownID: this.dropdown.id}
            return acc + DropdownFactory.getOptionItemInnerHTML({props})
        }, '')
    }

    static getOptionItemInnerHTML ({props}) {
        return `
            <li 
                value="${props.option}"
                class="${'li-' + props.dataColor}"
                data-origin="${props.dropdownID}"
                data-color="${props.dataColor}"
            > 
                ${props.option}
            </li>`
    }

    handleEvents () {
        this.handleClickDropdownActive()
        DropdownFactory.handleClickOnListItems(this.dropdown)
    }

    static handleClickOnListItems (dropdown) {
        // List Items are moved to tags on click
        const listItems = dropdown.querySelectorAll('li')
        listItems.forEach(li => li.addEventListener('click', moveDropdownItemToTags))
    }

    handleClickDropdownActive () {
        // Dropdown switch from Active to Unactive when click on arrow
        const dropdownIcon = this.dropdown.querySelector('.dropdown__arrowIcon')
        dropdownIcon.addEventListener('click', () => this.setDropdownActive())
    }

    setDropdownActive () {

        const dropdownIcon = this.dropdown.querySelector('i')

        if ([...this.dropdown.classList].includes('dropdown--active')) {
            this.dropdown.classList.remove('dropdown--active')
            dropdownIcon.classList.remove('fa-chevron-up')
            dropdownIcon.classList.add('fa-chevron-down')
        }
        else {
            this.dropdown.classList.add('dropdown--active')
            dropdownIcon.classList.remove('fa-chevron-down')
            dropdownIcon.classList.add('fa-chevron-up')
        }

    }

}
