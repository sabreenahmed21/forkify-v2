import View from "./view.js";
import previewview from "./previewview.js";

class ResultsView extends View {
  _parentEl = document.querySelector(".results");
  _errorMessage = "No recipes found for your query! Please try again";

  _generatehtml() {
    return this._data
      .map((result) => previewview.render(result, false))
      .join(" ");
  }
}

export default new ResultsView();
