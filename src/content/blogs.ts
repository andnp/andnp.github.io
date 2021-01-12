export const blogData = [
  {
    "key": "ignoring-double-sampling",
    "title": "Can we ignore the double-sampling issue in RL?",
    "previewText": "For anyone who has read the Sutton and Barto reinforcement learning textbook--specifically chapter 11--the problem of double sampling has come up and was neatly avoided by a simple trick using Gradient Temporal Difference learning methods.\nHowever, it may not be clear why the trick used by GTD methods manages to avoid double sampling, and worse, it seems that trick only works for the linear function approximation case.\nLikely, you've heard about the divergence issues with Q-learning and the deadly triad, but have happily applied Q-learning to your problem setting anyways because it works and is easy to extend to nonlinear function approximation (e.g. Neural Networks).",
    "date": "1/10/2021",
    "medium": ""
  },
  {
    "key": "comparing-tile-coders",
    "title": "Comparing Tile-coding Implementations",
    "previewText": "This post discusses a direct approach to implementing a tile-coding representation, comparing both the computational and learning performance to the popular Tiles3 implementation.\nI point out a small bug in Tiles3 and show how in a particular setting this bug can have a large impact on early learning results.",
    "date": "12/12/2020",
    "medium": ""
  },
  {
    "key": "bellman-consistency",
    "title": "Consistent Value Function Definitions",
    "previewText": "In this post, I will define the standard $\\gamma$-discounted value functions used in reinforcement learning.\nFrom these definitions, I will discuss two important emergent properties of value functions that prove the self-consistency of the definitions.\nI will build up these concepts mathematically, focusing on writing out every step in the derivations and discussing the implications of each step.\nThese equations are the foundation of many important mathematical proofs in RL and understanding them completely is important to building a theoretical understanding of RL.",
    "date": "10/12/2020",
    "medium": ""
  }
];
