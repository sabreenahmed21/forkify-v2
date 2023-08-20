export default class View {
  _data;

  render(data, render = true) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();
    this._data = data;
    const html = this._generatehtml();
    if (!render) return html;
    this._parentEl.innerHTML = "";
    this._parentEl.insertAdjacentHTML("afterbegin", html);
  }

  update(data) {
    this._data = data;
    const newHtml = this._generatehtml();
    const newDom = document.createRange().createContextualFragment(newHtml);
    const newElement = Array.from(newDom.querySelectorAll("*"));
    const curElement = Array.from(this._parentEl.querySelectorAll("*"));
    newElement.forEach((newEl, i) => {
      const curEl = curElement[i];
      //update text
      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild.nodeValue.trim() !== ""
      ) {
        curEl.textContent = newEl.textContent;
      }
      //update attributes
      if (!newEl.isEqualNode(curEl)) {
        Array.from(newEl.attributes).forEach((attr) =>
          curEl.setAttribute(attr.name, attr.value)
        );
      }
    });
  }

  spinner = function () {
    const html = `<div class="loader"></div>`;
    this._parentEl.innerHTML = "";
    this._parentEl.insertAdjacentHTML("afterbegin", html);
  };

  renderError(message = this._errorMessage) {
    const html = `
    <div class="err">
    <i class="fa-solid fa-triangle-exclamation"></i>
    <p>${message}</p>
    </div>
    `;
    this._parentEl.innerHTML = "";
    this._parentEl.insertAdjacentHTML("afterbegin", html);
  }

  renderMessage(message = this._message) {
    const html = `
    <div class="message">
    <i class="fa-regular fa-face-smile"></i>
    <p>${message}</p>
    </div>
    `;
    this._parentEl.innerHTML = "";
    this._parentEl.insertAdjacentHTML("afterbegin", html);
  }
}
