import { createFileRoute } from "@tanstack/react-router";
import {
	CoordinatorCarousel,
	HeroSection,
	HighlightedProposals,
} from "#/components/CampaignSections";

export const Route = createFileRoute("/")({ component: App });

function App() {
	return (
		<main className="page-wrap px-4 pb-12 pt-10 sm:pt-14">
			<HeroSection />
			<section className="mt-12">
				<CoordinatorCarousel />
			</section>
			<HighlightedProposals />
		</main>
	);
}
