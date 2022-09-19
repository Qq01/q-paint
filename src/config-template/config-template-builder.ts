import { ConfigTemplate, ConfigTemplateFieldText, ConfigTemplateField, ConfigTemplateFieldNumber, ConfigTemplateType } from "./config-template";

export class ConfigTemplateBuilder {
    private data: ConfigTemplate = [];
    addDivider(label?: string) {
        const field: ConfigTemplateField = {
            type: ConfigTemplateType.DIVIDER,
            label
        }
        this.data.push(field);
    }
    addFieldNumber(id: string, label: string, value: number, {min, max, step}:{min?: number, max?: number, step?: number} = {}) {
        const field: ConfigTemplateFieldNumber = {
            type: ConfigTemplateType.NUMBER,
            id,
            label,
            value,
            min,
            max,
            step
        }
        this.data.push(field);
    }
    addFieldText(id: string, label: string, value: string) {
        const field: ConfigTemplateFieldText = {
            type: ConfigTemplateType.TEXT,
            id,
            label,
            value
        }
        this.data.push(field);
    }
    build() {
        return structuredClone(this.data);
    }
}