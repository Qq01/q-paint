export enum ConfigTemplateType {
    DIVIDER,
    DESCRIPTION,
    NUMBER,
    TEXT
}

export type ConfigTemplateField = {
    type: ConfigTemplateType;
    id?: string;
    label?: string;
    value?: any;
}
export type ConfigTemplateFieldDivider = ConfigTemplateField & {
    type: ConfigTemplateType.DIVIDER;
    id: undefined;
}
export type ConfigTemplateFieldDescription = ConfigTemplateField & {
    type: ConfigTemplateType.DESCRIPTION;
    id: undefined;
    value: string;
}
export type ConfigTemplateFieldNumber = ConfigTemplateField & {
    type: ConfigTemplateType.NUMBER;
    value: number;
    min?: number;
    max?: number;
    step?: number;
}
export type ConfigTemplateFieldText = ConfigTemplateField & {
    type: ConfigTemplateType.TEXT;
    value: string;
}
export type ConfigTemplateFieldTypes = 
    ConfigTemplateField |
    ConfigTemplateFieldDivider |
    ConfigTemplateFieldDescription |
    ConfigTemplateFieldNumber |
    ConfigTemplateFieldText;
export type ConfigTemplate = ConfigTemplateFieldTypes[];