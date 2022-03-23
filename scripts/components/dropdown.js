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
                <input class="dropdown__input" type="text" value="${this.label}s" placeholder="Rechercher un ${this.label.toLowerCase()}" data-initial="${this.label}s"> 
                <span class="dropdown__arrowIcon"> <i class="fas fa-chevron-down"></i> </span>
            </div>
            <ul class="dropdown__tags">
                ${this.getTagsInnerHTML(this.tags)}
            </ul> `

        return this.dropdown

    }

    getTagsInnerHTML () {
        return this.tags.reduce((acc, tag) => {
            const props = {tag, color: this.dataColor, origin: this.dropdown.id}
            return acc + DropdownFactory.getTagItemInnerHTML({props})
        }, '')
    }

    static getTagItemInnerHTML ({props}) {
        return `
            <li 
                value="${props.tag}"
                class="${'li-' + props.color}"
                data-origin="${props.origin}"
                data-color="${props.color}"
            > 
                ${props.tag}
            </li>`
    }

    handleEvents () {
        this.handleClickDropdownActive()
        DropdownFactory.handleClickOnDropdownTags(this.dropdown)
        this.setDropdownUnfocus()
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
                DropdownFactory.setDropdownActive(this.dropdown)
                return
            }
            DropdownFactory.setDropdownInactive(this.dropdown)
        })

        const input = this.dropdown.querySelector('input')
        input.addEventListener('click', function () { this.value = ''})
    }

    static setDropdownInactive (dropdown) {
        dropdown.classList.remove('dropdown--active')
        const dropdownIcon = dropdown.querySelector('i')
        dropdownIcon.classList.remove('fa-chevron-up')
        dropdownIcon.classList.add('fa-chevron-down')
        DropdownFactory.setInitialInputLabel(dropdown)
    }

    static setDropdownActive (dropdown) {
        dropdown.classList.add('dropdown--active')
        const dropdownIcon = dropdown.querySelector('i')
        dropdownIcon.classList.remove('fa-chevron-down')
        dropdownIcon.classList.add('fa-chevron-up')
    }

    static setInitialInputLabel(dropdown) {
        const input = dropdown.querySelector('input')
        input.value = input.getAttribute('data-initial')
    }

    setDropdownUnfocus () {
        // set dropdown inactive when click anywhere else on the page
        document.addEventListener('click', (e) => {
            if (!this.dropdown.contains(e.target)) {
                DropdownFactory.setDropdownInactive(this.dropdown)
            }
        })
    }
}