<script lang="ts">
  import { draft, currentRound, roundOptions, rerollsLeft } from "../stores/draft";
  import { getRoundLabel, getRoundType } from "../lib/draft";
  import { preloadImages, getFixedDecoyURLs, getAllImageURLs } from "../lib/preload";
  import CharacterCard from "./CharacterCard.svelte";
  import RerollButton from "./RerollButton.svelte";
  import DraftPicks from "./DraftPicks.svelte";

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

  // Beat before shuffling: the round fades in (skeleton, then dimmed
  // cards), holds 1s, and only then does card 0 start. Timer cleared
  // on every fresh round so rerolls re-arm the beat.
  let revealReady = false;
  let beatTimer: ReturnType<typeof setTimeout> | null = null;
  const BEAT_MS = 1000;

  // Image warm-up: the round starts once the 15 fixed decoys settle.
  // The 4 real faces warm in the background (not gated) — each card's
  // lock additionally waits for its own art to decode (1s cap), so a
  // card never lands blank. Skeleton grid holds the layout meanwhile.
  // Skeleton mirrors the loaded card shape (art + one text bar) so the
  // swap doesn't shift layout. DF and weapon name+type share one line.
  let preloading = true;
  let loadedCount = 0;
  let loadTotal = 0;
  const decoyPool: string[] = getFixedDecoyURLs();
  // Full-roster background warm runs once (first round) — afterwards every
  // round's real faces are already in cache/SW before their options exist.
  let rosterWarming = false;
  // Freshness guard: stale preloads (rapid rerolls) must not clear the loader.
  let preloadKey = "";
  // Orchestration lives in a plain function (not inline in the reactive
  // statement) so the linter can't mistake cache writes for a render loop.
  function startRound(key: string, motion: boolean) {
    lockUpTo = -1;
    activeIndex = motion ? 99 : 0;
    revealReady = false;
    if (beatTimer !== null) {
      clearTimeout(beatTimer);
      beatTimer = null;
    }

    // Whole roster warms in the background (cache + SW), gated or not.
    // Runs once — all 184 faces download while the player drafts.
    if (!motion && !rosterWarming) {
      rosterWarming = true;
      void preloadImages(getAllImageURLs());
    }

    if (motion) {
      // Nothing animates — reals render eager, no warm-up needed.
      preloading = false;
      revealReady = true;
      return;
    }

    preloadKey = key;
    preloading = true;
    loadedCount = 0;
    loadTotal = decoyPool.length;
    preloadImages(decoyPool, (done) => {
      if (preloadKey !== key) return;
      loadedCount = done;
    }).then(() => {
      if (preloadKey !== key) return;
      preloading = false;
      // Cards are mounted (dimmed "?") — hold the beat, then shuffle.
      beatTimer = setTimeout(() => {
        if (preloadKey !== key) return;
        revealReady = true;
      }, BEAT_MS);
    });
  }
  $: startRound(revealKey, reducedMotion);

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

<div class="mx-auto flex min-h-screen w-full max-w-5xl flex-col items-center px-6 py-8">
  <div class="mb-6 flex w-full items-center justify-between gap-4">
    <p class="shrink-0 text-xs font-medium tracking-[0.16px] text-on-dark/70 uppercase">
      Round {round} of 8
    </p>
    <div class="flex items-center gap-3">
      <h1 class="text-right font-display text-2xl leading-[1.2] font-normal text-on-dark md:text-3xl">
        {label}
      </h1>

      {#if showReroll}
        <div class="shrink-0">
          <RerollButton />
        </div>
      {/if}
    </div>
  </div>

  {#key revealKey}
    {#if preloading}
      <!-- Loading state: skeleton cards hold the grid shape until art is cached. -->
      <!-- One shared height floor (art square + padding + one info line)
           on all screens — no overshoot, no jump. -->
      <div
        class="grid min-h-55 w-full grid-cols-2 gap-6 md:grid-cols-4"
        aria-busy="true"
        aria-label="Loading characters"
      >
        {#each Array(4) as _, i (i)}
          <div
            class="flex w-full flex-col items-center gap-3 rounded-[10px] border border-hairline bg-parchment p-4"
          >
            <div class="-mx-4 -mt-4 aspect-square w-[calc(100%+2rem)] rounded-t-[10px] bg-surface-strong"></div>
            <div class="h-3 w-2/3 rounded-full bg-surface-strong"></div>
          </div>
        {/each}
      </div>
      <p class="mt-6 text-sm tracking-wider text-on-dark/70 uppercase">
        Loading faces… {loadedCount}/{loadTotal}
      </p>
    {:else}
      <div class="grid min-h-55 w-full grid-cols-2 gap-6 md:grid-cols-4">
        {#each options as character, i (character.id)}
          <CharacterCard
            {character}
            {roundType}
            index={i}
            onSelect={handleSelect}
            onLockRequest={handleLockRequest}
            onLocked={handleLocked}
            revealDelay={!reducedMotion ? LOCK_BASE_MS : 0}
            canStart={revealReady && i <= activeIndex}
            {lockUpTo}
            {decoyPool}
          />
        {/each}
      </div>
    {/if}
  {/key}

  <!-- Always visible: ghost rows hold all 8 rounds until picked. -->
  <div class="mt-12 flex w-full justify-center">
    <DraftPicks picks={$draft.picks} />
  </div>
</div>
