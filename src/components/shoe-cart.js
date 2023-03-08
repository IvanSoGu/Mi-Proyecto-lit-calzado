import { LitElement, html } from "lit";

class Cart extends LitElement() {
  static get is() {
    return 'shoe-cart';
  }

  render() {
    return html``
  }

}

customElements.define(Cart.is, Cart);