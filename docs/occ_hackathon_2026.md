**Talent Bridge (OCC Hacks 2026)** · Frontend & UI/UX Lead
Web App · Oct 2026 – Oct 2026 · Completed

**Short description:** An AI platform that matches students with real projects from businesses and nonprofits.

**Description:** Talent Bridge connects students looking for real-world experience with businesses and nonprofits that need help on projects. Students onboard and get matched to projects, and organizations review applicants and form teams. I built it with a four-person team at OCC Hacks 2026, where I led the frontend and UI/UX.

**Problem:** Students struggle to find meaningful project experience, and small businesses and nonprofits have work that needs doing but no easy way to find and vet student talent.

**Solution:** An AI layer matches students to projects and explains each match with a score and reasons, so organizations can review applicants with confidence and accept them onto teams in one place.

**Features**

- Onboarding, dashboards, AI project briefs, applications, and team formation flows.
- Explainable AI match scores and reasons shown to organizations reviewing applicants.
- A typed API service layer with a mock mode for building and demoing the UI without the backend.
- A visual identity with design tokens, light/dark/system themes, and a reduced-motion hero video.
- Accessible UI with AA-contrast colors, keyboard navigation, and screen-reader labels.

**Challenges**

- Keeping AI-written and human-written code consistent while orchestrating Claude Code agents, which I handled by writing style-guide skills and setting team code style with Prettier, pyink, and pylint.
- A bad merge kept the FastAPI backend from starting; I tracked it down, fixed it, and restored a teammate's dropped fix.
- The backend wasn't ready while the UI was being built, so I added a mock mode to the API layer so frontend work and the demo weren't blocked.

**Results**

- Shipped the full React/TypeScript frontend for the team's hackathon demo.
- Refactored the codebase to the new code style with all 21 backend tests still passing.
- Learned to lead UI/UX on a team while directing and verifying AI agents' work.

**Technologies:** React, TypeScript, Vite, Tailwind CSS, shadcn/ui, FastAPI, Claude Code

**Media:** <Cover image path>, <Gallery image paths, optional>, <YouTube embed URL, optional>

**Links:** [GitHub](https://github.com/gmatt20/talent-bridge)
