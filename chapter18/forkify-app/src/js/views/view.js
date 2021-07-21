import icons from 'url:../../img/icons.svg';

export default class View {
    _data;

    /**
     * 
     * @param {Object | Object[]} data the data to be rendered (e.g. recipe)
     * @param {boolean} {render=true} If false, create markup string
     * @returns {undefined | string} A markup string is rendered if render=false
     * @this {Object} View instance
     * @author Marco Filetto
     * @todo finish implementation
     */
    render(data, render = true){
        if(!data || (Array.isArray(data) && data.length === 0)) return this.renderError();
        this._data = data;
        const markup = this._generateMarkup();

        if(!render) return markup;

        this._clear();
        this._parentElement.insertAdjacentHTML('afterbegin', markup)
    }

    /**
     * algorithm for not reload the entire view, only when found differences between current DOM and virtual DOM.
     * @param {Object | Object[]} data data to be uploaded
     * @this {Object} View instance
     * @author Marco Filetto
     */
    update(data){
        this._data = data;
        const newMarkup = this._generateMarkup();

        const newDOM = document.createRange().createContextualFragment(newMarkup);
        //convert nodes to an array with array.from
        const newElements = Array.from(newDOM.querySelectorAll('*'));
        const curElements = Array.from(this._parentElement.querySelectorAll('*'));

        newElements.forEach((newEl, i) => {
            const curEl = curElements[i];
            //console.log(curEl, newEl.isEqualNode(curEl));

            // compare texts
            if(!newEl.isEqualNode(curEl) && newEl.firstChild?.nodeValue.trim() !== '')
                curEl.textContent = newEl.textContent;

            // compare attributes
            if(!newEl.isEqualNode(curEl))
                Array.from(newEl.attributes).forEach(attr => curEl.setAttribute(attr.name, attr.value))
        });
    }

    _clear(){
        this._parentElement.innerHTML = '';
    }

    renderLoading() {
        const markup = `
          <div class="spinner">
            <svg>
              <use href="${icons}#icon-loader"></use>
            </svg>
          </div>
        `
        this._clear();
        this._parentElement.insertAdjacentHTML('afterbegin', markup);
    }

    renderError(message = this._errorMessage){
        const markup = `
        <div class="error">
            <div>
              <svg>
                <use href="${icons}#icon-alert-triangle"></use>
              </svg>
            </div>
            <p>${message}</p>
          </div>
        `

        this._clear();
        this._parentElement.insertAdjacentHTML('afterbegin', markup);
    }

    renderMessage(message = this._successMessage){
        const markup = `
        <div class="message">
            <div>
              <svg>
                <use href="${icons}#icon-smile"></use>
              </svg>
            </div>
            <p>${message}</p>
          </div>
        `

        this._clear();
        this._parentElement.insertAdjacentHTML('afterbegin', markup);
    }
}