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
        this.dropdown.classList.add(this.btnClass)

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
        return `<li value="${option}"> ${option} </li>`
    }

    setEventListeners () {
        const dropdownIcon = this.dropdown.querySelector('.dropdown-textsearch__icon')
        const listItems = this.dropdown.querySelectorAll('li')

        dropdownIcon.addEventListener('click', () => this.setDropdownActive())
        listItems.forEach(li => li.addEventListener('click', this.moveListItemToTags))
    }

    setDropdownActive () {
        console.log(this)
        if ([...this.dropdown.classList].includes('dropdown--active')) {
            this.dropdown.classList.remove('dropdown--active')
        }
        else {
            this.dropdown.classList.add('dropdown--active')
        }

    }

    moveListItemToTags () {
        console.log(this)
    }

}

