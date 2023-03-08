/* eslint-disable lit-a11y/click-events-have-key-events */
import { LitElement, html, css } from 'lit';
import { navigator } from 'lit-element-router';

export class Home extends navigator(LitElement) {
  static get properties() {
    return {
      filteredList: { type: Array },
      repeated: { type: Boolean},
      shoeList: { type: Array },
      shoeListFilter: { type: String },
      shoeListFilterType: { type: String },
      url: { type: String },
    };
  }

  static get is() {
    return 'shoe-home';
  }

  static styles = css`
    :host {
      color: #000000;
      display: flex;
      flex-wrap: wrap;
      text-align: center;
    }

    span {
      color: #19109d;
      font-weight: bold;
    }

    .row {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: space-between;
    }

    .column {
      box-shadow: 2px 2px 2px 2px black;
      display: flex;
      flex-direction: column;
      width: 210px;
    }
  `;

  constructor() {
    super();
    this.filteredList = [];
    this.repeated = false;
    this.shoeList = [];
    this.shoeListFilter = '';
    this.shoeListFilterType = '';
    this.url =
      'https://my-json-server.typicode.com/IvanSoGu/fake-json-server/shoes';
  }

  render() {
    return html`
      <div class="row">
        ${this.filteredList.length > 0
          ? this.filteredList.map(
              shoe => html`
                <div class="column" @click="${() => this.handleClick(shoe)}">
                  <img
                    src="${shoe.image}"
                    alt="${shoe.name} image"
                    width="200px"
                  />
                  ${shoe.name}
                  <span>${shoe.price}€</span>
                </div>
              `
            )
          : ''}
      </div>
    `;
  }

  firstUpdated() {
    this.fetchShoes();
  }

  updated() {
    if (this.shoeListFilter) {
      this.filterByAny(this.shoeListFilterType, this.shoeListFilter);
    }
  }

  fetchShoes() {
    fetch(this.url)
      .then(response => response.json())
      .then(data => {
        this.shoeList = [].concat(data);
        this.filteredList = [].concat(data);
      })
      .catch(error => {
        console.log('Error on fetch!', error);
      });
  }

  handleClick(shoe) {
    this.dispatchEvent(
      new CustomEvent('shoe-selected', {
        detail: shoe,
        composed: true,
        bubbles: true,
      })
    );
    this.navigate(`/detail/${shoe.id}`);
  }

  filterByAny(type, filter) {
    if(type==="reset"){
      this.shoeList.forEach(shoe=> this.filteredList.push(shoe))
      this.shoeListFilterType=false;
    }else{
      this.filteredList.length = 0;
      if(type!=="size"){
        this.shoeList.forEach(shoe => {
          if (shoe[type] === filter) {
            this.filteredList.push(shoe);
          }
        });
      }else{
        this.shoeList.forEach(shoe=>{
          shoe.size.forEach(size=>{
            if(filter===size){
              this.filteredList.forEach(listedShoe=>{
                if(listedShoe===shoe){
                  this.repeated=true;   
                }
              })
              if(!this.repeated){
                this.filteredList.push(shoe);
              }
            }
          })
        })
      }
    }
    // Do NOT dare to take this out
    this.shoeListFilter=false;
  }
}

customElements.define(Home.is, Home);
