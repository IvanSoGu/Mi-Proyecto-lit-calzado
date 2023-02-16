import {LitElement, html} from 'lit';

export class User extends LitElement {

  static get is(){
    return 'shoe-user';
  }

  render(){
    return html `Hellouda user`;
  }
}

customElements.define(User.is, User);