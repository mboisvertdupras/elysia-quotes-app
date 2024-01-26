import * as geoip from "fast-geoip";
import data from "./data.json";

export const getClosestServicePoint = async (ip: string) => {
	const { servicePoints } = JSON.parse(JSON.stringify(data));

	// If the client is on localhost, we need to get their public IP
	let updatedIp = ip;
	if (ip === "::1" || ip === "127.0.0.1") {
		const localIp = await fetch("https://api.ipify.org?format=json")
			.then((res) => res.json())
			.then((res) => res);

		updatedIp = localIp.ip;
	}

	const clientGeo = await geoip.lookup(updatedIp);

	if (!clientGeo) {
		return "No geo data found";
	}

	const closestPoint = servicePoints.reduce((closest: Point, point: Point) => {
		const distance = calculateDistance(
			clientGeo.ll[0],
			clientGeo.ll[1],
			point.location.lat,
			point.location.lng,
		);

		if (!closest || (closest.distance && distance < closest.distance)) {
			return { point, distance };
		}

		return closest;
	}, null);

	return closestPoint;
};

/**
 * Converts degrees to radians.
 * @param degrees The angle in degrees.
 * @returns The angle in radians.
 */
export const toRadians = (degrees: number): number => {
	return (degrees * Math.PI) / 180;
};

/**
 * Calculates the distance between two coordinates on Earth using the Haversine formula.
 * @param lat1 - The latitude of the first coordinate.
 * @param lon1 - The longitude of the first coordinate.
 * @param lat2 - The latitude of the second coordinate.
 * @param lon2 - The longitude of the second coordinate.
 * @returns The distance between the two coordinates in kilometers.
 */
export const calculateDistance = (
	lat1: number,
	lon1: number,
	lat2: number,
	lon2: number,
): number => {
	const earthRadiusKm = 6371; // Earth's radius in kilometers

	const dLat = toRadians(lat2 - lat1);
	const dLon = toRadians(lon2 - lon1);

	const lat1Rad = toRadians(lat1);
	const lat2Rad = toRadians(lat2);

	const a =
		Math.sin(dLat / 2) * Math.sin(dLat / 2) +
		Math.sin(dLon / 2) *
			Math.sin(dLon / 2) *
			Math.cos(lat1Rad) *
			Math.cos(lat2Rad);
	const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

	return earthRadiusKm * c;
};
