import { MacroActivity } from "../models/MacroActivity";

class MacroActivityView {
	render(macroActivity: MacroActivity) {
		return {
			id: macroActivity.id,
			name: macroActivity.name,
			description: macroActivity.description,
			startDate: macroActivity.startDate,
			endDate: macroActivity.endDate,
			expectedEndDate: macroActivity.expectedEndDate,
			project: macroActivity.project,
			createdAt: macroActivity.createdAt,
			updatedAt: macroActivity.updatedAt,
		};
	}
	renderMany(macroActivities: MacroActivity[]) {
		return macroActivities.map((macroActivity) => this.render(macroActivity));
	}
}

export { MacroActivityView };
