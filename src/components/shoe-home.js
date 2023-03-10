import { LitElement, html, css } from 'lit';
import { navigator } from 'lit-element-router';

export class Home extends navigator(LitElement) {
  static get properties() {
    return {
      filteredShoeList: { type: Array },
      externalUpdated: { type: Boolean },
      previousShoeListFilterList: { type: Array },
      shoeList: { type: Array },
      shoeListFilterList: { type: Array },
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

    .container {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      width: 100%;
    }

    .shoe {
      background-color: #abc4c2;
      border: 2px solid black;
      margin: 1%;
      width: 210px;
    }
  `;

  constructor() {
    super();
    this.filteredShoeList = [];
    this.externalUpdated = true;
    this.previousShoeListFilterList = [];
    this.shoeList = [];
    this.shoeListFilterList = [];
    this.url =
      'https://my-json-server.typicode.com/IvanSoGu/fake-json-server/shoes';
  }

  render() {
    return html`
      <div class="container">
        ${this.filteredShoeList.length > 0
          ? this.filteredShoeList.map(
              shoe => html`
                <div class="shoe" @click="${() => this.handleClick(shoe)}">
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
    this.previousShoeListFilterList !== this.shoeListFilterList
      ? (this.externalUpdated = true)
      : (this.externalUpdated = false);
    if (this.externalUpdated) {
      this.filterByAny();
      this.previousShoeListFilterList = this.shoeListFilterList;
    }
  }

  fetchShoes() {
    fetch(this.url)
      .then(response => response.json())
      .then(data => {
        this.shoeList = [].concat(data);
        this.filteredShoeList = [].concat(data);
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

  filterByAny() {
    this.filteredShoeList.length = 0;
    if(this.shoeListFilterList.length>0){
      this.shoeListFilterList.forEach(filter=>{
        if (filter.type !== 'size') {
          this.shoeList.forEach(shoe => {
            if (shoe[filter.type] === filter.object) {
              this.filteredShoeList.push(shoe);
            }
          });
        } else {
          this.shoeList.forEach(shoe => {
            shoe.size.forEach(size => {
              if (filter.object === size) {
                let repeated = false;
                this.filteredShoeList.forEach(listedShoe => {
                  if (listedShoe === shoe) {
                    repeated = true;
                  }
                });
                if (!repeated) {
                  this.filteredShoeList.push(shoe);
                }
              }
            });
          });
        }
      });
    }else{
      this.filteredShoeList=[].concat(this.shoeList)
    };
  }
}

customElements.define(Home.is, Home);
