import { moveDropdownItemToTags } from "../utils/moveTag.js"

export class DropdownFactory {

    constructor ({props}) {
        this.dropdown = document.createElement('button')
        this.id = props.id
        this.label = props.label
        this.dataColor = props.dataColor
        this.optionsDatas = props.optionsDatas
    }

    getComponent () {

        this.dropdown.id = this.id

        this.dropdown.classList.add('dropdown')
        this.dropdown.classList.add('btn-' + this.dataColor)

        this.dropdown.innerHTML = `
            <div class="dropdown__header">
                <input class="dropdown__input" type="text" value="${this.label}s" placeholder="Rechercher un ${this.label.toLowerCase()}"> 
                <span class="dropdown__arrowIcon"> <i class="fas fa-chevron-down"></i> </span>
            </div>
            <ul class="dropdown__options">
                ${this.getOptionsInnerHTML(this.optionsDatas)}
            </ul> `

        return this.dropdown

    }

    getOptionsInnerHTML () {
        return this.optionsDatas.reduce((acc, optionData) => {
            const props = {optionData, dataColor: this.dataColor, dropdownID: this.dropdown.id}
            return acc + DropdownFactory.getOptionItemInnerHTML({props})
        }, '')
    }

    static getOptionItemInnerHTML ({props}) {
        return `
            <li 
                value="${props.optionData}"
                class="${'li-' + props.dataColor}"
                data-origin="${props.dropdownID}"
                data-color="${props.dataColor}"
            > 
                ${props.optionData}
            </li>`
    }

    handleEvents () {
        this.handleClickDropdownActive()
        DropdownFactory.handleClickOnListItems(this.dropdown)
    }

    static handleClickOnListItems (dropdown) {
        const listItems = dropdown.querySelectorAll('li')
        listItems.forEach(li => li.addEventListener('click', moveDropdownItemToTags))
    }

    handleClickDropdownActive () {
        const dropdownIcon = this.dropdown.querySelector('.dropdown__arrowIcon')
        dropdownIcon.addEventListener('click', () => {
            const dropdownIsActive = [...this.dropdown.classList].includes('dropdown--active')
            if (!dropdownIsActive) {
                // prevents multiple dropdowns to be active at the same time
                DropdownFactory.setAllDropdownsInactive()
                DropdownFactory.setDropdownActive(this.dropdown)
                return
            }
            DropdownFactory.setDropdownInactive(this.dropdown)
        })
    }

    static setDropdownInactive (dropdown) {
        const dropdownIcon = dropdown.querySelector('i')
        dropdown.classList.remove('dropdown--active')
        dropdownIcon.classList.remove('fa-chevron-up')
        dropdownIcon.classList.add('fa-chevron-down')
    }

    static setDropdownActive (dropdown) {
        const dropdownIcon = dropdown.querySelector('i')
        dropdown.classList.add('dropdown--active')
        dropdownIcon.classList.remove('fa-chevron-down')
        dropdownIcon.classList.add('fa-chevron-up')
    }

    static setAllDropdownsInactive () {
        const activeDropdowns = document.querySelectorAll('.dropdown--active')
        if (activeDropdowns.length > 0) {
            activeDropdowns.forEach(dropdown => DropdownFactory.setDropdownInactive(dropdown))
        }
    }

}
