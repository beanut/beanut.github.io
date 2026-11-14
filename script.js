(() => {
  const htmlEl = document.documentElement;
  const themeToggle = document.getElementById("theme-toggle");
  const themeLabel = document.getElementById("theme-label");
  const bgGlyph = document.getElementById("bg-glyph");
  const cursorRing = document.getElementById("cursor-ring");
  const cursorDot = document.getElementById("cursor-dot");

  // 1. Initialize Monochrome Theme (Dark / Light)
  const savedTheme = localStorage.getItem("bl-theme");
  if (savedTheme === "light" || savedTheme === "dark") {
    htmlEl.setAttribute("data-theme", savedTheme);
  }
  if (themeLabel) {
    themeLabel.textContent =
      htmlEl.getAttribute("data-theme") === "light" ? "Light" : "Dark";
  }

  // 2. GSAP Intro Choreography
  if (typeof gsap !== "undefined") {
    const tl = gsap.timeline({
      defaults: { ease: "power4.out" },
    });

    gsap.set(".rule-h", { scaleX: 0 });
    gsap.set(".rule-v", { scaleY: 0 });
    gsap.set(".reveal-line", { yPercent: 115, rotate: 1.5 });
    gsap.set(".reveal-item", { yPercent: 110 });
    gsap.set(".hero-resume-btn", { y: 16, opacity: 0 });
    gsap.set(".row-inner", { y: 20, opacity: 0 });
    gsap.set(".links .magnetic", { y: 14, opacity: 0 });
    gsap.set(bgGlyph, { opacity: 0, scale: 0.94 });

    tl.to(".rule-h", {
      scaleX: 1,
      duration: 1.15,
      stagger: 0.08,
      ease: "expo.inOut",
    })
      .to(
        ".rule-v",
        {
          scaleY: 1,
          duration: 1.1,
          ease: "expo.inOut",
        },
        0.15
      )
      .to(
        ".reveal-line",
        {
          yPercent: 0,
          rotate: 0,
          duration: 1.1,
          stagger: 0.12,
        },
        0.35
      )
      .to(
        ".reveal-item",
        {
          yPercent: 0,
          duration: 0.85,
          stagger: 0.06,
        },
        0.45
      )
      .to(
        ".hero-resume-btn",
        {
          y: 0,
          opacity: 1,
          duration: 0.75,
          ease: "power3.out",
        },
        0.55
      )
      .to(
        ".row-inner",
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
        },
        0.55
      )
      .to(
        ".links .magnetic",
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.06,
        },
        0.65
      )
      .to(
        bgGlyph,
        {
          opacity: 1,
          scale: 1,
          duration: 1.4,
          ease: "power2.out",
        },
        0.4
      );

    // Unmask headline once reveal completes so emoji bounces are never clipped
    tl.add(() => {
      document.querySelectorAll(".headline .line-mask").forEach((mask) => {
        mask.classList.add("is-revealed");
      });
    }, 1.45);

    // 2.1 Interactive Title Emoji Rotation, On-Load Transition & Hover Interaction
    const heroHeadline = document.getElementById("hero-headline");
    const titleEmojiBtn = document.getElementById("title-emoji-slot");
    const titleEmojiChar = document.getElementById("title-emoji");
    const titleEmojiFx = titleEmojiBtn?.querySelector(".title-emoji-fx");
    const titleEmojiParticles =
      document.getElementById("title-emoji-particles") ||
      titleEmojiBtn?.querySelector(".title-emoji-particles");
    const viewportShardsLayer =
      document.getElementById("viewport-shards-layer") || document.body;

    const engineeringEmojis = [
      {
        char: "❤️",
        label: "Love",
        palette: ["#ff1744", "#f43f5e", "#fda4af", "#e11d48", "#be123c", "#ffffff"],
      },
      {
        char: "💻",
        label: "Code",
        palette: ["#38bdf8", "#60a5fa", "#94a3b8", "#cbd5e1", "#1e293b", "#0284c7"],
      },
      {
        char: "🚀",
        label: "Ship",
        palette: ["#f97316", "#ef4444", "#facc15", "#ffffff", "#3b82f6", "#991b1b"],
      },
      {
        char: "⚡",
        label: "Speed",
        palette: ["#fbbf24", "#f59e0b", "#fde047", "#ffffff", "#d97706", "#fef08a"],
      },
      {
        char: "🛠️",
        label: "Build",
        palette: ["#94a3b8", "#64748b", "#f59e0b", "#475569", "#cbd5e1", "#e2e8f0"],
      },
      {
        char: "☕",
        label: "Coffee",
        palette: ["#78350f", "#92400e", "#b45309", "#d97706", "#fef3c7", "#f59e0b"],
      },
      {
        char: "🧠",
        label: "Logic",
        palette: ["#f472b6", "#ec4899", "#db2777", "#fbcfe8", "#fda4af", "#be185d"],
      },
      {
        char: "👾",
        label: "Hacker",
        palette: ["#a855f7", "#8b5cf6", "#c084fc", "#e9d5ff", "#06b6d4", "#7c3aed"],
      },
      {
        char: "💡",
        label: "Innovate",
        palette: ["#facc15", "#eab308", "#fde047", "#fef08a", "#ca8a04", "#ffffff"],
      },
      {
        char: "🦾",
        label: "Automation",
        palette: ["#94a3b8", "#cbd5e1", "#e2e8f0", "#64748b", "#38bdf8", "#475569"],
      },
      {
        char: "🔥",
        label: "Passion",
        palette: ["#f97316", "#ea580c", "#ef4444", "#dc2626", "#facc15", "#fde047"],
      },
      {
        char: "✨",
        label: "Craft",
        palette: ["#fbbf24", "#facc15", "#fde047", "#ffffff", "#fef9c3", "#ca8a04"],
      },
    ];

    let currentEmojiIndex = 0;
    let autoRotateTimer = null;
    let isHovered = false;
    let isShuffling = false;
    let shuffleTimeout = null;
    let isTitleSuppressed = false;
    const ROTATE_INTERVAL_MS = 3800;

    // Ray-box intersection to determine boundary hits on [0, 100] x [0, 100] box
    function getRayBoxIntersection(cx, cy, cosA, sinA) {
      let minT = Infinity;
      let hit = null;

      // x = 100
      if (cosA > 1e-6) {
        const t = (100 - cx) / cosA;
        const y = cy + t * sinA;
        if (y >= -0.01 && y <= 100.01 && t < minT) {
          minT = t;
          hit = { x: 100, y: Math.max(0, Math.min(100, y)) };
        }
      }
      // x = 0
      if (cosA < -1e-6) {
        const t = (0 - cx) / cosA;
        const y = cy + t * sinA;
        if (y >= -0.01 && y <= 100.01 && t < minT) {
          minT = t;
          hit = { x: 0, y: Math.max(0, Math.min(100, y)) };
        }
      }
      // y = 100
      if (sinA > 1e-6) {
        const t = (100 - cy) / sinA;
        const x = cx + t * cosA;
        if (x >= -0.01 && x <= 100.01 && t < minT) {
          minT = t;
          hit = { x: Math.max(0, Math.min(100, x)), y: 100 };
        }
      }
      // y = 0
      if (sinA < -1e-6) {
        const t = (0 - cy) / sinA;
        const x = cx + t * cosA;
        if (x >= -0.01 && x <= 100.01 && t < minT) {
          minT = t;
          hit = { x: Math.max(0, Math.min(100, x)), y: 0 };
        }
      }

      return hit || { x: cx + cosA * 50, y: cy + sinA * 50 };
    }

    // Generate 4-7 non-overlapping polygonal shards dividing the emoji
    function generateShatterPieces(numPieces) {
      const cx = 50 + (Math.random() - 0.5) * 8;
      const cy = 50 + (Math.random() - 0.5) * 8;
      const step = (Math.PI * 2) / numPieces;
      const startOffset = Math.random() * Math.PI * 2;
      const angles = [];

      for (let i = 0; i < numPieces; i++) {
        angles.push(startOffset + i * step + (Math.random() - 0.5) * (step * 0.35));
      }

      const corners = [
        { x: 100, y: 0 },
        { x: 100, y: 100 },
        { x: 0, y: 100 },
        { x: 0, y: 0 },
      ];

      function getAngle(x, y) {
        let a = Math.atan2(y - cy, x - cx);
        while (a < startOffset) a += Math.PI * 2;
        return a;
      }

      const sortedCorners = corners
        .map((c) => ({ ...c, angle: getAngle(c.x, c.y) }))
        .sort((a, b) => a.angle - b.angle);

      const pieces = [];
      for (let i = 0; i < numPieces; i++) {
        const a1 = angles[i];
        const a2 = i === numPieces - 1 ? angles[0] + Math.PI * 2 : angles[i + 1];

        const hit1 = getRayBoxIntersection(cx, cy, Math.cos(a1), Math.sin(a1));
        const hit2 = getRayBoxIntersection(cx, cy, Math.cos(a2), Math.sin(a2));

        const intermediateCorners = [];
        for (const c of sortedCorners) {
          let ca = c.angle;
          while (ca < a1) ca += Math.PI * 2;
          if (ca > a1 && ca < a2) {
            intermediateCorners.push({ x: c.x, y: c.y });
          }
        }

        const polyPoints = [{ x: cx, y: cy }, hit1, ...intermediateCorners, hit2];
        const clipPath =
          "polygon(" +
          polyPoints.map((p) => `${p.x.toFixed(1)}% ${p.y.toFixed(1)}%`).join(", ") +
          ")";

        let sumX = 0;
        let sumY = 0;
        for (const p of polyPoints) {
          sumX += p.x;
          sumY += p.y;
        }
        const centroidX = sumX / polyPoints.length;
        const centroidY = sumY / polyPoints.length;

        pieces.push({
          clipPath,
          dirX: centroidX - cx,
          dirY: centroidY - cy,
        });
      }

      return pieces;
    }

    // Emoji Shatter & Explosion Exit Effect: breaks into 4-7 pieces exploding across entire viewport
    function triggerEmojiDisintegration(item, interactive, onSwap) {
      if (!titleEmojiChar) {
        onSwap();
        return;
      }

      if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.to(titleEmojiChar, {
          opacity: 0,
          duration: 0.15,
          onComplete: () => {
            onSwap();
            gsap.to(titleEmojiChar, { opacity: 1, duration: 0.2 });
          },
        });
        return;
      }

      const rect = titleEmojiChar.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const shardWidth = Math.max(28, rect.width || 44);
      const shardHeight = Math.max(28, rect.height || 44);
      const computedStyle = window.getComputedStyle(titleEmojiChar);
      const fontSize = computedStyle.fontSize;
      const fontFamily = computedStyle.fontFamily;

      // Ensure viewport shards container exists and clean up if backed up
      const shardsContainer =
        viewportShardsLayer || document.getElementById("viewport-shards-layer") || document.body;
      if (shardsContainer.childElementCount > 45) {
        shardsContainer.innerHTML = "";
      }

      // Break into 4 to 7 pieces
      const numPieces = Math.floor(Math.random() * 4) + 4; // 4, 5, 6, or 7 pieces
      const piecesData = generateShatterPieces(numPieces);

      const fragment = document.createDocumentFragment();
      const shardNodes = [];

      // Calculate blast distance ensuring pieces travel across the entire viewport and beyond
      const viewportDiagonal = Math.hypot(window.innerWidth, window.innerHeight);

      piecesData.forEach((p) => {
        const shard = document.createElement("span");
        shard.className = "viewport-shard";
        shard.textContent = item.char;
        shard.style.width = `${shardWidth}px`;
        shard.style.height = `${shardHeight}px`;
        shard.style.fontSize = fontSize;
        shard.style.fontFamily = fontFamily;
        shard.style.clipPath = p.clipPath;
        shard.style.webkitClipPath = p.clipPath;

        const len = Math.hypot(p.dirX, p.dirY) || 1;
        const nx = p.dirX / len;
        const ny = p.dirY / len;

        // Blast distance guarantees shards reach and fly past the viewport borders
        const burstDist = viewportDiagonal * gsap.utils.random(0.9, 1.4);

        const targetX = centerX + nx * burstDist + gsap.utils.random(-80, 80);
        const targetY = centerY + ny * burstDist + gsap.utils.random(-100, 60);
        const spin = gsap.utils.random(-360, 360);
        const rotX = gsap.utils.random(-90, 90);
        const rotY = gsap.utils.random(-90, 90);
        const endScale = gsap.utils.random(0.55, 0.85);

        // Slower, graceful flight across the entire viewport
        const duration = gsap.utils.random(2.2, 3.2);

        gsap.set(shard, {
          xPercent: -50,
          yPercent: -50,
          x: centerX,
          y: centerY,
          scale: 1,
          opacity: 1,
          rotate: 0,
          rotateX: 0,
          rotateY: 0,
        });

        fragment.appendChild(shard);
        shardNodes.push({
          el: shard,
          nx,
          ny,
          targetX,
          targetY,
          spin,
          rotX,
          rotY,
          endScale,
          duration,
        });
      });

      // Sparks shooting outward across the screen at a matching slower pace
      const sparkColors = item.palette || ["#ff2a5f", "#fbbf24", "#ffffff"];
      const sparkCount = gsap.utils.random(10, 15);
      for (let s = 0; s < sparkCount; s++) {
        const spark = document.createElement("span");
        spark.className = "viewport-spark";
        const sparkSize = gsap.utils.random(3, 5.5);
        const sparkColor = sparkColors[Math.floor(Math.random() * sparkColors.length)];
        spark.style.width = `${sparkSize}px`;
        spark.style.height = `${sparkSize}px`;
        spark.style.backgroundColor = sparkColor;
        spark.style.boxShadow = `0 0 8px ${sparkColor}`;

        const angle = Math.random() * Math.PI * 2;
        const sparkDist = viewportDiagonal * gsap.utils.random(0.3, 0.7);
        const sTargetX = centerX + Math.cos(angle) * sparkDist;
        const sTargetY = centerY + Math.sin(angle) * sparkDist - gsap.utils.random(20, 60);

        gsap.set(spark, { xPercent: -50, yPercent: -50, x: centerX, y: centerY, opacity: 1 });
        fragment.appendChild(spark);

        gsap.to(spark, {
          x: sTargetX,
          y: sTargetY,
          opacity: 0,
          scale: 0.1,
          duration: gsap.utils.random(1.2, 1.8),
          ease: "power1.out",
          onComplete: () => spark.remove(),
        });
      }

      shardsContainer.appendChild(fragment);

      // Hide the intact emoji character immediately as pieces take over
      gsap.killTweensOf(titleEmojiChar);
      titleEmojiChar.style.opacity = "0";

      // Luminous aura shockwave expanding outward
      if (titleEmojiFx) {
        gsap.fromTo(
          titleEmojiFx,
          { scale: 0.25, opacity: 0.75 },
          { scale: 2.6, opacity: 0, duration: 0.55, ease: "power2.out" }
        );
      }

      // Step 1: Micro fracture impulse (cracks separate 3.5px), then slow cinematic explosion across the entire viewport
      shardNodes.forEach((s) => {
        gsap.to(s.el, {
          x: centerX + s.nx * 3.5,
          y: centerY + s.ny * 3.5,
          duration: 0.05,
          ease: "power1.out",
          onComplete: () => {
            // Smooth slower translation across the full viewport
            gsap.to(s.el, {
              x: s.targetX,
              y: s.targetY,
              rotate: s.spin,
              rotateX: s.rotX,
              rotateY: s.rotY,
              scale: s.endScale,
              duration: s.duration,
              ease: "power1.out",
              onComplete: () => {
                s.el.remove();
              },
            });

            // Stay visible during the flight, fading gracefully as they reach the viewport bounds
            gsap.to(s.el, {
              opacity: 0,
              delay: s.duration * 0.45,
              duration: s.duration * 0.55,
              ease: "power2.in",
            });
          },
        });
      });

      // Midpoint swap & new emoji emergence as pieces blast away into the distance
      const swapDelayMs = 200;
      setTimeout(() => {
        onSwap();
      }, swapDelayMs);
    }

    function updateEmojiAria(emojiItem) {
      if (heroHeadline) {
        heroHeadline.setAttribute(
          "aria-label",
          `Bernard ${emojiItem.label.toLowerCase()} software engineering!`
        );
      }
      if (titleEmojiBtn) {
        titleEmojiBtn.setAttribute(
          "aria-label",
          `Current emoji: ${emojiItem.label}. Click to rotate.`
        );
      }
    }

    function clearAutoRotation() {
      if (autoRotateTimer) {
        clearTimeout(autoRotateTimer);
        autoRotateTimer = null;
      }
    }

    // Stop auto-rotation after load: emoji changes strictly on user interaction
    function scheduleAutoRotation() {
      clearAutoRotation();
    }

    function rotateNextEmoji(interactive = false) {
      if (!titleEmojiChar) return;
      clearAutoRotation();

      const prevItem = engineeringEmojis[currentEmojiIndex];
      currentEmojiIndex = (currentEmojiIndex + 1) % engineeringEmojis.length;
      const nextItem = engineeringEmojis[currentEmojiIndex];

      // Disintegrate the exiting emoji into dispersing particles
      triggerEmojiDisintegration(prevItem, interactive, () => {
        titleEmojiChar.textContent = nextItem.char;
        updateEmojiAria(nextItem);

        if (interactive) {
          // Snappy spring entrance for interactive click
          gsap.fromTo(
            titleEmojiChar,
            { scale: 0.15, opacity: 0, rotate: -20, y: 0 },
            {
              scale: 1.35,
              opacity: 1,
              rotate: 0,
              duration: 0.28,
              ease: "back.out(2.2)",
            }
          );
          gsap.to(titleEmojiChar, {
            scale: isHovered ? 1.25 : 1,
            y: isHovered ? -3 : 0,
            duration: 0.5,
            delay: 0.26,
            ease: "elastic.out(1.15, 0.35)",
            onComplete: () => {
              if (!isHovered && !isTitleSuppressed) scheduleAutoRotation();
            },
          });
        } else {
          // Smooth editorial float-in entrance for periodic auto-rotation
          gsap.fromTo(
            titleEmojiChar,
            { scale: 0.3, opacity: 0, y: 10, rotate: 0 },
            {
              scale: 1,
              opacity: 1,
              y: 0,
              duration: 0.55,
              ease: "back.out(1.9)",
              onComplete: () => {
                if (!isHovered && !isTitleSuppressed) scheduleAutoRotation();
              },
            }
          );
        }
      });
    }

    // On-Load Transition: rapidly switch between emojis until settling on one with GSAP bounce
    function runOnLoadShuffle() {
      if (!titleEmojiChar) return;
      isShuffling = true;
      clearAutoRotation();

      // Progressive deceleration step delays (ms)
      const stepDelays = [40, 45, 50, 55, 65, 80, 105, 135, 175, 230, 300, 380];
      let stepIndex = 0;

      function nextShuffleStep() {
        if (!isShuffling) return;

        if (stepIndex >= stepDelays.length) {
          // Settle on the first primary emoji (❤️ Love)
          isShuffling = false;
          currentEmojiIndex = 0;
          const settledEmoji = engineeringEmojis[0];
          titleEmojiChar.textContent = settledEmoji.char;
          updateEmojiAria(settledEmoji);

          // Satisfying GSAP settle celebration
          gsap.killTweensOf(titleEmojiChar);
          gsap
            .timeline()
            .to(titleEmojiChar, {
              scale: 1.5,
              rotate: 14,
              duration: 0.22,
              ease: "power2.out",
            })
            .to(titleEmojiChar, {
              scale: 1,
              rotate: 0,
              duration: 0.75,
              ease: "elastic.out(1.2, 0.35)",
            });

          if (titleEmojiFx) {
            gsap.fromTo(
              titleEmojiFx,
              { scale: 0.2, opacity: 0.45 },
              { scale: 2.2, opacity: 0, duration: 0.7, ease: "power2.out" }
            );
          }
          return;
        }

        // Pick an emoji different from current
        let nextIdx = (currentEmojiIndex + 1 + Math.floor(Math.random() * (engineeringEmojis.length - 2))) % engineeringEmojis.length;
        currentEmojiIndex = nextIdx;
        const currentItem = engineeringEmojis[currentEmojiIndex];
        titleEmojiChar.textContent = currentItem.char;

        const currentDelay = stepDelays[stepIndex];
        stepIndex += 1;

        // Snappy slot-roll micro kick
        gsap.fromTo(
          titleEmojiChar,
          { y: -7, scale: 0.88, opacity: 0.8 },
          {
            y: 0,
            scale: 1.05,
            opacity: 1,
            duration: (currentDelay / 1000) * 0.88,
            ease: "power1.out",
          }
        );

        shuffleTimeout = setTimeout(nextShuffleStep, currentDelay);
      }

      nextShuffleStep();
    }

    // Schedule on-load shuffle during the hero entrance timeline
    tl.add(() => {
      runOnLoadShuffle();
    }, 0.42);

    // Emoji Hover Interaction with GSAP
    if (titleEmojiBtn && titleEmojiChar) {
      titleEmojiBtn.addEventListener("mouseenter", () => {
        isHovered = true;
        clearAutoRotation();

        if (isShuffling) {
          clearTimeout(shuffleTimeout);
          isShuffling = false;
          titleEmojiChar.textContent = engineeringEmojis[currentEmojiIndex].char;
        }

        gsap.killTweensOf(titleEmojiChar);
        const hoverTl = gsap.timeline();
        hoverTl
          .to(titleEmojiChar, {
            scale: 1.38,
            y: -6,
            rotate: -15,
            duration: 0.18,
            ease: "power2.out",
          })
          .to(titleEmojiChar, {
            rotate: 13,
            duration: 0.16,
            ease: "sine.inOut",
          })
          .to(titleEmojiChar, {
            rotate: -7,
            duration: 0.14,
            ease: "sine.inOut",
          })
          .to(titleEmojiChar, {
            scale: 1.24,
            rotate: 0,
            y: -3,
            duration: 0.36,
            ease: "elastic.out(1.1, 0.4)",
          });

        if (titleEmojiFx) {
          gsap.fromTo(
            titleEmojiFx,
            { scale: 0.35, opacity: 0.45 },
            { scale: 1.75, opacity: 0, duration: 0.55, ease: "power2.out" }
          );
        }
      });

      titleEmojiBtn.addEventListener("mouseleave", () => {
        isHovered = false;
        gsap.killTweensOf(titleEmojiChar);
        gsap.to(titleEmojiChar, {
          scale: 1,
          rotate: 0,
          y: 0,
          duration: 0.48,
          ease: "elastic.out(1, 0.35)",
        });
        scheduleAutoRotation();
      });

      // Interactive Click to cycle emoji with 360 spin
      titleEmojiBtn.addEventListener("click", (e) => {
        e.preventDefault();
        rotateNextEmoji(true);
      });
    }

    // Pause/resume when tab visibility changes
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        clearAutoRotation();
      } else if (!isHovered && !isTitleSuppressed) {
        scheduleAutoRotation();
      }
    });

    // 3. Interactive Index Row Hover + Background Glyph Switch + Showcases (Faire & Ford)
    const rows = document.querySelectorAll(".index-row");
    const heroTitleGroup = document.getElementById("hero-title-group");
    const faireShowcase = document.getElementById("faire-showcase");
    const iphoneMockup = document.getElementById("iphone-mockup");
    const faireCopy = document.getElementById("faire-copy");
    const faireVideo = document.getElementById("faire-video");
    const faireRow = document.getElementById("faire-row");

    const fordShowcase = document.getElementById("ford-showcase");
    const fordVisual = document.getElementById("ford-visual");
    const fordCopy = document.getElementById("ford-copy");
    const fordRow = document.getElementById("ford-row");

    let activeShowcase = null; // null | "faire" | "ford"

    function setActiveShowcase(next) {
      if (activeShowcase === next || !heroTitleGroup) return;
      const prev = activeShowcase;
      activeShowcase = next;

      // Animate out previous showcase
      if (prev === "faire" && faireShowcase) {
        faireShowcase.classList.remove("is-visible");
        faireShowcase.setAttribute("aria-hidden", "true");
        if (faireVideo) faireVideo.pause();

        gsap.killTweensOf([faireShowcase, iphoneMockup, faireCopy]);
        gsap.to(faireShowcase, { autoAlpha: 0, duration: 0.3, ease: "power2.inOut" });
        gsap.to(iphoneMockup, { y: 24, scale: 0.96, opacity: 0, duration: 0.28, ease: "power2.in" });
        gsap.to(faireCopy, { x: 18, opacity: 0, duration: 0.26, ease: "power2.in" });
      } else if (prev === "ford" && fordShowcase) {
        fordShowcase.classList.remove("is-visible");
        fordShowcase.setAttribute("aria-hidden", "true");

        gsap.killTweensOf([fordShowcase, fordVisual, fordCopy]);
        gsap.to(fordShowcase, { autoAlpha: 0, duration: 0.3, ease: "power2.inOut" });
        gsap.to(fordVisual, { y: 24, scale: 0.96, opacity: 0, duration: 0.28, ease: "power2.in" });
        gsap.to(fordCopy, { x: 18, opacity: 0, duration: 0.26, ease: "power2.in" });
      }

      // Animate in next showcase or restore default hero title
      if (next === "faire" && faireShowcase) {
        isTitleSuppressed = true;
        clearAutoRotation();
        faireShowcase.classList.add("is-visible");
        faireShowcase.setAttribute("aria-hidden", "false");
        if (faireVideo) {
          faireVideo.play().catch(() => {});
        }

        gsap.killTweensOf([heroTitleGroup, faireShowcase, iphoneMockup, faireCopy]);
        gsap.to(heroTitleGroup, {
          x: -72,
          autoAlpha: 0,
          duration: 0.42,
          ease: "power3.inOut",
        });
        gsap.to(faireShowcase, {
          autoAlpha: 1,
          duration: 0.35,
          ease: "power2.out",
        });
        gsap.fromTo(
          iphoneMockup,
          { y: 38, scale: 0.95, opacity: 0 },
          { y: 0, scale: 1, opacity: 1, duration: 0.6, delay: 0.08, ease: "power3.out" }
        );
        gsap.fromTo(
          faireCopy,
          { x: 30, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.55, delay: 0.14, ease: "power3.out" }
        );
      } else if (next === "ford" && fordShowcase) {
        isTitleSuppressed = true;
        clearAutoRotation();
        fordShowcase.classList.add("is-visible");
        fordShowcase.setAttribute("aria-hidden", "false");

        gsap.killTweensOf([heroTitleGroup, fordShowcase, fordVisual, fordCopy]);
        gsap.to(heroTitleGroup, {
          x: -72,
          autoAlpha: 0,
          duration: 0.42,
          ease: "power3.inOut",
        });
        gsap.to(fordShowcase, {
          autoAlpha: 1,
          duration: 0.35,
          ease: "power2.out",
        });
        gsap.fromTo(
          fordVisual,
          { y: 34, scale: 0.95, opacity: 0 },
          { y: 0, scale: 1, opacity: 1, duration: 0.6, delay: 0.08, ease: "power3.out" }
        );
        gsap.fromTo(
          fordCopy,
          { x: 30, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.55, delay: 0.14, ease: "power3.out" }
        );
      } else if (next === null) {
        isTitleSuppressed = false;
        scheduleAutoRotation();
        gsap.killTweensOf(heroTitleGroup);
        if (titleEmojiChar) {
          gsap.set(titleEmojiChar, { opacity: 1, filter: "blur(0px)" });
        }
        gsap.fromTo(
          heroTitleGroup,
          { x: -56, autoAlpha: 0 },
          { x: 0, autoAlpha: 1, duration: 0.52, delay: 0.1, ease: "power3.out" }
        );
      }
    }

    rows.forEach((row) => {
      const inner = row.querySelector(".row-inner");
      const glyphText = row.getAttribute("data-glyph") || "BL";

      row.addEventListener("mouseenter", () => {
        gsap.to(inner, {
          x: 12,
          duration: 0.4,
          ease: "power3.out",
        });

        if (row === faireRow) {
          setActiveShowcase("faire");
        } else if (row === fordRow) {
          setActiveShowcase("ford");
        } else {
          setActiveShowcase(null);
        }

        if (bgGlyph && bgGlyph.textContent !== glyphText) {
          gsap.to(bgGlyph, {
            y: -14,
            opacity: 0,
            duration: 0.18,
            ease: "power2.in",
            onComplete: () => {
              bgGlyph.textContent = glyphText;
              gsap.fromTo(
                bgGlyph,
                { y: 14, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.35, ease: "power3.out" }
              );
            },
          });
        }
      });

      row.addEventListener("mouseleave", () => {
        gsap.to(inner, {
          x: 0,
          duration: 0.45,
          ease: "power3.out",
        });
      });
    });

    faireRow?.addEventListener("mouseleave", (e) => {
      const nextTarget = e.relatedTarget;
      if (
        (faireShowcase && nextTarget && faireShowcase.contains(nextTarget)) ||
        (fordRow && nextTarget && fordRow.contains(nextTarget))
      ) {
        return;
      }
      setActiveShowcase(null);
    });

    faireShowcase?.addEventListener("mouseleave", (e) => {
      const nextTarget = e.relatedTarget;
      if (
        (faireRow && nextTarget && faireRow.contains(nextTarget)) ||
        (fordRow && nextTarget && fordRow.contains(nextTarget))
      ) {
        return;
      }
      setActiveShowcase(null);
    });

    fordRow?.addEventListener("mouseleave", (e) => {
      const nextTarget = e.relatedTarget;
      if (
        (fordShowcase && nextTarget && fordShowcase.contains(nextTarget)) ||
        (faireRow && nextTarget && faireRow.contains(nextTarget))
      ) {
        return;
      }
      setActiveShowcase(null);
    });

    fordShowcase?.addEventListener("mouseleave", (e) => {
      const nextTarget = e.relatedTarget;
      if (
        (fordRow && nextTarget && fordRow.contains(nextTarget)) ||
        (faireRow && nextTarget && faireRow.contains(nextTarget))
      ) {
        return;
      }
      setActiveShowcase(null);
    });

    const indexList = document.querySelector(".index-list");
    indexList?.addEventListener("mouseleave", () => {
      if (bgGlyph && bgGlyph.textContent !== "BL") {
        gsap.to(bgGlyph, {
          y: 12,
          opacity: 0,
          duration: 0.18,
          ease: "power2.in",
          onComplete: () => {
            bgGlyph.textContent = "BL";
            gsap.fromTo(
              bgGlyph,
              { y: -12, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.35, ease: "power3.out" }
            );
          },
        });
      }
    });

    // 4. Magnetic Controls & Links
    const magnetics = document.querySelectorAll(".magnetic");
    magnetics.forEach((el) => {
      const xTo = gsap.quickTo(el, "x", { duration: 0.4, ease: "power3" });
      const yTo = gsap.quickTo(el, "y", { duration: 0.4, ease: "power3" });

      el.addEventListener("mousemove", (e) => {
        const rect = el.getBoundingClientRect();
        const dx = e.clientX - (rect.left + rect.width / 2);
        const dy = e.clientY - (rect.top + rect.height / 2);
        xTo(dx * 0.28);
        yTo(dy * 0.35);
      });

      el.addEventListener("mouseleave", () => {
        gsap.to(el, {
          x: 0,
          y: 0,
          duration: 0.6,
          ease: "elastic.out(1, 0.4)",
        });
      });
    });

    // 5. Custom Monochrome Cursor & Subtle Glyph Parallax
    if (cursorRing && cursorDot) {
      const ringX = gsap.quickTo(cursorRing, "x", { duration: 0.28, ease: "power3" });
      const ringY = gsap.quickTo(cursorRing, "y", { duration: 0.28, ease: "power3" });
      const dotX = gsap.quickTo(cursorDot, "x", { duration: 0.06, ease: "none" });
      const dotY = gsap.quickTo(cursorDot, "y", { duration: 0.06, ease: "none" });
      const glyphX = bgGlyph
        ? gsap.quickTo(bgGlyph, "x", { duration: 0.9, ease: "power3" })
        : null;

      window.addEventListener("mousemove", (e) => {
        ringX(e.clientX);
        ringY(e.clientY);
        dotX(e.clientX);
        dotY(e.clientY);

        if (glyphX) {
          const normX = (e.clientX / window.innerWidth - 0.5) * -28;
          glyphX(normX);
        }
      });

      const hoverables = document.querySelectorAll("a, button, .index-row");
      hoverables.forEach((item) => {
        item.addEventListener("mouseenter", () => cursorRing.classList.add("is-active"));
        item.addEventListener("mouseleave", () => cursorRing.classList.remove("is-active"));
      });
    }
  }

  // 6. Theme Toggle Interaction
  themeToggle?.addEventListener("click", () => {
    const current = htmlEl.getAttribute("data-theme") === "light" ? "light" : "dark";
    const next = current === "dark" ? "light" : "dark";
    htmlEl.setAttribute("data-theme", next);
    localStorage.setItem("bl-theme", next);

    if (themeLabel) {
      themeLabel.textContent = next === "light" ? "Light" : "Dark";
    }

    if (typeof gsap !== "undefined") {
      gsap.fromTo(
        ".rule-h, .rule-v",
        { opacity: 0.25 },
        { opacity: 1, duration: 0.6, ease: "power2.out" }
      );
    }
  });

  // 7. Copy Email Trigger
  const copyBtn = document.getElementById("copy-email");
  copyBtn?.addEventListener("click", async () => {
    const email = copyBtn.getAttribute("data-email") || "btelim@uwaterloo.ca";
    try {
      await navigator.clipboard.writeText(email);
      copyBtn.textContent = "[Copied]";
      if (typeof gsap !== "undefined") {
        gsap.fromTo(copyBtn, { scale: 0.9 }, { scale: 1, duration: 0.3, ease: "back.out(2)" });
      }
      setTimeout(() => {
        copyBtn.textContent = "[Copy]";
      }, 1600);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  });
})();
