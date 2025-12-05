import { Message, Sender, Topic, Dialogue } from './types';

export const INITIAL_MESSAGES: Message[] = [
  {
    id: 1,
    text: "Welcome! I'm Ziata, your Lifestyle and Wellness Assistant. My goal is to help you improve your life with tiny, sustainable changes.",
    sender: Sender.Ziata,
  },
  {
    id: 2,
    text: "Are you ready to talk to Ziata?",
    sender: Sender.Ziata,
  },
];

export const DIALOGUE_FLOW: Record<Topic, Dialogue> = {
  [Topic.Sleep]: {
    questions: [
      "How confident do you feel that you are getting enough quality sleep every night?",
      "Which element of your sleep hygiene routine is most challenging for you to maintain?",
      "How does a poor night’s sleep typically affect your mood the following day?",
      "How does it make you feel when you struggle to fall asleep?",
      "How do you usually feel when you begin your nighttime routine?",
      "Hypothetically, if a task required staying up an extra two hours, how much stress would that add to your evening?",
      "If a friend told you they consistently wake up feeling fully restored, what would be your primary internal reaction?",
      "What type of activities are you doing prior to bed?",
    ],
    responses: {
      HIGH: {
        BIOLOGY: "Your sleep pattern suggests that biological timing cues (our body’s way of communicating with us) are not aligning with your actual schedule. The body relies on stable anchors—light exposure in the morning, reduced stimulation at night, and consistent eating windows—to synchronize the circadian clock (internal clock everyone is hardwired with). To improve alignment, establish a fixed wake time and treat it as non-negotiable. Maintain a minimum 12-hour gap between first and last caffeine intake. Avoid heavy meals within two hours of bedtime. These adjustments strengthen homeostatic sleep pressure and create clearer internal signals for sleep onset.",
        ENVIRONMENT: "Your responses indicate environmental overstimulation (too many things going on around you at once) that prevents proper downregulation (reducing the frequency of overstimulation). Light exposure, device use, and ambient noise all prolong alertness by suppressing melatonin release and maintaining cognitive activation. Begin reducing environmental input 60–90 minutes before bed. Dim lights to the lowest practical level, eliminate screen-based activities, remove unnecessary auditory stimuli, and reduce room temperature by 2–3 degrees. These changes create a physiological context (an environment for your mind) where the body can transition into the pre-sleep state more reliably.",
        CONSISTENCY: "Your sleep challenges appear strongly linked to irregular timing and inconsistent pre-sleep patterns. Variability in bedtime and wake time disrupts circadian (internal body clock) predictability and weakens the sleep drive. Select a fixed wake time that you can realistically maintain every day, including weekends. Build a short, repeatable wind-down sequence lasting 10–20 minutes and perform it in the same order each night. This establishes a behavioral rhythm that cues the brain toward sleep readiness through repetition rather than effortful intention.",
        EMOTIONAL: "Your responses reflect heightened emotional activation around sleep, such as frustration, worry, or rumination. These states increase sympathetic nervous system activity, making sleep onset less accessible. Introduce a brief decompression (period of relaxation)  interval 20–30 minutes before your wind-down routine. Use this time to externalize concerns through writing or to reduce physiological tension through controlled breathing with extended exhales. The goal is not to “force relaxation” but to reduce cognitive load and physiological arousal before initiating the sleep-preparation sequence.",
        COGNITIVE: "Your sleep difficulties appear tied to a mental model that positions sleep as something that must be controlled or achieved through effort. This increases performance pressure, which undermines the natural sleep process. Reframe the objective from “getting to sleep” to “creating conditions where sleep can occur.” Avoid evaluating night-to-night outcomes, refrain from catastrophic interpretations of occasional disruptions, and limit reliance on sleep metrics. Reducing cognitive effort around sleep allows physiological mechanisms to operate without interference.",
      },
      MODERATE: {
        BIOLOGY: "Your sleep is generally functional, but biological timing cues (our body’s way of communicating with us) could be strengthened. Focus on stabilizing your wake time and increasing natural light exposure early in the day. Light acts as the strongest signal for circadian alignment  (internal clock everyone is hardwired with). Maintain consistent meal timing, especially breakfast, to reinforce metabolic rhythms that support predictable energy patterns and nighttime tiredness.",
        ENVIRONMENT: "Your environment supports sleep adequately but shows specific friction points (elements that make your life difficult). Identify the element that disrupts you most—light leakage, noise, temperature, or device proximity—and adjust that single variable first. Small, targeted environmental refinements often produce disproportional benefits because they reduce micro-arousals that fragment sleep quality.",
        CONSISTENCY: "Your routine is mostly reliable, but minor variability weakens the continuity of your sleep cycles. Narrow the range of your bedtime and wake time to within a 30–45 minute window. Retain a short pre-sleep ritual, performed consistently, to maintain predictability for your nervous system. Consistency reinforces both circadian (your internal body clock) timing and behavioral momentum.",
        EMOTIONAL: "You appear to experience occasional emotional activation that interferes with falling asleep. Introduce a brief transition activity that shifts your nervous system out of task mode. Light stretching, slow-paced reading, or controlled breathing with a steady rhythm can reduce internal tension. The goal is not to eliminate emotion but to reduce the carryover of daytime activation into the pre-sleep period.",
        COGNITIVE: "Your cognitive (mental) approach to sleep is generally functional but may include rigid expectations or over-attention to night-to-night variability. Treat fluctuations as normal rather than diagnostic. Adjust your mindset toward trend-based evaluation rather than judging isolated nights. This reduces unnecessary monitoring and supports a more stable psychological relationship with sleep.",
      },
      LOW: {
        BIOLOGY: "Your sleep system is well-aligned biologically. To maintain stability, preserve consistent morning light exposure and maintain regular eating windows. Small shifts in caffeine timing or late-day stimulation are the primary factors to monitor. Maintaining predictable circadian (internal body clock) anchors protects the biological foundation of your sleep.",
        ENVIRONMENT: "Your sleep environment is already structured effectively. Consider optimizing minor elements—such as blackout curtains, predictable temperature settings, or device distancing—to maintain the low-disruption context you have established. Environmental refinement at this stage is about sustaining equilibrium rather than solving problems.",
        CONSISTENCY: "Your routine demonstrates strong consistency. Continue holding a stable wake time, even if bedtime varies slightly. Small deviations will not disrupt a well-established circadian pattern as long as the morning anchor remains intact. Focus on preserving your current rhythm rather than expanding or complicating it.",
        EMOTIONAL: "Your emotional state appears well-regulated around sleep. If occasional pre-sleep activation arises, apply the same strategies you already use during the day—brief decompression (period of relaxation), light mental offloading, or steady breathing. These simple mechanisms maintain emotional steadiness without requiring new routines.",
        COGNITIVE: "Your cognitive stance (mindframe) toward sleep is functional and adaptive. Maintain your current perspective by avoiding excessive attention to metrics or isolated disruptions. A flexible, non-evaluative mindset supports ongoing stability and prevents unnecessary cognitive load.",
      },
    },
  },
  [Topic.Exercise]: {
    questions: [
        "How often do you find yourself too tired for physical activity you genuinely want to do?",
        "What is the single biggest mental hurdle that stops you from being as active as you’d like to be?",
        "When you feel physically tired, which emotion most often replaces your motivation to be active?",
        "Which type of exercise or movement do you believe would bring you the most joy and benefit if you did it more consistently?",
        "How interconnected do you believe exercise and energy levels are?",
        "How does a middle of the day “pick-me-up” (like a snack or stretch) make you feel?",
        "When you think about exercising or moving more, what’s the biggest thing that makes it feel difficult or discouraging?",
        "How do you feel about the concept of “movement breaks” throughout the day, compared to one structured exercise session?",
    ],
    responses: {
        HIGH: {
            BIOLOGY: "Your energy pattern suggests a biological mismatch between your recovery needs and your current activity level. Before increasing exercise volume, establish a reliable fatigue baseline (base level of energy). Track daily alertness in three segments—morning, afternoon, evening—to identify the most stable window. Begin with short, low-intensity sessions in that window. The objective is to stabilize circadian energy output, not to maximize exertion. Consistent biological pacing reduces energy volatility and makes movement more sustainable.",
            ENVIRONMENT: "Your responses indicate that environmental conditions are creating significant friction (elements that make things difficult). When the environment obstructs movement, initiation becomes disproportionately difficult. Reduce the physical distance between intention and action by preparing your setup in advance: place exercise clothing, water, or minimal equipment in a visible, accessible location. Identify one environmental trigger—such as morning light, work break, or end-of-day transition—and pair your movement session with that anchor. Lowering environmental friction increases follow-through.",
            CONSISTENCY: "Your movement pattern shows irregularity, which disrupts both energy stabilization and confidence. Begin with a micro-routine: a small, repeatable action performed at the same time daily, regardless of intensity. Examples include one minute of stretching, a short walk, or a mobility drill. This is not a full workout. The purpose is to generate behavioral continuity. Once consistency is established, gradually expand duration or intensity. Building reliability precedes building capacity.",
            EMOTIONAL: "Your relationship with movement appears influenced by emotional states (feelings) such as avoidance, dread, or frustration. These reactions increase psychological (mental) load and undermine initiation. Introduce a short pre-movement decompression  (period of relaxation) practice—such as controlled breathing—to reduce activation (the first steps) before starting. The goal is to shift the role of movement from an emotionally demanding task to a neutral, predictable element of your day.",
            COGNITIVE: "Your exercise challenges seem connected to a mental model that frames movement as an all-or-nothing task. This creates internal resistance and exaggerates the perceived cost of initiation. Reframe movement as an energy-stabilizing input rather than a performance requirement. Lower the threshold for what counts as success and focus on accumulating small, repeatable units rather than completing full sessions. This reduces cognitive friction and increases adherence.",
        },
        MODERATE: {
            BIOLOGY: "Your energy levels show periodic instability rather than chronic disruption. To increase reliability, align your movement with natural peaks in alertness (spikes in energy levels). Identify the consistently strongest 30–90 minute window in your day (the period where you have the most energy) and reserve it for light-to-moderate activity. This leverages your existing biological rhythms instead of working against them, improving both performance and adherence.",
            ENVIRONMENT: "Your environment supports activity but contains specific friction points (elements that make your life difficult). Modify one environmental factor that regularly interferes with movement—such as layout, clutter, equipment inaccessibility, or weather constraints. Small structural changes often produce measurable improvements because they reduce initiation effort at the moment you intend to start.",
            CONSISTENCY: "You demonstrate some movement regularity, but fluctuations limit long-term stability. Introduce a lightweight schedule—specific days and approximate times—to anchor (maintain) your routine. Avoid relying on motivation as the primary driver. Consistency emerges when the behavior becomes predictable rather than optional.",
            EMOTIONAL: "Your exercise routine occasionally competes with emotional fatigue or low motivation. Implement a brief transitional cue, such as two minutes of light movement, to shift your nervous system from passive to active. This reduces emotional inertia and allows the body to engage more smoothly in the planned activity.",
            COGNITIVE: "Your mindset around movement is generally functional but occasionally shaped by rigid expectations or self-judgment. Shift your evaluative framework from outcomes to process reliability. This reduces unnecessary cognitive load and helps maintain momentum during periods of lower motivation or fluctuating performance.",
        },
        LOW: {
            BIOLOGY: "Your energy regulation appears stable. Maintain biological alignment by preserving consistent movement timing and monitoring any changes in sleep, nutrition, or recovery that might influence performance. At this stage, refinements are subtle but help sustain long-term stability.",
            ENVIRONMENT: "Your environment effectively supports activity. To sustain this structure, periodically reassess equipment accessibility and physical layout to ensure that friction remains low. Environmental maintenance is a stability strategy (maintain comfortable levels) rather than an optimization requirement (way to get the best outcome).",
            CONSISTENCY: "Your exercise routine shows strong continuity. Preserve your consistency by maintaining predictable session timing and avoiding abrupt changes in volume or intensity. Stability is maintained through moderation rather than expansion.",
            EMOTIONAL: "You demonstrate strong emotional regulation (healthy management tools) around movement. If occasional resistance appears, apply the same strategies you already use—brief transitions, low-pressure initiation (low cost of entry), or reduced session intensity. These small adjustments help maintain emotional steadiness.",
            COGNITIVE: "Your mindset supports sustainable movement. Continue emphasizing process over performance and avoid unnecessary self-assessment. A flexible cognitive stance allows your routine to remain durable and low-friction over time.",
        },
    }
  },
  [Topic.Food]: {
    questions: [
        "If you had to describe the nutritional quality or density of your daily diet, what would it be?",
        "On an average day, how much of what you drink is plain water, compared to other drinks (e.g., coffee, soda, or juice)?",
        "What eating habits would you like to change?",
        "If you had to describe your overall relationship with food in one feeling, what would it be?",
        "When your eating habits deviate from your goals, how do you usually feel the next day?",
        "How do you typically feel when having your largest meal of the day?",
        "How important is the emotional experience (pleasure, taste, comfort, tradition) of what you drink, compared to its physical necessity for hydration?",
        "Imagine you found out your favorite food was secretly very healthy, how would that news affect your enjoyment of it?",
    ],
    responses: {
        HIGH: {
            BIOLOGY: "Your responses suggest that biological cues—hunger, satiety, and energy cycles—are not aligned with your current eating patterns. Begin by standardizing meal timing into three predictable anchors spaced roughly 4–5 hours apart, with an optional light snack between them if genuine hunger arises. Avoid long fasting windows during the day followed by heavy consumption at night. Stabilizing biological signals reduces both overeating and erratic hunger by giving your body consistent metabolic expectations.",
            ENVIRONMENT: "Your eating pattern appears heavily influenced by your immediate environment. High-visibility, high-reward foods create repeated cue-driven eating cycles. Modify one environmental element first: reduce visibility of trigger foods, reorganize the kitchen so nutrient-dense items are at eye level, and pre-portion convenience items when possible. Environment design functions as a primary lever because it changes exposure before self-control is required.",
            CONSISTENCY: "Your responses indicate irregular meal timing and sporadic adherence to dietary intentions. To stabilize intake, select one reliable daily anchor—breakfast window, midday meal, or evening meal—and make this the first point of consistency. Do not attempt to correct the full pattern at once. Once a single anchor is predictable, extend structure outward to the meals surrounding it. Consistency is built by sequencing changes, not by total dietary overhaul.",
            EMOTIONAL: "Your eating behavior appears closely tied to emotional activation such as stress, overwhelm, or fatigue. Before adjusting food choices, introduce a 2–5 minute pause when an emotionally driven urge arises. Use this moment to identify whether the impulse originates from hunger or emotion. If emotional, substitute a brief regulatory action—such as breathing or stepping away—before deciding whether to eat. This reduces reactive intake without requiring restriction.",
            COGNITIVE: "Your cognitive (mental) stance toward food appears shaped by rigid rules, moralized categories, or all-or-nothing interpretations. This pattern increases dietary volatility because small deviations are interpreted as failure. Shift to a proportional model: emphasize frequency rather than abstinence. Instead of eliminating foods, adjust how often they appear. This reduces cognitive strain and reduces the likelihood of rebound overeating.",
        },
        MODERATE: {
            BIOLOGY: "Your biological cues (our body’s way of communicating with us) appear mostly functional but occasionally misaligned. Strengthen predictability by maintaining consistent meal timing and ensuring that your first meal includes a balance of protein and slow-digesting carbohydrates. This stabilizes energy across the day and reduces late-day overeating driven by accumulated hunger.",
            ENVIRONMENT: "Your environment supports your eating patterns but includes specific high-friction contexts such as workplace snacks, evening grazing, or convenience foods. Introduce one structural adjustment: reorder food placement, pre-prep a preferred nutrient-dense option, or modify the route you take during high-risk times (periods when you’re vulnerable to bad eating habits). Small environmental modifications reduce the likelihood of impulsive choices.",
            CONSISTENCY: "You demonstrate some regularity in your eating pattern, but certain contexts—busy days, travel, fatigue—interrupt your routine. Establish a default meal or snack you can rely on during unstable conditions. The purpose is not nutritional perfection but maintaining rhythm when circumstances disrupt your typical plan. This may be difficult to accomplish, but it can pay dividends (large rewards).",
            EMOTIONAL: "You exhibit occasional emotional eating, often in predictable contexts. Introduce a simple interruption technique: before eating in an emotionally charged moment, conduct a short check-in to identify whether hunger or emotion is driving the urge. This brief pause improves choice quality without requiring restriction.",
            COGNITIVE: "Your mindset is generally steady but may include periodic self-judgment or overanalysis. Reduce cognitive load by shifting from strict, rule-based eating to flexible, principle-based eating. Rather than strict categories, apply a flexible structure—such as emphasizing whole foods most of the time and permitting enjoyable foods in proportion. This prevents unnecessary mental strain.",
        },
        LOW: {
            BIOLOGY: "Your biological signals are well-regulated. Maintain hunger and satiety alignment by continuing to space meals predictably and monitoring any changes in sleep, stress, or caffeine that might influence appetite. At this level, stability is maintained rather than actively revised.",
            ENVIRONMENT: "Your environment supports reliable dietary behavior. To sustain this advantage, periodically reassess visibility and accessibility of foods to ensure that environmental cues remain aligned with your intentions. Small adjustments maintain low-friction (little resistance) decision-making.",
            CONSISTENCY: "Your eating rhythm demonstrates strong consistency. Continue using predictable meal timing and avoid large deviations during periods of stress or schedule disruption. Stability is supported by maintaining your current structure rather than complicating it.",
            EMOTIONAL: "Your emotional relationship with food is steady. If occasional emotional cues arise, apply the same strategies you've already developed—brief reflection, slowing down the decision, or separating emotion from hunger. These techniques maintain regulation.",
            COGNITIVE: "Your mindset around eating is balanced. Maintain this by avoiding unnecessary dietary rules or moral judgments about food choices. A flexible, principle-based cognitive framework supports long-term stability with minimal friction.",
        },
    }
  },
  [Topic.Habit]: {
    questions: [
        "How confident are you that your current daily habits set you up for long-term well-being?",
        "What is the biggest barrier that makes it difficult for you to maintain sustained change?",
        "How do you typically accomplish the formation of a new habit?",
        "How confident are you in your ability to start a new positive habit, even if you are not sure you can sustain it?",
        "When developing a long-term goal, what feelings most often prevent you from advancing?",
        "How do you feel when you think about how much you use your phone?",
        "What is your primary strategy to protect your time for work?",
        "If someone you know is struggling with their well-being, what would be the first you recommend to them?",
    ],
    responses: {
        HIGH: {
            BIOLOGY: "Your habit formation challenges appear heavily influenced by biological factors such as fluctuating energy, irregular circadian patterns, or physical fatigue. Begin by identifying the 20–40 minute window of highest daily alertness—morning, midday, or evening—and assign your most important habit to that window. This improves follow-through by aligning the behavior with periods of highest physiological capability rather than relying on motivation.",
            ENVIRONMENT: "Your responses indicate that the physical environment contains substantial friction (elements that make your life difficult). When the environment is disorganized or lacks clear cues, initiation becomes cognitively demanding. Select one habit and create a dedicated physical location for it: a visible placement area, a simplified setup, or a clear trigger object. Environmental clarity reduces the need for internal negotiation and increases initiation reliability.",
            CONSISTENCY: "Your primary obstacle is irregular follow-through. Before expanding goals, reduce the habit to its most minimal executable form—what Fogg defines as the “tiny behavior.” Perform the smallest version of the habit at the same time daily, even if it feels insufficient. The objective is to establish identity-level consistency. Once behavioral continuity is secure, progression becomes easier and requires less effort.",
            EMOTIONAL: "Your habit attempts appear disrupted by emotional states such as dread, stress, or overload. These states increase activation thresholds (the amount of energy to start a task) and make initiation feel disproportionately difficult. Add a 60–90 second transition ritual before beginning the habit. This ritual should downregulate emotional intensity—not through relaxation but through predictable structure. Reducing emotional variability decreases resistance and stabilizes habit initiation.",
            COGNITIVE: "Your responses reflect cognitive and mindset barriers—perfectionism, unrealistic standards, or a belief that habits require strong motivation. These interpretations amplify the perceived cost of action. Shift to a capability-focused framework: the habit should be easy enough to complete even on low-motivation days. Replace outcome goals with behavioral minimums. This reframes the habit from a performance task to a repeatable action.",
        },
        MODERATE: {
            BIOLOGY: "Your biological rhythms are mostly supportive, but energy fluctuations occasionally disrupt your habits. Assign the habit to a consistent window that aligns with typical energy peaks. If energy dips interfere, reduce task intensity rather than skipping the behavior. Maintaining continuity during low-energy periods strengthens habit durability.",
            ENVIRONMENT: "Your environment supports your habits but includes specific friction points—clutter, accessibility issues, or inconsistent cues. Modify one environmental factor that interferes with initiation. Small structural changes often yield significant improvements because they reduce decision-making overhead at the moment of action.",
            CONSISTENCY: "You demonstrate periodic consistency, but certain days break the rhythm and weaken momentum. Introduce a fallback version of the habit for disrupted days—a brief action that maintains continuity. This prevents zero days, which are the primary disruptor of cumulative habit-building.",
            EMOTIONAL: "Your habits are occasionally affected by stress or emotional fatigue. Implement a brief emotional checkpoint before action: identify the dominant feeling, acknowledge it without analysis, and begin the simplified version of the habit. This reduces emotional inertia and maintains behavioral reliability without requiring emotional suppression.",
            COGNITIVE: "Your mindset is functional but includes occasional self-judgment or rigid expectations. Shift from evaluating performance to evaluating consistency. Track whether the action occurred, not how well it was executed. This stabilizes long-term identity formation by reinforcing repetition rather than demanding ideal execution.",
        },
        LOW: {
            BIOLOGY: "Your biological rhythms support habit execution effectively. Maintain this alignment by preserving consistent movement, sleep, and nutrition patterns. These biological anchors support predictable energy and sustained habit adherence.",
            ENVIRONMENT: "Your environment is well-structured for habit maintenance. Review your physical setup periodically to ensure cues remain visible, accessible, and aligned with your intentions. Environmental maintenance protects against gradual friction accumulation.",
            CONSISTENCY: "Your pattern shows strong consistency. Continue using predictable cue–routine pairings and avoid unnecessary expansion of your habit portfolio at once. Sustaining the existing cadence provides long-term stability.",
            EMOTIONAL: "Your habits are not significantly disrupted by emotional variability. If occasional emotional friction arises, apply the same strategies you use successfully elsewhere—brief transition steps or reduced-intensity versions. These techniques maintain reliability without requiring new systems.",
            COGNITIVE: "Your mindset supports durable habits. To reinforce this, avoid unnecessary increases in complexity or self-evaluation. A flexible, capability-focused framework prevents cognitive overload and preserves behavioral momentum.",
        },
    }
  }
};