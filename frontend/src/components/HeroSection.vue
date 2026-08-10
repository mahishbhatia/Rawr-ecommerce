<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import slideOne from '../../../assets/desktop/hero-slide-1.webp'
import slideTwo from '../../../assets/desktop/hero-slide-2.webp'
defineEmits(['navigate'])

const slides = [
  { image: slideOne, position: 'center' },
  { image: slideTwo, position: 'center' },
]
const active = ref(0)
const hovering = ref(false)
const pointer = ref({ x: 50, y: 50 })
let timer
const current = computed(() => slides[active.value])
const restart = () => { clearInterval(timer); timer = setInterval(() => { active.value = (active.value + 1) % slides.length }, 5000) }
const select = (index) => { active.value = (index + slides.length) % slides.length; restart() }
const moveHalo = (event) => { const bounds = event.currentTarget.getBoundingClientRect(); pointer.value = { x: event.clientX - bounds.left, y: event.clientY - bounds.top } }
onMounted(() => { slides.forEach(({ image }) => { const preload = new Image(); preload.src = image }); restart() })
onBeforeUnmount(() => clearInterval(timer))
</script>

<template>
  <section id="top" class="hero" @mouseenter="hovering = true" @mouseleave="hovering = false" @mousemove="moveHalo">
    <div class="slides"><div v-for="(slide, index) in slides" :key="slide.image" class="backdrop" :class="{ active: index === active }" :style="{ backgroundImage: `linear-gradient(90deg, rgba(7,7,7,.30), rgba(7,7,7,.23) 60%, rgba(7,7,7,.08)), url(${slide.image})`, backgroundPosition: slide.position }"></div></div>
    <div class="mouse-halo" :class="{ visible: hovering }" :style="{ left: `${pointer.x}px`, top: `${pointer.y}px` }"></div>
    <div class="content"><p class="eyebrow">{{ current.eyebrow }}</p><h1>{{ current.title }}</h1><p>{{ current.body }}</p></div>
    <div class="hero-footer"><button class="button primary shop-button" @click="$emit('navigate','shop')">Shop now</button><div class="hero-pagination"><div class="slide-controls" aria-label="Hero slides"><button aria-label="Previous slide" @click="select(active - 1)">←</button><button aria-label="Next slide" @click="select(active + 1)">→</button></div><div class="pager" aria-label="Hero slides"><button v-for="(_, index) in slides" :key="index" :class="{ selected: index === active }" :aria-label="`Show slide ${index + 1}`" @click="select(index)"></button></div></div></div>
    <div class="scroll">SCROLL TO DISCOVER <span>↓</span></div>
  </section>
</template>

<style scoped>.hero{height:calc(100svh - 65px);min-height:0;position:relative;overflow:hidden;display:flex;align-items:center;background:#15110f}.slides,.backdrop{position:absolute;inset:0}.backdrop{background-size:cover;background-repeat:no-repeat;opacity:0;transform:scale(1.025);transition:opacity .65s ease,transform 4.8s ease;will-change:opacity,transform}.backdrop.active{opacity:1;transform:scale(1)}.content{position:relative;z-index:2;margin-left:clamp(24px,7vw,130px);width:min(550px,calc(100% - 48px));padding-top:20px}.content h1{white-space:pre-line;font-size:clamp(3.7rem,8vw,7.4rem);line-height:.84;letter-spacing:-.09em;margin:16px 0 24px}.content p:not(.eyebrow){font-size:1.08rem;color:#dedede;line-height:1.6}.mouse-halo{position:absolute;z-index:1;width:170px;height:170px;border-radius:50%;transform:translate(-50%,-50%);background:rgba(241,90,36,.7);filter:blur(35px);mix-blend-mode:screen;opacity:0;pointer-events:none;transition:opacity .18s ease}.mouse-halo.visible{opacity:.8}.hero-footer{position:absolute;z-index:3;right:clamp(20px,4vw,64px);bottom:28px;left:clamp(24px,7vw,130px);display:flex;align-items:center;justify-content:space-between;gap:24px}.hero-pagination{display:flex;align-items:center;gap:24px}.slide-controls{display:flex;gap:10px}.slide-controls button{width:47px;height:47px;border-radius:50%;border:1px solid rgba(255,255,255,.75);background:rgba(10,10,10,.26);color:#fff;font-size:1.35rem;cursor:pointer;transition:background .2s ease,border-color .2s ease}.slide-controls button:hover{background:#f15a24;border-color:#f15a24}.pager{display:flex;gap:10px}.pager button{width:12px;height:12px;border-radius:50%;padding:0;border:1px solid #f3f3f3;background:transparent;cursor:pointer}.pager button.selected{background:#f15a24;border-color:#f15a24;transform:scale(1.18)}.scroll{position:absolute;z-index:3;bottom:25px;left:50%;transform:translateX(-50%);font-size:.62rem;letter-spacing:.15em;color:#bbb}.scroll span{color:#f15a24;font-size:1.3rem;margin-left:8px}@media(max-width:700px){.hero{min-height:620px}.content{margin-left:24px}.content h1{font-size:3.7rem}.hero-footer{left:24px;right:20px;bottom:68px}.shop-button{padding:12px 17px}.hero-pagination{gap:12px}.slide-controls{gap:7px}.slide-controls button{width:40px;height:40px}.pager{gap:7px}.scroll{font-size:.52rem}.mouse-halo{display:none}}@media(max-width:430px){.hero-footer{align-items:flex-end}.hero-pagination{flex-direction:column;align-items:flex-end}.scroll{left:auto;right:20px;transform:none;bottom:18px}}@media(prefers-reduced-motion:reduce){.backdrop{transition:none}.mouse-halo{display:none}}</style>

