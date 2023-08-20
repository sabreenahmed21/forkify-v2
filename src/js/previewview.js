import View from "./view.js";

class previewview extends View{
  _parentEl = '';
  _generatehtml(){
    const id = window.location.hash.slice(1);
    return `
    <li class="preview">
      <a class="preview_link ${this._data.id === id ? 'preview_link-active' : ''}" href="#${this._data.id}">
        <figure class="preview_fig">
          <img src="${this._data.image}" alt="img">
        </figure>
        <div class="preview_data">
          <h4 class="preview_title">${this._data.title}</h4>
          <p class="preview_publisher">${this._data.publisher}</p>
          <div class="preview_user-generated ${this._data.key ? '' : 'hidden'}">
            <i class="fa-regular fa-user"></i>
          </div>
        </div>
      </a>
    </li>
    `
  };
};

export default new previewview();