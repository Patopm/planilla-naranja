import { Link } from "@tanstack/react-router";
import {
	Dumbbell,
	Gamepad2,
	HandHeart,
	Instagram,
	Megaphone,
	Palette,
	ReceiptText,
	Sparkles,
	Users,
} from "lucide-react";
import { useRef } from "react";
import { Badge } from "#/components/ui/badge";
import { buttonVariants } from "#/components/ui/button";
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
	president,
} from "#/lib/campaign-data";
import { gsap, useGSAP } from "#/lib/gsap";
import { cn } from "#/lib/utils";

const coordinationIcons = {
	athletics: Dumbbell,
	comunicacion: Megaphone,
	"arte-cultura": Palette,
	"e-sports": Gamepad2,
	finanzas: ReceiptText,
	"impacto-social": HandHeart,
} as const;

function hasReducedMotionPreference() {
	return (
		typeof window !== "undefined" &&
		window.matchMedia("(prefers-reduced-motion: reduce)").matches
	);
}

function attachCardHover(cards: HTMLElement[]) {
	if (
		typeof window === "undefined" ||
		!window.matchMedia("(hover: hover) and (pointer: fine)").matches
	) {
		return () => {};
	}

	const cleanups = cards.map((card) => {
		const xTo = gsap.quickTo(card, "x", {
			duration: 0.35,
			ease: "power3.out",
		});
		const yTo = gsap.quickTo(card, "y", {
			duration: 0.35,
			ease: "power3.out",
		});
		const rotateXTo = gsap.quickTo(card, "rotateX", {
			duration: 0.35,
			ease: "power3.out",
		});
		const rotateYTo = gsap.quickTo(card, "rotateY", {
			duration: 0.35,
			ease: "power3.out",
		});
		let isActive = false;

		gsap.set(card, {
			transformPerspective: 900,
			transformOrigin: "center center",
		});

		const handleEnter = () => {
			isActive = true;
			yTo(-8);
		};

		const handleMove = (event: PointerEvent) => {
			if (!isActive) return;

			const bounds = card.getBoundingClientRect();
			const offsetX = (event.clientX - bounds.left) / bounds.width - 0.5;
			const offsetY = (event.clientY - bounds.top) / bounds.height - 0.5;

			xTo(offsetX * 6);
			yTo(-8 + offsetY * 5);
			rotateXTo(offsetY * -6);
			rotateYTo(offsetX * 8);
		};

		const handleLeave = () => {
			isActive = false;
			xTo(0);
			yTo(0);
			rotateXTo(0);
			rotateYTo(0);
		};

		card.addEventListener("pointerenter", handleEnter);
		card.addEventListener("pointermove", handleMove);
		card.addEventListener("pointerleave", handleLeave);

		return () => {
			card.removeEventListener("pointerenter", handleEnter);
			card.removeEventListener("pointermove", handleMove);
			card.removeEventListener("pointerleave", handleLeave);
			gsap.set(card, { clearProps: "transform" });
		};
	});

	return () => {
		for (const cleanup of cleanups) {
			cleanup();
		}
	};
}

function CoordinatorObjective({
	objective,
	className,
}: {
	objective: string;
	className?: string;
}) {
	return (
		<div className={cn("coordinator-objective", className)}>
			<p className="coordinator-objective-label">Objetivo principal</p>
			<p className="coordinator-objective-text">{objective}</p>
		</div>
	);
}

