import { LitElement, html } from 'lit';

export class Detail extends LitElement {
  static get properties() {
    return {
      shoe: { Type: Object },
    };
  }

  static get is() {
    return 'shoe-detail';
  }

  render() {
    return html`
      <div id="detail-container">
        <div id="first-column">
          <p>${this.shoe?.category}</p>
          <h1>${this.shoe?.name}</h1>
          <p id="price-size-container">
            <span>${this.shoe?.price}€</span>
            ${this.shoe
              ? html`
                  <select>
                    ${this.shoe.size?.map(
                      size => html`<option value=${size}>${size}</option>`
                    )}
                  </select>
                  <button>Add to cart</button>
                `
              : ''}
          </p>
        </div>
        ${this.shoe
          ? html`
              <img
                id="image"
                src="${this.shoe.image}"
                alt="${this.shoe.name} front photo"
                width="300px"
              />
              <div id="last-column">
                <img
                  id="image-side"
                  src="${this.shoe['image-side']}"
                  alt="${this.shoe.name} side view"
                  width="150px"
                />
                <img
                  id="image-behind"
                  src="${this.shoe['image-behind']}"
                  alt="${this.shoe.name} behind view"
                  width="150px"
                />
              </div>
            `
          : ''}
      </div>
    `;
  }
}

customElements.define(Detail.is, Detail);
