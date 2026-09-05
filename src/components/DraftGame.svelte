<script lang="ts">
  import { isComplete } from "../stores/draft";
  import RoundScreen from "./RoundScreen.svelte";
  import ResultScreen from "./ResultScreen.svelte";
  import NavBar from "./NavBar.svelte";
  import ancientBgRaw from "../assets/ancient_bg.jpg";

  // Astro resolves src/ image imports to a metadata object at runtime
  // (bundler types still say string) — unwrap to the hashed URL.
  const ancientBg: string =
    typeof ancientBgRaw === "string" ? ancientBgRaw : (ancientBgRaw as unknown as { src: string }).src;
</script>

<!-- Ancient backdrop for the whole draft flow (rounds + result).
     Fixed viewport-sized layer: the art never stretches with page
     length (a mock fixed-attachment that also works on mobile).
     Darkened via brightness (not a white veil) so colors stay rich.
     Cards carry their own solid canvases so text stays legible. -->
<div class="relative min-h-screen">
  <div
    aria-hidden="true"
    class="fixed inset-0 bg-cover bg-center bg-no-repeat brightness-50"
    style="background-image: url({ancientBg})"
  ></div>
  <!-- No round transition here: it lives on the options grid only,
       so the header and Draft Picks table never replay it. -->
  <div class="relative">
    <NavBar />
    {#if $isComplete}
      <ResultScreen />
    {:else}
      <RoundScreen />
    {/if}
  </div>
</div>
