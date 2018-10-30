export const moodOptions = [
  {
    id: 'feelings',
    label: 'Feelings',
    options: [
      {
        id: 'feelings-plus-5',
        label:
          "Total confusion, no control, delusions, hallucionations, psychotic behaviour, I'm on top of world",
        scale: 5,
      },
      {
        id: 'feelings-plus-4',
        label: 'Inflated self-esteem, confusion',
        scale: 4,
      },
      {
        id: 'feelings-plus-3',
        label: 'Charming sense of losing control, making jokes, playful',
        scale: 3,
      },
      { id: 'feelings-plus-2', label: 'Happier then usual', scale: 2 },
      { id: 'feelings-plus-1', label: 'Optimistic', scale: 1 },
      {
        id: 'feelings-zero',
        label: 'Normal, balanced mood, optimistic',
        scale: 0,
      },
      { id: 'feelings-minus-1', label: 'Agitation', scale: -1 },
      {
        id: 'feelings-minus-2',
        label: 'Feelings of panic & anxiety, crying, feeling sad all the time',
        scale: -2,
      },
      {
        id: 'feelings-minus-3',
        label: 'Crying for no apparent reason',
        scale: -3,
      },
      {
        id: 'feelings-minus-4',
        label: "Need to be alone, I don't care",
        scale: -4,
      },
      {
        id: 'feelings-minus-5',
        label: "Feeling hopelesness, worthless, guilt, there is not way out, can't take it anymore",
        scale: -5,
      },
    ],
  },

  {
    id: 'activity',
    label: 'Activity/Energy',
    options: [
      {
        id: 'activity-plus-5',
        label: 'Reckless behaviour, exorbitant spending',
        scale: 5,
      },
      {
        id: 'activity-plus-4',
        label:
          'Sensless multitasking, singing, dancing, twitches, anxious activity, very little control over self',
        scale: 4,
      },
      {
        id: 'activity-plus-3',
        label: 'Very productive, almost counter productive, everything toomuch, twitches, restless',
        scale: 3,
      },
      {
        id: 'activity-plus-2',
        label: 'Very productive, sociable, noticeable increase in energy',
        scale: 2,
      },
      { id: 'activity-plus-1', label: 'Productive, sociable', scale: 1 },
      { id: 'activity-zero', label: 'Normal, balanced', scale: 0 },
      { id: 'activity-minus-1', label: 'Withdrawal from people', scale: -1 },
      {
        id: 'activity-minus-2',
        label: 'Further withdrawal, substance abuse, obsessing, tired',
        scale: -2,
      },
      {
        id: 'activity-minus-3',
        label: 'Exhausted, everything is so difficult',
        scale: -3,
      },
      {
        id: 'activity-minus-4',
        label: "No energy, struggling with most tasks, can't take care of self",
        scale: -4,
      },
      {
        id: 'activity-minus-5',
        label: "Can't do any tasks. complete shut down",
        scale: -5,
      },
    ],
  },

  {
    id: 'thinking',
    label: 'Thinking',
    options: [
      {
        id: 'thinking-plus-5',
        label: 'Total loss of judgement, incoherent',
        scale: 5,
      },
      {
        id: 'thinking-plus-4',
        label: 'Rapid thought & speech, grandiose thoughts about self',
        scale: 4,
      },
      {
        id: 'thinking-plus-3',
        label: 'Talkative, hyperfocused, bright colours',
        scale: 3,
      },
      { id: 'thinking-plus-2', label: 'More ideas that usual', scale: 2 },
      { id: 'thinking-plus-1', label: 'Articulate', scale: 1 },
      { id: 'thinking-zero', label: 'Normal', scale: 0 },
      { id: 'thinking-minus-1', label: 'Lesser concentration', scale: -1 },
      {
        id: 'thinking-minus-2',
        label: 'Forgetfull, confused, clumsy',
        scale: -2,
      },
      {
        id: 'thinking-minus-3',
        label: 'Difficult concentration, poor memory',
        scale: -3,
      },
      {
        id: 'thinking-minus-4',
        label: 'Slower thinking, inability to think',
        scale: -4,
      },
      {
        id: 'thinking-minus-5',
        label: 'Thoughts & research about suicide, possible attempts',
        scale: -5,
      },
    ],
  },

  {
    id: 'aches',
    label: 'Aches',
    options: [
      { id: 'aches-none', label: 'None' },
      { id: 'aches-pain-attack', label: 'Panic attack' },
      { id: 'aches-nausea', label: 'Nausea' },
      { id: 'aches-headache', label: 'Headache' },
      { id: 'aches-stomachache', label: 'Stomachache' },
      { id: 'aches-pain-all-over', label: 'Pain all over' },
      { id: 'aches-chest-pain', label: 'Chest pain' },
      { id: 'aches-ear-ringing', label: 'Ear ringing' },
      { id: 'aches-urinary-problems', label: 'Urinary problems' },
      { id: 'aches-other', label: 'Other' },
    ],
  },
];

export const sleepOptions = [
  { id: 'sleep-uniterrupted', label: 'Uniterrupted' },
  { id: 'sleep-frequent-waking', label: 'Frequent waking' },
  { id: 'sleep-oversleeping', label: 'Oversleeping' },
  { id: 'sleep-undersleeping', label: 'Undersleeping' },
  { id: 'sleep-who-needs-sleep', label: 'Who needs sleep?' },
  { id: 'sleep-insomnia', label: 'Insomnia' },
  { id: 'sleep-cant-fall-asleep', label: "Can't fall asleep" },
  { id: 'sleep-wake-up-early', label: 'Wake up early' },
];

export const selfCareOptions = [
  { id: 'self-care-physical-activity', label: 'Physical activity' },
  { id: 'self-care-relaxation', label: 'Relaxation' },
  { id: 'self-care-meditation', label: 'Meditation' },
  { id: 'self-care-talk-therapy', label: 'Talk therapy' },
];

export const dietOptions = [
  {
    id: 'eating',
    label: 'Eating',
    options: [
      { id: 'eating-poor-apetite', label: 'Poor apetite', scale: -1 },
      { id: 'eating-good-apetite', label: 'Good apetite', scale: 0 },
      { id: 'eating-super-apetite', label: 'Super apetite', scale: 1 },
    ],
  },
  {
    id: 'habits',
    label: 'Habits',
    options: [
      { id: 'habits-smoking', label: 'Smoking' },
      { id: 'habits-alchohol', label: 'Alchohol' },
      { id: 'habits-drugs', label: 'Drugs' },
    ],
  },
];
