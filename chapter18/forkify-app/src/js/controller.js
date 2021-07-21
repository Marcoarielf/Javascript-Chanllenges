import * as model from './model.js';
import {MODAL_CLOSE_SEC} from './config.js'
import recipeView from './views/recipeView.js'
import searchView from './views/searchView.js'
import 'core-js/stable'; // pollyfilling everything else
import 'regenerator-runtime/runtime' // pollyfilling async await
import recipeView from './views/recipeView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import bookmarksView from './views/bookmarksView.js';
import addRecipeView from './views/AddRecipeView.js';

// coming from Parcel in order to not reload entire page
// if(module.hot){
//   module.hot.accept();
// }

const controlRecipes = async function(){
  try{
    const id = window.location.hash.slice(1);

    if(!id) return;
    recipeView.renderLoading();

    // 0) update results view to mark selected search result
    resultsView.update(model.getSearchResultsPage())
    bookmarksView.update(model.state.bookmarks);
    
    //1) loading recipe
    // async function. Doesn't return anything so it's unnecesary to store the result in a variable. Return a promise
    await model.loadRecipe(id);
    
    // 2) rendering recipe
    recipeView.render(model.state.recipe)

  }catch(err){
    recipeView.renderError();
  }
};

const controlSearchResults = async function() {
  try{
    resultsView.renderLoading();
    
    // 1) get search query
    const query = searchView.getQuery();
    // console.log(query);
    if(!query) return;

    // 2) Load search results
    await model.loadSearchResults(query);

    // 3) render results
    // console.log(model.state.search.results);
    resultsView.render(model.getSearchResultsPage());

    // 4) Render initial pagination
    paginationView.render(model.state.search)

  }catch(err){
    console.log(err);
  }
}

const controlPagination = function(gotoPage){
  // 3) render results
  resultsView.render(model.getSearchResultsPage(gotoPage));

  // 4) Render pagination
  paginationView.render(model.state.search)
}

const controlServings = function(newServings){
  model.updateServings(newServings);

  recipeView.update(model.state.recipe)
}

const controlAddBookmark = function(){
  // add/remove bookmark
  if(!model.state.recipe.bookmarked) 
    model.addBookmark(model.state.recipe);
  else
    model.deleteBookmark(model.state.recipe.id);
    recipeView.update(model.state.recipe)

  // update recipe view with bookmarks

  // render bookmarks
  bookmarksView.render(model.state.bookmarks)
}

const controlBookmarks = function(){
  bookmarksView.render(model.state.bookmarks);
}

const controlAddNewRecipe = async function(newRecipe){
  try{
    // show loading spinner
    recipeView.renderLoading();

    await model.uploadRecipe(newRecipe);
    console.log(model.state.recipe);

    // render recipe
    recipeView.render(model.state.recipe);

    // display success message
    addRecipeView.renderMessage();

    // render bookmark view
    bookmarksView.render(model.state.bookmarks);

    //change ID in the URL
    // navigator method. Allow us to change URL without reloading the page
    window.history.pushState(null, '', `#${model.state.recipe.id}`)

    //close form window
    setTimeout(function(){
      addRecipeView.toggleWindow();
    }, MODAL_CLOSE_SEC * 1000)
  }catch(err){
    console.error('💥' + err);
    addRecipeView.renderError(err.message)
  }

  model.uploadRecipe(newRecipe);
}

// publisher-subscriber pattern of MVC.
const init = function(){
  bookmarksView.addHandlerBookmark(controlBookmarks);
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  addRecipeView.addHandlerUpload(controlAddNewRecipe);
}
init();