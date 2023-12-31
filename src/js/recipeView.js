import View from "./view.js";
class RecipeView extends View {
  _parentEl = document.querySelector(".recipe");
  _errorMessage = "We could not find that recipe. Please try another one!";

  addHandlerRender(handler) {
    ["hashchange", "load"].forEach((ev) =>
      window.addEventListener(ev, handler)
    );
  }

  addHandlerUpdateServing(handler) {
    this._parentEl.addEventListener("click", function (e) {
      const btn = e.target.closest(".btn--update-servings");
      if (!btn) return;
      const { updateTo } = btn.dataset;
      if (+updateTo > 0) handler(+updateTo);
    });
  }

  addHandlerAddBookmark(handler) {
    this._parentEl.addEventListener("click", function (e) {
      const btn = e.target.closest(".btn--bookmark");
      if (!btn) return;
      handler();
    });
  }

  _generatehtml() {
    return `
      <figure class="recipe__fig">
        <img src="${this._data.image}" alt="photo" class="recipe__img">
        <h1 class="recipe__title">
          <span>${this._data.title}</span>
        </h1>
      </figure>

      <div class="recipe__details">
        <div class="recipe__info">
          <i class="fa-regular fa-clock recipe__info-icon"></i>
          <span class="recipe__info-data recipe__info-data--minutes">${
            this._data.cookingTime
          } </span>
          <span class="recipe__info-text">minutes</span>
        </div>
        <div class="recipe__info">
          <i class="fa-solid fa-user-group recipe__info-icon"></i>
          <span class="recipe__info-data recipe__info-data--people">${
            this._data.servings
          } </span>
          <span class="recipe__info-text"> servings</span>
          <div class="recipe__info-buttons">
            <button class="btn--tiny btn--update-servings" data-update-to="${
              this._data.servings - 1
            }">
              <i class="fa-solid fa-minus"></i>
            </button>
            <button class="btn--tiny btn--update-servings" data-update-to="${
              this._data.servings + 1
            }">
              <i class="fa-solid fa-plus"></i>
            </button>
          </div>
        </div>
          <div class="recipe_user-generated ${this._data.key ? "" : "hidden"}">
            <i class="fa-regular fa-user"></i>
          </div>
          <button class="btn--round btn--bookmark">
            ${
              this._data.bookmarked
                ? '<i class="fa-solid fa-bookmark"></i>'
                : '<i class="fa-regular fa-bookmark"></i>'
            }
          </button>
      </div>

      <div class="recipe__ingredients">
        <h2 class="heading--2">Recipe ingredients</h2>
        <ul class="recipe__ingredient-list row">
        ${this._data.ingredients
          .map((ing) => {
            return `
          <li class="recipe__ingredient col-lg-6">
            <i class="fa-solid fa-check recipe__icon"></i>
            <div class="recipe__quantity">
            ${ing.quantity ? (ing.quantity) : ""} 
            </div>
            <div class="recipe__description">
              <span class="recipe__unit"> ${ing.unit}</span>
              ${ing.description}
            </div>
          </li>
          `;
          })
          .join("")}
        </ul>
      </div>

      <div class="recipe__directions">
        <h2 class="heading--2">How to cook it</h2>
        <p class="recipe__directions-text">
          This recipe was carefully designed and tested by
          <span class="recipe__publisher">${
            this._data.publisher
          }</span>. Please check out
          directions at their website.
        </p>
        <a class="btn--small recipe__btn" href="${
          this._data.sourceUrl
        }" target="_blank">
          <span>Directions</span>
          <i class="fa-solid fa-arrow-right search__icon"></i>
        </a>
      </div>

    </div>
    `;
  }
}
export default new RecipeView();
