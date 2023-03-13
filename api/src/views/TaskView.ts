import { Task } from "../models/Task";

class TaskView {
	render(task: Task) {
		return {
			id: task.id,
			name: task.name,
			description: task.description,
			endDate: task.endDate,
			expectedEndDate: task.expectedEndDate,
			status: task.status,
			createdAt: task.createdAt,
			updatedAt: task.updatedAt,
		};
	}
	renderMany(tasks: Task[]) {
		return tasks.map((task) => this.render(task));
	}
}

export { TaskView };
