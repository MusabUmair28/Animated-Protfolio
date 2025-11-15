// Hamburger toggle
    const ham = document.querySelector('#hamBtn');
    const navList = document.querySelector('nav ul');
    ham.addEventListener('click',()=>{
      navList.classList.toggle('show');
    });

    // small util
    const q = s => document.querySelector(s);
    const qa = s => Array.from(document.querySelectorAll(s));

    // Typewriter effect
    const typeEl = q('#typewriter');
    const phrases = [
      'I build interactive frontends & micro-UX.',
      'Animations, performance, and accessibility.',
      'I love turning ideas into delightful products.'
    ];
    let ti=0, pi=0;
    function typeLoop(){
      const p = phrases[pi];
      if(ti<=p.length){ typeEl.textContent = p.slice(0,ti); ti++; setTimeout(typeLoop, 40); }
      else { setTimeout(()=>{ // pause and delete
        const del = setInterval(()=>{ if(ti>=0){ typeEl.textContent = p.slice(0,ti); ti--; } else { clearInterval(del); pi=(pi+1)%phrases.length; ti=0; typeLoop(); } }, 30);
      }, 1200); }
    }
    typeLoop();

    // Reveal on scroll
    const revealEls = qa('.reveal');
    const obs = new IntersectionObserver((entries)=>{
      entries.forEach(e=>{ if(e.isIntersecting) e.target.classList.add('visible'); });
    },{threshold:0.12});
    revealEls.forEach(el=>obs.observe(el));

    // Progress bars animate when visible
    const bars = qa('.bar i');
    const pbObs = new IntersectionObserver((entries)=>{
      entries.forEach(e=>{
        if(e.isIntersecting){ const i = e.target.querySelector('i'); if(i){ const w = i.getAttribute('data-width'); i.style.width = w; }}
      });
    },{threshold:0.25});
    qa('.skill').forEach(s=>pbObs.observe(s));

    // Tiny particle background (canvas)
    const canvas = q('#pcanvas');
    const ctx = canvas.getContext('2d');
    let W, H, parts=[];
    function resize(){ W=canvas.width = innerWidth; H=canvas.height=innerHeight; }
    window.addEventListener('resize', resize); resize();
    function rand(min,max){return Math.random()*(max-min)+min}
    function initParts(){ parts=[]; for(let i=0;i<60;i++){ parts.push({x:rand(0,W), y:rand(0,H), vx:rand(-0.3,0.3), vy:rand(-0.2,0.6), r:rand(0.6,1.6), a:rand(0.08,0.35)}) } }
    initParts();
    function frame(){ ctx.clearRect(0,0,W,H); for(const p of parts){ p.x += p.vx; p.y += p.vy; p.a += Math.sin(Date.now()/6000)*0.0001; if(p.y>H+20) p.y=-20; if(p.x>W+20) p.x=-20; ctx.beginPath(); ctx.globalAlpha = 0.7*p.a; ctx.fillStyle = '#3ddc97'; ctx.arc(p.x,p.y,p.r,0,Math.PI*2); ctx.fill(); }
      requestAnimationFrame(frame);
    }
    frame();

    // Download CV — print page as simple fallback
    q('#downloadBtn').addEventListener('click', ()=>{
      // try to open print (user can save as PDF)
      window.print();
    });

    // Contact form basic handler
    q('#contactForm').addEventListener('submit', (e)=>{
      e.preventDefault();
      const name = q('#name').value.trim();
      const email = q('#email').value.trim();
      const msg = q('#message').value.trim();
      if(!name||!email||!msg){ alert('Please fill all fields'); return; }
      // Build mailto fallback
      const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${msg}`);
      window.location.href = `mailto:youremail@example.com?subject=${encodeURIComponent('Portfolio contact from '+name)}&body=${body}`;
    });

    // keyboard accessibility: project card enter -> open (placeholder action)
    qa('.project').forEach(p=>{ p.addEventListener('keydown', (e)=>{ if(e.key==='Enter'){ p.classList.add('active'); setTimeout(()=>p.classList.remove('active'),300); alert('Open project — replace with real link'); }}); p.addEventListener('click', ()=>{ alert('Open project — replace with real link'); }); });

    // set year
    q('#year').textContent = new Date().getFullYear();

    // small polish: focus outlines for keyboard users
    document.addEventListener('keyup', (e)=>{ if(e.key==='Tab') document.documentElement.style.setProperty('--showFocus','1'); });
  