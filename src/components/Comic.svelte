<script lang="ts">
  import { formatDistanceToNow } from "../../node_modules/date-fns";

  export let title: string;
  export let imgSrc: string;
  export let imgAlt: string;
  export let date: Date;
</script>

<div class="comic-container">
  <p>{title}</p>
  <img src={imgSrc} alt={imgAlt} />
  <p>{formatDistanceToNow(date, { addSuffix: true })}</p>
</div>
