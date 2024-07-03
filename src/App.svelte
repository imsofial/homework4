<script lang="ts">
  import Comic from "./components/Comic.svelte";
  import ComicForm from "./components/ComicForm.svelte";
  import Error from "./components/Error.svelte";

  interface ComicData {
    safe_title: string;
    img: string;
    alt: string;
    year: number;
    month: number;
    day: number;
  }

  let comicData: ComicData | null = null;
  let error: string | null = null;

  async function fetchIdentifier(email: string): Promise<string> {
    const params = new URLSearchParams({ email });
    const response = await fetch(
      `https://fwd.innopolis.university/api/hw2?${params}`
    );
    if (!response.ok) {
      throw new Error({
        target: document.body,
        props: {
          message: "Failed to fetch identifier",
        },
      });
    }
    return response.text();
  }

  async function fetchComic(comic_id: string): Promise<ComicData> {
    const response = await fetch(
      `https://fwd.innopolis.university/api/comic?id=${comic_id}`
    );
    if (!response.ok) {
      throw new Error({
        target: document.body,
        props: {
          message: "Failed to fetch identifier",
        },
      });
    }
    return response.json();
  }

  function handleFetchComic(event: CustomEvent<{ email: string }>) {
    const email = event.detail.email;
    fetchIdentifier(email)
      .then((id) => {
        if (id) {
          fetchComic(id)
            .then((comic) => {
              comicData = comic;
              error = null;
            })
            .catch((err) => {
              error = "Failed to fetch comic";
              console.error(err);
            });
        }
      })
      .catch((err) => {
        error = "Failed to fetch identifier";
        console.error(err);
      });
  }
</script>

<div class="App">
  <h1>XKCD Comic Fetcher</h1>
  <ComicForm on:fetchComic={handleFetchComic} />
  {#if error}
    <Error message={error} />
  {/if}
  {#if comicData}
    <Comic
      title={comicData.safe_title}
      imgSrc={comicData.img}
      imgAlt={comicData.alt}
      date={new Date(`${comicData.year}-${comicData.month}-${comicData.day}`)}
    />
  {/if}
</div>

<style>
  .App {
    text-align: center;
  }
</style>
