import View from './view.js'
import previewView from './previewView.js'
import icons from 'url:../../img/icons.svg';

class BookmarksView extends View{
    _parentElement = document.querySelector('.bookmarks__list');
    _errorMessage = 'No bookmarks yet. Fin a nice recipe and bookmark it!'
    _successMessage = '';

    addHandlerBookmark(handler){
        addEventListener('load', handler);
    }

    _generateMarkup(){
        //console.log(this._data);
        return this._data.map(bookmark => previewView.render(bookmark, false)).join('')
    }
}

export default new BookmarksView();