# Homeroom Build Report

## What Was Built

- Next.js 14 App Router demo app with Convex-backed Maya Chen data and local fallback resilience.
- Teacher roster, profile, handoff gate, Overview, Notes, Pathways, and upgraded layered Growth Map.
- Parent-safe page with visual strength cards, `Nurture Talents`, home support cards, conversation prompts, and a school-to-home signal timeline.
- Student-safe page with editable interests plus a completed Big Five/IPIP-style learner reflection, trait graph, learner strategies, and learn-more dialog.
- Convex schema/data for the original learner memory model plus `subjectPerformance`, `curriculumCompetencies`, and `personalitySnapshots`.
- Backboard wrapper and Convex AI actions for clarification/extraction with `aiWorkflowRuns` logging and deterministic fallback.
- Hostile/vague input handling: judgments such as "student sucks" trigger evidence-seeking clarification and cannot be saved without an observable moment.

## Files Changed

- `app/*`
- `components/*`
- `convex/*`
- `lib/*`
- `docs/HOMEROOM_BUILD_REPORT.md`
- `docs/HOMEROOM_DEMO_SCRIPT.md`
- `docs/HOMEROOM_AI_GUARDRAILS.md`

## Commands Run

- `npx convex dev --once`
- `npx convex run seed:seedMaya`
- `npx convex run students:demoData`
- `npm run typecheck`
- `npm run lint`
- `npm run build`
- HTTP smoke checks for `/parent`, `/student`, and `/teacher/students/maya/growth-map`

## Tests Run

- TypeScript: passed.
- ESLint: passed.
- Convex function validation/codegen: passed.
- Convex seed: analytics rows inserted/repaired; Windows Convex CLI still sometimes emits a libuv assertion after successful JSON output.
- Production build: passed after allowing font/dependency network access.
- Route smoke checks: parent, student, and Growth Map routes returned `200`.

## What Works

- Parent view is more visual and uses growth-positive `Nurture Talents` language.
- Growth Map has layer buttons for Core Competencies, Subjects, Grades/GPA, and Learner Reflection.
- GPA, subject average, competency, radar, and personality evolution charts render from seeded data.
- Student view shows only student-safe self-reflection, interests, books, and activities.
- Add Observation chat now calls Convex AI actions, which call Backboard when configured and fall back deterministically if unavailable.
- AI workflow runs are recorded for clarification/extraction when Convex has a student id.
- Preview approval saves the same structured draft the teacher approved.

## What Is Mocked

- Auth is still a local role switcher.
- Data is seeded demo data for Maya Chen only.
- Big Five/IPIP-style reflection is seeded as student-completed demo data, not a real assessment administration.
- Backboard requires `BACKBOARD_API_KEY` in the runtime environment; the key was not committed or written into docs.

## Known Risks

- Live Backboard behavior should be verified after setting the key in Convex env vars.
- Browser visual QA through the in-app browser was previously blocked by a local Windows permission issue, so route/build checks were used.
- `npm audit` still reports dependency vulnerabilities from the hackathon dependency tree.

## Demo Path

Open `http://localhost:3000`, click `Teacher`, open `Maya Chen`, click `Add observation`, enter `Maya is quiet in math class.`, approve the structured draft, then show Growth Map layers. Switch to `Parent` to show `Nurture Talents`, then switch to `Student` to show the completed learner reflection and editable interests.

Backup: if Backboard is down or the key is missing, the same demo path uses deterministic fallback without surfacing provider failure in the UI.
