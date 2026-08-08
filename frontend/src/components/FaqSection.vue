<script setup>
import { ref } from 'vue'
const open = ref(0)
const items = [
 ['Is RAWR suitable as a pre-workout snack?', 'Yes. It is designed for steady energy with protein and natural carbohydrates before or after training.'],
 ['Does RAWR contain refined sugar or preservatives?', 'No. It is naturally sweetened with dates and honey, without refined sugar or synthetic preservatives.'],
 ['How often can I consume RAWR?', 'RAWR fits daily routines: post-workout, midday fuel, or whenever you need reliable nutrition.']
]
</script>
<template><section class="section"><div class="wrap faq"><div><p class="eyebrow">No fine print</p><h2>Questions,<br>answered.</h2></div><div class="items"><button v-for="([question, answer], index) in items" :key="question" @click="open = open === index ? -1 : index"><span>{{ question }}</span><b>{{ open === index ? '−' : '+' }}</b><p v-if="open === index">{{ answer }}</p></button></div></div></section></template>
<style scoped>.faq{display:grid;grid-template-columns:.8fr 1.2fr;gap:80px}.items{border-top:1px solid #3a3a3c}.items button{width:100%;background:none;color:#f1f1f1;text-align:left;padding:23px 0;border:0;border-bottom:1px solid #3a3a3c;font:inherit;cursor:pointer;font-weight:700}.items b{float:right;color:#f15a24;font-size:1.4rem}.items p{font-weight:400;color:#aaa;line-height:1.6;margin:15px 35px 0 0}@media(max-width:700px){.faq{grid-template-columns:1fr;gap:25px}}</style>
