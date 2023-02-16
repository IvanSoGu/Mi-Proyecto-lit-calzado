import { LitElement, html } from 'lit';
import { outlet } from 'lit-element-router';

class Main extends outlet(LitElement) {
  static get is() {
    return 'shoe-main';
  }

  render() {
    return html`
      <slot></slot>
    `;
  }
}
 
customElements.define(Main.is, Main);