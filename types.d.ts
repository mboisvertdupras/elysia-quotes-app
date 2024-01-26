type Point = {
	id: string;
	name: string;
	location: {
		lat: number;
		lng: number;
	};
	baseRate: {
		perKilometer: number;
		perSquareMeter: number;
	};
	laborCosts: {
		standardHourlyRate: number;
		overtimeHourlyRate: number;
		weekendHourlyRate: number;
	};
	materialCosts: {
		standardMaterials: number;
		premiumMaterials: number;
	};
	additionalFees: {
		emergencyServiceFee: number;
		complexitySurcharge: number;
	};
	distance?: number;
};
