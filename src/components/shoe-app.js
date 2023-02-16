import { LitElement, html, css } from 'lit';
import { router } from 'lit-element-router';

import './shoe-detail.js';
import './shoe-header.js';
import './shoe-home.js';
import './shoe-layout.js';
import './shoe-link.js';
import './shoe-main.js';
import './shoe-user.js';

class App extends router(LitElement) {
  static get properties() {
    return {
      filter: { type: Array },
      filterType: { type: String },
      params: { type: Object },
      shoeSelected: { type: Object },
      route: { type: String },
    };
  }

  static styles = css`
    :host {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
      font-size: calc(10px + 2vmin);
      background-color: #bbcfcd;
    }

    shoe-header {
      width: 96%;
    }

    shoe-layout{
      width: 30%;
    }

    shoe-main{
      width: 65%;
    }

    #main-container {
      display: flex;
      flex-direction: row;
      width: 96%;
    }
  `;

  static get is() {
    return 'shoe-app';
  }

  static get routes() {
    return [
      {
        name: 'home',
        pattern: '',
      },
      {
        name: 'detail',
        pattern: 'detail/:id',
      },
      {
        name: 'user',
        pattern: 'user',
      },
      {
        name: 'not-found',
        pattern: '*',
      },
    ];
  }

  constructor() {
    super();
    this.filter = [];
    this.filterType = '';
    this.params = {};
    this.route = '';
    this.shoeSelected = {};
  }

  router(route, params) {
    this.route = route;
    this.params = params;
  }

  render() {
    return html`
      <shoe-header></shoe-header>
      <div id="main-container">
        <shoe-layout @filter-selected=${this.handleSelectedFilter} @filter-reset=${this.resetFilter}></shoe-layout>
        <shoe-main active-route=${this.route}>
          <shoe-home
            route="home"
            @shoe-selected=${this.handleSelectedShoe}
            .filter=${this.filter}
            .filterType=${this.filterType}
          ></shoe-home>
          <shoe-user route="user"></shoe-user>
          <shoe-detail route="detail" .shoe=${this.shoeSelected}></shoe-detail>
          <h1 route="not-found">Not Found</h1>
        </shoe-main>
      </div>
    `;
  }

  handleSelectedShoe(ev) {
    this.shoeSelected=ev.detail;
    this.route=("detail");
  }

  handleSelectedFilter(ev){
    this.filterType=ev.detail.type;
    this.filter=ev.detail.object;
  }

  resetFilter(){
    this.filterType="reset"
    this.filter={};
  }
}

customElements.define(App.is, App);
