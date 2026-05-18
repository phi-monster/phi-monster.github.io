# Φ(fight) Research

*Pronounced "fight."*

> *physical AI fight the monster.*

Source for the Φ collective's website, served at <https://φ.monster> via GitHub Pages. Built with [Hakyll](https://jaspervdj.be/hakyll/).

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

Φ studies what happens when physical AI systems are made to fight each other — the symbol is the brand, the pronunciation is the mission. We want both to be public.

When the work is good enough, the rest will explain itself.

---

## Status

Φ was founded in 2026 by Liu Yuchen and Han Muchen, undergraduates at the Hong Kong University of Science and Technology.

We are currently very small. The first papers under the Φ banner are in progress. We expect the first preprints to appear in late 2026 or early 2027.

If you are doing serious research in physical-world AI fighting, mechanistic interpretability of physical policies, or world models under contested dynamics — and you want to talk to people who care about the same things — reach out.

- Contact: <general@φ.monster>
- Website: <https://φ.monster>
- GitHub: <https://github.com/phi-monster>
