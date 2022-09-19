import template from './q-paint.html?raw';
import '../q-popup/q-popup';
import { QPopup, QPopupEvents } from '../q-popup/q-popup';
import { QConfig } from '../q-config/q-config';
import { getProjectConfigTemplate, ProjectConfig, updateProjectFromQConfig } from '../../project-config';

export class QPaint extends HTMLElement {
    project?: ProjectConfig;
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        this.shadowRoot!.innerHTML = template;
        const btnNewProject = this.shadowRoot!.querySelector('#btn-new-project')! as HTMLButtonElement;
        btnNewProject.onclick = this.openNewProjectPopup;

        this.openNewProjectPopup();
    }

    private openNewProjectPopup = () => {
        const popup = new QPopup();
        const header = document.createElement('h1');
        header.innerText = 'New Project';
        popup.appendChild(header);
        const projectCfg = new ProjectConfig();
        const configView = new QConfig(getProjectConfigTemplate());
        popup.appendChild(configView);
        popup.addEventListener(QPopupEvents.CANCEL, _e => {
            this.shadowRoot!.removeChild(popup);
        });
        popup.addEventListener(QPopupEvents.CONFIRM, _e => {
            updateProjectFromQConfig(projectCfg, configView);
            this.project = projectCfg;
            this.shadowRoot!.removeChild(popup);
        });
        this.shadowRoot!.appendChild(popup);
    }
}

customElements.define('q-paint', QPaint);