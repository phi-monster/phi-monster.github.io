# Φ

*Pronounced "fight."*

---

## What this is

Φ is an independent research collective for physical-world AI fighting.

We study how physical-world AI systems — vision-language-action models, world models, and whatever architectural categories come next — learn, fail, and adapt when made to fight other physical-world AI systems. We work mostly in simulation, occasionally on hardware, and we publish openly.

We are not a company. We are not a lab in any institution. We are a small group of independent researchers who think the most interesting unsolved problems in physical AI live at the intersection of:

- multi-agent reinforcement learning
- vision-language-action models and world models
- mechanistic interpretability
- contact-rich physical dynamics
- adversarial self-play

We work on these problems because we think they are foundational, beautiful, and currently neglected.

---

## Why Φ exists

The mainstream of physical AI research today optimizes single agents to do useful things in cooperative or static environments. Pick up the cube. Walk on the terrain. Follow the instruction. Don't fall.

This is not the regime in which physical intelligence will actually have to operate. Real environments contain other agents. Other agents will sometimes fight you. The hardest, most informative tests of a physical AI system are not how well it performs alone, but how it behaves when another physical AI is actively trying to defeat it.

Physical-world AI fighting is the regime where:

- world models break in the most interesting ways
- self-play produces the most surprising emergent behaviors
- VLA systems reveal their hidden vulnerabilities
- interpretability has the most leverage, because the failures are diagnostic
- the most realistic curricula for general physical intelligence will eventually come from

We think this regime is the next major frontier in physical AI, and we think it is currently understudied because it sits awkwardly between the multi-agent RL community (which mostly works in toy domains), the embodied AI community (which mostly works on single agents), and the interpretability community (which mostly works on language models).

Φ exists to occupy that intersection seriously.

---

## Long horizon

Φ is built for a ten-year arc.

We expect the broader physical AI ecosystem to mature substantially in that window — humanoid hardware, foundation models for control, large-scale simulation, and open robotics communities will all evolve faster than research conventions can keep up.

We are positioning Φ to be the research substrate that this ecosystem can build on when it eventually needs to take adversarial multi-agent embodied intelligence seriously. That means publishing foundational work now, building open benchmarks and tools, growing a community of contributors who care, and resisting the pressure to optimize for short-term hype.

Whether or not any specific application of this research succeeds in ten years, the science is worth doing.

---

## What we work on

Concrete research directions that are active or planned:

**Adversarial robustness of VLA and world models.** What happens to current vision-language-action systems when the perturbation isn't a static patch but another learning agent in the same physical environment? Where in the latent representation does the failure live? Can it be repaired without retraining?

**World models under adversarial dynamics.** Standard world models assume Markovian environments or cooperative agents. What is the right architecture for a world model whose predictions must remain useful when an opponent is actively shaping the dynamics?

**Mechanistic interpretability of self-play policies.** Self-play training produces well-known degenerate solutions and hidden exploits. Where in the policy network do these vulnerabilities live, what circuits drive them, and can they be detected during training before they become entrenched?

**Energy-bounded adversarial games.** When agents have hard physical resource constraints (torque budget, battery, episode length), what kind of strategic behavior emerges from self-play? We hypothesize that meaningful constraints produce meaningfully more interesting emergent strategies than unbounded settings.

**Sample-efficient self-play.** Population-based training and league play are compute-heavy. We are interested in algorithmic alternatives that achieve robustness against a wide opponent distribution without the compute footprint.

**Cross-embodiment adversarial generalization.** A policy trained against one body morphology often fails dramatically against another. We want to characterize this failure systematically and propose evaluation protocols.

This list will grow. Members of the collective work on what they find interesting, with the constraint that the work fits the collective's broader research character.

---

## How we work

Φ is part-time and distributed. Members contribute on their own schedule, with their own resources, on questions they actually care about.

We do not have employees. We do not pay for research. We do not own any member's work.

What we offer is:

- a coherent research community with shared taste
- collaborators who think the same problems are interesting
- visibility for individual work that fits the collective's themes
- shared infrastructure (benchmarks, simulation environments, tooling) over time
- a long-term home for a research direction that doesn't fit existing labs cleanly

What we ask is:

- intellectual seriousness
- openness — code, data, and findings shared by default
- respect for collaborators' time and credit
- patience — Φ is a ten-year project, not a sprint

---

## What we publish

All Φ-affiliated research is published openly, with code and reproducible experiments, on arXiv and at appropriate venues (ICLR, NeurIPS, ICML, CoRL, RSS, and their workshops).

Members may publish under their own names with Φ acknowledged as an affiliation, or they may publish under Φ collective authorship, depending on the work. We don't have rigid rules.

We do not publish PR. We do not publish demos that don't have papers behind them. We do not chase trends. We publish things we would still respect five years from now.

