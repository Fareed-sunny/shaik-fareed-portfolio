(() => {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const root = document.documentElement;
  const header = document.querySelector('.site-header');
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = [...document.querySelectorAll('.primary-nav a[href^="#"]')];
  const revealItems = document.querySelectorAll('.reveal');
  const sections = [...document.querySelectorAll('main section[id]')];
  const year = document.getElementById('year');
  const typingTarget = document.getElementById('terminal-typing');
  const threatCount = document.getElementById('threat-count');

  year.textContent = String(new Date().getFullYear());

  const palettes = [
    { primary: '#00f6ff', soft: '#67fbff', rgb: '0, 246, 255', softRgb: '103, 251, 255', secondary: '#8b5cff', secondaryRgb: '139, 92, 255', success: '#5cff9d', successRgb: '92, 255, 157' },
    { primary: '#ff2bd6', soft: '#ff86e8', rgb: '255, 43, 214', softRgb: '255, 134, 232', secondary: '#7b61ff', secondaryRgb: '123, 97, 255', success: '#39ffcf', successRgb: '57, 255, 207' },
    { primary: '#b6ff00', soft: '#d9ff73', rgb: '182, 255, 0', softRgb: '217, 255, 115', secondary: '#2f7bff', secondaryRgb: '47, 123, 255', success: '#00ffc8', successRgb: '0, 255, 200' },
    { primary: '#ff8a00', soft: '#ffc266', rgb: '255, 138, 0', softRgb: '255, 194, 102', secondary: '#ff2d75', secondaryRgb: '255, 45, 117', success: '#8cff66', successRgb: '140, 255, 102' },
    { primary: '#9f4dff', soft: '#c792ff', rgb: '159, 77, 255', softRgb: '199, 146, 255', secondary: '#00d9ff', secondaryRgb: '0, 217, 255', success: '#ff4fd8', successRgb: '255, 79, 216' }
  ];
  let paletteIndex = 0;
  let activePalette = palettes[0];

  const applyPalette = palette => {
    activePalette = palette;
    root.style.setProperty('--cyan', palette.primary);
    root.style.setProperty('--cyan-soft', palette.soft);
    root.style.setProperty('--neon-rgb', palette.rgb);
    root.style.setProperty('--neon-soft-rgb', palette.softRgb);
    root.style.setProperty('--violet', palette.secondary);
    root.style.setProperty('--violet-rgb', palette.secondaryRgb);
    root.style.setProperty('--green', palette.success);
    root.style.setProperty('--green-rgb', palette.successRgb);
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', palette.primary);
  };

  applyPalette(activePalette);
  if (!reducedMotion) {
    window.setInterval(() => {
      paletteIndex = (paletteIndex + 1) % palettes.length;
      applyPalette(palettes[paletteIndex]);
    }, 3000);
  }

  const updateHeader = () => header.classList.toggle('scrolled', window.scrollY > 16);
  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });

  menuToggle.addEventListener('click', () => {
    const isOpen = document.body.classList.toggle('nav-open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    menuToggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
  });

  navLinks.forEach(link => link.addEventListener('click', () => {
    document.body.classList.remove('nav-open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Open menu');
  }));

  if (!reducedMotion && 'IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealItems.forEach(item => revealObserver.observe(item));
  } else {
    revealItems.forEach(item => item.classList.add('visible'));
  }

  if ('IntersectionObserver' in window) {
    const sectionObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`));
        }
      });
    }, { rootMargin: '-38% 0px -54% 0px' });
    sections.forEach(section => sectionObserver.observe(section));
  }

  const commands = [
    'scan --target web-applications',
    'analyze --severity critical',
    'validate --controls appsec',
    'report --format recruiter-ready'
  ];

  if (reducedMotion) {
    typingTarget.textContent = commands[0];
  } else {
    let commandIndex = 0;
    let characterIndex = 0;
    let deleting = false;
    const typeCommand = () => {
      const command = commands[commandIndex];
      typingTarget.textContent = command.slice(0, characterIndex);
      if (!deleting && characterIndex < command.length) {
        characterIndex += 1;
        window.setTimeout(typeCommand, 56);
      } else if (!deleting) {
        deleting = true;
        window.setTimeout(typeCommand, 1250);
      } else if (characterIndex > 0) {
        characterIndex -= 1;
        window.setTimeout(typeCommand, 27);
      } else {
        deleting = false;
        commandIndex = (commandIndex + 1) % commands.length;
        window.setTimeout(typeCommand, 220);
      }
    };
    typeCommand();
  }

  if (window.matchMedia('(pointer: fine)').matches && !reducedMotion) {
    window.addEventListener('pointermove', event => {
      root.style.setProperty('--mouse-x', `${event.clientX - 250}px`);
      root.style.setProperty('--mouse-y', `${event.clientY - 250}px`);
    }, { passive: true });
  }

  if (reducedMotion) return;

  const particleCanvas = document.getElementById('cyber-canvas');
  const mapCanvas = document.getElementById('threat-map');
  if (!particleCanvas || !mapCanvas) return;

  const particleContext = particleCanvas.getContext('2d');
  const mapContext = mapCanvas.getContext('2d');
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  let width = 0;
  let height = 0;
  let particles = [];
  let worldDots = [];
  let attacks = [];
  let eventTotal = 2847;
  let animationFrame = 0;
  let lastAttackAt = 0;

  const continents = [
    [[.05,.29],[.09,.20],[.18,.16],[.27,.20],[.31,.29],[.27,.35],[.24,.44],[.17,.47],[.12,.40],[.07,.38]],
    [[.27,.48],[.34,.49],[.39,.58],[.37,.70],[.33,.86],[.29,.77],[.27,.63]],
    [[.36,.13],[.43,.12],[.46,.19],[.42,.24],[.37,.21]],
    [[.45,.27],[.50,.22],[.58,.24],[.61,.31],[.56,.36],[.49,.35]],
    [[.48,.37],[.57,.36],[.62,.47],[.59,.63],[.54,.76],[.48,.65],[.45,.50]],
    [[.57,.22],[.67,.17],[.79,.19],[.91,.27],[.88,.39],[.80,.42],[.75,.51],[.65,.46],[.60,.36]],
    [[.79,.64],[.88,.62],[.92,.72],[.86,.81],[.78,.75]],
    [[.93,.50],[.96,.52],[.95,.57],[.92,.55]]
  ];

  const nodes = [
    { name: 'San Francisco', x: .13, y: .34 }, { name: 'New York', x: .25, y: .34 },
    { name: 'São Paulo', x: .34, y: .68 }, { name: 'London', x: .49, y: .29 },
    { name: 'Frankfurt', x: .53, y: .31 }, { name: 'Lagos', x: .50, y: .53 },
    { name: 'Johannesburg', x: .56, y: .70 }, { name: 'Dubai', x: .62, y: .42 },
    { name: 'Mumbai', x: .68, y: .48 }, { name: 'Singapore', x: .77, y: .58 },
    { name: 'Tokyo', x: .87, y: .37 }, { name: 'Sydney', x: .87, y: .74 }
  ];

  const pointInPolygon = (point, polygon) => {
    let inside = false;
    for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
      const [xi, yi] = polygon[i];
      const [xj, yj] = polygon[j];
      const intersects = ((yi > point[1]) !== (yj > point[1])) &&
        (point[0] < ((xj - xi) * (point[1] - yi)) / ((yj - yi) || .00001) + xi);
      if (intersects) inside = !inside;
    }
    return inside;
  };

  const mapBounds = () => {
    const mapWidth = Math.min(width * .96, 1500);
    const mapHeight = mapWidth * .5;
    return { x: (width - mapWidth) / 2, y: Math.max(92, (height - mapHeight) / 2), width: mapWidth, height: mapHeight };
  };

  const buildWorldDots = () => {
    const bounds = mapBounds();
    const gap = width < 700 ? 12 : 10;
    worldDots = [];
    for (let px = 0; px <= bounds.width; px += gap) {
      for (let py = 0; py <= bounds.height; py += gap) {
        const normalized = [px / bounds.width, py / bounds.height];
        if (continents.some(continent => pointInPolygon(normalized, continent)) && Math.random() > .13) {
          worldDots.push({ x: bounds.x + px, y: bounds.y + py, pulse: Math.random() * Math.PI * 2 });
        }
      }
    }
  };

  const buildParticles = () => {
    const density = Math.max(20, Math.min(56, Math.floor((width * height) / 32000)));
    particles = Array.from({ length: density }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - .5) * .18,
      vy: (Math.random() - .5) * .18,
      radius: Math.random() * 1.15 + .3,
      alpha: Math.random() * .42 + .12
    }));
  };

  const resizeCanvas = () => {
    width = window.innerWidth;
    height = window.innerHeight;
    [particleCanvas, mapCanvas].forEach(canvas => {
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
    });
    particleContext.setTransform(dpr, 0, 0, dpr, 0, 0);
    mapContext.setTransform(dpr, 0, 0, dpr, 0, 0);
    buildParticles();
    buildWorldDots();
  };

  const rgb = value => value.split(',').map(Number);

  const addAttack = now => {
    let from = Math.floor(Math.random() * nodes.length);
    let to = Math.floor(Math.random() * nodes.length);
    while (to === from) to = Math.floor(Math.random() * nodes.length);
    attacks.push({ from, to, start: now, duration: 1800 + Math.random() * 1800, intensity: .55 + Math.random() * .45 });
    if (attacks.length > 10) attacks.shift();
    eventTotal += Math.floor(8 + Math.random() * 39);
    if (threatCount) threatCount.textContent = String(eventTotal).padStart(4, '0');
  };

  const curvePoint = (start, control, end, t) => {
    const mt = 1 - t;
    return {
      x: mt * mt * start.x + 2 * mt * t * control.x + t * t * end.x,
      y: mt * mt * start.y + 2 * mt * t * control.y + t * t * end.y
    };
  };

  const drawThreatMap = now => {
    mapContext.clearRect(0, 0, width, height);
    const bounds = mapBounds();
    const [pr, pg, pb] = rgb(activePalette.rgb);
    const [sr, sg, sb] = rgb(activePalette.secondaryRgb);

    mapContext.save();
    mapContext.strokeStyle = `rgba(${pr}, ${pg}, ${pb}, .045)`;
    mapContext.lineWidth = .6;
    for (let i = 1; i < 12; i += 1) {
      const x = bounds.x + (bounds.width / 12) * i;
      mapContext.beginPath(); mapContext.moveTo(x, bounds.y); mapContext.lineTo(x, bounds.y + bounds.height); mapContext.stroke();
    }
    for (let i = 1; i < 6; i += 1) {
      const y = bounds.y + (bounds.height / 6) * i;
      mapContext.beginPath(); mapContext.moveTo(bounds.x, y); mapContext.lineTo(bounds.x + bounds.width, y); mapContext.stroke();
    }

    continents.forEach(continent => {
      mapContext.beginPath();
      continent.forEach(([nx, ny], index) => {
        const x = bounds.x + nx * bounds.width;
        const y = bounds.y + ny * bounds.height;
        if (index === 0) mapContext.moveTo(x, y); else mapContext.lineTo(x, y);
      });
      mapContext.closePath();
      mapContext.fillStyle = `rgba(${pr}, ${pg}, ${pb}, .018)`;
      mapContext.strokeStyle = `rgba(${pr}, ${pg}, ${pb}, .11)`;
      mapContext.lineWidth = .7;
      mapContext.fill();
      mapContext.stroke();
    });

    worldDots.forEach(dot => {
      const pulse = .72 + Math.sin(now * .0012 + dot.pulse) * .28;
      mapContext.fillStyle = `rgba(${pr}, ${pg}, ${pb}, ${.15 * pulse})`;
      mapContext.fillRect(dot.x, dot.y, width < 700 ? 1.2 : 1.55, width < 700 ? 1.2 : 1.55);
    });

    if (now - lastAttackAt > 720) {
      addAttack(now);
      lastAttackAt = now;
    }

    attacks = attacks.filter(attack => now - attack.start < attack.duration);
    attacks.forEach((attack, attackIndex) => {
      const progress = Math.min(1, (now - attack.start) / attack.duration);
      const startNode = nodes[attack.from];
      const endNode = nodes[attack.to];
      const start = { x: bounds.x + startNode.x * bounds.width, y: bounds.y + startNode.y * bounds.height };
      const end = { x: bounds.x + endNode.x * bounds.width, y: bounds.y + endNode.y * bounds.height };
      const distance = Math.hypot(end.x - start.x, end.y - start.y);
      const control = { x: (start.x + end.x) / 2, y: Math.min(start.y, end.y) - Math.max(35, distance * .22) };
      const fade = Math.sin(progress * Math.PI);
      const useSecondary = attackIndex % 3 === 0;
      const color = useSecondary ? [sr, sg, sb] : [pr, pg, pb];

      mapContext.beginPath();
      const steps = 42;
      for (let step = 0; step <= Math.max(2, Math.floor(steps * progress)); step += 1) {
        const point = curvePoint(start, control, end, step / steps);
        if (step === 0) mapContext.moveTo(point.x, point.y); else mapContext.lineTo(point.x, point.y);
      }
      mapContext.strokeStyle = `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${.14 + fade * .38 * attack.intensity})`;
      mapContext.lineWidth = 1.1;
      mapContext.shadowBlur = 13;
      mapContext.shadowColor = `rgba(${color[0]}, ${color[1]}, ${color[2]}, .72)`;
      mapContext.stroke();

      const head = curvePoint(start, control, end, progress);
      mapContext.beginPath();
      mapContext.fillStyle = `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${.8 * fade})`;
      mapContext.arc(head.x, head.y, 2.3 + attack.intensity * 2, 0, Math.PI * 2);
      mapContext.fill();

      [start, end].forEach((point, index) => {
        const nodePulse = 3.5 + Math.sin(now * .006 + attackIndex + index) * 1.4;
        mapContext.beginPath();
        mapContext.strokeStyle = `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${.28 * fade})`;
        mapContext.lineWidth = .8;
        mapContext.arc(point.x, point.y, nodePulse + 5, 0, Math.PI * 2);
        mapContext.stroke();
        mapContext.beginPath();
        mapContext.fillStyle = `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${.75 * fade})`;
        mapContext.arc(point.x, point.y, 2, 0, Math.PI * 2);
        mapContext.fill();
      });
    });

    mapContext.shadowBlur = 0;
    mapContext.restore();
  };

  const drawParticles = () => {
    particleContext.clearRect(0, 0, width, height);
    const [r, g, b] = rgb(activePalette.rgb);
    for (let i = 0; i < particles.length; i += 1) {
      const particle = particles[i];
      particle.x += particle.vx;
      particle.y += particle.vy;
      if (particle.x < -10) particle.x = width + 10;
      if (particle.x > width + 10) particle.x = -10;
      if (particle.y < -10) particle.y = height + 10;
      if (particle.y > height + 10) particle.y = -10;

      particleContext.beginPath();
      particleContext.fillStyle = `rgba(${r}, ${g}, ${b}, ${particle.alpha})`;
      particleContext.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
      particleContext.fill();

      for (let j = i + 1; j < particles.length; j += 1) {
        const other = particles[j];
        const distance = Math.hypot(particle.x - other.x, particle.y - other.y);
        if (distance < 118) {
          particleContext.beginPath();
          particleContext.strokeStyle = `rgba(${r}, ${g}, ${b}, ${(1 - distance / 118) * .075})`;
          particleContext.lineWidth = .5;
          particleContext.moveTo(particle.x, particle.y);
          particleContext.lineTo(other.x, other.y);
          particleContext.stroke();
        }
      }
    }
  };

  const draw = now => {
    drawThreatMap(now);
    drawParticles();
    animationFrame = window.requestAnimationFrame(draw);
  };

  resizeCanvas();
  if (threatCount) threatCount.textContent = String(eventTotal).padStart(4, '0');
  draw(performance.now());
  window.addEventListener('resize', resizeCanvas, { passive: true });
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      window.cancelAnimationFrame(animationFrame);
    } else {
      draw(performance.now());
    }
  });
})();
