<script lang="ts">
  let { onstart }: { onstart: () => void } = $props();
</script>

<section class="mx-auto flex max-w-[1300px] flex-col items-start px-6 py-16 md:py-24">
  <p class="font-mono text-[11px] tracking-[1.8px] text-jelly-mint uppercase">
    One Piece · Character Draft Builder
  </p>
  <h1 class="font-display text-[60px] leading-[0.85] tracking-[1px] text-hazard-white md:text-[107px]">
    ANIME DRAFT
  </h1>
  <p class="mt-4 max-w-[640px] font-ui text-[16px] leading-[1.6] font-medium text-secondary-text">
    Build the strongest possible original character. Draft one trait per round from four donors across ten rounds.
    Two rerolls. No do-overs.
  </p>
  <button
    onclick={onstart}
    class="mt-8 rounded-[24px] bg-jelly-mint px-6 py-3 font-mono text-[12px] font-semibold tracking-[1.5px] text-black uppercase transition-colors duration-200 hover:bg-white/20 hover:text-black"
  >
    Begin Draft
  </button>
</section>
