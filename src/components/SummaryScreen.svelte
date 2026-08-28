<script lang="ts">
  import { ROUNDS } from "../data/draftConfig";
  import type { DraftPick } from "../lib/types";

  let { picks, onrestart }: { picks: DraftPick[]; onrestart: () => void } = $props();
</script>

<section class="mx-auto flex max-w-[1300px] flex-col px-6 py-12">
  <p class="font-mono text-[11px] tracking-[1.8px] text-jelly-mint uppercase">Draft Complete</p>
  <h2 class="font-display text-[52px] leading-[0.85] text-hazard-white md:text-[72px]">YOUR BUILD</h2>

  <div class="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
    {#each picks as pick, i (i)}
      <div class="flex flex-col gap-1 rounded-[20px] border border-hazard-white bg-surface-slate p-5">
        <p class="font-mono text-[10px] tracking-[1.5px] text-secondary-text uppercase">
          {ROUNDS[pick.roundIndex].label}
        </p>
        <p class="font-ui text-[18px] font-bold text-hazard-white">
          {pick.characterName}
          <span class="text-[12px] font-normal text-secondary-text">· {pick.tier}</span>
        </p>
        <p class="font-mono text-[12px] tracking-[1.2px] text-jelly-mint uppercase">
          {pick.description}
        </p>
      </div>
    {/each}
  </div>

  <button
    onclick={onrestart}
    class="mt-10 w-fit rounded-[24px] bg-jelly-mint px-6 py-3 font-mono text-[12px] font-semibold tracking-[1.5px] text-black uppercase transition-colors duration-200 hover:bg-white/20 hover:text-black"
  >
    Draft Again
  </button>
</section>
