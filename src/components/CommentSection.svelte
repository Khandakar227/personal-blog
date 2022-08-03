<script lang="ts">
    import Comment from "./Comment.svelte";
  const comments = [
    {
      displayName: "John Doe",
      photoURL: "/logo.png",
      content:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolorem, iusto enim! Voluptate assumenda, beatae quae non porro, accusamus",
      edited: true,
    },
    {
      displayName: "John Doe",
      photoURL: "/logo.png",
      content:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolorem, iusto enim! Voluptate assumenda, beatae quae non porro, accusamus",
      edited: true,
    },
    {
      displayName: "John Doe",
      photoURL: "/logo.png",
      content:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolorem, iusto enim! Voluptate assumenda, beatae quae non porro, accusamus",
      edited: true,
    },
    {
      displayName: "John Doe",
      photoURL: "/logo.png",
      content:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolorem, iusto enim! Voluptate assumenda, beatae quae non porro, accusamus",
      edited: true,
    },
  ];
</script>

<div class="flex flex-col p-2 rounded-md shadow my-8" >
    <h2 class="mt-12 mb-2"> Comments </h2>
    {#each comments as comment}
    <Comment {comment} />
    {/each}
</div>
