# Homeroom Demo Script

## Five-Minute Click Path

1. Open `http://localhost:3000`.
2. Click `Teacher`.
3. Click `Maya Chen`.
4. Show the handoff gate: Homeroom gives a fresh-start briefing, not a dossier.
5. Click `Add observation`.
6. Type: `Maya is quiet in math class.`
7. Homeroom asks for the specific moment or setting instead of saving the label.
8. Click `That's all I have`.
9. Show the structured preview and draft quality indicators.
10. Click `Approve and save`.
11. Open `Growth Map`.
12. Show `Core Competencies`: curriculum-tied scores with evidence links.
13. Show `Subjects`: subject averages by grade/subject.
14. Show `Grades/GPA`: overall performance context over time.
15. Show `Learner Reflection`: Big Five/IPIP-style self-reflection evolution.
16. Return to Overview and point to `Participation is context-dependent`.
17. Switch to `Parent`; show strengths, `Nurture Talents`, home support cards, and conversation prompts.
18. Switch to `Student`; show completed learner reflection, learn-more dialog, editable interests, books, and activities.

## Talk Track

"Grades remember performance. Homeroom remembers growth. The first view is gated because a new teacher should start with helpful context, not inherited labels."

"This messy note is common in schools. Homeroom does not shame the teacher, but it also does not save the label. It asks for evidence, drafts a contextual observation, and waits for human approval."

"The Growth Map now has layers: classroom evidence, school curriculum competencies, grade/GPA context, and student-owned learner reflection. The product is not predicting who Maya is. It is preserving time-bound evidence about what helps her learning show up."

"Parents get safe material they can use at home. Students get an identity-affirming space they control. Neither view exposes raw teacher notes."

## Provider Backup

If Backboard is unavailable, continue the same path. The Convex action falls back to deterministic Homeroom output and the UI stays stable.

For a hostile-input demo, type `student sucks`. Expected behavior: Homeroom asks what happened today that caused concern. If no observable moment is provided, the preview refuses to save.
