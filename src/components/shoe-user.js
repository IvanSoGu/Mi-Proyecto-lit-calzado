import {LitElement, html, css} from 'lit';

export class User extends LitElement {

  static get properties(){
    return{
      url: { type: String },
      user: { type: Object },
      usersList: { type: Array },
    }
  }

  static get is(){
    return 'shoe-user';
  }

  static styles = css`
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
    }`;

  constructor(){
    super();
    this.user={};
    this.user.log=false;
    this.user.name='';
    this.user.password='';
    this.usersList=[];
    this.url='https://my-json-server.typicode.com/IvanSoGu/fake-json-server/users'
  }

  render(){
    return html `
      <p>Users are:</p>
      <ol>
        ${this.usersList?.map(user=>html`<li>${user.name}</li>`)}
      </ol>

      ${this.user.log
            ? html `
              <button @click=${this.logout}> LOGOUT </button>
            `
          :html`
            <input type="text" id="user-name" placeholder="Username" .value=${this.user.name} @change=${this.nameChange}>
            <input type="text" id="user-password" placeholder="Password" .value=${this.user.password} @change=${this.passwordChange}>
            <button @click=${this.login}> LOGIN </button>
          `}
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
      if((user.name===this.user.name)&&(user.password===this.user.password)){
        this.user={...this.user, log:true}
        this.dispatchEvent(
          new CustomEvent('user-logged', {
            bubbles: true,
            composed: true,
            detail: this.user,
          })
        );
      }
    });
  }

  logout(){
    this.user={...this.user, name:'', password:'', log:false}
    this.dispatchEvent(
      new CustomEvent('user-logout', {
        bubbles: true,
        composed: true,
        detail: this.user,
      })
    )
  }

  nameChange(event){
    this.user.name=event.srcElement.value;
  }

  passwordChange(event){
    this.user.password=event.srcElement.value;
  }
}

customElements.define(User.is, User);