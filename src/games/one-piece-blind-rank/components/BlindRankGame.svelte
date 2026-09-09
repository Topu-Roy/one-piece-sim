<script lang="ts">
  import { Characters } from "../../one-piece-draft/data/characters-v2";
  import { sampleLineup } from "../lib/rank-set";
  import { TOTAL_SLOTS, type BlindRankState, type RankedCharacter } from "../lib/types";
  import BlindCard from "./BlindCard.svelte";
  import SlotList from "./SlotList.svelte";

  // Shared dataset exception: only file this mode may read from outside.
  // Slimmed on load so the rest of the mode touches local types only.
  const donors: RankedCharacter[] = Characters.map((c) => ({
    id: c.id,
    displayName: c.displayName,
    imageURL: c.imageURL,
    rarity: c.rarity,
  }));

  function freshState(): BlindRankState {
    return {
      lineup: sampleLineup(donors),
      currentRound: 0,
      placements: Array.from({ length: TOTAL_SLOTS }, (_, slot) => ({ slot, characterId: null, locked: false })),
      phase: "ranking",
    };
  }

  let state = $state<BlindRankState>(freshState());

  const current = $derived(state.lineup[state.currentRound] as RankedCharacter);
  const placedCount = $derived(state.placements.filter((p) => p.characterId !== null).length);

  function placeIn(slot: number): void {
    if (state.phase !== "ranking") return;
    const target = state.placements[slot];
    if (!target || target.characterId !== null) return;
    target.characterId = current.id;
    target.locked = true;
    if (placedCount >= TOTAL_SLOTS) {
      state.phase = "done";
    } else {
      state.currentRound += 1;
    }
  }

  function restart(): void {
    state = freshState();
  }
</script>

<div class="mx-auto flex w-full max-w-2xl flex-col items-center px-4 py-6 sm:px-6 sm:py-8">
  {#if state.phase === "ranking"}
    <div class="flex w-full items-center justify-center gap-4 md:gap-4">
      <div class="order-2 w-[55%] md:order-1 md:col-span-3">
        <SlotList lineup={state.lineup} onSelect={placeIn} placements={state.placements} />
      </div>
      <div class="order-1 flex-1 md:sticky md:top-4 md:order-2 md:col-span-2 md:self-start">
        {#key current.id}
          <div class="animate-round">
            <BlindCard character={current} round={state.currentRound + 1} />
          </div>
        {/key}
        <p class="mt-3 hidden text-center text-sm font-bold text-cocoa/60 md:block">
          {placedCount} of {TOTAL_SLOTS} placed — slots lock forever.
        </p>
      </div>
    </div>
  {:else}
    <div
      class="w-full max-w-xl rounded-3xl border-4 border-cocoa bg-white p-8 text-center shadow-[8px_8px_0_#3a2a18]"
    >
      <p
        class="inline-block -rotate-2 rounded-lg border-[3px] border-cocoa bg-yellow px-4 py-1 text-sm font-bold tracking-[0.2em] text-cocoa uppercase"
      >
        List locked
      </p>
      <h2 class="mt-4 font-hand text-4xl text-cocoa">All 10 placed!</h2>
      <p class="mt-2 text-cocoa/70">Scoring drops next — how close is yer list to the true order?</p>
      <div class="flex items-center justify-center">
        <SlotList lineup={state.lineup} onSelect={() => {}} placements={state.placements} />
      </div>
      <button
        class="mt-6 rounded-2xl border-4 border-cocoa bg-coral px-8 py-3 text-lg font-bold text-white shadow-[6px_6px_0_#3a2a18] active:translate-x-1 active:translate-y-1 active:shadow-none"
        onclick={restart}
        type="button"
      >
        Rank again →
      </button>
    </div>
  {/if}
</div>
