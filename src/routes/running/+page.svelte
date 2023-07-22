<script lang="ts">
    import { writable } from 'svelte/store';
  
    let date = new Date().toISOString().split('T')[0];
    let kms = 0;
    let runHours = 0;
    let runMinutes = 0;
    let runSeconds = 0;
    let routeNumber = 0;
    let routeName = 'Unknown';
    let routes = new Map([
      [0, ['Unknown', 0]],
      [3, ['Stanni', 4.45]],
      [9, ['KleiWaWa', 7.2]]
    ]);

    let rpe = 0;
    let avgHR = 0;
    let output = '';
    let isOutputGenerated = false;
  
    function generateOutput() {
      const time = `${(runHours*60 + runMinutes + (runSeconds/60)).toFixed(1)}`;
      const pace = (+time / kms).toFixed(2);
      const paceMin = (Math.floor(+pace)).toFixed();
      const paceSeconds = Math.round(60 * (+pace % 1));
      output = `${formatDate(date)} |${routeNumber}| ${kms}km, ${formatTime(runHours)}:${formatTime(runMinutes)}:${formatTime(runSeconds)}, ${paceMin}:${paceSeconds} min/km, RPE: ${rpe}, ${avgHR}HR`; 
      isOutputGenerated = true;
    } 

    function formatDate(time:string) {
      time = time.substring(5);
      time = time.replace('-', '.');
      return time
    }

    function formatTime(x:Number) {
      return x.toLocaleString('en-US', {
                                minimumIntegerDigits: 2,
                                useGrouping: false
                              })
    }

    async function copyToClipboard() {
      await navigator.clipboard.writeText(output);
    } 

    $: if (routes.get(routeNumber)) {
        let test = routes.get(routeNumber);
        if (test) {
          routeName = test[0].toString();
          kms = +test[1];
        }
      } else {
        routeName = 'Unkown';
        kms = 0;
      }
    
</script>

<div class="bg-gray-800 min-h-screen p-6">
  <form on:submit|preventDefault={generateOutput} class="space-y-6">
    <div class="flex items-center space-x-2">
      <label class="text-gray-200 text-lg">Date</label>
      <input type="date" bind:value={date} class="w-full p-2 rounded border border-gray-200"/>
    </div>
    <div class="flex items-center space-x-3">
      <label class="text-gray-200 text-lg">Route Number</label>
      <input type="number" bind:value={routeNumber} class="w-full p-2 rounded border border-gray-200"/>
      <label class="text-gray-200 text-lg">{routeName}</label>
    </div>
    <div class="flex items-center space-x-2">
      <label class="text-gray-200 text-lg">KMs</label>
      <input type="number" bind:value={kms} step=".01" class="w-full p-2 rounded border border-gray-200"/>
    </div>
    <div class="flex space-x-2">
      <label class="block text-gray-200 text-lg">Time (HH:MM:SS)</label>
        <input type="number" bind:value={runHours} min="0" max="96" placeholder="Hours" class="w-full p-2 rounded border border-gray-200"/>
        <input type="number" bind:value={runMinutes} min="0" max="59" placeholder="Minutes" class="w-full p-2 rounded border border-gray-200"/>
        <input type="number" bind:value={runSeconds} min="0" max="59" placeholder="Seconds" class="w-full p-2 rounded border border-gray-200"/>
    </div>
    <div class="flex items-center space-x-2">
      <label class="text-gray-200 text-lg">RPE</label>
      <input type="number" bind:value={rpe} step=".1" class="w-full p-2 rounded border border-gray-200"/>
    </div>  
    <div class="flex items-center space-x-2">
      <label class="text-gray-200 text-lg">avg HR</label>
      <input type="number" bind:value={avgHR} class="w-full p-2 rounded border border-gray-200"/>
    </div>  
    <button type="submit" class="w-full p-2 rounded bg-blue-500 text-white">Generate Output</button>
  </form>
  {#if isOutputGenerated}
  <div class="relative">
    <textarea bind:value={output} class="w-full p-2 rounded border border-gray-200 mt-6"></textarea>
    <button on:click={copyToClipboard} class="absolute top-8 right-2 p-2 rounded bg-blue-500 text-white">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-6 w-6">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16h12M8 12h12M8 8h12M16 21V7a2 2 0 00-2-2H6a2 2 0 00-2 2v14a2 2 0 002 2h4"></path>
      </svg>
    </button>
  </div>
  {/if}
</div>
  