import { Instagram } from "lucide-react";
import { campaign } from "#/lib/campaign-data";

export default function Footer() {
	const year = new Date().getFullYear();

	return (
		<footer className="site-footer mt-10 px-4 pb-12 pt-10 text-(--text-soft)">
			<div className="page-wrap flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
				<div>
					<p className="m-0 text-sm leading-relaxed">
						&copy; {year}{" "}
						<span className="font-medium text-(--text-main)">
							{campaign.name}
						</span>
						. {campaign.school}.
					</p>
				</div>
				<a
					href={campaign.instagramUrl}
					target="_blank"
					rel="noreferrer"
					className="inline-flex items-center gap-2 text-sm font-medium text-(--accent-soft) transition hover:text-(--accent)"
				>
					<Instagram className="size-4" aria-hidden />
					Instagram
				</a>
			</div>
		</footer>
	);
}
