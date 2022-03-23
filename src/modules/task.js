export default class Task {
  constructor(description) {
    this.index = 0;
    this.completed = false;
    this.description = description;
  }

  toHTML = () => `<label for="Item${this.index}">
      <button type="button" class="check-box">&check;</button>
      <input type="text" value="${this.description}" name="Item${this.index}" id="Item${this.index}">
    </label>
    <i class="fa-solid fa-ellipsis-vertical"></i>`
}