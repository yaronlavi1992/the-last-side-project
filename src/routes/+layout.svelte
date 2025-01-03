<script lang="ts">
	import { ModeWatcher } from 'mode-watcher';
	import { invalidate } from '$app/navigation';
	import '../app.css';
	import type { LayoutData } from './$types';
	import type { AuthChangeEvent } from '@supabase/supabase-js';
	import CircleUser from 'lucide-svelte/icons/circle-user';
	import ChartLine from 'lucide-svelte/icons/chart-line';
	import Package from 'lucide-svelte/icons/package';
	import House from 'lucide-svelte/icons/house';
	import ShoppingCart from 'lucide-svelte/icons/shopping-cart';
	import Bell from 'lucide-svelte/icons/bell';
	import Menu from 'lucide-svelte/icons/menu';
	import Package2 from 'lucide-svelte/icons/package-2';
	import Search from 'lucide-svelte/icons/search';
	import Users from 'lucide-svelte/icons/users';

	import { Badge } from '$lib/components/ui/badge/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import * as Sheet from '$lib/components/ui/sheet/index.js';
	import LightSwitch from '$lib/components/ui/light-switch/light-switch.svelte';

	let { data, children } = $props<{ data: LayoutData }>();
	let { user, supabase } = $derived(data);

	$effect(() => {
		const { data: authData } = supabase.auth.onAuthStateChange(async (event: AuthChangeEvent) => {
			if (event === 'SIGNED_IN' || event === 'SIGNED_OUT' || event === 'USER_UPDATED') {
				invalidate('supabase:auth');
			}
		});

		return () => authData.subscription.unsubscribe();
	});
</script>

<ModeWatcher />

<div class="min-h-screen">
	{#key user?.id ?? 'no-user'}
		{#if user}
			<div class="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
				<div class="hidden border-r bg-muted/40 md:block">
					<div class="flex h-full max-h-screen flex-col gap-2">
						<div class="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
							<a href="/" class="flex items-center gap-2 font-semibold">
								<Package2 class="h-6 w-6" />
								<span class="">Acme Inc</span>
							</a>
							<Button variant="outline" size="icon" class="ml-auto h-8 w-8">
								<Bell class="h-4 w-4" />
								<span class="sr-only">Toggle notifications</span>
							</Button>
						</div>
						<div class="flex-1">
							<nav class="grid items-start px-2 text-sm font-medium lg:px-4">
								<a
									href="/"
									class="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
								>
									<House class="h-4 w-4" />
									Dashboard
								</a>
								<a
									href="##"
									class="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
								>
									<ShoppingCart class="h-4 w-4" />
									Orders
									<Badge
										class="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full"
									>
										6
									</Badge>
								</a>
								<a
									href="##"
									class="flex items-center gap-3 rounded-lg bg-muted px-3 py-2 text-primary transition-all hover:text-primary"
								>
									<Package class="h-4 w-4" />
									Products
								</a>
								<a
									href="##"
									class="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
								>
									<Users class="h-4 w-4" />
									Customers
								</a>
								<a
									href="##"
									class="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
								>
									<ChartLine class="h-4 w-4" />
									Analytics
								</a>
							</nav>
						</div>
						<div class="mt-auto p-4">
							<Card.Root>
								<Card.Header class="p-2 pt-0 md:p-4">
									<Card.Title>Upgrade to Pro</Card.Title>
									<Card.Description>
										Unlock all features and get unlimited access to our support team.
									</Card.Description>
								</Card.Header>
								<Card.Content class="p-2 pt-0 md:p-4 md:pt-0">
									<Button size="sm" class="w-full">Upgrade</Button>
								</Card.Content>
							</Card.Root>
						</div>
					</div>
				</div>
				<div class="flex flex-col">
					<header
						class="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6"
					>
						<Sheet.Root>
							<Sheet.Trigger asChild let:builder>
								<Button
									variant="outline"
									size="icon"
									class="shrink-0 md:hidden"
									builders={[builder]}
								>
									<Menu class="h-5 w-5" />
									<span class="sr-only">Toggle navigation menu</span>
								</Button>
							</Sheet.Trigger>
							<Sheet.Content side="left" class="flex flex-col">
								<nav class="grid gap-2 text-lg font-medium">
									<a href="/" class="flex items-center gap-2 text-lg font-semibold">
										<Package2 class="h-6 w-6" />
										<span class="sr-only">Acme Inc</span>
									</a>
									<a
										href="/"
										class="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
									>
										<House class="h-5 w-5" />
										Dashboard
									</a>
									<a
										href="##"
										class="mx-[-0.65rem] flex items-center gap-4 rounded-xl bg-muted px-3 py-2 text-foreground hover:text-foreground"
									>
										<ShoppingCart class="h-5 w-5" />
										Orders
										<Badge
											class="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full"
										>
											6
										</Badge>
									</a>
									<a
										href="##"
										class="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
									>
										<Package class="h-5 w-5" />
										Products
									</a>
									<a
										href="##"
										class="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
									>
										<Users class="h-5 w-5" />
										Customers
									</a>
									<a
										href="##"
										class="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
									>
										<ChartLine class="h-5 w-5" />
										Analytics
									</a>
								</nav>
								<div class="mt-auto">
									<Card.Root>
										<Card.Header>
											<Card.Title>Upgrade to Pro</Card.Title>
											<Card.Description>
												Unlock all features and get unlimited access to our support team.
											</Card.Description>
										</Card.Header>
										<Card.Content>
											<Button size="sm" class="w-full">Upgrade</Button>
										</Card.Content>
									</Card.Root>
								</div>
							</Sheet.Content>
						</Sheet.Root>
						<div class="w-full flex-1">
							<form>
								<div class="relative">
									<Search class="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
									<Input
										type="search"
										placeholder="Search products..."
										class="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
									/>
								</div>
							</form>
						</div>
						<LightSwitch />
						<DropdownMenu.Root>
							<DropdownMenu.Trigger asChild let:builder>
								<Button variant="secondary" size="icon" class="rounded-full" builders={[builder]}>
									<CircleUser class="h-5 w-5" />
									<span class="sr-only">Toggle user menu</span>
								</Button>
							</DropdownMenu.Trigger>
							<DropdownMenu.Content align="end">
								<DropdownMenu.Label>My Account</DropdownMenu.Label>
								<DropdownMenu.Separator />
								<DropdownMenu.Item href="/profile">Settings</DropdownMenu.Item>
								<DropdownMenu.Item>Support</DropdownMenu.Item>
								<DropdownMenu.Separator />
								<DropdownMenu.Item href="/auth/logout">Logout</DropdownMenu.Item>
							</DropdownMenu.Content>
						</DropdownMenu.Root>
					</header>
					<main class="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
						{@render children()}
					</main>
				</div>
			</div>
		{:else}
			{@render children()}
		{/if}
	{/key}
</div>

<style lang="postcss">
	:global(html) {
		@apply antialiased;
	}
</style>
