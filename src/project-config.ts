import { QConfig } from "./components/q-config/q-config";
import { ConfigTemplateBuilder } from "./config-template/config-template-builder";

export class ProjectConfig {
    name: string = '';
    width: number = 1024;
    height: number = 768;

}

const template = new ConfigTemplateBuilder();
template.addFieldText('name', 'Name', 'Untitled');
template.addFieldNumber('width', 'Width', 1024);
template.addFieldNumber('height', 'Height', 768);

export function getProjectConfigTemplate() {
    return template.build();
}

export function updateProjectFromQConfig(p: ProjectConfig, q: QConfig) {
    p.name = q.getValue('name') as string;
    p.width = q.getValue('width') as number;
    p.height = q.getValue('height') as number;
}