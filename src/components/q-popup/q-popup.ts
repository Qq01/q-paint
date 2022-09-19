import template from './q-popup.html?raw';
export enum QPopupEvents {
    CANCEL = 'q-popup:cancel',
    CONFIRM = 'q-popup:confirm'
}
export class QPopup extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        this.shadowRoot!.innerHTML = template;
        this.shadowRoot!.querySelector('#btn-cancel')!.addEventListener('click', _e => {
            this.dispatchEvent(new Event(QPopupEvents.CANCEL));
        });
        this.shadowRoot!.querySelector('#btn-confirm')!.addEventListener('click', _e => {
            this.dispatchEvent(new Event(QPopupEvents.CONFIRM));
        });
        this.focus();
    }
}
customElements.define('q-popup', QPopup);