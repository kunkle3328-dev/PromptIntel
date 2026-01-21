
import { Module, UserTier, PromptTemplate } from './types';

export const ANALYZER_FREE_LIMIT = 3;

const ALL_LESSONS: any[] = [
  {
    id: 'L1', moduleId: 'foundations', title: 'What Prompting Actually Is',
    description: 'Instructional design vs asking questions.',
    content: 'Most people think prompting is “asking AI a question.” That belief is the reason most AI outputs fail. Prompting is not a question. Prompting is instructional design. When you write a prompt, you are: Defining a role, Supplying context, Assigning a task, Enforcing constraints, Specifying an output format. AI does not “understand intent.” It executes instructions based on structure and clarity.',
    examples: { bad: 'What is a web app?', good: 'You are a Senior Full-Stack Engineer. Explain the technical architecture of a React application.', reasoning: 'Instructional design requires a role and clear task.' },
    tier: UserTier.FREE
  },
  {
    id: 'L2', moduleId: 'foundations', title: 'Why Most Prompts Fail',
    description: 'Vagueness, assumptions, and lack of constraints.',
    content: 'Most prompts fail for three reasons: 1. They are too vague. 2. They assume the AI knows what you want. 3. They lack constraints. AI fills in gaps randomly. That is not intelligence—that is guesswork.',
    examples: { bad: 'Build a note-taking app.', good: 'Design and generate a mobile-first SaaS web application for managing personal notes with authentication.', reasoning: 'Ambiguity forces random generation. Specificity forces execution.' },
    tier: UserTier.FREE
  },
  {
    id: 'L3', moduleId: 'foundations', title: 'The Role Instruction',
    description: 'Perspective defines output depth.',
    content: 'AI output changes dramatically based on role. Roles define: Perspective, Skill level, Output depth, Terminology used. No role = amateur output.',
    examples: { bad: 'Build a web app.', good: 'You are a senior full-stack engineer building a production-ready web application.', reasoning: 'Role sets the baseline quality level.' },
    tier: UserTier.FREE
  },
  {
    id: 'L4', moduleId: 'foundations', title: 'Task Clarity Defines Success',
    description: 'Defining scope to prevent hallucination.',
    content: 'AI cannot execute unclear objectives. Clear tasks: Define scope, Prevent hallucination, Improve execution accuracy.',
    examples: { bad: 'Help me build an app.', good: 'Generate a mobile-first SaaS web application for personal notes.', reasoning: 'Execution requires a defined objective.' },
    tier: UserTier.FREE
  },
  {
    id: 'L5', moduleId: 'foundations', title: 'Context Is Not Optional',
    description: 'Providing the environment for optimization.',
    content: 'Context tells AI where and why the task exists. Missing context forces AI to guess. Context includes: Platform, Audience, Environment, Use case.',
    examples: { bad: 'Write a landing page.', good: 'Write a landing page for CTOs of Series A startups using a B2B SaaS platform.', reasoning: 'Targeting depends on environment.' },
    tier: UserTier.FREE
  },
  {
    id: 'L6', moduleId: 'execution', title: 'Constraints Prevent Hallucinations',
    description: 'Enforcing what the AI must NOT do.',
    content: 'Constraints tell AI what it must not do. Professional prompts always include constraints.',
    examples: { bad: 'Make it fast.', good: 'Do not use external libraries. Only use native JavaScript APIs.', reasoning: 'Boundaries ensure safety.' },
    tier: UserTier.PRO
  },
  {
    id: 'L7', moduleId: 'execution', title: 'Output Format Controls Usability',
    description: 'Formatting for immediate integration.',
    content: 'Always define: Headings, Steps, Code blocks, File structure. Output format determines usability.',
    examples: { bad: 'Give me a list.', good: 'Output in JSON format with keys: title, description, code.', reasoning: 'Structure determines utility.' },
    tier: UserTier.PRO
  },
  {
    id: 'L8', moduleId: 'execution', title: 'Specificity Increases Precision',
    description: 'Removing ambiguity from logic.',
    content: 'Specificity is how you control depth. Specificity removes ambiguity. Compare: “Add authentication” vs “Implement email/password authentication using industry best practices.”',
    examples: { bad: 'Add auth.', good: 'Implement JWT authentication using httpOnly cookies.', reasoning: 'Technical precision ensures execution.' },
    tier: UserTier.PRO
  },
  {
    id: 'L9', moduleId: 'execution', title: 'Logical Structure Improves Flow',
    description: 'Using sections and steps for clarity.',
    content: 'AI follows structure. Use: Sections, Ordered steps, Clear segmentation. A wall of text produces a wall of confusion.',
    examples: { bad: 'A paragraph of instructions.', good: 'Use # ROLE, # TASK, and # RULES sections.', reasoning: 'Visual hierarchy helps AI process weights.' },
    tier: UserTier.PRO
  },
  {
    id: 'L10', moduleId: 'execution', title: 'Professional-Grade Benchmark',
    description: 'Synthesizing all structural elements.',
    content: 'A professional-grade prompt: Has a role, task, context, constraints, and output format. Is executable without guesswork.',
    examples: { bad: 'Amateur request.', good: 'Architected instruction set.', reasoning: 'Complete systems produce complete results.' },
    tier: UserTier.PRO
  },
  { id: 'L11', moduleId: 'advanced', title: 'Why AI Hallucinates', description: 'Hallucination is lack of constraint.', content: 'AI fills gaps when instructions are incomplete. Hallucination is not failure—it is lack of constraint.', examples: { bad: 'Guess features.', good: 'Only list features in the provided list.', reasoning: 'Limits prevent invention.' }, tier: UserTier.PRO },
  { id: 'L12', moduleId: 'advanced', title: 'Instruction Density', description: 'Structure over word count.', content: 'More words ≠ better prompts. Better structure = better output.', examples: { bad: 'Long rambling.', good: 'Concise structured steps.', reasoning: 'Efficiency reduces noise.' }, tier: UserTier.PRO },
  { id: 'L13', moduleId: 'advanced', title: 'Prompt Length vs Quality', description: 'Balancing detail and noise.', content: 'Long prompts fail if poorly structured. Short prompts fail if under-specified.', examples: { bad: 'Too short.', good: 'Optimized length.', reasoning: 'Balance is key.' }, tier: UserTier.PRO },
  { id: 'L14', moduleId: 'advanced', title: 'Few-Shot Prompting', description: 'Examples teach AI behavior.', content: 'Examples teach AI how to behave. Always provide 1-3 high-quality examples.', examples: { bad: 'Just task.', good: 'Task + Examples.', reasoning: 'Pattern matching works.' }, tier: UserTier.PRO },
  { id: 'L15', moduleId: 'advanced', title: 'Step-Based Execution', description: 'Incremental task processing.', content: 'Breaking tasks into steps improves reliability. Sequential logic reduces errors.', examples: { bad: 'Do all now.', good: 'Step 1, Step 2, Step 3.', reasoning: 'Thinking step-by-step increases logic.' }, tier: UserTier.PRO },
  { id: 'L16', moduleId: 'advanced', title: 'Enforcing Deterministic Output', description: 'Reducing randomness in responses.', content: 'Rules reduce randomness. Tell the AI what must remain consistent.', examples: { bad: 'Be creative.', good: 'Follow the schema exactly.', reasoning: 'Predictability is professional.' }, tier: UserTier.PRO },
  { id: 'L17', moduleId: 'advanced', title: 'Error-Resistant Prompts', description: 'Anticipating model failure.', content: 'Professional prompts anticipate failure. Tell the AI what to do if it cannot fulfill a part of the request.', examples: { bad: 'Just go.', good: 'If X fails, do Y.', reasoning: 'Resilience is production-ready.' }, tier: UserTier.PRO },
  { id: 'L18', moduleId: 'advanced', title: 'Tool-Aware Prompting', description: 'AI with search or code tools.', content: 'AI behaves differently when tools are involved. Define when and how tools should be used.', examples: { bad: 'Find stuff.', good: 'Use Search only for current data.', reasoning: 'Tool gating saves tokens.' }, tier: UserTier.PRO },
  { id: 'L19', moduleId: 'advanced', title: 'Prompt Chaining', description: 'Managing complex systems.', content: 'Complex systems require multiple prompts. Modular prompts are stable.', examples: { bad: 'Build whole app.', good: 'Chain: Schema -> UI.', reasoning: 'Modularity reduces drift.' }, tier: UserTier.PRO },
  { id: 'L20', moduleId: 'advanced', title: 'State Persistence', description: 'Maintaining consistency.', content: 'Teach AI what must remain consistent throughout the session.', examples: { bad: 'Forget past.', good: 'Retain role throughout.', reasoning: 'Consistency is intelligence.' }, tier: UserTier.PRO },
  { id: 'L21', moduleId: 'mastery', title: 'App vs Chat Prompts', description: 'Infrastructure vs Disposability.', content: 'Chat prompts are disposable. App prompts are infrastructure.', examples: { bad: 'Chatty UI.', good: 'Static API-like instruction.', reasoning: 'Apps need fixed behaviors.' }, tier: UserTier.PRO },
  { id: 'L22', moduleId: 'mastery', title: 'Preventing Feature Creep', description: 'Explicit exclusions.', content: 'Explicit exclusions matter. Clearly state what is OUT of scope.', examples: { bad: 'Open scope.', good: 'Exclusion: Database logic.', reasoning: 'Focus improves quality.' }, tier: UserTier.PRO },
  { id: 'L23', moduleId: 'mastery', title: 'Prompting for UX', description: 'Prompting for usability.', content: 'You can prompt for usability. Define contrast and spacing rules.', examples: { bad: 'Make UI.', good: 'Ensure WCAG compliance.', reasoning: 'Design is an instruction.' }, tier: UserTier.PRO },
  { id: 'L24', moduleId: 'mastery', title: 'Prompting for Scalability', description: 'Beyond the MVP.', content: 'Think beyond MVP. Prompt for code that handles edge cases.', examples: { bad: 'MVP hack.', good: 'Architect for growth.', reasoning: 'Planning is a prompt.' }, tier: UserTier.PRO },
  { id: 'L25', moduleId: 'mastery', title: 'Platform Constraints', description: 'Model-specific optimization.', content: 'Every AI has limits. Prompt according to the context window.', examples: { bad: 'Huge prompt.', good: 'Optimized chunking.', reasoning: 'Resource awareness.' }, tier: UserTier.PRO },
  { id: 'L26', moduleId: 'mastery', title: 'When Prompts Should Fail', description: 'Intentional failure paths.', content: 'Failure can be intentional. Prompt the AI to refuse impossible tasks.', examples: { bad: 'Answer all.', good: 'Refuse if input is null.', reasoning: 'Safety is structural.' }, tier: UserTier.PRO },
  { id: 'L27', moduleId: 'mastery', title: 'Prompt Versioning', description: 'Tracking logical changes.', content: 'Professional teams track changes. Version your prompts like code.', examples: { bad: 'Overwrite.', good: 'Prompt v1.2', reasoning: 'Audit trails matter.' }, tier: UserTier.PRO },
  { id: 'L28', moduleId: 'mastery', title: 'Prompt Auditing', description: 'Quality control.', content: 'Quality control is not optional. Use tools to audit prompts.', examples: { bad: 'Guess quality.', good: 'Use Scorecard.', reasoning: 'Standards are required.' }, tier: UserTier.PRO },
  { id: 'L29', moduleId: 'mastery', title: 'Prompts as Assets', description: 'Intellectual Property.', content: 'Prompts are IP. Treat high-performance instructions as business assets.', examples: { bad: 'Loose notes.', good: 'Instructional vault.', reasoning: 'Efficiency is profit.' }, tier: UserTier.PRO },
  { id: 'L30', moduleId: 'mastery', title: 'Engineering as a Skill', description: 'Discipline vs Hacking.', content: 'This is not a hack. It is a discipline. Engineering is the bridge.', examples: { bad: 'Random trying.', good: 'Structural engineering.', reasoning: 'Professionals use systems.' }, tier: UserTier.PRO }
];

