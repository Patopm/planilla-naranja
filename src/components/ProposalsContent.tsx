import {
	ChevronDown,
	Dumbbell,
	Gamepad2,
	HandHeart,
	Megaphone,
	Palette,
	ReceiptText,
} from "lucide-react";
import type React from "react";
import { useRef, useState } from "react";
import { Badge } from "#/components/ui/badge";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "#/components/ui/card";
import {
	campaign,
	coordinations,
	highlightedProposals,
} from "#/lib/campaign-data";
import { gsap, useGSAP } from "#/lib/gsap";
import { cn } from "#/lib/utils";

type Coordination = (typeof coordinations)[number];

const coordinationIcons: Record<
	Coordination["key"],
	React.ComponentType<React.SVGProps<SVGSVGElement>>
> = {
	athletics: Dumbbell,
	comunicacion: Megaphone,
	"arte-cultura": Palette,
	"e-sports": Gamepad2,
	finanzas: ReceiptText,
	"impacto-social": HandHeart,
};

function FeaturedMarquee() {
	const shellRef = useRef<HTMLDivElement>(null);

	useGSAP(
		() => {
			const track = shellRef.current?.querySelector<HTMLElement>(
				"[data-marquee-track]",
			);
			if (!track) return;

			const tween = gsap.to(track, {
				xPercent: -50,
				duration: 50,
				ease: "none",
				repeat: -1,
			});

			const shell = shellRef.current;
			if (!shell) return;

			const slow = () =>
				gsap.to(tween, { timeScale: 0.3, duration: 0.8, ease: "power2.out" });
			const restore = () =>
				gsap.to(tween, { timeScale: 1, duration: 0.8, ease: "power2.out" });

			shell.addEventListener("mouseenter", slow);
			shell.addEventListener("mouseleave", restore);

			return () => {
				shell.removeEventListener("mouseenter", slow);
				shell.removeEventListener("mouseleave", restore);
				tween.kill();
			};
		},
		{ scope: shellRef },
	);

	const items = [...highlightedProposals, ...highlightedProposals];

	return (
		<section ref={shellRef} className="featured-proposals-panel" data-reveal>
			<div className="featured-proposals-copy">
				<p className="section-kicker mb-2">Propuestas destacadas</p>
				<h2 className="campaign-subtitle max-w-3xl text-3xl text-(--text-main) sm:text-4xl">
					Las ideas con mayor tracción, en primer plano
				</h2>
				<p className="mt-4 max-w-2xl text-base leading-7 text-(--text-soft)">
					Una selección de propuestas clave para abrir la conversación desde el
					inicio y marcar el tono del resto de coordinaciones.
				</p>
			</div>

			<section
				className="featured-marquee-shell"
				aria-label="Propuestas destacadas"
			>
				<div
					className="featured-marquee-track"
					data-marquee-track
					style={{ animation: "none" }}
				>
					{items.map((proposal, index) => (
						<article
							key={`marquee-${proposal.area}-${proposal.title}-${index >= highlightedProposals.length ? "dup" : "og"}`}
							className="featured-marquee-card"
							aria-hidden={index >= highlightedProposals.length}
						>
							<div className="featured-marquee-card-overlay" />
							<p className="featured-marquee-area">{proposal.area}</p>
							<div className="featured-marquee-body">
								<p className="featured-marquee-step">
									Propuesta{" "}
									{String((index % highlightedProposals.length) + 1).padStart(
										2,
										"0",
									)}
								</p>
								<h3 className="featured-marquee-title">{proposal.title}</h3>
								<p className="featured-marquee-description">
									{proposal.description}
								</p>
							</div>
						</article>
					))}
				</div>
			</section>
		</section>
	);
}

function CoordinationCollapsible({
	coord,
	isOpen,
	onToggle,
}: {
	coord: Coordination;
	isOpen: boolean;
	onToggle: () => void;
}) {
	const contentRef = useRef<HTMLDivElement>(null);
	const Icon = coordinationIcons[coord.key];

	useGSAP(
		() => {
			if (!isOpen || !contentRef.current) return;

			gsap.from(contentRef.current.querySelectorAll("[data-proposal-item]"), {
				y: 14,
				opacity: 0,
				duration: 0.4,
				stagger: 0.06,
				ease: "power2.out",
			});
		},
		{ dependencies: [isOpen], revertOnUpdate: true },
	);

	return (
		<div className={cn("coordination-collapsible", isOpen && "is-open")}>
			<button
				type="button"
				className="coordination-collapsible-trigger"
				aria-expanded={isOpen}
				onClick={onToggle}
			>
				<span className="flex min-w-0 items-center gap-4">
					<span className="coordinator-icon shrink-0">
						<Icon className="size-5" strokeWidth={2.1} />
					</span>
					<span className="min-w-0 text-left">
						<span className="section-kicker mb-1 block">
							{coord.proposals.length} propuestas · {coord.coordinator}
						</span>
						<span className="coordination-collapsible-title">{coord.name}</span>
						<span className="coordination-collapsible-description">
							{coord.description}
						</span>
					</span>
				</span>
				<ChevronDown
					className={cn(
						"coordination-collapsible-chevron",
						isOpen && "is-open",
					)}
					aria-hidden
				/>
			</button>

			{isOpen ? (
				<div ref={contentRef} className="coordination-collapsible-content">
					<div className="proposals-list">
						{coord.proposals.map((proposal, index) => (
							<div
								key={proposal}
								className="proposals-list-item"
								data-proposal-item
							>
								<span className="proposals-list-index">
									{String(index + 1).padStart(2, "0")}
								</span>
								<p className="proposals-list-text">{proposal}</p>
							</div>
						))}
					</div>

					<div className="proposals-list-meta">
						<div>
							<p className="section-kicker mb-2">Coordinador</p>
							<p className="m-0 text-base font-semibold text-(--text-main)">
								{coord.coordinator}
							</p>
							<p className="m-0 mt-1 text-sm text-(--text-soft)">
								{coord.coordinatorTagline}
							</p>
						</div>
						{coord.spirits.length > 0 && (
							<div>
								<p className="section-kicker mb-2">Spirits</p>
								<div className="flex flex-wrap gap-2">
									{coord.spirits.map((spirit) => (
										<div key={spirit} className="spirit-card">
											<span className="spirit-dot" />
											<span>{spirit}</span>
										</div>
									))}
								</div>
							</div>
						)}
					</div>
				</div>
			) : null}
		</div>
	);
}

