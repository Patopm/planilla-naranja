import { createFileRoute } from "@tanstack/react-router";
import { ProposalsContent } from "#/components/ProposalsContent";

export const Route = createFileRoute("/propuestas")({
	component: ProposalsContent,
});
