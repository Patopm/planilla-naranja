import { createFileRoute } from "@tanstack/react-router";
import {
	CoordinatorCarousel,
	HeroSection,
	HighlightedProposals,
} from "#/components/CampaignSections";

export const Route = createFileRoute("/")({ component: App });

function App() {
	return (
		<main className="page-wrap px-3 pb-10 pt-6 sm:px-4 sm:pb-12 sm:pt-10 lg:pt-14">
			<HeroSection />
			<section className="mt-10 sm:mt-12">
				<CoordinatorCarousel />
			</section>
			<HighlightedProposals />
		</main>
	);
}
