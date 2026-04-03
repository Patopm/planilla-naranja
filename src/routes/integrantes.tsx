import { createFileRoute } from "@tanstack/react-router";
import { useRef } from "react";
import { MembersShowcase } from "#/components/CampaignSections";
import { campaign } from "#/lib/campaign-data";
import { gsap, useGSAP } from "#/lib/gsap";

export const Route = createFileRoute("/integrantes")({
	component: IntegrantesPage,
});

function IntegrantesPage() {
	const pageRef = useRef<HTMLElement>(null);

	useGSAP(
		() => {
			if (
				typeof window !== "undefined" &&
				window.matchMedia("(prefers-reduced-motion: reduce)").matches
			) {
				return;
			}

			gsap
				.timeline({ defaults: { ease: "power3.out" } })
				.from("[data-members-kicker]", { y: 18, opacity: 0, duration: 0.45 })
				.from(
					"[data-members-title]",
					{ y: 34, opacity: 0, duration: 0.8 },
					"-=0.2",
				)
				.from(
					"[data-members-copy]",
					{ y: 18, opacity: 0, duration: 0.5 },
					"-=0.4",
				);
		},
		{ scope: pageRef },
	);

	return (
		<main
			ref={pageRef}
			className="page-wrap px-3 py-6 sm:px-4 sm:py-10 lg:py-14"
		>
			<section className="mb-8 border-b border-(--line) pb-8">
				<p className="section-kicker mb-2" data-members-kicker>
					Integrantes
				</p>
				<h1
					className="campaign-title max-w-4xl text-[clamp(2.6rem,13vw,4.75rem)] leading-[0.95]"
					data-members-title
				>
					El equipo que impulsa a {campaign.name}
				</h1>
				<p
					className="mt-4 max-w-3xl text-base leading-7 text-(--text-soft)"
					data-members-copy
				>
					Presidencia, coordinaciones y spirits trabajando en conjunto para que
					las ideas se conviertan en experiencias reales dentro de Tecmilenio.
				</p>
			</section>

			<MembersShowcase />
		</main>
	);
}
