<script lang="ts">
    import Search from 'carbon-icons-svelte/lib/Search.svelte';

    function onShubmit(e:SubmitEvent) {
        
    }
</script>

<form class="flex gap-2 items-center w-full mx-2 justify-end" on:submit|preventDefault={onShubmit}>
    <input type="search" name="search" id="search" class="w-full sm:w-[initial] p-2 rounded-2xl shadow-sm outline-none focus:border" aria-placeholder="Search" placeholder="Search..."/>
    <button class="p-1" type="submit">
        <Search aria-label="search" color="black" size={32} className="rounded-md" />
    </button>
</form>
<datalist>
    
</datalist>