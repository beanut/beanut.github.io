/**
 * The Monograph Folio — Interactive & GSAP Animation Controller
 * Ultra-Clean Editorial Systems Portfolio for Bernard Lim
 */

(() => {
  "use strict";

  const htmlEl = document.documentElement;
  const themeToggle = document.getElementById("theme-toggle");
  const themeLabel = document.getElementById("theme-label");
  const copyEmailBtn = document.getElementById("copy-email-btn");
  const copyStatusTag = document.getElementById("copy-status-tag");
  const cursorRing = document.getElementById("cursor-ring");
  const cursorDot = document.getElementById("cursor-dot");

  // =========================================================================
  // 1. Theme Management (Monochrome Dark / Light)
  // =========================================================================
  const savedTheme = localStorage.getItem("bl-theme");
  const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const initialTheme = savedTheme || (systemPrefersDark ? "dark" : "light");

  htmlEl.setAttribute("data-theme", initialTheme);
  if (themeLabel) {
    themeLabel.textContent = initialTheme === "dark" ? "Dark" : "Light";
  }

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const current = htmlEl.getAttribute("data-theme");
      const next = current === "dark" ? "light" : "dark";
      htmlEl.setAttribute("data-theme", next);
      localStorage.setItem("bl-theme", next);
      if (themeLabel) {
        themeLabel.textContent = next === "dark" ? "Dark" : "Light";
      }

      // Micro-spin on knob
      const knob = themeToggle.querySelector(".theme-knob");
      if (typeof gsap !== "undefined" && knob) {
        gsap.fromTo(knob, { scale: 0.6, rotate: -45 }, { scale: 1, rotate: 0, duration: 0.35, ease: "back.out(2)" });
      }
    });
  }

  // =========================================================================
  // 2. Interactive Specimen Exhibition Controller
  // =========================================================================
  const ledgerRows = document.querySelectorAll(".ledger-row");
  const exhibits = document.querySelectorAll(".specimen-exhibit");
  const faireVideo = document.getElementById("faire-video");
  let currentActiveId = "faire";

  function switchExhibit(targetId) {
    if (targetId === currentActiveId) return;

    const outgoingRow = document.querySelector(`.ledger-row.is-active`);
    const incomingRow = document.getElementById(`row-${targetId}`);
    const outgoingExhibit = document.getElementById(`exhibit-${currentActiveId}`);
    const incomingExhibit = document.getElementById(`exhibit-${targetId}`);

    if (!incomingExhibit || !incomingRow) return;

    // 1. Update Ledger Rows
    if (outgoingRow) outgoingRow.classList.remove("is-active");
    incomingRow.classList.add("is-active");

    // 2. Manage Media Playback
    if (currentActiveId === "faire" && faireVideo) {
      faireVideo.pause();
    }
    if (targetId === "faire" && faireVideo) {
      faireVideo.currentTime = 0;
      faireVideo.play().catch(() => {});
    }

    // 3. GSAP Orchestrated Transition
    if (typeof gsap !== "undefined") {
      gsap.killTweensOf([outgoingExhibit, incomingExhibit]);

      // Animate out outgoing
      gsap.to(outgoingExhibit, {
        opacity: 0,
        y: -8,
        duration: 0.24,
        ease: "power2.in",
        onComplete: () => {
          outgoingExhibit.classList.remove("is-active");
          gsap.set(outgoingExhibit, { clearProps: "all" });
        },
      });

      // Animate in incoming
      incomingExhibit.classList.add("is-active");
      gsap.fromTo(
        incomingExhibit,
        { opacity: 0, y: 14, scale: 0.98 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.45,
          delay: 0.12,
          ease: "power3.out",
        }
      );

      // Micro stagger on incoming metadata
      const metaElements = incomingExhibit.querySelectorAll(".meta-title, .meta-description, .meta-stack .stack-chip");
      gsap.fromTo(
        metaElements,
        { opacity: 0, x: 10 },
        { opacity: 1, x: 0, duration: 0.35, stagger: 0.04, delay: 0.2, ease: "power2.out" }
      );
    } else {
      if (outgoingExhibit) outgoingExhibit.classList.remove("is-active");
      incomingExhibit.classList.add("is-active");
    }

    currentActiveId = targetId;
  }

  // Attach click and keyboard listeners to ledger rows
  ledgerRows.forEach((row) => {
    const target = row.getAttribute("data-target");
    if (!target) return;

    row.addEventListener("click", () => switchExhibit(target));
    row.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        switchExhibit(target);
      }
    });

    // Optional hover preview on desktop devices
    row.addEventListener("mouseenter", () => {
      if (window.matchMedia("(min-width: 1025px)").matches) {
        switchExhibit(target);
      }
    });
  });

  // Autoplay default Faire video safely
  if (faireVideo) {
    faireVideo.play().catch(() => {});
  }

  // =========================================================================
  // 3. Email Copy Action with GSAP Tactile Feedback
  // =========================================================================
  if (copyEmailBtn && copyStatusTag) {
    let copyTimeout = null;

    copyEmailBtn.addEventListener("click", async () => {
      const email = copyEmailBtn.getAttribute("data-email") || "btelim@uwaterloo.ca";

      try {
        await navigator.clipboard.writeText(email);
        copyStatusTag.textContent = "[Copied!]";
        copyStatusTag.style.color = "var(--accent-live)";

        if (typeof gsap !== "undefined") {
          gsap.fromTo(
            copyStatusTag,
            { scale: 0.8 },
            { scale: 1.15, duration: 0.2, yoyo: true, repeat: 1, ease: "power2.out" }
          );
        }

        if (copyTimeout) clearTimeout(copyTimeout);
        copyTimeout = setTimeout(() => {
          copyStatusTag.textContent = "[Copy]";
          copyStatusTag.style.color = "";
        }, 2200);
      } catch (err) {
        // Fallback prompt
        window.location.href = `mailto:${email}`;
      }
    });
  }

  // =========================================================================
  // 4. GSAP Page Load Choreography
  // =========================================================================
  if (typeof gsap !== "undefined") {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!prefersReducedMotion) {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      // Initial positions
      gsap.set(".hairline-bottom, .hairline-top", { scaleX: 0, transformOrigin: "left center" });
      gsap.set(".hairline-vertical", { scaleY: 0, transformOrigin: "top center" });
      gsap.set(".primary-title .title-line", { yPercent: 105, opacity: 0 });
      gsap.set(".primary-summary", { y: 16, opacity: 0 });
      gsap.set(".primary-actions", { y: 14, opacity: 0 });
      gsap.set(".specimen-bay", { opacity: 0, y: 16 });
      gsap.set(".ledger-row", { x: 24, opacity: 0 });
      gsap.set(".ledger-header, .ledger-skills-box", { opacity: 0, y: 10 });
      gsap.set(".anchored-footer", { opacity: 0 });

      tl.to(".hairline-bottom, .hairline-top", {
        scaleX: 1,
        duration: 0.95,
        ease: "expo.inOut",
      })
        .to(
          ".hairline-vertical",
          {
            scaleY: 1,
            duration: 0.85,
            ease: "expo.inOut",
          },
          0.15
        )
        .to(
          ".primary-title .title-line",
          {
            yPercent: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: "power3.out",
          },
          0.3
        )
        .to(
          ".primary-summary",
          {
            y: 0,
            opacity: 1,
            duration: 0.65,
          },
          0.45
        )
        .to(
          ".primary-actions",
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
          },
          0.52
        )
        .to(
          ".specimen-bay",
          {
            opacity: 1,
            y: 0,
            duration: 0.75,
            ease: "power3.out",
          },
          0.5
        )
        .to(
          ".ledger-row",
          {
            x: 0,
            opacity: 1,
            duration: 0.65,
            stagger: 0.08,
            ease: "power3.out",
          },
          0.42
        )
        .to(
          ".ledger-header, .ledger-skills-box, .anchored-footer",
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.08,
          },
          0.6
        );
    }
  }

  // =========================================================================
  // 5. Custom Minimal Cursor Follower & Magnetic Physics
  // =========================================================================
  if (cursorRing && cursorDot && window.matchMedia("(hover: hover)").matches) {
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;
    let isMoving = false;

    window.addEventListener("mousemove", (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (!isMoving) {
        isMoving = true;
        cursorRing.style.opacity = "1";
        cursorDot.style.opacity = "1";
      }

      cursorDot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
    });

    // Smooth physics loop for the trailing ring
    function renderCursor() {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      cursorRing.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
      requestAnimationFrame(renderCursor);
    }
    requestAnimationFrame(renderCursor);

    // Expand cursor ring when hovering clickable elements
    const interactiveTargets = document.querySelectorAll(
      "a, button, .ledger-row, [role='button'], input"
    );

    interactiveTargets.forEach((target) => {
      target.addEventListener("mouseenter", () => {
        cursorRing.classList.add("is-hovering");
      });
      target.addEventListener("mouseleave", () => {
        cursorRing.classList.remove("is-hovering");
      });
    });

    // Subtle magnetic physics on buttons with class .magnetic
    const magneticItems = document.querySelectorAll(".magnetic");
    magneticItems.forEach((item) => {
      item.addEventListener("mousemove", (e) => {
        const rect = item.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const deltaX = (e.clientX - centerX) * 0.22;
        const deltaY = (e.clientY - centerY) * 0.22;

        if (typeof gsap !== "undefined") {
          gsap.to(item, {
            x: deltaX,
            y: deltaY,
            duration: 0.3,
            ease: "power2.out",
          });
        }
      });

      item.addEventListener("mouseleave", () => {
        if (typeof gsap !== "undefined") {
          gsap.to(item, {
            x: 0,
            y: 0,
            duration: 0.5,
            ease: "elastic.out(1, 0.4)",
          });
        }
      });
    });
  }
})();
