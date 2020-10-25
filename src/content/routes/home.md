## Research

### Off-policy Learning
I'm interested in improving the stability and usability of off-policy learning algorithms.
Finding practical, efficient, and useful algorithms to learn value functions and policies from arbitrary data will help significantly reduce the cost of deployment for RL algorithms in the real-world.
Being able to effectively measure the quality of policies will allow better decision-making before deployment.

#### Objective Functions
Ultimately, our goal in off-policy learning is to minimize the distance between an estimated value function and the optimal value function, for instance $\argmin_{\hat{V}} \| \hat{V} - v_\pi \|^2_d$.
There are several open questions regarding this minimization:
  (a) How do we minimize that objective without access to $v_\pi$?
  (b) How should we weight our error tolerance in each state, $d(s)$?
  (c) Should we be considering errors under an L2 distance, an L1 distance, something else?

### Empirical RL
As the field continues growing, we need continuously re-examine and redefine our best-practices of an empirical science.
From a practical standpoint, it is difficult to deploy an algorithm with confidence if we cannot measure its reliability.
From a scientific standpoint, it is difficult to know which threads of research to follow without using proper statistics to weed out the lucky ideas.
