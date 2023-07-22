<script lang="ts">
    import { onMount } from 'svelte';
    let date = new Date();
    let month = date.getMonth();
    let year = date.getFullYear();
    let daysInMonth;
    let firstDay;
    let weeks = [];
    let monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    onMount(() => {
        getMonthData();
    });

    function getMonthData() {
        // Get the number of days in the month
        daysInMonth = new Date(year, month + 1, 0).getDate();

        // Get the day of the week for the first day of the month
        firstDay = new Date(year, month, 1).getDay();

        // Generate weeks
        weeks = [];
        let week = [];
        for(let i = 0; i < firstDay; i++) {
            week.push('');
        }
        for(let day = 1; day <= daysInMonth; day++) {
            week.push(day);
            if(week.length === 7) {
                weeks.push(week);
                week = [];
            }
        }
        if(week.length > 0) {
            weeks.push(week);
        }
    }

    function incrementMonth() {
        if (month === 11) {
            month = 0;
            year++;
        } else {
            month++;
        }
        getMonthData();
    }

    function decrementMonth() {
        if (month === 0) {
            month = 11;
            year--;
        } else {
            month--;
        }
        getMonthData();
    }
</script>

<div class="w-full columns-3 p-3">
    <button on:click={decrementMonth} class="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Previous</button>
    <div class="w-full text-lg font-bold">{monthNames[month]} {year}</div>
    <button on:click={incrementMonth} class="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Next</button>
</div>
<div class="w-full overflow-hidden rounded shadow-lg">
    <table class="table-fixed w-full">
        <thead>
            <tr>
                <th class="w-1/7 py-2 px-3 bg-blue-500 text-center text-white">Sun</th>
                <th class="w-1/7 py-2 px-3 bg-blue-500 text-center text-white">Mon</th>
                <th class="w-1/7 py-2 px-3 bg-blue-500 text-center text-white">Tue</th>
                <th class="w-1/7 py-2 px-3 bg-blue-500 text-center text-white">Wed</th>
                <th class="w-1/7 py-2 px-3 bg-blue-500 text-center text-white">Thu</th>
                <th class="w-1/7 py-2 px-3 bg-blue-500 text-center text-white">Fri</th>
                <th class="w-1/7 py-2 px-3 bg-blue-500 text-center text-white">Sat</th>
                <th class="w-1/7 py-2 px-3 bg-blue-500 text-center text-white">Summary</th> <!-- Add a new header cell for the summary -->
            </tr>
        </thead>
        <tbody>
            {#each weeks as week, weekIndex}
                <tr>
                    {#each week as day, dayIndex}
                        <td class="border px-2 py-1">{day}</td>
                    {/each}
                    <td class="border px-2 py-1">Summary for week {weekIndex + 1}</td> <!-- Add a new cell for the summary -->
                </tr>
            {/each}
        </tbody>
    </table>
</div>