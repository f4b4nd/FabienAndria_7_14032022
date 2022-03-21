import { moveDropdownTagItemToTags } from "../utils/moveTag.js"

export class DropdownFactory {

    constructor ({props}) {
        this.dropdown = document.createElement('button')
        this.id = props.id
        this.label = props.label
        this.dataColor = props.dataColor
        this.tags = props.tags
    }

    getComponent () {

        this.dropdown.id = this.id

        this.dropdown.classList.add('dropdown')
        this.dropdown.classList.add('btn-' + this.dataColor)
        this.dropdown.setAttribute('data-color', this.dataColor)

        this.dropdown.innerHTML = `
            <div class="dropdown__header">
                <input class="dropdown__input" type="text" value="${this.label}s" placeholder="Rechercher un ${this.label.toLowerCase()}"> 
                <span class="dropdown__arrowIcon"> <i class="fas fa-chevron-down"></i> </span>
            </div>
            <ul class="dropdown__tags">
                ${this.getTagsInnerHTML(this.tags)}
            </ul> `

        return this.dropdown

    }

    getTagsInnerHTML () {
        return this.tags.reduce((acc, tag) => {
            const props = {tag, dataColor: this.dataColor, dropdownID: this.dropdown.id}
            return acc + DropdownFactory.getTagItemInnerHTML({props})
        }, '')
    }

    static getTagItemInnerHTML ({props}) {
        return `
            <li 
                value="${props.tag}"
                class="${'li-' + props.dataColor}"
                data-origin="${props.dropdownID}"
                data-color="${props.dataColor}"
            > 
                ${props.tag}
            </li>`
    }

    handleEvents () {
        this.handleClickDropdownActive()
        DropdownFactory.handleClickOnDropdownTags(this.dropdown)
    }

    static handleClickOnDropdownTags (dropdown) {
        const tags = dropdown.querySelectorAll('li')
        tags.forEach(tag => tag.addEventListener('click', moveDropdownTagItemToTags))
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
        dropdown.classList.remove('dropdown--active')
        const dropdownIcon = dropdown.querySelector('i')
        dropdownIcon.classList.remove('fa-chevron-up')
        dropdownIcon.classList.add('fa-chevron-down')
    }

    static setDropdownActive (dropdown) {
        dropdown.classList.add('dropdown--active')
        const dropdownIcon = dropdown.querySelector('i')
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
