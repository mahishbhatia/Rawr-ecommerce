<script setup>
import { onMounted, ref } from 'vue'
import SiteHeader from './components/SiteHeader.vue'
import HeroSection from './components/HeroSection.vue'
import ProductStory from './components/ProductStory.vue'
import NutritionGrid from './components/NutritionGrid.vue'
import ReviewSection from './components/ReviewSection.vue'
import FaqSection from './components/FaqSection.vue'
import SiteFooter from './components/SiteFooter.vue'

const site = ref(null)
const fallback = {
  product: { name: 'RAWR Protein Choco Crunch', price: '₹249', image: '/../../assets/desktop/product-main.jpeg' },
  nutrition: [
    { value: '20g', label: 'Protein', detail: 'High-quality whey per bar' },
    { value: '220', label: 'Calories', detail: 'Balanced fuel for active days' },
    { value: '6', label: 'Natural ingredients', detail: 'Every ingredient has a purpose' },
    { value: '0g', label: 'Added sugar', detail: 'Sweetened naturally' }
  ],
  reviews: [
    { name: 'Anaya S.', role: 'CrossFit Coach', quote: 'The first bar my clients actually enjoy and still trust before training.' },
    { name: 'Karan M.', role: 'Product Designer', quote: 'No sugar crash, clean focus, and the crunch is unreal.' },
    { name: 'Rhea P.', role: 'Marathon Runner', quote: 'I keep one in every bag. It tastes real and sits light.' }
  ]
}

onMounted(async () => {
  try {
    const response = await fetch('/api/catalog/home')
    if (response.ok) site.value = await response.json()
  } catch (_) { /* Flask API may be started separately during UI development. */ }
  site.value ||= fallback
})
</script>

<template>
  <SiteHeader />
  <main v-if="site">
    <HeroSection :product="site.product" />
    <ProductStory :product="site.product" />
    <NutritionGrid :stats="site.nutrition" />
    <ReviewSection :reviews="site.reviews" />
    <FaqSection />
  </main>
  <SiteFooter />
</template>
