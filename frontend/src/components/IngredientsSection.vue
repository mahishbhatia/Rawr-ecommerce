<script setup>
import desktopIngredientsVideo from '../../../assets/desktop/ingbg.mp4'
import mobileIngredientsVideo from '../../../assets/mobile/ingbg.mp4'

const ingredients = ['Cocoa', 'Honey', 'Whey', 'Cashews', 'Almonds', 'Dates', 'Coconut oil']
const ingredientLoop = [...ingredients, ...ingredients]
</script>

<template>
  <section id="ingredients" class="section ingredients">
    <video class="ingredients-video desktop-video" :src="desktopIngredientsVideo" autoplay muted loop playsinline aria-hidden="true"></video>
    <video class="ingredients-video mobile-video" :src="mobileIngredientsVideo" autoplay muted loop playsinline aria-hidden="true"></video>
    <div class="video-wash"></div><div class="ingredient-orbit" aria-hidden="true"></div>
    <div class="wrap ingredients-content"><p class="eyebrow">What's inside</p><h2>Nothing to hide.</h2><p class="muted intro">Made using ingredients you can recognise and understand. That's how RAWR keeps clean snacking simple and transparent.</p></div>
    <div class="ingredient-marquee" aria-label="Ingredients"><div class="ingredient-track"><article v-for="(ingredient,index) in ingredientLoop" :key="`${ingredient}-${index}`"><span>✦</span><b>{{ ingredient }}</b></article></div></div>
  </section>
</template>

<style scoped>
.ingredients{position:relative;isolation:isolate;overflow:hidden;min-height:650px;padding:130px 0 100px;display:flex;flex-direction:column;justify-content:center;background:#121315;border-top:1px solid #2a2b2d}.ingredients-video,.video-wash{position:absolute;inset:0;width:100%;height:100%}.ingredients-video{z-index:-2;object-fit:cover;object-position:center;opacity:.52}.mobile-video{display:none}.video-wash{z-index:-1;background:linear-gradient(100deg,rgba(8,9,10,.54) 0%,rgba(10,11,12,.54) 54%,rgba(8,9,10,.86) 100%)}.ingredients-content{position:relative;margin-top:-80px}.intro{max-width:570px}.ingredient-orbit{position:absolute;z-index:-1;right:-110px;top:22%;width:430px;height:430px;border:1px solid rgba(241,90,36,.35);border-radius:50%;animation:orbit-spin 20s linear infinite}.ingredient-orbit:before,.ingredient-orbit:after{content:'';position:absolute;border:1px solid rgba(255,255,255,.16);border-radius:50%}.ingredient-orbit:before{inset:36px}.ingredient-orbit:after{inset:90px}.ingredient-marquee{width:100%;margin-top:56px;overflow:hidden;mask-image:linear-gradient(90deg,transparent,#000 7%,#000 93%,transparent)}.ingredient-track{display:flex;width:max-content;gap:16px;padding:16px 8px;animation:ingredient-queue 25s linear infinite}.ingredient-marquee:hover .ingredient-track{animation-play-state:paused}.ingredient-track article{flex:0 0 205px;height:135px;padding:22px;background:rgba(18,19,21,.8);backdrop-filter:blur(8px);border:1px solid rgba(255,255,255,.2);display:flex;flex-direction:column;justify-content:space-between;transition:transform .28s cubic-bezier(.2,.8,.2,1),background .28s ease,border-color .28s ease,box-shadow .28s ease}.ingredient-track article:hover{z-index:2;transform:scale(1.1);background:rgba(241,90,36,.93);border-color:#f15a24;box-shadow:0 22px 36px rgba(0,0,0,.38)}.ingredient-track span{color:#f15a24;font-size:1.1rem;transition:color .25s ease,transform .28s ease}.ingredient-track b{font-size:1.06rem}.ingredient-track article:hover span{color:#171719;transform:rotate(90deg) scale(1.3)}@keyframes ingredient-queue{from{transform:translateX(-50%)}to{transform:translateX(0)}}@keyframes orbit-spin{to{transform:rotate(360deg)}}@media(max-width:700px){.ingredients{min-height:0;padding:80px 0 60px}.desktop-video{display:none}.mobile-video{display:block;object-position:center 60%;transform:scale(1.4);transform-origin:center 60%;opacity:.38}.ingredients-content{margin-top:0}.ingredient-marquee{margin-top:34px}.ingredient-track article{flex-basis:160px;height:108px}.ingredient-orbit{right:-180px;top:30%;width:350px;height:350px}}@media(prefers-reduced-motion:reduce){.ingredient-track,.ingredient-orbit{animation:none}}
</style>
