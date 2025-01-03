<script lang="ts">
	import { enhance } from '$app/forms';
	import { invalidate } from '$app/navigation';
	import Button from '$lib/components/ui/button/button.svelte';
	import CardContent from '$lib/components/ui/card/card-content.svelte';
	import CardHeader from '$lib/components/ui/card/card-header.svelte';
	import Card from '$lib/components/ui/card/card.svelte';
	import Input from '$lib/components/ui/input/input.svelte';
	import Label from '$lib/components/ui/label/label.svelte';

	const { data } = $props();
	const { userProfile } = data;

	let firstName = $state('');
	let lastName = $state('');
	let email = $state('');

	$effect(() => {
		if (userProfile) {
			firstName = userProfile.firstName;
			lastName = userProfile.lastName;
			email = userProfile.email;
		}
	});
</script>

<Card>
	<CardHeader>Manage your profile</CardHeader>
	<CardContent>
		<form
			method="post"
			use:enhance={({ formData }) => {
				formData.set('firstName', firstName);
				formData.set('lastName', lastName);
				formData.set('email', email);
				return ({ result }) => {
					if (result.type === 'success') {
						invalidate('/');
						alert('Profile updated successfully!');
					} else {
						alert('Error updating profile!');
					}
				};
			}}
			class="space-y-4"
		>
			<div>
				<Label>Email</Label>
				<Input bind:value={email} />
			</div>
			<div>
				<Label>First Name</Label>
				<Input bind:value={firstName} />
			</div>
			<div>
				<Label>Last Name</Label>
				<Input bind:value={lastName} />
			</div>
			<div>
				<Button type="submit">Update Profile</Button>
			</div>
		</form>
	</CardContent>
</Card>
