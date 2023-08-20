// import 'core-js/stable';
// import 'regenerator-runtime/runtime';

import * as model from "./model.js";
import paginationView from "./paginationView.js";
import resultsView from "./resultsView.js";
import SearchView from "./searchView.js";
import recipeView from "./recipeView.js";
import bookmarksview from "./bookmarksview.js";
import addRecipeview from "./addRecipeview.js";


const controlShowRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;
    recipeView.spinner();
    //(0)update results
    resultsView.render(model.getSearchResultsPage());
    //(1)loading recipe
    await model.loadRecipe(id);
    //(2)Rendering recipe
    recipeView.render(model.state.recipe);
    //(3)bookmarks
    bookmarksview.update(model.state.bookmarks);
  } catch (error) {
    recipeView.renderError(`${error}`);
  }
};

const controlSearchResults = async function () {
  try {
    const query = SearchView.getQuery();
    if (!query) return;
    resultsView.spinner();
    await model.loadSearchResult(query);
    resultsView.render(model.getSearchResultsPage());
    paginationView.render(model.state.search);
  } catch (error) {
    throw error;
  }
};
controlSearchResults();

const controlPagination = function (gotoPage) {
  resultsView.render(model.getSearchResultsPage(gotoPage));
  paginationView.render(model.state.search);
};

const controlServings = function (newServings) {
  model.updatingServings(newServings);
  recipeView.update(model.state.recipe);
};

const controlAddBookmark = function () {
  if (!model.state.recipe.bookmarked) model.addBookMark(model.state.recipe);
  else model.deleteBookMark(model.state.recipe.id);
  recipeView.render(model.state.recipe);
  bookmarksview.render(model.state.bookmarks);
};

var bookmarkList = document.querySelector(".bookmarks");
var btnBookmark = document.querySelector(".btn-bookmark");
var body = document.querySelector(".row");
body.addEventListener("click", () => {
  if (bookmarkList.style.display === "block") {
    bookmarkList.style.display = "none";
  } else {
    bookmarkList.style.display = "none";
  }
});
btnBookmark.addEventListener("click", () => {
  if (bookmarkList.style.display === "none") {
    bookmarkList.style.display = "block";
  } else {
    bookmarkList.style.display = "none";
  }
});

const controlBookmark = function () {
  bookmarksview.render(model.state.bookmarks);
  bookmarksview.renderMessage();
};

const controlAddRecipe = async function (newRecipe) {
  try {
    //show loading
    addRecipeview.spinner();
    //upload the new recipe data
    await model.upLoadRecipe(newRecipe);
    //render recipe
    recipeView.render(model.state.recipe);
    //succes msg
    addRecipeview.renderMessage();
    //render bookmark view
    bookmarksview.render(model.state.bookmarks);
    //change id in url
    window.history.pushState(null, "", `#${model.state.recipe.id}`);
    //close form window
    setTimeout(function () {
      addRecipeview.toggleWindow();
    }, 1500);
  } catch (error) {
    addRecipeview.renderError(error.message);
  }
};

document.querySelector(".dark").addEventListener("click", () => {
  var element = document.body;
  element.classList.toggle("dark-mode");
});

const init = (_) => {
  bookmarksview.addHandlerRender(controlBookmark);
  recipeView.addHandlerRender(controlShowRecipe);
  recipeView.addHandlerUpdateServing(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  paginationView.addHandlerClick(controlPagination);
  SearchView.addHandlerSearch(controlSearchResults);
  addRecipeview.addHandlerUpLoad(controlAddRecipe);
};
init();
