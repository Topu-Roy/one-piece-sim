<script lang="ts">
  import { draft, currentRound, roundOptions, rerollsLeft } from "../stores/draft";
  import { getRoundLabel, getRoundType } from "../lib/draft";
  import { preloadImages, pickDecoyPool } from "../lib/preload";
  import CharacterCard from "./CharacterCard.svelte";
  import RerollButton from "./RerollButton.svelte";

  // Round reveal: cards shuffle one at a time (~600ms each), left to right.
  // Each card owns its timers (see CharacterCard); {#key} remounts them per options.
  const LOCK_BASE_MS = 600;

  $: round = $currentRound;
  $: options = $roundOptions;
  $: roundType = getRoundType(round);
  $: label = getRoundLabel(round);
  $: showReroll = round <= 7;

  // Signature changes on new options (initial + rerolls) → fresh cards.
  $: revealKey = roundType + ":" + options.map((o) => o.id).join(",");
  $: reducedMotion =
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Sequential reveal: card i shuffles only after card i-1 locks.
  // -1 = none forced. Reset whenever fresh options arrive.
  let lockUpTo = -1;
  let activeIndex = 0;

  // Image warm-up: 4 real faces + 16 decoys preloaded into the browser
  // (HTTP disk) cache before cards unlock — no blank frames mid-shuffle.
  // Skeleton grid holds the layout until every image settles.
  let preloading = true;
  let loadedCount = 0;
  let loadTotal = 0;
  let decoyPool: string[] = [];
  // Freshness guard: stale preloads (rapid rerolls) must not clear the loader.
  let preloadKey = "";
  // Orchestration lives in a plain function (not inline in the reactive
  // statement) so the linter can't mistake cache writes for a render loop.
  function startRound(key: string, motion: boolean, opts: typeof options) {
    lockUpTo = -1;
    activeIndex = motion ? 99 : 0;

    if (motion) {
      // Nothing animates — reals render eager, no warm-up needed.
      preloading = false;
      decoyPool = [];
      return;
    }

    preloadKey = key;
    preloading = true;
    loadedCount = 0;
    decoyPool = pickDecoyPool(opts.map((o) => o.id));
    const urls = [...opts.map((o) => o.imageURL), ...decoyPool];
    loadTotal = new Set(urls.filter(Boolean)).size;
    preloadImages(urls, (done) => {
      if (preloadKey !== key) return;
      loadedCount = done;
    }).then(() => {
      if (preloadKey !== key) return;
      preloading = false;
    });
  }
  $: startRound(revealKey, reducedMotion, options);

  function handleSelect(index: number) {
    draft.pick(index);
  }

  function handleLockRequest(index: number) {
    lockUpTo = Math.max(lockUpTo, index);
    activeIndex = Math.max(activeIndex, index + 1);
  }

  function handleLocked(index: number) {
    activeIndex = Math.max(activeIndex, index + 1);
  }
</script>

<div class="mx-auto flex min-h-screen w-full max-w-5xl flex-col items-center px-6 py-24">
  <div class="mb-12 text-center">
    <p class="mb-4 text-sm font-medium tracking-[0.16px] text-muted uppercase">
      Round {round} of 8
    </p>
    <h1 class="font-display text-4xl leading-[1.2] font-normal text-ink md:text-[40px]">
      {label}
    </h1>
  </div>

  {#if showReroll}
    <div class="mb-8">
      <RerollButton />
    </div>
  {/if}

  {#key revealKey}
    {#if preloading}
      <!-- Loading state: skeleton cards hold the grid shape until art is cached. -->
      <div class="grid w-full grid-cols-2 gap-6 md:grid-cols-4" aria-busy="true" aria-label="Loading characters">
        {#each Array(4) as _, i (i)}
          <div class="flex w-full flex-col items-center gap-3 rounded-[10px] border border-hairline bg-canvas p-4">
            <div class="-mx-4 -mt-4 aspect-square w-[calc(100%+2rem)] rounded-t-[10px] bg-surface-soft"></div>
            <div class="h-3 w-2/3 rounded-full bg-surface-soft"></div>
          </div>
        {/each}
      </div>
      <p class="mt-6 text-sm tracking-wider text-muted uppercase">
        Loading faces… {loadedCount}/{loadTotal}
      </p>
    {:else}
      <div class="grid w-full grid-cols-2 gap-6 md:grid-cols-4">
        {#each options as character, i (character.id)}
          <CharacterCard
            {character}
            {roundType}
            index={i}
            onSelect={handleSelect}
            onLockRequest={handleLockRequest}
            onLocked={handleLocked}
            revealDelay={!reducedMotion ? LOCK_BASE_MS : 0}
            canStart={i <= activeIndex}
            {lockUpTo}
            {decoyPool}
          />
        {/each}
      </div>
    {/if}
  {/key}

  {#if $draft.picks.length > 0}
    <div class="mt-12 w-full">
      <h2 class="mb-3 text-sm font-medium tracking-[0.16px] text-muted uppercase">Your Picks</h2>
      <div class="flex flex-wrap gap-2">
        {#each $draft.picks as pick (pick.round)}
          <span
            class="rounded-full border border-hairline bg-canvas px-3 py-1 text-xs font-medium tracking-wider text-body uppercase"
          >
            R{pick.round}: {pick.characterName}
          </span>
        {/each}
      </div>
    </div>
  {/if}
</div>
