<script lang="ts">
    // {uid: string; post_url: string, displayName: string;photoURL: string;content: string;edited: boolean;timestamp: Date; replyOf: string}
    export let comment: {
        displayName: string;
        photoURL: string;
        content: string;
        edited: boolean;
        timestamp?: string;
    }
</script>
<div class="rounded-md shadow p-2 my-3">
    <div class="flex gap-1 items-start">
        <img class="w-9 h-9 rounded-3xl" src={comment.photoURL} alt={comment.displayName}/>
        <div>
            <h3>{comment.displayName}</h3>
            <small> <time>  </time> </small>
        </div>
    </div>

    <p class="py-2"> {comment.content} </p>
    <p class="text-right mx-1">
        <button class="p-1 rounded border border-red-800 text-xs mx-2 hover:text-white hover:bg-red-800"> Delete </button>
        <button class="p-1 rounded border border-emerald-800 text-xs mx-2 hover:text-white hover:bg-emerald-800"> Edit </button>
        <button class="p-1 rounded border border-indigo-800 text-xs mx-2 hover:text-white hover:bg-indigo-800"> Reply </button>
    </p>
</div>