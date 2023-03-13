import { Project } from "../models/Project";

class ProjectView {
	render(project: Project) {
		return {
			id: project.id,
			name: project.name,
			description: project.description,
			startDate: project.startDate,
			endDate: project.endDate,
			expectedEndDate: project.expectedEndDate,
			typeId: project.type.id,
			typeName: project.type.name,
			property: project.property,
			createdAt: project.createdAt,
			updatedAt: project.updatedAt,
		};
	}
	renderMany(projecties: Project[]) {
		return projecties.map((project) => this.render(project));
	}
}

export { ProjectView };
