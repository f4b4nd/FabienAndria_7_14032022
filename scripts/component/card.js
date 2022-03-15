export const getCardComponent = ({props}) => {

    const card = document.createElement('article')
    card.classList.add('card')

    card.innerHTML = `
        <div class="card__image"> </div>

        <div class="card__body"> 

            <div class="card__body__header">

                <div class="card__title"> 
                    <h3> ${props.name} </h3>
                </div>

                <div class="recipe-time"> 
                    <span class="recipe-time__icon"> <i class="fa-regular fa-clock"></i> </span>
                    <span class="recipe-time__value"> ${props.time} min </span>
                </div>

            </div>

            <div class="card__body__text">

                <ul class="ingredients"> 
                    ${getIngredientsInnerHTML(props.ingredients)} 
                </ul> 

                <div class="description">
                    <p> ${props.description} </p>
                </div>

            </div>
        </div> `
    return card
}

const getIngredientsInnerHTML = (ingredients) => (
    ingredients.reduce((acc, ingredient) => acc + getIngredientItemInnerHTML(ingredient), '')
)

const getIngredientItemInnerHTML = (ingredient) => {
    const quantity = ingredient.quantity ? `<span class="ingredient__quantity-value"> ${ingredient.quantity} </span>` : ''
    const unit = ingredient.unit ? `<span class="ingredient__quantity-unit"> ${ingredient.unit} </span>` : ''

    return `
        <li class="ingredient">
            <span class="ingredient__label"> ${ingredient.ingredient || ''} </span>
            <span class="ingredient__quantity">
                ${quantity}
                ${unit}
            </span> 
        </li>`
}
