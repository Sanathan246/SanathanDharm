---
name: agent-customization
description: "Create, update, review, or debug VS Code agent customization files in this workspace. Use for prompts, instructions, agents, hooks, and skills."
---

# Agent Customization Skill

This skill guides the creation and maintenance of VS Code agent customization files for this workspace.

## When to Use
- You need a workspace-specific `SKILL.md` or other agent customization asset.
- You want to decide whether to use `copilot-instructions.md`, `.instructions.md`, `.prompt.md`, `.agent.md`, or a `SKILL.md` workflow.
- You want to ensure the customization file has correct frontmatter, location, and trigger phrasing.

## Workflow

1. Confirm the outcome
   - What should the customization do?
   - Is it workspace-scoped or personal?
   - Is it a one-time task, a repeated workflow, or an onboarding guide?

2. Choose the right primitive
   - `copilot-instructions.md` / `AGENTS.md`: workspace-wide behavior and policies.
   - `*.instructions.md`: file-specific guidance via `applyTo` patterns.
   - `*.prompt.md`: single focused task with structured input.
   - `*.agent.md`: multi-stage workflow or isolated context with restricted tools.
   - `SKILL.md`: reusable workflow with explicit steps and completion checks.
   - Hooks: deterministic shell commands at lifecycle events.

3. Create the file in the correct location
   - Workspace skill path: `.github/skills/<name>/SKILL.md`
   - Workspace instructions path: `.github/` or `.github/instructions/`
   - User prompts path: `{{VSCODE_USER_PROMPTS_FOLDER}}/`

4. Validate the asset
   - Confirm YAML frontmatter is valid and quoted when needed.
   - Ensure `description` clearly states the trigger and use case.
   - Verify the file path matches the chosen primitive.
   - Check that the skill text is actionable and not overly broad.

## Decision Rules
- Use a skill when the task is multi-step or requires explicit guidance.
- Use a prompt when the task is a single focused action.
- Use instructions when the behavior should apply automatically in a matching file context.
- Use hooks when deterministic enforcement or pre/post tool actions are required.

## Quality Checklist
- [ ] `name` matches the skill purpose.
- [ ] `description` includes trigger phrases such as "agent customization", "create prompt", "fix instructions".
- [ ] Frontmatter YAML is valid.
- [ ] File location follows workspace conventions.
- [ ] Guidance is clear and suitable for reuse.

## Example Prompts
- "Create a workspace skill for adding new `.prompt.md` assets."
- "Help me choose between `copilot-instructions.md` and a skill for this repo."
- "Validate the frontmatter and path for a new agent customization file."
