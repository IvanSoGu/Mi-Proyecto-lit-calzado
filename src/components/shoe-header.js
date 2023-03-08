import { LitElement, html, css } from "lit";

import './shoe-link.js';

export class Header extends LitElement {

    static get is() {
        return 'shoe-header';
    }

    static styles = css`
        :host {
            align-items: center;
            background-color: #272c2c;
            color: #ffffff;
            display: flex;
            flex-direction: column;
            padding: 2%;
        }

        div {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            width: 90%;
        }

    `

    render() {
        return html `
            <shoe-link href="/"><img src="src/img/sonic-shoe-logo.png" width=102px alt="Sonic shoe logo"></shoe-link>
            <p>Men's Lifestyle Sneakers</p>
            <div>
                <shoe-link href="/"><img src="src/img/home-logo.png" width=51px alt="Home logo"></shoe-link>
                <shoe-link href="/user"><img src="src/img/user-logo.png" width=51px alt="User logo"></shoe-link>
                <shoe-link href="/cart"><img src="src/img/Shopping-cart-icon.png" width=51px alt="Cart logo"></shoe-link>
            </div>
        `;
    }

}

customElements.define(Header.is, Header);