export const MODULES: Module[] = [
  { id: 'foundations', title: 'Foundations', description: 'The mechanics of instructional design.', lessons: ALL_LESSONS.filter(l => l.moduleId === 'foundations') },
  { id: 'execution', title: 'Execution', description: 'Advanced patterns for production.', lessons: ALL_LESSONS.filter(l => l.moduleId === 'execution') },
  { id: 'advanced', title: 'Advanced', description: 'Complex logic and behavioral control.', lessons: ALL_LESSONS.filter(l => l.moduleId === 'advanced') },
  { id: 'mastery', title: 'Mastery', description: 'Treating prompts as professional IP.', lessons: ALL_LESSONS.filter(l => l.moduleId === 'mastery') }
];

export const TEMPLATES: PromptTemplate[] = [
  {
    id: 'app-builder', title: 'Full-Stack App Architect',
    description: 'Generate production-ready application specifications.',
    category: 'App Builder', tier: UserTier.PRO,
    content: `You are a Senior Full-Stack Engineer. Your task is to architect a production-ready application.
ROLE: Senior Technical Lead
OBJECTIVE: Generate a complete technical blueprint for [APP_NAME].
CONTEXT: [CONTEXT]
CONSTRAINTS: No placeholders. All code must be WCAG compliant.
OUTPUT: 1. Architecture 2. Schema 3. Logic 4. Setup.`
  },
  {
    id: 'debug-master', title: 'Senior Debugging Agent',
    description: 'Systematically identify and fix root causes.',
    category: 'Debugging', tier: UserTier.PRO,
    content: `You are a Senior Debugging Specialist.
TASK: Analyze the provided code for errors.
CONTEXT: Failing in production environment.
PROCESS: 1. Reproduce 2. Identify 3. Propose Fix 4. Optimize.`
  }
];
