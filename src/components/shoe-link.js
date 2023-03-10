import { LitElement, html } from 'lit';
import { navigator } from 'lit-element-router';

class Link extends navigator(LitElement) {
  static get is() {
    return 'shoe-link';
  }

  static get properties() {
    return {
      href: { type: String },
    };
  }

  constructor() {
    super();
    this.href = '';
  }

  render() {
    return html`
      <a href="${this.href}" @click="${this.linkClick}">
        <slot></slot>
      </a>
    `;
  }

  linkClick(event) {
    event.preventDefault();
    this.navigate(this.href);
  }
}

customElements.define(Link.is, Link);
