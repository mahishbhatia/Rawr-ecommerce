<template>
  <footer id="contact">
    <div class="wrap contact">
      <div>
        <p class="eyebrow">Contact</p>
        <h2>Let's keep it real.</h2>
        <p>Questions, collaborations, or simply want to know more about RAWR? Reach out anytime.</p>
      </div>
      <div class="contact-links">
        <a href="https://instagram.com/rawr_it" target="_blank" rel="noreferrer">
          <span class="contact-label"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1"/></svg>Instagram</span>
          <b>@rawr_it</b>
        </a>
        <a href="mailto:rawr.bizmind@gmail.com">
          <span class="contact-label"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m4 7 8 6 8-6"/></svg>Email</span>
          <b>rawr.bizmind@gmail.com</b>
        </a>
      </div>
    </div>
    <div class="wrap quality">
      <span>Laboratory tested by Sigma Laboratory</span>
      <span>FSSAI-approved manufacturing</span>
      <span>Fresh small batches &middot; No added preservatives</span>
    </div>
    <div class="wrap foot">
      <div><a class="brand" href="#top">RAWR<span>&reg;</span></a><p>As Raw As You.<br>Clean snacking. Real ingredients.</p></div>
      <a href="#top">Back to top &uarr;</a>
    </div>
  </footer>
</template>

<style scoped>
footer{background:#171719;border-top:1px solid #28282a}
footer .wrap{width:calc(100% - 64px);max-width:none}
.contact{padding:56px 0 36px;display:flex;justify-content:space-between;gap:40px}
.contact h2{font-size:clamp(2.3rem,5vw,4.2rem);letter-spacing:-.06em;margin:10px 0}
.contact>div:first-child>p:last-child{max-width:500px;color:#aaa;line-height:1.6}
.contact-links{display:grid;align-content:center;gap:18px}
.contact-links a{color:#b9b9ba;line-height:1.7}
.contact-label{display:flex;align-items:center;gap:8px}
.contact-label svg{width:17px;height:17px;fill:none;stroke:currentColor;stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round}
.contact-links b{color:#f15a24;font-size:1.15rem}
.quality{border-top:1px solid #28282a;border-bottom:1px solid #28282a;padding:14px 0;display:grid;grid-template-columns:repeat(3,minmax(0,1fr));align-items:center;color:#999;font-size:.73rem}
.quality span:nth-child(2){text-align:center}.quality span:last-child{text-align:right}
.foot{padding:26px 0;display:flex;align-items:end;justify-content:space-between;color:#8e8e90;font-size:.78rem}
.brand{display:block;font-size:1.7rem;color:#fff;font-weight:1000;letter-spacing:-.1em}
.brand span{color:#f15a24;font-size:.55rem;vertical-align:top}
@media(max-width:700px){footer .wrap{width:calc(100% - 28px)}.contact,.foot{flex-direction:column;align-items:start}.quality{grid-template-columns:1fr;gap:8px}.quality span:nth-child(2),.quality span:last-child{text-align:left}.contact{padding:46px 0 30px}}
</style>
