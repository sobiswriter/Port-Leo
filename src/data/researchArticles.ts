export interface ResearchArticleDraft {
  introduction: string;
  pullQuote: string;
  sections: {heading: string; paragraphs: string[]}[];
}
// Owner-authorized editorial drafts. Keep these separate from source records
// so the owner can replace the prose without changing documented project facts.
export const RESEARCH_ARTICLES: Record<string, ResearchArticleDraft> = {
  'document-intelligence': {
    introduction: 'A document is useful only when someone can find their way through it. With LegalLM, I am interested in the space between extracting text and helping a reader understand what deserves their attention.',
    pullQuote: 'A useful answer should make the original document easier to read, not easier to ignore.',
    sections: [
      {heading: 'Reading is more than retrieval', paragraphs: [
        'A long document rarely presents its most important information in one convenient place. A definition can change the meaning of a later clause, while an exception can quietly reshape an otherwise straightforward paragraph. A short summary is useful, but it cannot carry every dependency on its own.',
        'This is the question behind my document intelligence work: how can an interface reduce the effort of reading while keeping the source close at hand? I want a reader to move from a broad overview to a specific passage without losing the context that makes that passage meaningful.'
      ]},
      {heading: 'Keep the evidence within reach', paragraphs: [
        'LegalLM brings document uploads, structured summaries, clause and risk analysis, and document questions into the same workflow. Its source citations and highlighting matter to me because they give the reader a route back to the material behind an answer.',
        'The design principle is simple: generated text should be a starting point for inspection. When a response sounds confident, the interface should still invite the reader to check what supports it and what the document actually says.'
      ]},
      {heading: 'The next question', paragraphs: [
        'I would like to explore clearer ways of showing missing context and competing interpretations. Instead of treating every question as something that needs an immediate answer, a system could sometimes help the reader identify the information they still need.',
        'For me, document intelligence is as much an interface problem as a model problem. The aim is a reading companion that helps someone navigate, compare, and question a document while leaving judgment with the reader.'
      ]}
    ]
  },
  'behavior-persona': {
    introduction: 'A conversational system can remember a sentence without understanding why it matters. My interest in personas and memory starts with that gap: the difference between storing context and creating a coherent interaction.',
    pullQuote: 'Memory is a design choice about what an interaction should carry forward.',
    sections: [
      {heading: 'What should a conversation remember?', paragraphs: [
        'A useful assistant needs some continuity, but retaining everything is not the same as remembering well. A passing remark, an ongoing goal, and a personal preference have different roles. Treating them alike can make an interaction feel cluttered rather than attentive.',
        'I am interested in how a system chooses what to bring back into a conversation. The question is not only how much context fits into a prompt, but whether the right context appears at the right moment.'
      ]},
      {heading: 'Personality needs boundaries', paragraphs: [
        'PersonaVerse and its newer evolution, BisosChamber, explore character creation and conversation. Niva approaches a related question through conversational context, summarized long-term memory, and proactive follow-ups.',
        'These projects lead me to think about persona as a set of consistent constraints rather than a collection of decorative traits. Tone can change with the conversation, but a character still needs a recognizable perspective. An assistant should also make its role clear rather than inviting the user to mistake generated behavior for a human relationship.'
      ]},
      {heading: 'Continuity without getting stuck', paragraphs: [
        'One direction I want to explore is memory that can be corrected and allowed to expire. A system should not turn an old preference into a permanent rule simply because it appeared in an earlier conversation.',
        'The most interesting version of this work is not a persona that always says the expected thing. It is an interaction that stays coherent while making room for change, disagreement, and a better understanding of the user’s current intent.'
      ]}
    ]
  },
  'generative-writing': {
    introduction: 'Writing tools usually promise to make a sentence better. I am more interested in what happens when they help a writer see the same thought from another angle without taking ownership of it.',
    pullQuote: 'The writer should recognize their own thought on the other side of the transformation.',
    sections: [
      {heading: 'An entry is more than its wording', paragraphs: [
        'A journal entry can be unfinished, contradictory, or deliberately vague. Those qualities can be part of its meaning. Polishing everything into a tidy paragraph risks removing the uncertainty that made the original worth writing.',
        'The Shadow Diary explores AI-assisted rewriting and reflection through psychological and Jungian themes. I see those themes as creative lenses for writing, not as a way to diagnose a person or assign a definitive meaning to their experiences.'
      ]},
      {heading: 'Offer a reading, not a verdict', paragraphs: [
        'My preferred interaction would place an interpretation beside the original entry, leaving both visible. The writer could keep a phrase, reject a framing, or use the response as a prompt for their own next paragraph.',
        'This makes the tool’s role smaller and more useful. It does not need to settle what an entry means. It needs to offer language that helps the writer notice something, while making it easy to disagree.'
      ]},
      {heading: 'Leave room for the human voice', paragraphs: [
        'A direction I would like to investigate is the difference between rewriting for clarity and rewriting for reflection. One aims to make a thought easier to communicate; the other may intentionally leave several meanings open.',
        'Both require restraint. The strongest writing companion, to me, is one that helps a person continue writing rather than making the generated version feel like the final word.'
      ]}
    ]
  },
  'creative-tooling': {
    introduction: 'Some of my projects begin with a small irritation. Others begin with a visual idea I cannot quite leave alone. Creative tooling is where those two instincts meet: making an interaction more expressive and making everyday work less repetitive.',
    pullQuote: 'A good tool earns its place by making the next action feel natural.',
    sections: [
      {heading: 'Start with the action', paragraphs: [
        'Before adding controls, I like to think about what someone wants to do next. A canvas invites movement. An overlay should be available without pulling someone out of their task. An automation script should reduce a repeated sequence to something easier to run and understand.',
        'These are different kinds of software, but they share a useful question: what is the smallest interaction that makes the idea feel complete? That question often tells me more than a long feature list.'
      ]},
      {heading: 'Three ways of exploring the same question', paragraphs: [
        'CosmicCanvas explores procedural color, motion, and responsive visual interaction through WebGL and the canvas. AI Overlay takes a more utilitarian direction, offering a lightweight layer for quick, context-aware assistance.',
        'PS Utility Suite works closer to the operating system, bringing scripting, scraping, scheduling, and routine utilities together. Across these projects, the medium changes but the interest remains: giving people a direct way to shape or simplify what is in front of them.'
      ]},
      {heading: 'Make the complexity earn its keep', paragraphs: [
        'Motion and automation can both become distracting when they are added without a purpose. I want a visual response to help explain an interaction, and I want a script to remain understandable when something goes wrong.',
        'My next questions are about restraint: which controls can disappear, which states need to be visible, and how a tool can remain approachable as it grows. An expressive interface still needs to respect the person trying to get something done.'
      ]}
    ]
  },
  'patent': {
    introduction: 'My CV records an October 2025 patent publication titled “Hybrid Endomythosis Detection through AI & ML.” This note is a starting point for writing about that work and the questions I want a fuller research account to answer.',
    pullQuote: 'An interesting approach deserves an equally careful account of what it can support.',
    sections: [
      {heading: 'From a title to a research story', paragraphs: [
        'A publication title gives a subject, but it does not tell the whole story. A useful account needs to explain the problem being addressed, the role of the proposed approach, and the assumptions that shape the work.',
        'For this article, I want that explanation to come before technical detail. A reader should understand the question before being asked to interpret a model, a pipeline, or a result.'
      ]},
      {heading: 'The evidence belongs in the foreground', paragraphs: [
        'A fuller version of this note should describe the data, evaluation setup, comparison methods, and limitations using the publication itself. Those details are not yet included in this portfolio, so I am leaving the technical claims and performance figures for a sourced revision.',
        'My interest here is in the standard of explanation: a proposed detection approach should be discussed alongside the conditions under which it was examined. A publication announcement alone cannot establish diagnostic performance or readiness for clinical use.'
      ]},
      {heading: 'What I want to explain next', paragraphs: [
        'When I revisit this draft, I want to add the research motivation, my contribution, and a clear walk through the published approach. Each part should connect back to evidence that a reader can inspect.',
        'Until then, this entry marks the publication recorded in my CV and the shape of the article I want to build around it. The aim is a careful research account, with room for the uncertainty and limits that make the work understandable.'
      ]}
    ]
  },
  'conferences': {
    introduction: 'My CV includes participation in ODDO Meet in Gandhinagar and the IMC Conference in Delhi. I want this space to become a notebook about the questions that connect industry conversations to the things I build.',
    pullQuote: 'The useful part of an event is the question that stays with you afterwards.',
    sections: [
      {heading: 'Looking beyond the demonstration', paragraphs: [
        'A technology demonstration can make an idea look inevitable. The more interesting questions often sit around it: who will use it, what needs to change for it to fit into their work, and what happens when the ideal conditions disappear?',
        'That is the perspective I want to bring to these notes. Rather than collecting a list of products or announcements, I would like to trace the practical problems behind them.'
      ]},
      {heading: 'Bring the question back to the work', paragraphs: [
        'My portfolio moves between AI systems, web applications, and tools for everyday operations. Industry events offer a useful setting for thinking about how those areas connect: an interface is part of a wider workflow, and a model is part of a product that someone has to maintain.',
        'For future entries, I want to connect specific sessions or conversations to a concrete design question. That could mean examining a simpler onboarding flow, a clearer explanation of an AI response, or the operational work that sits behind a polished screen.'
      ]},
      {heading: 'A notebook still to be filled', paragraphs: [
        'The current record confirms the events and locations, but it does not include session notes or named discussions. I will add those details when I can write from my own notes rather than reconstructing them from memory.',
        'For now, this draft sets the direction: small, specific observations that lead back to a building question. I would rather write one useful reflection than a broad recap that says very little.'
      ]}
    ]
  }
};
export function articleReadTime(article: ResearchArticleDraft) {
  const text = [article.introduction, article.pullQuote, ...article.sections.flatMap(section => [section.heading, ...section.paragraphs])].join(' ');
  return Math.max(1, Math.ceil(text.split(/\s+/).length / 200));
}
