<script lang="ts">
    import { goto } from '$app/navigation';
</script>
  
<nav>
  <button on:click={() => goto('/bouldering')}>Bouldering</button>
  <button on:click={() => goto('/running')}>Running</button>
</nav>