---

## What we are not

We are not a startup chasing equity investment. We accept research grants and non-dilutive funding when it advances the science, but we do not exist to grow valuation.

We are not a startup with a product roadmap.

We are not a graduate program or a substitute for one.

We are not a credential. Joining Φ does not make anyone a Φ researcher; doing Φ-quality research does.

We are not a brand to be associated with for status. People who try to use Φ this way will find it has no status to give them.

We are not a robotics fighting league. The fighting we care about is what happens *inside* the AI — the representations, the world models, the failure modes, the strategic emergence — when one physical-world AI is set against another. Robotics fighting leagues are about which body wins. We are about what the intelligence reveals about itself when it has to fight. Other people run leagues; some of them well, some less so. We are interested in the underlying science, not in the spectacle.

---

## A note on the name

The symbol is Φ. We pronounce it "fight."

The standard pronunciation of Φ is "fee" or "fai." Ours is deliberate. Φ studies what happens when physical AI systems are made to fight each other — the symbol is the brand, the pronunciation is the mission. We want both to be public.

When the work is good enough, the rest will explain itself.

---

## Status

Φ was founded in 2026 by Liu Yuchen and Han Muchen, undergraduates at the Hong Kong University of Science and Technology.

We are currently very small. The first few papers under the Φ banner are in progress. We expect the first arXiv preprints to appear in late 2026 or early 2027.

If you are doing serious research in physical-world AI fighting, mechanistic interpretability of physical policies, or world models under contested dynamics — and you want to talk to people who care about the same things — reach out.

