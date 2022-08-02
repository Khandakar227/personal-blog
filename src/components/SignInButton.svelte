<script lang="ts">
  import { signInWithGoogle } from "../assets/firebase";
  import { auth } from "../assets/firebase";
  import { onAuthStateChanged } from "firebase/auth";
  import { currentUser } from "../store/user";

  onAuthStateChanged(auth, (user) => {
    if (!user) currentUser.set({ user, status: "loaded" });

    currentUser.set({ user, status: "loaded" });
  });

</script>

{#if !$currentUser.user && $currentUser.status === "not-loaded"}
  <div class="flex justify-center items-center">

    <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
    
  </div>
{:else if $currentUser.status === "loaded"}
  {#if !$currentUser.user}
    <button data-name="sign-in" on:click={signInWithGoogle}>SIGN IN WITH GOOGLE</button>
  {:else}
    <button>
      <img
        class="shadow-sm"
        data-name="user-image"
        src={$currentUser.user.photoURL}
        alt={$currentUser.user.displayName}
      />
    </button>
  {/if}
{/if}

<style>
  [data-name="sign-in"] {
    background-color: rgb(30 41 59);
    padding: 0.5rem;
    border-radius: 0.5rem;
    color: white;
    font-weight: bolder;
    font-size: 14px;
  }
  [data-name="user-image"] {
    width: 3rem;
    height: 3rem;
    border-radius: 1.5rem;

  }
  .lds-ring {
  display: inline-block;
  position: relative;
  width: 40px;
  height: 40px;
}
.lds-ring div {
  box-sizing: border-box;
  display: block;
  position: absolute;
  width: 40px;
  height: 40px;
  margin: 4px;
  border: 4px solid #000;
  border-radius: 50%;
  animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  border-color: #000 transparent transparent transparent;
}
.lds-ring div:nth-child(1) {
  animation-delay: -0.45s;
}
.lds-ring div:nth-child(2) {
  animation-delay: -0.3s;
}
.lds-ring div:nth-child(3) {
  animation-delay: -0.15s;
}
@keyframes lds-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

</style>
