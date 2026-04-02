import { Link } from "@tanstack/react-router";
import { Instagram } from "lucide-react";
import { campaign } from "#/lib/campaign-data";

export default function Header() {
	return (
		<header className="sticky top-0 z-50 border-b border-(--line) bg-(--header-bg) px-4 backdrop-blur-md">
			<nav
				className="page-wrap flex flex-wrap items-center gap-x-6 gap-y-3 py-4"
				aria-label="Principal"
			>
				<h2 className="m-0 text-base font-semibold tracking-tight">
					<Link
						to="/"
						className="text-(--accent-soft) no-underline transition hover:text-(--accent)"
					>
						{campaign.name}
					</Link>
				</h2>

				<div className="order-3 flex w-full flex-wrap items-center gap-x-6 gap-y-2 text-sm sm:order-none sm:ml-auto sm:w-auto sm:flex-nowrap">
					<Link
						to="/"
						className="nav-link"
						activeProps={{ className: "nav-link is-active" }}
					>
						Inicio
					</Link>
					<Link
						to="/integrantes"
						className="nav-link"
						activeProps={{ className: "nav-link is-active" }}
					>
						Integrantes
					</Link>
					<Link
						to="/propuestas"
						className="nav-link"
						activeProps={{ className: "nav-link is-active" }}
					>
						Propuestas
					</Link>
					<a
						href={campaign.instagramUrl}
						className="nav-link inline-flex items-center gap-1.5"
						target="_blank"
						rel="noreferrer"
					>
						<Instagram className="size-4" aria-hidden />
						Instagram
					</a>
				</div>
			</nav>
		</header>
	);
}