function CoordinationProposals() {
	const [openKey, setOpenKey] = useState<string | null>(
		coordinations[0]?.key ?? null,
	);

	return (
		<section className="section-panel" data-reveal>
			<div className="mb-6">
				<p className="section-kicker mb-2">Propuestas por coordinación</p>
				<h2 className="campaign-subtitle max-w-3xl text-3xl text-(--text-main) sm:text-4xl">
					Cada coordinación guarda su propia galería de ideas accionables
				</h2>
				<p className="mt-4 max-w-2xl text-base leading-7 text-(--text-soft)">
					Abrí cada coordinación para explorar sus propuestas y conocer al
					equipo detrás de cada idea.
				</p>
			</div>

			<div className="grid gap-4">
				{coordinations.map((coord) => (
					<CoordinationCollapsible
						key={coord.key}
						coord={coord}
						isOpen={openKey === coord.key}
						onToggle={() =>
							setOpenKey((c) => (c === coord.key ? null : coord.key))
						}
					/>
				))}
			</div>
		</section>
	);
}

function ProposalsSummary() {
	const totalProposals = coordinations.reduce(
		(sum, c) => sum + c.proposals.length,
		0,
	);

	return (
		<section data-reveal>
			<Card>
				<CardHeader>
					<Badge className="w-fit">Resumen</Badge>
					<CardTitle className="campaign-subtitle text-3xl sm:text-4xl">
						{totalProposals} propuestas en {coordinations.length} coordinaciones
					</CardTitle>
					<CardDescription className="max-w-3xl text-base">
						Cada propuesta es una acción concreta que la planilla se compromete
						a impulsar dentro del campus.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
						{coordinations.map((coord) => {
							const Icon = coordinationIcons[coord.key];

							return (
								<div key={coord.key} className="proposals-summary-chip">
									<span className="coordinator-icon shrink-0">
										<Icon className="size-4" strokeWidth={2.1} />
									</span>
									<div className="min-w-0">
										<p className="m-0 text-sm font-semibold text-(--text-main)">
											{coord.name}
										</p>
										<p className="m-0 text-xs text-(--text-soft)">
											{coord.proposals.length} propuestas · {coord.coordinator}
										</p>
									</div>
								</div>
							);
						})}
					</div>
				</CardContent>
			</Card>
		</section>
	);
}

export function ProposalsContent() {
	const pageRef = useRef<HTMLElement>(null);

	useGSAP(
		() => {
			gsap
				.timeline({ defaults: { ease: "power3.out" } })
				.from("[data-hero-kicker]", { y: 18, opacity: 0, duration: 0.5 })
				.from(
					"[data-hero-title]",
					{ y: 36, opacity: 0, duration: 0.8 },
					"-=0.25",
				)
				.from(
					"[data-hero-desc]",
					{ y: 18, opacity: 0, duration: 0.5 },
					"-=0.4",
				);

			for (const block of gsap.utils.toArray<HTMLElement>("[data-reveal]")) {
				gsap.from(block, {
					y: 44,
					opacity: 0,
					duration: 0.85,
					ease: "power3.out",
					scrollTrigger: { trigger: block, start: "top 84%" },
				});
			}
		},
		{ scope: pageRef },
	);

	return (
		<main ref={pageRef} className="page-wrap px-4 py-10 sm:py-14">
			<section className="mb-8 border-b border-(--line) pb-8">
				<p className="section-kicker mb-2" data-hero-kicker>
					Propuestas
				</p>
				<h1
					className="campaign-title max-w-4xl text-5xl sm:text-6xl"
					data-hero-title
				>
					Las propuestas de {campaign.name}
				</h1>
				<p
					className="mt-4 max-w-3xl text-base leading-7 text-(--text-soft)"
					data-hero-desc
				>
					Cada coordinación tiene un plan de acción con propuestas concretas.
					Explorá las propuestas destacadas y descubrí lo que cada equipo
					propone para transformar la experiencia en Tecmilenio.
				</p>
			</section>

			<FeaturedMarquee />
			<CoordinationProposals />
			<ProposalsSummary />
		</main>
	);
}
