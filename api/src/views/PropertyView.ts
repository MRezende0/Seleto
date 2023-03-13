import { Property } from "../models/Property";

class PropertyView {
	render(property: Property) {
		return {
			id: property.id,
			name: property.name,
			cep: property.cep,
			cepNumber: property.cepNumber,
			cepComplement: property.cepComplement,
		};
	}
	renderMany(properties: Property[]) {
		return properties.map((property) => this.render(property));
	}
}

export { PropertyView };
