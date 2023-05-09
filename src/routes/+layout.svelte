<script lang="ts">
	import { NotificationKind, NotificationList, Position } from '@whizzes/svelte-notifications';
	import Notification from '$lib/components/Notification.svelte';
	import '../app.css';
</script>

<slot />
<NotificationList position={Position.TopRight} let:notification>
	<Notification
		notification={{ id: 'ds', message: 'hod', title: 'g', time: 1, kind: NotificationKind.Success }}
	/>
</NotificationList>>
