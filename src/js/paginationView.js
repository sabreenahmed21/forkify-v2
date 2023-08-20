import View from "./view.js";
class paginationView extends View {
  _parentEl = document.querySelector(".pag");
  addHandlerClick(handler) {
    this._parentEl.addEventListener("click", function (e) {
      const btn = e.target.closest(".btn");
      if (!btn) return;
      const gotoPage = +btn.dataset.goto;
      handler(gotoPage);
    });
  }
  _generatehtml() {
    const curPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPage
    );
    if (curPage === 1 && numPages > 1) {
      return `
      <div data-goto="${curPage + 1}"  class="page-nex btn">
      <span> Page ${curPage + 1}</span>
      <i class="fa-solid fa-angle-right"></i>
      </div>
      `;
    }
    if (curPage === numPages && numPages > 1) {
      return `
      <div  data-goto="${curPage - 1}" class="page-prev btn">
      <i class="fa-solid fa-chevron-left"></i>
      <span> Page ${curPage - 1}</span>
      </div>
      `;
    }
    if (curPage < numPages) {
      return `
      <div data-goto="${curPage - 1}" class="page-prev btn">
      <i class="fa-solid fa-chevron-left"></i>
      <span> Page ${curPage - 1}</span>
      </div>
      <div data-goto="${curPage + 1}" class="page-nex btn">
      <span> Page ${curPage + 1}</span>
      <i class="fa-solid fa-angle-right"></i>
      </div>
      `;
    }
    return "";
  }
}
export default new paginationView();
