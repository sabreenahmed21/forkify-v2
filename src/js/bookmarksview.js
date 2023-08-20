import View from "./view.js";
import previewview from "./previewview.js";

class bookmarksview extends View {
  _parentEl = document.querySelector(".bookmarks_list");
  _errorMessage = "No bookmarks yet. Find a nice recipe and bookmark it ;)";
  _message = "No bookmarks yet. Find a nice recipe and bookmark it ;)";

  addHandlerRender(handler) {
    window.addEventListener("load", handler);
  }

  _generatehtml() {
    return this._data
      .map((bookmark) => previewview.render(bookmark, false))
      .join(" ");
  }
}

export default new bookmarksview();
