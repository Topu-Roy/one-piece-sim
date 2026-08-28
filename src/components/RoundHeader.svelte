<script lang="ts">
  import type { RoundDef } from "../lib/types";

  let {
    round,
    roundNumber,
    total,
    rerollsLeft,
    onreroll,
  }: {
    round: RoundDef;
    roundNumber: number;
    total: number;
    rerollsLeft: number;
    onreroll: () => void;
  } = $props();
</script>

<header class="mx-auto flex max-w-[1300px] flex-col gap-4 px-6 pt-10 md:pt-16">
  <div class="flex items-center justify-between gap-4">
    <p class="font-mono text-[11px] tracking-[1.8px] text-jelly-mint uppercase">{round.label}</p>
    <p class="font-mono text-[11px] tracking-[1.5px] text-secondary-text uppercase">
      Round {roundNumber} / {total}
    </p>
  </div>

  <h2 class="font-display text-[52px] leading-[0.9] text-hazard-white md:text-[72px]">
    {round.key.toUpperCase()}
  </h2>
  <p class="max-w-[640px] font-ui text-[16px] leading-[1.6] font-medium text-secondary-text">
    {round.prompt}
  </p>

  <div class="mt-2 flex items-center gap-4">
    <div class="h-px w-full bg-hazard-white/20"></div>
    <button
      onclick={onreroll}
      disabled={rerollsLeft <= 0}
      class="shrink-0 rounded-[40px] border border-jelly-mint px-5 py-2 font-mono text-[12px] font-semibold tracking-[1.5px] text-jelly-mint uppercase transition-colors duration-150 hover:bg-jelly-mint hover:text-black disabled:cursor-not-allowed disabled:border-secondary-text disabled:text-secondary-text disabled:hover:bg-transparent"
    >
      Reroll ({rerollsLeft})
    </button>
  </div>
</header>
