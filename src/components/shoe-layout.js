import { LitElement, html, css } from 'lit';

export class Layout extends LitElement {
  static get properties() {
    return {
      brands: { type: Array },
      brandsWrapper: { type: Array},
      categories: { type: Array },
      categoriesWrapper: { type: Array },
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
    this.url =
      'https://my-json-server.typicode.com/claumartinezh/training-db/shoes';
  }

  firstUpdated() {
    this.fetchAll();
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
                          @click=${() => this.filter('category', category.name, category.active)}
                          class=${category.active}
                        >
                          ${category.name}
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
                            @click=${() => this.filter('size', size.name, size.active)}
                            class="size ${size.active}"
                          >
                            ${size.name}
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
                          @click=${() => this.filter('brand', brand.name, brand.active)}
                          class=${brand.active}
                        >
                          ${brand.name}
                        </button>`
                    )}
                  `
                : ''
            }
            `;
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

  customDispatchEvent(event, type, object){
    this.dispatchEvent(
      new CustomEvent(event, {
        bubbles: true,
        composed: true,
        detail: { type, object },
      })
    )
  }

  fetchAll() {
    fetch(this.url)
      .then(response => response.json())
      .then(data => {
        data.forEach(shoe => {
          this.fetchCategories(shoe);
          shoe.size.forEach(shoeSize => {
            this.fetchSizes(shoeSize);
          });
          this.fetchBrands(shoe);
        });
        this.requestUpdate();
        this.sortAll();
      })
      .catch(error => {
        console.log('Error on fetch!', error);
      });
  }

  fetchBrands(shoe) {
    let repeated = false;
    this.brands.forEach(brand => {
      if (brand === shoe.brand) {
        repeated = true;
      }
    });
    if (!repeated) {
      this.brands.push(shoe.brand);
    }
  }

  fetchCategories(shoe){
    let repeated = false;
    this.categories.forEach(category => {
      if (category === shoe.category) {
        repeated = true;
      }
    });
    if (!repeated) {
      this.categories.push(shoe.category);
    }
  }

  fetchSizes(shoeSize){
    let repeated = false;
    if (this.sizes.length > 0) {
      this.sizes.forEach(sizes => {        
        if (sizes === shoeSize) {
          repeated = true;
        }        
      });     
    }     
    if (!repeated) {
      this.sizes.push(shoeSize);        
    }
  }

  filter(type, object, activated) {
    this.activateFilter(type, object, activated);
    if(!activated){
      this.customDispatchEvent('filter-selected', type, object);
    }else{
      this.customDispatchEvent('filter-reset');
    }
  }

  filterStatusChange(list, object, status){
    let i=0;
    this[list].forEach(element=>{
      if(element.name===object){
        this[list][i].active=status;
        this.requestUpdate();
      }
      i+=1;
    });
  }

  sortAll() {
    this.brands.sort();
    this.categories.sort();
    this.sizes.sort();
    this.brands.forEach(brand=>
      this.brandsWrapper.push({name:brand, active:false})
    )
    this.categories.forEach(category=>
      this.categoriesWrapper.push({name:category, active:false})
    )
    this.sizes.forEach(size=>
      this.sizesWrapper.push({name:size, active:false}) 
    )
  }
}

customElements.define(Layout.is, Layout);