export function HeroSection() {
	const sectionRef = useRef<HTMLElement>(null);

	useGSAP(
		() => {
			if (hasReducedMotionPreference()) return;

			gsap
				.timeline({ defaults: { ease: "power3.out" } })
				.from("[data-hero-badge]", { y: 16, opacity: 0, duration: 0.45 })
				.from(
					"[data-hero-title]",
					{ y: 32, opacity: 0, duration: 0.75 },
					"-=0.2",
				)
				.from("[data-hero-copy]", { y: 18, opacity: 0, duration: 0.5 }, "-=0.4")
				.from(
					"[data-hero-actions] > *",
					{ y: 18, opacity: 0, duration: 0.45, stagger: 0.08 },
					"-=0.25",
				);
		},
		{ scope: sectionRef },
	);

	return (
		<section
			ref={sectionRef}
			className="hero-section hero-grid border-b border-(--line)"
		>
			<Badge className="mb-4" data-hero-badge>
				Campaña estudiantil · {campaign.school}
			</Badge>
			<h1
				className="campaign-title max-w-3xl text-4xl leading-tight font-semibold tracking-tight sm:text-5xl lg:text-6xl"
				data-hero-title
			>
				{campaign.name}
			</h1>
			<p
				className="mt-5 max-w-xl text-base leading-relaxed text-(--text-soft) sm:text-lg"
				data-hero-copy
			>
				{campaign.slogan}
			</p>
			<div className="mt-8 flex flex-wrap gap-3" data-hero-actions>
				<a
					href={campaign.instagramUrl}
					target="_blank"
					rel="noreferrer"
					className={cn(buttonVariants({ size: "lg" }))}
				>
					<Instagram data-icon="inline-start" className="size-4" />
					Ir a Instagram
				</a>
				<Link
					to="/propuestas"
					className={cn(buttonVariants({ variant: "secondary", size: "lg" }))}
				>
					Ver propuestas
				</Link>
			</div>
		</section>
	);
}

export function CoordinatorCarousel() {
	const sectionRef = useRef<HTMLElement>(null);

	useGSAP(
		() => {
			if (hasReducedMotionPreference()) return;

			const cards = gsap.utils.toArray<HTMLElement>("[data-coordinator-card]");

			gsap
				.timeline({
					scrollTrigger: {
						trigger: sectionRef.current,
						start: "top 80%",
						once: true,
					},
					defaults: { ease: "power3.out" },
				})
				.from("[data-section-kicker]", { y: 18, opacity: 0, duration: 0.45 })
				.from(
					"[data-section-title]",
					{ y: 28, opacity: 0, duration: 0.65 },
					"-=0.2",
				)
				.from(
					cards,
					{ y: 28, opacity: 0, duration: 0.6, stagger: 0.08 },
					"-=0.2",
				)
				.from(
					"[data-section-action]",
					{ y: 18, opacity: 0, duration: 0.45 },
					"-=0.25",
				);
		},
		{ scope: sectionRef },
	);

	return (
		<section ref={sectionRef} className="coordinators-section">
			<div className="mb-8">
				<p className="section-kicker mb-2" data-section-kicker>
					Coordinadores
				</p>
				<h2
					className="campaign-subtitle max-w-2xl text-2xl text-(--text-main) sm:text-3xl"
					data-section-title
				>
					Liderazgo visible, equipo presente
				</h2>
			</div>

			<ul className="coordinators-grid m-0 grid list-none gap-4 p-0">
				{coordinations.map((coord) => {
					const CoordinationIcon = coordinationIcons[coord.key];

					return (
						<li
							key={coord.key}
							className="flex min-h-0 min-w-0"
							data-coordinator-card
						>
							<Card className="flex h-full min-h-0 w-full min-w-0 flex-col rounded-xl border-(--line) bg-transparent transition-colors hover:border-(--line-strong) hover:bg-(--surface-hover)">
								<CardHeader className="pb-2">
									<div className="flex items-start justify-between gap-3">
										<div className="min-w-0 flex-1 space-y-2">
											<Badge variant="outline" className="w-fit max-w-full">
												{coord.name}
											</Badge>
											<CardTitle className="campaign-subtitle text-lg font-semibold sm:text-xl">
												{coord.coordinator}
											</CardTitle>
										</div>
										<div
											className="coordinator-icon shrink-0 text-[0.7rem]"
											aria-hidden
										>
											<CoordinationIcon className="size-5" strokeWidth={2.1} />
										</div>
									</div>
									<CardDescription className="pt-1">
										{coord.coordinatorTagline}
									</CardDescription>
								</CardHeader>
								<CardContent className="flex min-h-0 flex-1 flex-col pt-0">
									<CoordinatorObjective
										objective={coord.description}
										className="mb-4"
									/>
									<div className="mt-auto flex flex-wrap gap-2">
										{coord.spirits.map((spirit) => (
											<span key={spirit} className="chip-tag">
												{spirit}
											</span>
										))}
									</div>
								</CardContent>
							</Card>
						</li>
					);
				})}
			</ul>

			<div
				className="mt-8 flex justify-center border-t border-(--line) pt-6"
				data-section-action
			>
				<Link
					to="/integrantes"
					className={cn(buttonVariants({ variant: "secondary", size: "lg" }))}
				>
					<Users className="size-4" aria-hidden />
					Ver todos los integrantes
				</Link>
			</div>
		</section>
	);
}

