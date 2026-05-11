# Homeroom UI Polish Report

## Initial App Inventory

- Landing/splash: `app/page.tsx`
- Teacher roster: `app/teacher/page.tsx`
- Teacher student shell: `app/teacher/students/[id]/layout.tsx`, `components/student/StudentMasthead.tsx`
- Teacher student overview: `app/teacher/students/[id]/page.tsx`
- Handoff: `app/teacher/students/[id]/handoff/page.tsx`, `lib/handoffData.ts`
- Growth Map / graphs: `app/teacher/students/[id]/growth-map/page.tsx`, `components/student/GrowthMapRadar.tsx`, `components/student/GpaTrendChart.tsx`, `components/student/SubjectTrendChart.tsx`, `components/student/PersonalityEvolutionChart.tsx`
- Notes: `app/teacher/students/[id]/notes/page.tsx`, `components/student/ObservationCard.tsx`, `components/student/EvidenceTrail.tsx`
- Pathways: `app/teacher/students/[id]/pathways/page.tsx`, `components/student/PathwaysGrid.tsx`
- Parent page: `app/parent/page.tsx`, `components/parent/*`
- Student page: `app/student/page.tsx`, `components/student-self/*`
- Chatbot observation sheet: `components/chatbot/ChatbotSheet.tsx`, `components/chatbot/ObservationPreview.tsx`, `app/api/ai/clarify-observation/route.ts`, `app/api/ai/extract-observation/route.ts`, `lib/backboard.ts`, `lib/demoAiFallback.ts`
- Demo data and copy source: `lib/demoData.ts`, `components/layout/DemoProvider.tsx`

## Implementation Plan

1. Rework shared demo copy/data so Maya's story centers on evidence-backed observations, visual communication, prepared speaking, small-group leadership, and architecture/spatial design as an exploration pathway.
2. Replace the Growth Map tabbed graph page with three coherent sections: grades line chart, competency radar with evidence axis drill-in, and a non-subject learner portrait.
3. Rebuild notes filtering so year, subject, teacher, confidence, signal state, visibility, and search text combine correctly, with clear active chips, empty states, and raw/structured note separation.
4. Rebuild the parent page around strengths, areas to support, and next parent-teacher meeting prep, with parent-safe copy and no raw teacher notes.
5. Polish teacher overview, pathways, student, landing, roster, evidence modal, and chatbot copy to remove unsafe or generic language.
6. Run copy audit, typecheck/build/lint where available, start the app, and smoke test the requested 3-minute demo path.

## Status

Complete for the current MVP polish pass.

## Summary Of UI And Copy Changes

- Reworked the landing, teacher roster, teacher overview, Growth Map, notes, pathways, parent, student, evidence, and chatbot surfaces around the Homeroom story: "Student growth, carried forward."
- Replaced generic or unsafe language with learner portrait, growth signals, evidence-backed observations, areas to support, pathways to explore, fresh-start briefing, and teacher-approved evidence.
- Added teacher overview story cards for what grades alone would miss, conflict-as-signal, and the opportunity surfaced through Maya's visual/design communication evidence.
- Added a dedicated Handoff tab with current handoff summary and longitudinal Grade 8 -> 9, 9 -> 10, 10 -> 11, and 11 -> next placement handoffs.
- Reworked teacher overview into a clearer demo start page with summary, current learner portrait, what not to over-assume, and next demo actions.
- Kept student view simpler and student-owned: interests, recent books/projects, learner portrait wording, and "What I want teachers to know."

## Graph Fixes

- Rebuilt the Growth Map page as coherent stacked sections instead of tabbed subject/personality layers.
- Added a Recharts `LineChart` for Grades Over Time with Grade 8, Grade 9, Grade 10, and Grade 11 on the x-axis and normalized 0-100 scores.
- Grouped changing subjects into Humanities, STEM, and Design / Project Work so the chart does not fake continuity across changing course names.
- Added per-graph Grade 8-11 controls to the grades chart, growth competencies radar, and learner reflection evolution chart.
- Reworked radar dimensions to Written Expression, Prepared Communication, Small-Group Leadership, Visual Reasoning, Project Execution, and Spontaneous Participation.
- Added learner portrait card with evidence chips and no subject tabs.
- Restored learner reflection evolution over time as a separate section with safe copy: reflection over time, not a fixed personality score.

## Parent Page Changes

