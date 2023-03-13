import { ProjectType } from "../models/ProjectType";

class ProjectTypeView {
	render(projectType: ProjectType) {
		return {
			id: projectType.id,
			name: projectType.name,
			description: projectType.description,
			icon: projectType.icon,
		};
	}
	renderMany(projectsTypes: ProjectType[]) {
		return projectsTypes.map((projectType) => this.render(projectType));
	}
}

export { ProjectTypeView };
