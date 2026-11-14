# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- **Primary:** Tech recruiters, engineering hiring managers, and senior engineers evaluating candidates for tier-1 co-op and internship software engineering roles (specifically iOS, mobile systems, Android Automotive, and core software engineering).
- **Situation:** High-volume evaluation contexts (often 30–60 seconds per candidate review). They require immediate clarity on technical depth, company pedigrees, engineering impact, and proof of shipping high-standard software.
- **Secondary:** Engineering peers and collaborators looking to connect or review project implementations.

## Product Purpose

- Showcase Bernard Lim’s software engineering craft, tier-1 internship track record, and technical depth.
- Convert recruiter and hiring manager attention into interview invitations and direct contact.
- Provide frictionless access to key credentials (resume PDF, production apps on the App Store, open-source GitHub repositories, and verified experience at Faire and Ford Motor Company).

## Positioning

- **Specialized mobile & systems craftsmanship:** Unlike generic student web portfolios, this surface pairs production-grade engineering pedigree (Faire iOS wholesale marketplace app in Swift/SwiftUI/Bazel, Ford CarPlay & Android Automotive infotainment in Kotlin/Java/AIDL, Apple WWDC22 Swift Student Challenge Winner for ElementsAR) with bespoke, high-precision interactive hardware/platform demonstrations (such as an iPhone 18 Pro chassis video player and automotive infotainment display).
- **High density of verified signal:** Direct links to real App Store applications, technical artifacts, and clear technical competencies rather than unverified self-assessments.

## Operating Context

- Desktop and mobile web browsing by busy recruiters and hiring managers.
- Frequently visited via links in resume PDFs, job applications, or LinkedIn profiles.
- Evaluated on both visual design polish and technical implementation details (responsiveness, typography, smooth animations, performance, semantic HTML).

## Capabilities and Constraints

- **Architecture:** Zero-framework, high-performance static web architecture (semantic HTML5, modular CSS, vanilla JavaScript, GSAP for choreography).
- **Interactive Showcases:** Interactive experience index driving real-time visual swap of showcase assets (Faire iOS video simulation inside custom iPhone chassis, Ford Android Automotive visual).
- **Theme support:** Dark/Light monochrome mode toggle with persistent `localStorage` preference.
- **Direct actions:** One-click email copy with clipboard feedback, direct resume view/download, external linkouts.
- **Constraints:** Must remain fast to load across all network conditions, zero heavy bundle overhead, accessible semantics, responsive down to small mobile screens.

## Brand Commitments

- **Name:** Bernard Lim
- **Title / Status:** Software Engineering student @ University of Waterloo
- **Tone & Voice:** Quiet confidence, technically rigorous, restrained, meticulous attention to detail, respectful of the viewer's time. Playful micro-delight (e.g. interactive emoji toggle in headline) balanced by disciplined typography and editorial grid layouts.
- **Visual identity anchors:** Monospaced technical indexing, crisp rules/dividers, typography mixing Instrument Serif with Inter and JetBrains Mono, monochrome palette with subtle accent glows.

## Evidence on Hand

- `resume.pdf` — Full up-to-date resume outlining coursework, Faire iOS internship, Ford Motor Company Android Automotive internship, Priority Dynamics internship, and technical skills.
- `faire_ios.MP4` — Screen recording of the Faire Wholesale iOS application.
- `ford_infotainment.png` — Real asset showing Ford SYNC infotainment system running Apple CarPlay.
- Production App: *ElementsAR* published on Apple App Store (`apps.apple.com/ca/app/elementsar/id6451120399`), awarded Apple WWDC22 Swift Student Challenge Winner.
- Production App: *Faire Wholesale for iOS* (`apps.apple.com/us/app/faire-wholesale/id1413340491`).
- Verified GitHub profile: `github.com/beanut`.
- Verified LinkedIn: `linkedin.com/in/bernard-lte/`.

## Product Principles

1. **Proof Over Claims:** Let real production apps, concrete system accomplishments (Bazel build optimizations, AIDL IPC, RealityKit AR algorithms), and live hardware demonstrations speak louder than subjective adjectives.
2. **Immediate Scannability:** Deliver the most critical qualifications within the first 5 seconds of viewport scanning; allow deeper technical exploration on demand.
3. **Restrained Editorial Rigor:** Treat the portfolio with the precision of an engineering publication or luxury hardware specimen—uncluttered layout, disciplined typography, intentional motion that serves clarity.
4. **Zero Fluff, Zero Broken Paths:** Every link, demo, copy action, and resume asset must be accurate, working, and immediately accessible.

## Accessibility & Inclusion

- Semantic markup (`<header>`, `<main>`, `<section>`, `<aside>`, `<footer>`, `<nav>`) with ARIA labels on interactive elements and icon buttons.
- Keyboard navigability for all interactive controls (theme toggle, copy email, resume link, experience items).
- Reduced motion support (`prefers-reduced-motion`) and clear color contrast ratios across dark and light themes.
