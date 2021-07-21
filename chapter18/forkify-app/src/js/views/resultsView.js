import View from './view.js'
import previewView from './previewView.js'
import icons from 'url:../../img/icons.svg';

class ResultsView extends View{
    _parentElement = document.querySelector('.results');
    _errorMessage = 'There is not results for that query. Please try another one.'
    _successMessage = ''

    _generateMarkup(){
        //console.log(this._data);
        return this._data.map(bookmark => previewView.render(bookmark, false)).join('')
    }
}

export default new ResultsView();