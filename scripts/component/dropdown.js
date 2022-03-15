import { getTagComponent } from "./tag.js"

export class DropdownComponent {

    constructor ({props}) {
        this.dropdown = document.createElement('button')
        this.id = props.id
        this.label = props.label
        this.btnClass = props.btnClass
        this.options = props.options
    }

    getComponent () {

        this.dropdown.id = this.id

        this.dropdown.classList.add('dropdown')
        this.dropdown.classList.add('dropdown--active')
        this.dropdown.classList.add('btn-' + this.btnClass)

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
        return this.options.reduce((acc, option) => acc + this.getOptionItemInnerHTML(option), '')
    }

    getOptionItemInnerHTML (option) {
        return `<li class="${this.btnClass}" value="${option}"> ${option} </li>`
    }

    setEventListeners () {
        /** Dropdown Active on click */
        const dropdownIcon = this.dropdown.querySelector('.dropdown-textsearch__icon')
        dropdownIcon.addEventListener('click', () => this.setDropdownActive())

        /** List Items are moved to tags on click */
        const listItems = this.dropdown.querySelectorAll('li')
        listItems.forEach(li => li.addEventListener('click', moveDropdownListItemToTags))
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


function moveDropdownListItemToTags () {

    console.log(this)

    const props = {
        value: this.getAttribute('value'),
        tagClass: 'tag-' + this.classList[0]
    }

    const li = getTagComponent({props})

    const tags = document.querySelector('#tags')

    tags.appendChild(li)

}
