import View from './view.js'

import icons from 'url:../../img/icons.svg';
import {Fraction} from 'fractional';

class RecipeView extends View{
    _parentElement = document.querySelector('.recipe');
    _errorMessage = 'We could not found that recipe. Please try another one.'
    _successMessage = ''
    
    /**
     * publisher-subscriber pattern of MVC.
     * We want to have handler events in the view module, but call controlRecipes, which is in controller module
     * here we have publisher -- needs to be acces to the subscriber
     * @param {function} handler // function to be executed (on the controller)
     */
    addHandlerRender(handler){
        ['hashchange', 'load'].forEach(ev => window.addEventListener(ev, handler))
    }

    addHandlerUpdateServings(handler){
        this._parentElement.addEventListener('click', function(e){
            const btn = e.target.closest('.btn--update-servings');
            if(!btn) return;
            //console.log(btn);
            
            const newServing = +btn.dataset.update_to;
            if(newServing > 0) handler(newServing);
        })
    }

    addHandlerAddBookmark(handler){
        this._parentElement.addEventListener('click', function(e){
            const btn = e.target.closest('.btn--bookmark');
            if(!btn) return;
            handler();
            //console.log(btn);
        });
    }

    _generateMarkup(){
        return `
            <figure class="recipe__fig">
                <img src=${this._data.image} alt=${this._data.title} class="recipe__img" />
                <h1 class="recipe__title">
                <span>${this._data.title}</span>
                </h1>
            </figure>

            <div class="recipe__details">
                <div class="recipe__info">
                <svg class="recipe__info-icon">
                    <use href="${icons}#icon-clock"></use>
                </svg>
                <span class="recipe__info-data recipe__info-data--minutes">${this._data.cookingTime}</span>
                <span class="recipe__info-text">minutes</span>
                </div>
                <div class="recipe__info">
                <svg class="recipe__info-icon">
                    <use href="${icons}#icon-users"></use>
                </svg>
                <span class="recipe__info-data recipe__info-data--people">${this._data.servings}</span>
                <span class="recipe__info-text">servings</span>

                <div class="recipe__info-buttons">
                    <button class="btn--tiny btn--update-servings" data-update_to="${this._data.servings - 1}">
                    <svg>
                        <use href="${icons}#icon-minus-circle"></use>
                    </svg>
                    </button>
                    <button class="btn--tiny btn--update-servings" data-update_to="${this._data.servings + 1}">
                    <svg>
                        <use href="${icons}#icon-plus-circle"></use>
                    </svg>
                    </button>
                </div>
                </div>

                <div class="recipe__user-generated ${this._data.key ? '' : 'hidden'}">
                    <svg>
                    <use href="${icons}#icon-user"></use>
                    </svg>
                </div>
                <button class="btn--round btn--bookmark">
                <svg class="">
                    <use href="${icons}#icon-bookmark${this._data.bookmarked ? '-fill' : ''}"></use>
                </svg>
                </button>
            </div>

            <div class="recipe__ingredients">
                <h2 class="heading--2">Recipe ingredients</h2>
                <ul class="recipe__ingredient-list">
                ${
                    //When we defined #generateMarkupIngredient(), 
                    //we specified a parameter, ing. 
                    //This is how .map() knows that the callback needs the first argument,
                    //i.e. the current item of the ingredients array in each iteration. 
                    //We don't have to explicitly pass that argument when we call .map()
                    this._data.ingredients.map(this._generateMarkupIngredient).join('')}
                </ul>
            </div>

            <div class="recipe__directions">
                <h2 class="heading--2">How to cook it</h2>
                <p class="recipe__directions-text">
                This recipe was carefully designed and tested by
                <span class="recipe__publisher">${this._data.publisher}</span>. Please check out
                directions at their website.
                </p>
                <a
                class="btn--small recipe__btn"
                href=${this._data.sourceUrl}
                target="_blank"
                >
                <span>Directions</span>
                <svg class="search__icon">
                    <use href="${icons}#icon-arrow-right"></use>
                </svg>
                </a>
            </div>
            `;
    }

    _generateMarkupIngredient(ingredient){
        return `
            <li class="recipe__ingredient">
                <svg class="recipe__icon">
                <use href="${icons}#icon-check"></use>
                </svg>
                <div class="recipe__quantity">${ingredient.quantity ? new Fraction(ingredient.quantity).toString() : ''}</div>
                <div class="recipe__description">
                <span class="recipe__unit">${ingredient.unit}</span>
                ${ingredient.description}
                </div>
            </li>
            `;
    }
}

export default new RecipeView();