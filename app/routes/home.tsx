import Layout from "../components/Layout";
import { createElysia } from "../../src/util/elysia";
import { getClosestServicePoint } from "../../src/utils";

export const home = createElysia()
	.state({
		testing: "testing",
	})
	.get("/", async ({ ip, store }) => {
		store.testing = "boink";
		const { address } = ip;
		const closestPoint = await getClosestServicePoint(address);

		return (
			<Layout>
				<main
					x-data
					class="container mx-auto h-full flex flex-col items-center justify-center"
				>
					<div class="mb-12 text-center">
						<h1 class="text-2xl font-bold">
							Obtenir une soumission pour une toiture
						</h1>
						<p>Votre point de service: {closestPoint.point.city}</p>
					</div>
					<div class="grid grid-cols-2 gap-x-12 w-full max-w-5xl">
						<div class="p-6 border rounded">
							<form x-init x-target="quote" method="post" action="/get-quote">
								<input type="text" name="testing" />
								<button type="submit">Submit</button>
							</form>
						</div>
						<div id="quote"></div>
					</div>
				</main>
			</Layout>
		);
	})
	.post("/get-quote", async (ctx) => {
		console.log(ctx.store);
		return (
			<div id="quote">
				Your input was: {ctx.body.testing}
				{/* <div>
					Déplacement: {closestPoint.point.baseRate.perKilometer} x{" "}
					{closestPoint.distance} ={" "}
					{closestPoint.point.baseRate.perKilometer * closestPoint.distance}
				</div> */}
			</div>
		);
	});
