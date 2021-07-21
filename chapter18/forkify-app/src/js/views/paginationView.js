import View from './view.js'
import icons from 'url:../../img/icons.svg';

class PaginationView extends View{
    _parentElement = document.querySelector('.pagination');

    addHandlerClick(handler){
        this._parentElement.addEventListener('click', function(e){
             const btn = e.target.closest('.btn--inline');

             if(!btn) return;

             const gotoPage = +btn.dataset.goto;
             handler(gotoPage);
        });
    }

    _generateMarkup(){
        const currentPage = this._data.page;
        const numPages = Math.ceil(this._data.results.length / this._data.resultsPerPage)        
        //console.log(numPages);

        // We're page 1, and there are other pages
        if(currentPage === 1 && numPages > 1){
            return this._generateMarkupButton(currentPage)
        }

        
        // We're last page
        if(currentPage === numPages && numPages > 1){
            return `
                <button data-goto="${numPages - 1}" class="btn--inline pagination__btn--prev">
                    <svg class="search__icon">
                    <use href="${icons}#icon-arrow-left"></use>
                    </svg>
                    <span>Page ${numPages - 1}</span>
                </button>
            `
        }

        // We're other page 
        if(currentPage < numPages){
            return `
                <button data-goto="${currentPage - 1}" class="btn--inline pagination__btn--prev">
                    <svg class="search__icon">
                    <use href="${icons}#icon-arrow-left"></use>
                    </svg>
                    <span>Page ${currentPage - 1}</span>
                </button>
                ${this._generateMarkupButton(currentPage)}
            `
        }
        // We're page 1, and there are NO other pages
        return ''
    }

    _generateMarkupButton(currPage){
        return `
            <button data-goto="${currPage + 1}" class="btn--inline pagination__btn--next">
                <span>Page ${currPage + 1}</span>
                <svg class="search__icon">
                <use href="${icons}#icon-arrow-right"></use>
                </svg>
            </button>
        `
    }
}

export default new PaginationView();