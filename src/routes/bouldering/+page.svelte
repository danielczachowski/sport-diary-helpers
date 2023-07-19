<script lang="ts">

    let startTime: Date = new Date();
    let endTime: Date | null = null;
    let isTimerRunning = false;
    let vGradeCounts = Array(10).fill(0);
    let vGradeLog:number[] = [];
    const vColors = ["bg-red-800", "red-blue", "bg-blue-800", "bg-blue-800", "blue-green", "blue-green", "bg-green-800", "bg-green-800", "green-yellow", "green-yellow"]
    let routesClimbed = 0;
    let vSum = 0;
    let avgV = 0;
    let density = 0;
    let wallAngle = '<30°';
    let durationMinutes = 0;
    let preSessionActivity = 'None';
    let output = '';
    let isOutputGenerated = false;
  
    function startSession() {
      startTime = new Date();
      isTimerRunning = true;
      density = 0;
      routesClimbed = 0;
      vGradeCounts = Array(10).fill(0);
      vGradeLog = [];
      durationMinutes = 0;
    }
  
    function stopSession() {
      endTime = new Date();
      generateOutput();
      isTimerRunning = false;
 
    }
  
    function incrementVGrade(index: number) {
      vGradeCounts[index]+= index;
      vGradeLog.push(index);
      routesClimbed++;
    }

    function undo() {
      if (vGradeLog.length > 0) {
        let lastGrade = vGradeLog.pop() as number;
        vGradeCounts[lastGrade] -= lastGrade;
        routesClimbed--;
      }
    }

    
  
    function generateOutput() {
      if (!endTime) {
        endTime = new Date();
      }
      if (startTime && endTime) {
        durationMinutes = (endTime.getTime() - startTime.getTime()) / 60000;
        avgV = vSum / routesClimbed;
        density = durationMinutes / routesClimbed;
        output = `${formatDate(startTime.toISOString().split('T')[0])} | ${vSum} | ${durationMinutes.toFixed()} min | ${avgV.toFixed(2)} | ${density.toFixed(2)} | ${routesClimbed} | ${wallAngle} | ${preSessionActivity}`;
        isOutputGenerated = true;
      }
    }

    function formatDate(time:string) {
      time = time.substring(5);
      time = time.replace('-', '.');
      return time
    }

    async function copyToClipboard() {
      await navigator.clipboard.writeText(output);
    } 

    $: vSum = vGradeCounts.reduce((sum, count) => sum + count, 0);
    $: if (routesClimbed > 0) {
      density = +(durationMinutes/routesClimbed).toFixed(2);
      avgV = +(vSum / routesClimbed).toFixed(2);
      durationMinutes = Math.floor((new Date().getTime() - startTime.getTime()) / 60000);
    }

</script>

<div class="bg-gray-800 min-h-screen p-6 class space-y-6">
  <div class="flex items-center space-x-2">
    <select class="border-gray-200 bg-gray-600 text-gray-200 text-lg w-full h-12" bind:value={wallAngle}>
      <option value="All">All</option>
      <option value="&lt;30°">&lt;30°</option>
      <option value="&gt;30°">&gt;30°</option>
      <option value="slab">Slab only</option>
    </select>
    <select class="bg-gray-600 text-gray-200 text-lg w-full h-12" bind:value={preSessionActivity}>
      <option value="N">None</option>
      <option value="BM">Board Max</option>
      <option value="BE">Board Easy</option>
      <option value="DT">Drill Technique</option>
      <option value="DS">Drill Strength</option>
      <option value="F">Campus/Hangboard</option>
    </select>
  </div>

  {#if isTimerRunning}
  <button on:click={stopSession} class="w-full p-2 rounded bg-red-500 text-white">Stop Session</button>
    <div class="grid grid-cols-2 gap-4">    
      {#each Array(10) as _, index}
        <button class="{vColors[index]} w-full p-2 rounded text-black font-bold" on:click={() => incrementVGrade(index)}>V{index}</button>
      {/each}
    </div>
    <div class="grid grid-cols-2 gap-4">
      <p class="text-gray-200 text-lg">Started: {startTime.toLocaleTimeString()}</p>
      <p class="text-gray-200 text-lg">Routes climbed: {routesClimbed}</p>
      <p class="text-gray-200 text-lg">V Sum: {vSum}</p>
      <p class="text-gray-200 text-lg">avgV: {avgV}</p>
      <p class="text-gray-200 text-lg">density: {density.toFixed(2)}</p>
      <p class="text-gray-200 text-lg">duration: {durationMinutes} min</p>
    </div>
    <button on:click={undo} class="w-full p-2 rounded bg-blue-500 text-white">Undo Climb</button>
    
  {:else}
    <button on:click={startSession} class="w-full p-2 rounded bg-blue-500 text-white">Start Session</button>
    {#if isOutputGenerated}
      <div class="grid grid-cols-2 gap-4">
        <p class="text-gray-200 text-lg">Started: {startTime.toLocaleTimeString()}</p>
        <p class="text-gray-200 text-lg">Routes climbed: {routesClimbed}</p>
        <p class="text-gray-200 text-lg">V Sum: {vSum}</p>
        <p class="text-gray-200 text-lg">avgV: {avgV}</p>
        <p class="text-gray-200 text-lg">density: {density.toFixed(2)}</p>
        <p class="text-gray-200 text-lg">duration: {durationMinutes} min</p>
      </div>
      <div class="relative">
        <textarea bind:value={output} class="w-full p-2 rounded border border-gray-200 mt-6"></textarea>
        <button on:click={copyToClipboard} class="absolute top-8 right-2 p-2 rounded bg-blue-500 text-white">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-6 w-6">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16h12M8 12h12M8 8h12M16 21V7a2 2 0 00-2-2H6a2 2 0 00-2 2v14a2 2 0 002 2h4"></path>
          </svg>
        </button>
      </div>
    {/if}
  {/if} 
</div>