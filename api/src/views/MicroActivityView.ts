import { MicroActivity } from "../models/MicroActivity";

class MicroActivityView {
	render(microActivity: MicroActivity) {
		return {
			id: microActivity.id,
			name: microActivity.name,
			startDate: microActivity.startDate,
			endDate: microActivity.endDate,
			description: microActivity.description,
			macroActivity: microActivity.macroActivity,
			createdAt: microActivity.createdAt,
			updatedAt: microActivity.updatedAt,
		};
	}
	renderMany(microActivities: MicroActivity[]) {
		return microActivities.map((microActivity) => this.render(microActivity));
	}
}

export { MicroActivityView };
