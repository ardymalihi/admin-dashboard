import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
	const supabase = await createClient();
	const { data, error } = await supabase.auth.getClaims();
	if (error || !data?.claims) {
		redirect("/auth/login");
	}

	return (
		<div className="flex flex-col gap-6">
			<h1 className="text-2xl font-semibold">Dashboard</h1>
			<p className="text-sm text-muted-foreground">
				Welcome back, {data.claims.email}
			</p>
			<div className="grid gap-4 md:grid-cols-2">
				<div className="rounded-md border p-4">
					<h2 className="font-medium mb-2">Account</h2>
					<pre className="text-xs font-mono overflow-auto max-h-64">
						{JSON.stringify(data.claims, null, 2)}
					</pre>
				</div>
				<div className="rounded-md border p-4">
					<h2 className="font-medium mb-2">Getting started</h2>
					<p className="text-sm text-muted-foreground">
						You can start building your SaaS here.
					</p>
				</div>
			</div>
		</div>
	);
}