- Rebuilt parent view around Strengths, Areas to support, and Next parent-teacher meeting.
- Removed Conversation prompts and Support at home sections from the parent page.
- Parent view does not expose raw note cards or internal teacher analysis.

## Notes Filter Fixes

- Notes filters now combine year/grade, subject, teacher, confidence, signal state, visibility, and search text.
- Added Clear filters button, active filter chips, and empty state.
- Notes display raw teacher note and structured observation separately.
- Raw notes with label language show "raw label · not saved as trait"; structured observations do not store the label as a trait.

## Chatbot / Backboard Wiring

- Wired the Add observation sheet through Next API routes so the browser calls server-side endpoints instead of exposing AI credentials to the client.
- Added Backboard model configuration through environment variables: `BACKBOARD_LLM_PROVIDER` and `BACKBOARD_MODEL_NAME`.
- Set the current local demo model to `openai/gpt-4o-mini` for a low-cost, reliable JSON extraction path. Cheaper models exist, but the observation preview depends on consistent structured output.
- Kept deterministic local fallback behavior for demo resilience if Backboard is unavailable.
- Clarification prompt now uses Maya context and asks for a specific moment, setting, support, or evidence instead of asking why she is "quiet" or treating that as a trait.

## Files Changed

- `app/page.tsx`
- `app/teacher/page.tsx`
- `app/teacher/students/[id]/page.tsx`
- `app/teacher/students/[id]/growth-map/page.tsx`
- `app/teacher/students/[id]/handoff/page.tsx`
- `app/teacher/students/[id]/notes/page.tsx`
- `app/parent/page.tsx`
- `app/student/page.tsx`
- `components/chatbot/ChatbotSheet.tsx`
- `components/chatbot/ObservationPreview.tsx`
- `app/api/ai/clarify-observation/route.ts`
- `app/api/ai/extract-observation/route.ts`
- `components/layout/DemoProvider.tsx`
- `components/student/EvidenceTrail.tsx`
- `components/student/GpaTrendChart.tsx`
- `components/student/GrowthMapRadar.tsx`
- `components/student/HandoffGate.tsx`
- `components/student/LearnerPortraitCard.tsx`
- `components/student/ObservationCard.tsx`
- `components/student/PathwaysGrid.tsx`
- `components/student/PersonalityEvolutionChart.tsx`
- `components/student/StudentMasthead.tsx`
- `components/student/YearScrubber.tsx`
- `components/student-self/PersonalityCard.tsx`
- `components/student-self/TraitLearnMoreDialog.tsx`
- `components/ui/sheet.tsx`
- `convex/seed.ts`
- `.env.example`
- `lib/backboard.ts`
- `lib/demoAiFallback.ts`
- `lib/demoData.ts`
- `lib/handoffData.ts`
- `docs/HOMEROOM_UI_POLISH_REPORT.md`

## Commands Run

- `npm run typecheck`
- `npm run lint`
- `npm run build`
- `npm start -- -p 3004`
- Backboard API smoke test with configured provider/model returned `READY`.

## Tests Run

- TypeScript check passed.
- ESLint passed.
- Production build passed.
- Backboard provider/model smoke test passed with `openai` / `gpt-4o-mini`.
- Browser smoke check on `http://localhost:3004/teacher/students/maya/growth-map` confirmed:
  - Grades over time section renders.
  - Growth competencies radar renders.
  - Learner reflection evolution over time renders.
  - Learner portrait renders.
  - Grade 8-11 controls appear at graph-section level.
- Browser smoke check on `http://localhost:3005/teacher/students/maya` and `/handoff` confirmed:
  - Overview summary renders.
  - Handoff tab/link renders.
  - Current handoff summary renders.
  - Handoff over the years renders.
  - Grade 8 -> 9 and Grade 10 -> 11 transitions render.
  - Architecture/spatial design copy renders as exploration, not prediction.

## Known Issues

- Live Backboard responses depend on the local `.env.local` key and the selected provider/model remaining enabled in Backboard.
- Demo data is still seeded/static outside the Add observation flow.

## Demo Path

- Use `http://localhost:3004` for the current rebuilt production server in this workspace.
- Main route path: Landing -> Teacher -> Maya -> Overview -> Growth Map -> Notes -> Pathways -> Parent -> Student -> Teacher add observation.

## Still Mocked

- Demo data is still seeded/static for the hackathon MVP.
- AI clarification and extraction now call Backboard through server-side Next routes, with deterministic Homeroom fallback for local demo reliability.
