<script lang="ts">
    import '../app.css';
    import { goto } from '$app/navigation';
    import { base } from '$app/paths';
    let menuOpen = false;
</script>

<nav class="bg-gray-900 p-6">
  <div class="flex items-center justify-between">
    <div class="text-gray-200 text-xl font-semibold">
      Your Logo
    </div>
    <div class="lg:hidden">
      <button on:click={() => menuOpen = !menuOpen} class="text-gray-200">
        <!-- Simple hamburger icon -->
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-6 w-6">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
        </svg>
      </button>
    </div>
  </div>
  {#if menuOpen}
    <div class="space-y-4 mt-6 lg:hidden">
      <a href="{base}/" class="block text-gray-200 text-lg">
        Home
      </a>
      <button on:click={() => { menuOpen = false; goto('/bouldering'); }} class="block text-gray-200 text-lg">
        Bouldering
      </button>
      <button on:click={() => { menuOpen = false; goto('/running'); }} class="block text-gray-200 text-lg">
        Running
      </button>
    </div>
  {/if}
  <div class="space-y-0 flex lg:justify-between lg:items-center mt-6 hidden lg:flex">
    <a href="{base}/" class="text-gray-200 text-lg lg:mr-4">
      Home
    </a>
    <button on:click={() => goto('/bouldering')} class="text-gray-200 text-lg lg:mr-4">
      Bouldering
    </button>
    <button on:click={() => goto('/running')} class="text-gray-200 text-lg">
      Running
    </button>
  </div>
</nav>
  
<slot></slot>
  


