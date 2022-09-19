import template from './q-config.html?raw';
import { ConfigTemplate, ConfigTemplateFieldText, ConfigTemplateFieldTypes, ConfigTemplateFieldNumber, ConfigTemplateType, ConfigTemplateFieldDivider, ConfigTemplateFieldDescription } from "../../config-template/config-template";

type FieldSetter = (value: any) => void;
export class QConfig extends HTMLElement {
    liveData = new Map<string, any>();
    fieldTypes = new Map<string, ConfigTemplateType>();
    fieldSetters = new Map<string, FieldSetter>();
    private $container: HTMLElement;
    constructor(configTemplate:ConfigTemplate) {
        super();
        this.attachShadow({mode: 'open'});
        this.shadowRoot!.innerHTML = template;
        this.$container = this.shadowRoot?.querySelector('#container')!;
        configTemplate.forEach(fieldTemplate => {
            this.createField(fieldTemplate);
        })
    }
    getValue(id: string) {
        return this.liveData.get(id);
    }
    /**
     * unsafe, does not check value type
     */
    setValue(id: string, value: any) {
        const setter = this.fieldSetters.get(id);
        if (setter) {
            setter(value);
            this.liveData.set(id, value);
        }
    }
    private createField(fieldTemplate: ConfigTemplateFieldTypes) {
        if (fieldTemplate.id) {
            this.fieldTypes.set(fieldTemplate.id, fieldTemplate.type);
            if (fieldTemplate.value != undefined) {
                this.liveData.set(fieldTemplate.id, fieldTemplate.value);
            }
        }
        if (fieldTemplate.type == ConfigTemplateType.DIVIDER) {
            this.createFieldDivider(fieldTemplate as ConfigTemplateFieldDivider);
        } else if (fieldTemplate.type == ConfigTemplateType.DESCRIPTION) {
            this.createFieldDescription(fieldTemplate as ConfigTemplateFieldDescription);
        } else if (fieldTemplate.type == ConfigTemplateType.NUMBER) {
            this.createFieldNumber(fieldTemplate as ConfigTemplateFieldNumber);
        } else if (fieldTemplate.type == ConfigTemplateType.TEXT) {
            this.createFieldText(fieldTemplate as ConfigTemplateFieldText);
        }
    }
    private createFieldDivider(fieldTemplate: ConfigTemplateFieldDivider) {
        const div = document.createElement('div');
        div.classList.add('field', 'divider');
        if (fieldTemplate.label) {
            div.innerText = fieldTemplate.label;
        }
        this.$container.appendChild(div);

    }
    private createFieldDescription(fieldTemplate: ConfigTemplateFieldDescription) {
        const div = document.createElement('div');
        div.classList.add('field', 'description');
        div.innerText = fieldTemplate.value;
        this.$container.appendChild(div);
        if (fieldTemplate.id) {
            this.fieldSetters.set(fieldTemplate.id, value => div.innerText = value);
        }
    }
    private createFieldNumber(fieldTemplate: ConfigTemplateFieldNumber) {
        const div = document.createElement('div');
        div.classList.add('field', 'number');
        if (fieldTemplate.label) {
            const label = document.createElement('label');
            div.appendChild(label);
            label.innerText = fieldTemplate.label;
            if (fieldTemplate.id) {
                label.htmlFor = `field-${fieldTemplate.id}`;
            }
            div.appendChild(label);
        }
        const input = document.createElement('input');
        input.type = 'number';
        div.appendChild(input);
        input.value = fieldTemplate.value;
        if (fieldTemplate.min != undefined) {
            input.min = ''+fieldTemplate.min;
        }
        if (fieldTemplate.max != undefined) {
            input.max = ''+fieldTemplate.max;
        }
        if (fieldTemplate.step) {
            input.step = ''+fieldTemplate.step;
        }
        if (fieldTemplate.id) {
            input.id = `field-${fieldTemplate.id}`;
            input.onchange = _e => {
                const value = input.valueAsNumber;
                if (!Number.isNaN(value)) {
                    this.liveData.set(fieldTemplate.id!, value);
                }
            }
            this.fieldSetters.set(fieldTemplate.id, value => input.value = value);
        }
        this.$container.appendChild(div);
    }
    private createFieldText(fieldTemplate: ConfigTemplateFieldText) {
        const div = document.createElement('div');
        div.classList.add('field', 'text');
        if (fieldTemplate.label) {
            const label = document.createElement('label');
            div.appendChild(label);
            label.innerText = fieldTemplate.label;
            if (fieldTemplate.id) {
                label.htmlFor = `field-${fieldTemplate.id}`;
            }
            div.appendChild(label);
        }
        const input = document.createElement('input');
        div.appendChild(input)
        input.value = fieldTemplate.value;
        if (fieldTemplate.id) {
            input.id = `field-${fieldTemplate.id}`;
            input.onchange = _e => {
                this.liveData.set(fieldTemplate.id!, input.value);
            }
            this.fieldSetters.set(fieldTemplate.id, value => input.value = value);
        }
        this.$container.appendChild(div);
    }
}

customElements.define('q-config', QConfig);