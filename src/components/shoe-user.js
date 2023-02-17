import {LitElement, html} from 'lit';

export class User extends LitElement {

  static get properties(){
    return{
      url: { type: String },
      user: { type: String },
      usersList: { type: Array },
    }
  }

  static get is(){
    return 'shoe-user';
  }

  constructor(){
    super();
    this.user='';
    this.usersList=[];
    this.url='https://my-json-server.typicode.com/IvanSoGu/fake-json-server/users'
  }

  render(){
    return html `
      <p>Users are:</p>
      <ol>
        ${this.usersList?.map(user=>html`<li>${user.name}</li>`)}
      </ol>
      <input type="text" id="user-name" placeholder="Username" .value=${this.user} @change=${this.userChange}>
      <input type="text" id="user-password" placeholder="Password">
      <button @click=${this.login}> LOGIN </button>
    `;
  }

  firstUpdated(){
    this.fetchUsers();
  }

  fetchUsers() {
    fetch(this.url)
      .then(response => response.json())
      .then(data => {
        this.usersList = [].concat(data);
      })
      .catch(error => {
        console.log('Error on fetch!', error);
      });
  }

  login(){
    this.usersList.forEach(user=>{
      if(user.name===this.user){
        this.dispatchEvent(
          new CustomEvent('user-selected', {
            detail: user,
            composed: true,
            bubbles: true,
          })
        );
      }
    });
  }

  userChange(event){
    this.user=event.srcElement.value;
  }
}

customElements.define(User.is, User);