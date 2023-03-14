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
      params: { type: Object },
      route: { type: String },
      shoeListFilterList: { type: Array},
      shoeSelected: { type: Object },
      user: { type: Object },
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
      width: 20%;
    }

    #main-container{
      width: 75%;
    }

    #main-layout-container {
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
        name: 'cart',
        pattern: 'cart',
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
    this.params = {};
    this.route = '';
    this.shoeListFilterList = []
    this.shoeSelected = {};
    this.user={};
    this.user.log=false;
    this.user.name='';
    this.user.password='';
  }

  router(route, params) {
    this.route = route;
    this.params = params;
  }

  render() {
    return html`
      <shoe-header></shoe-header>
      <div id="main-layout-container">
        <shoe-layout @filter-selected=${this.handleSelectedFilter} ></shoe-layout>
        <div id="main-container">
          ${this.user.log
            ? html `
            <h1>Welcome ${this.user.name}!</h1>`
          :''}
          <shoe-main active-route=${this.route}>
            <shoe-cart route="cart"></shoe-cart>
            <shoe-detail route="detail" .shoe=${this.shoeSelected}></shoe-detail>
            <shoe-home
              route="home"
              @shoe-selected=${this.handleSelectedShoe}
              .shoeListFilterList=${this.shoeListFilterList}
            ></shoe-home>
            <shoe-user 
              route="user"
              @user-logged=${this.handleSelectedUser}
              @user-logout=${this.handleLogout} 
            ></shoe-user>
            <h1 route="not-found">Not Found</h1>
        </shoe-main>
        </div>
      </div>
    `;
  }

  handleSelectedShoe(ev) {
    this.shoeSelected=ev.detail;
    this.route=("detail");
  }

  handleSelectedFilter(ev){
    if(ev.detail.activated===false) {
      let repeated = false;
      this.shoeListFilterList.forEach(filter => {
        if((filter.type===ev.detail.type&&filter.object===ev.detail.object)){
          repeated=true}
      })
      if(!repeated) {
        let filter = {type: ev.detail.type, object: ev.detail.object};
        this.shoeListFilterList.push(filter);
        this.shoeListFilterList=[].concat(this.shoeListFilterList);
      }
    }else{
      let copy = [];
      this.shoeListFilterList.forEach(filter => {
        if((filter.type!==ev.detail.type)||(filter.object!==ev.detail.object)){
          copy.push(filter);
        }
      })
      this.shoeListFilterList=[].concat(copy);
    };
  }

  handleSelectedUser(ev){
    this.user=ev.detail;
  }

  handleLogout(){
    this.user={...this.user, name:'', password:'', log:false};
  }
}

customElements.define(App.is, App);