[contact: TODO]
[website: <https://φ.monster>]
[github: <https://github.com/phi-monster>]

---

## Resources

We pursue non-dilutive funding only — research grants, compute credits, fellowships. No VC, no equity dilution. Resources are organized by gating prerequisite.

### Tier 0 — no entity, no papers required (apply now)

| Program | Value | Cadence | Status |
|---|---|---|---|
| TPU Research Cloud | Free TPU (variable quota, renewable) | Rolling | not applied |
| Anthropic AI for Science | $20K API / 6 months | Rolling | not applied |
| Anthropic External Researcher Access | $1K API / 12 months | Quarterly review | not applied |
| OpenAI Researcher Access | $1K API | Quarterly (Mar/Jun/Sep/Dec) | not applied |
| Lambda Research Grant | $5K cloud + 50% academic discount | Rolling | not applied |
| Hugging Face ZeroGPU + Community Grants | Free shared H200 time-slice | Per-Space | not applied |
| Manifund regrants | $5K – $50K cash | Rolling, days-to-decision | not applied |
| Emergent Ventures | $1K – $50K cash, all ages, all countries | Rolling, 2–3 wk decision | not applied |

### Tier 1 — research statement / CV + early publication evidence

| Program | Value | Cadence | Status |
|---|---|---|---|
| Cooperative AI Foundation Research Grants | up to $40K/yr (verify exact cap) | Annual, ~Nov deadline | not applied — best topic fit |
| Open Phil Career Development & Transition Funding | up to ~$120K | Rolling cutoffs | not applied |
| Long-Term Future Fund (LTFF) | $5K – $200K (median ~$25K) | Rolling | not applied |
| AI Risk Mitigation Fund (ARM) | larger than LTFF; ~$20M / 5yr pool | Rolling | not applied |
| Foresight Institute AI Safety Nodes | $10K – $100K + SF/Berlin space | Monthly cutoffs | not applied |
| Survival and Flourishing Fund | varies | Annual + rolling speculation | not applied |
| AI Grant (open-source track at aigrant.org) | $5K – $50K | Rolling | not applied |

### Tier 2 — Wyoming LLC + website required

| Program | Value | Notes | Status |
|---|---|---|---|
| NVIDIA Inception | base DGX Cloud credits + Activate Provider gateway | LLC + website + ≥1 dev; HK chip-shipping blocked, cloud only | not applied |
| AWS Activate Founders | $1K | Self-serve | not applied |
| AWS Activate Portfolio (via Inception) | $25K | Unlocked by Inception membership | not applied |
| Microsoft Founders Hub Tier 2 | $5K Azure | Business validation, 1–2 wk | not applied |
| Google for Startups Cloud Start | $2K + TPU pricing | Scale tier needs partner | not applied |

### Tier 3 — HK Limited required (for TSSSU and HK schemes)

| Program | Value | Notes | Status |
|---|---|---|---|
| TSSSU (HKUST allocation) | up to HKD 4.5M / ~$580K over 3 years | HK Ltd ≤2yr, HKUST persons >50%, R&D | not applied |
| HKSTP Incu-Tech | HKD 1.29M + lab space | Rolling | not applied |
| Cyberport CCMF | HKD 100K pre-incubation | Three rounds/year | not applied |
| HKAI Lab Acceleration | $100K seed + Alibaba Cloud $10K + GPU | Bi-annual | not applied |

### Tier 4 — top-tier publication required

| Program | Value | Notes | Status |
|---|---|---|---|
| Anthropic Fellows | ~$3.85K/wk × 4mo + compute + Anthropic mentor | Bi-annual cohorts | not applied |
| MATS (Berkeley) | $15K stipend + $12K compute + housing | Bi-annual; Winter 2026/27 next | not applied |
| Constellation Astra Fellowship | stipend + funding, Berkeley onsite | Annual | not applied |
| OpenAI Safety Fellowship | first cohort 2026 | Sept 2026 – Feb 2027 | not applied |
| ARIA UK Scaling Trust | £100K – £3M | Call-dependent | not applied |
| Alignment Project (UK AISI) | varies | Call-dependent | not applied |

### Targeted run-rate (cumulative, executed)

| Year | Cash | Compute | Source mix |
|---|---|---|---|
| Y1 (2026–27) | $30K – $50K | $25K + free TPU/H200 | Tier 0 + Manifund + Emergent Ventures |
| Y2 (2027–28) | $80K – $200K | $35K | Tier 0 renew + Tier 1 + Tier 2 + TSSSU Y1 |
| Y3 (2028–29) | $200K – $300K | $30K | TSSSU Y2 + Tier 1 renew + Tier 4 |
| Y4 (2029–30, NA transition) | $200K – $400K | $50K+ | TSSSU Y3 tail + US programs + Tier 4 renew |

---

## Stages

**Current: Stage 0.**

### Stage 0 — May 2026 (this week)
- Tier 0 eight applications submitted
- Domain registered + Google Workspace setup
- Founders' IP Assignment Agreement drafted

### Stage 1 — May 2026 Week 2–3
- Wyoming LLC registered (Doola or firstbase.io)
- EIN application submitted
- Operating Agreement signed (50/50)
- IP Assignment Agreement signed
- Mercury bank account application
- Website live
- NVIDIA Inception application submitted

### Stage 2 — June – August 2026
- Research execution
- ICLR 2027 paper drafting (×2)
- AWS Activate / Microsoft Founders Hub / Google Startups applications
- @phi.[domain] used for all Φ-affiliated submissions going forward

### Stage 3 — September 2026
- ICLR 2027 submission ×2 (Φ-only affiliation, @phi email)
- NeurIPS 2026 results returned
- Cooperative AI Foundation Fall cycle proposal drafting

### Stage 4 — October – December 2026
- Tier 1 grant applications: LTFF, ARM Fund, Cooperative AI Foundation, Open Phil CDTF, Foresight, SFF
- MATS Winter 2026/27 application
- ICML 2027 paper drafting

### Stage 5 — January – February 2027
- ICLR 2027 decisions
- ICML 2027 submission
- Tier 4 fellowship applications (with ICLR results as evidence)
- NVIDIA Inception traction-based upgrade attempt
- HK Limited registration (for TSSSU Spring 2027 cycle)

### Stage 6 — March – May 2027
- Tier 4 fellowship decisions
- TSSSU Spring 2027 cycle application via HKUST allocation
- Visa pathway initiated if US fellowship accepts
- NeurIPS 2027 submission

### Stage 7 — Q3 – Q4 2027
- TSSSU decision; if accepted, Y1 disbursement begins ~Sept 2027
- HKAI Lab / HKSTP / Cyberport applications if relevant
- Continuous publication output

### Stage 8 — 2028 – 2029
- TSSSU Y1 → Y2 disbursement
- Sustained 10+ top-conference submissions per year
- US presence ramping (alternating HK / Bay Area)

### Stage 9 — Q1 2030 (departure from HK)
- HK Ltd wind down or transition
- Wyoming LLC becomes primary operational entity
- TSSSU Y3 disbursement preserved by maintaining HK presence as needed

---

## Open decisions

Strategic-level only. Operational stack tracked separately in `INFRA.md`.

- [x] Pursue HK Limited / TSSSU: yes, given 36-month HK timeline; **timing deferred to post-ICLR 2027 decision** (Jan 2027). If ICLR accepts → register Feb 2027 for TSSSU Spring cycle. If rejects → next chance Spring 2028.
- [x] Wyoming LLC: registering early (Week 2)
- [x] Founder named: Liu Yuchen
- [x] IP basis: Φ work uses zero HKUST resources; full IP ownership by Φ
- [x] Affiliation convention for ICLR 2027 onward: Φ-only, Φ-domain email
- [x] **Co-founders: Liu Yuchen (80%) + Han Muchen (20%)**