export function HighlightedProposals() {
	const sectionRef = useRef<HTMLElement>(null);

	useGSAP(
		() => {
			if (hasReducedMotionPreference()) return;

			const cards = gsap.utils.toArray<HTMLElement>("[data-proposal-card]");
			const cleanupHover = attachCardHover(cards);

			gsap
				.timeline({
					scrollTrigger: {
						trigger: sectionRef.current,
						start: "top 80%",
						once: true,
					},
					defaults: { ease: "power3.out" },
				})
				.from("[data-highlight-kicker]", {
					y: 18,
					opacity: 0,
					duration: 0.45,
				})
				.from(
					"[data-highlight-title]",
					{ y: 30, opacity: 0, duration: 0.65 },
					"-=0.2",
				)
				.from(
					cards,
					{ y: 30, opacity: 0, duration: 0.6, stagger: 0.08 },
					"-=0.2",
				)
				.from(
					"[data-highlight-action]",
					{ y: 18, opacity: 0, duration: 0.45 },
					"-=0.25",
				);

			return cleanupHover;
		},
		{ scope: sectionRef },
	);

	return (
		<section ref={sectionRef} className="section-panel mt-8">
			<div className="mb-5 flex items-end justify-between gap-4">
				<div>
					<p className="section-kicker mb-2" data-highlight-kicker>
						Propuestas destacadas
					</p>
					<h2
						className="campaign-subtitle text-3xl text-(--text-main) sm:text-4xl"
						data-highlight-title
					>
						Seis ideas que sí mueven el campus
					</h2>
				</div>
			</div>

			<div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
				{highlightedProposals.map((proposal) => (
					<Card
						key={proposal.title}
						className="proposal-card flex h-full flex-col"
						data-proposal-card
						style={{ animation: "none" }}
					>
						<CardHeader>
							<Badge className="w-fit">{proposal.area}</Badge>
							<CardTitle className="text-xl">{proposal.title}</CardTitle>
						</CardHeader>
						<CardContent className="grow">
							<p className="m-0 text-sm leading-7 text-(--text-soft)">
								{proposal.description}
							</p>
						</CardContent>
					</Card>
				))}
			</div>

			<div className="mt-6 flex justify-center" data-highlight-action>
				<Link
					to="/propuestas"
					className={cn(buttonVariants({ variant: "secondary", size: "lg" }))}
				>
					<Sparkles data-icon="inline-start" className="size-4" />
					Ver todas las propuestas
				</Link>
			</div>
		</section>
	);
}

