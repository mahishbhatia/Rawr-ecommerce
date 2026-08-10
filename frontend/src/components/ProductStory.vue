<script setup>
defineProps({ product: Object })
defineEmits(['add-cart'])
</script>

<template>
  <section id="shop" class="section product">
    <div class="wrap grid">
      <div><p class="eyebrow">Meet Protein Choco Crunch</p><h2>Chocolate cravings. Protein goals. One bar.</h2><p class="muted">Our first RAWR is made with cocoa, honey, whey, cashews, almonds, dates and coconut oil — a convenient protein snack made for everyday life.</p><div class="facts"><span>✓ 15g protein</span><span>✓ 0g added sugar</span><span>✓ No added preservatives</span></div><button class="button primary" @click="$emit('add-cart')">Add to cart — {{ product?.price || '₹120' }}</button></div>
      <div class="product-card"><div class="glow"></div><img src="../../../assets/desktop/product-main.jpeg" :alt="product?.name"></div>
    </div>
  </section>
</template>

<style scoped>.product{background:#171719}.grid{display:grid;grid-template-columns:1fr 1fr;gap:70px;align-items:center}.facts{display:grid;gap:12px;margin:28px 0;color:#efefef;font-size:.9rem}.facts span::first-letter{color:#f15a24}.product-card{min-height:420px;position:relative;display:grid;place-items:center;overflow:hidden;border:1px solid #303033;background:#0f0f10}.product-card img{width:100%;position:relative;z-index:1;mix-blend-mode:lighten}.glow{position:absolute;width:260px;height:260px;border-radius:50%;background:#f15a24;filter:blur(130px);opacity:.35}@media(max-width:700px){.grid{grid-template-columns:1fr;gap:40px}.product-card{min-height:310px}}</style>
