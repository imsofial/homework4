<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { writable } from "svelte/store";

  const email = writable("");
  const dispatch = createEventDispatcher();

  function handleSubmit(event: Event) {
    event.preventDefault();
    dispatch("fetchComic", { email: $email });
  }
</script>

<form on:submit={handleSubmit}>
  <label>
    Email:
    <input type="email" bind:value={$email} required />
  </label>
  <button type="submit">Get Comic</button>
</form>
