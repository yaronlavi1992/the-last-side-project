<script lang="ts">
	import { invalidate } from '$app/navigation';
	import '../app.css';
	import type { LayoutData } from './$types';
	import type { AuthChangeEvent } from '@supabase/supabase-js';

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

<div class="min-h-screen">
	{#key user?.id ?? 'no-user'}
		{@render children()}
	{/key}
</div>

<style lang="postcss">
	:global(html) {
		@apply antialiased;
	}
</style>