export function MembersShowcase() {
	const sectionRef = useRef<HTMLDivElement>(null);

	useGSAP(
		() => {
			if (hasReducedMotionPreference()) return;

			const memberCards = gsap.utils.toArray<HTMLElement>("[data-member-card]");
			const spiritCards = gsap.utils.toArray<HTMLElement>("[data-spirit-card]");
			const presidentCard =
				sectionRef.current?.querySelector<HTMLElement>(
					"[data-president-card]",
				) ?? null;
			const membersGrid =
				sectionRef.current?.querySelector<HTMLElement>("[data-members-grid]") ??
				null;
			const cleanupHover = attachCardHover(memberCards);

			if (!presidentCard || !membersGrid) {
				return cleanupHover;
			}

			gsap
				.timeline({
					scrollTrigger: {
						trigger: presidentCard,
						start: "top 82%",
						once: true,
					},
					defaults: { ease: "power3.out" },
				})
				.from(presidentCard, {
					y: 34,
					opacity: 0,
					duration: 0.7,
				})
				.from(
					"[data-president-stat]",
					{ y: 16, opacity: 0, duration: 0.45, stagger: 0.08 },
					"-=0.3",
				);

			gsap
				.timeline({
					scrollTrigger: {
						trigger: membersGrid,
						start: "top 82%",
						once: true,
					},
					defaults: { ease: "power3.out" },
				})
				.from(memberCards, {
					y: 30,
					opacity: 0,
					duration: 0.65,
					stagger: 0.08,
				})
				.from(
					spiritCards,
					{ y: 14, opacity: 0, duration: 0.4, stagger: 0.03 },
					"-=0.35",
				);

			return cleanupHover;
		},
		{ scope: sectionRef },
	);

	return (
		<div ref={sectionRef} className="grid gap-6">
			<Card data-president-card>
				<CardHeader className="gap-3">
					<Badge className="w-fit">Presidencia</Badge>
					<CardTitle className="campaign-title text-4xl sm:text-5xl">
						{president.name}
					</CardTitle>
					<CardDescription className="max-w-3xl text-base">
						{president.tagline}
					</CardDescription>
				</CardHeader>
				<CardContent className="grid gap-4 lg:grid-cols-[1fr_0.8fr] lg:items-end">
					<p className="m-0 max-w-2xl text-sm leading-7 text-(--text-soft)">
						{president.bio}
					</p>
					<div className="member-hero-grid">
						<div data-president-stat>
							<span className="member-stat-label">Rol</span>
							<p className="member-stat-value">{president.role}</p>
						</div>
						<div data-president-stat>
							<span className="member-stat-label">Escuela</span>
							<p className="member-stat-value">{campaign.school}</p>
						</div>
					</div>
				</CardContent>
			</Card>

			<div className="grid gap-5 lg:grid-cols-2" data-members-grid>
				{coordinations.map((coord) => {
					const CoordinationIcon = coordinationIcons[coord.key];
					const hasSpirits = coord.spirits.length > 0;

					return (
						<Card key={coord.key} className="h-full" data-member-card>
							<CardHeader className="pb-4">
								<div className="flex items-start justify-between gap-4">
									<div>
										<Badge variant="outline" className="mb-3">
											{coord.name}
										</Badge>
										<CardTitle className="campaign-subtitle text-3xl">
											{coord.coordinator}
										</CardTitle>
									</div>
									<div className="coordinator-icon">
										<CoordinationIcon className="size-5" strokeWidth={2.1} />
									</div>
								</div>
								<CardDescription>{coord.coordinatorTagline}</CardDescription>
							</CardHeader>
							<CardContent className="flex flex-col gap-4 pt-0">
								<CoordinatorObjective objective={coord.description} />
								{hasSpirits && (
									<div>
										<p className="section-kicker mb-3">Spirits</p>
										<div className="flex flex-wrap gap-3">
											{coord.spirits.map((spirit) => (
												<div
													key={spirit}
													className="spirit-card"
													data-spirit-card
												>
													<span className="spirit-dot" />
													<span>{spirit}</span>
												</div>
											))}
										</div>
									</div>
								)}
							</CardContent>
						</Card>
					);
				})}
			</div>
		</div>
	);
}
