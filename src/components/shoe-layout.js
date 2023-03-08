import { LitElement, html, css } from 'lit';

export class Layout extends LitElement {
  static get properties() {
    return {
      brands: { type: Array },
      brandsWrapper: { type: Array},
      categories: { type: Array },
      categoriesWrapper: { type: Array },
      filteredList: { type: Array },
      repeated: { type: Boolean },
      sizes: { type: Array },
      sizesWrapper: { type: Array },
      url: { type: String },
    };
  }

  static get is() {
    return 'shoe-layout';
  }

  static styles = css`
    :host{
      display: flex;
      flex-direction: column;
      margin: 2% 3%;
    }

    button {
      background-color: #626262;
      border: 1px solid #000000;
      color: #ffffff;
      font-size: calc(7px + 2vmin);
      width: calc(20px + 18vmin);
    }

    button:hover {
      background-color: #ffffff;
      border: 1px solid #000000;
      color: #626262;
    }

    .size {
      border: 1px solid black;
      padding: 2%;
    }

    .true {
      background-color:green;
    }

    .true:hover {
      background-color:#ffffff;
      color: green;
    }

    #size-container {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
    }
  `;

  constructor() {
    super();
    this.brands = [];
    this.brandsWrapper = [];
    this.categories = [];
    this.categoriesWrapper = [];
    this.sizes = [];
    this.sizesWrapper = [];
    this.repeated = false;
    this.url =
      'https://my-json-server.typicode.com/claumartinezh/training-db/shoes';
  }

  render() {
    return html`
            <h1>FILTER</h1>
            <h3>CATEGORY</h3>
            ${
              this.categoriesWrapper
                ? html`
                    ${this.categoriesWrapper.map(
                      category =>
                        html`<button
                          @click=${() => this.filter('category', category[0], category[1])}
                          class=${category[1]}
                        >
                          ${category[0]}
                        </button>`
                    )}
                  `
                : ''
            }
            <h3>SIZE</h3>
            ${
              this.sizesWrapper
                ? html`
                    <div id="size-container">
                      ${this.sizesWrapper.map(
                        size =>
                          html`<button
                            @click=${() => this.filter('size', size[0], size[1])}
                            class="size ${size[1]}"
                          >
                            ${size[0]}
                          </button>`
                      )}
                    </div>
                  `
                : ''
            }
                </div>    
            <h3>BRAND</h3>
            ${
              this.brandsWrapper
                ? html`
                    ${this.brandsWrapper.map(
                      brand =>
                        html`<button
                          @click=${() => this.filter('brand', brand[0], brand[1])}
                          class=${brand[1]}
                        >
                          ${brand[0]}
                        </button>`
                    )}
                  `
                : ''
            }
            `;
  }

  firstUpdated() {
    this.fetchAll();
  }

  fetchAll() {
    fetch(this.url)
      .then(response => response.json())
      .then(data => {
        data.forEach(shoe => {
          this.repeated = false;
          this.categories.forEach(category => {
            if (category === shoe.category) {
              this.repeated = true;
            }
          });
          if (!this.repeated) {
            this.categories.push(shoe.category);
          }
          shoe.size.forEach(shoeSize => {
            this.repeated = false;
            if (this.sizes.length > 0) {
              this.sizes.forEach(sizes => {
                if (sizes === shoeSize) {
                  this.repeated = true;
                }
              });
            }
            if (!this.repeated) {
              this.sizes.push(shoeSize);
            }
          });
          this.repeated = false;
          this.brands.forEach(brand => {
            if (brand === shoe.brand) {
              this.repeated = true;
            }
          });
          if (!this.repeated) {
            this.brands.push(shoe.brand);
          }
        });
        this.sortAll();
      })
      .catch(error => {
        console.log('Error on fetch!', error);
      });
  }

  sortAll() {
    this.brands.sort();
    this.categories.sort();
    this.sizes.sort();
    this.brands.forEach(brand=>
      this.brandsWrapper.push({0:brand, 1:false})
    )
    this.categories.forEach(category=>
      this.categoriesWrapper.push({0:category,1:false})
    )
    this.sizes.forEach(size=>
      this.sizesWrapper.push({0:size, 1:false}) 
    )
  }

  filter(type, object, activated) {
    this.activateFilter(type, object, activated);
    if(!activated){
      this.customDispatchEvent('filter-selected', type, object);
    }else{
      this.customDispatchEvent('filter-reset');
    }
  }

  activateFilter(type, object, activated){
    switch(type){
      case "brand":
        this.filterStatusChange("brandsWrapper", object, !activated);
        break;
      case "category":
        this.filterStatusChange("categoriesWrapper", object, !activated);
        break;
      case "size":
        this.filterStatusChange("sizesWrapper", object, !activated);
        break;
      default:
        console.log("Error, no filter type selected");
    }
  }

  filterStatusChange(list, object, status){
    let i=0;
    this[list].forEach(element=>{
      if(element[0]===object){
        this[list][i][1]=status;
        this.requestUpdate();
      }
      i+=1;
    });
  }

  customDispatchEvent(event, type, object){
    this.dispatchEvent(
      new CustomEvent(event, {
        bubbles: true,
        composed: true,
        detail: { type, object },
      })
    )
  }
}

customElements.define(Layout.is, Layout);
