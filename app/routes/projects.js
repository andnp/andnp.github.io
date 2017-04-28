import Ember from 'ember';

export default Ember.Route.extend({
    model() {
        return [
            {
                link: "https://github.com/andnp/andnp.github.io",
                name: "andnp.github.io",
                image: "github.png",
                description: "Personal webpage. The source code for this website is in the 'develop' branch of this repository. Written using Ember, Less, and Handlebars."
            },
            {
                link: "https://github.com/andnp/ResearchML",
                name: "ResearchML",
                image: "nnet.jpg",
                description: "Library of tools to accelerate machine learning research. Provides a consistent API for fast, reusable tools."
            },
            {
                link: "https://github.com/brain-life/o3d",
                name: "o3d",
                image: "brain.jpg",
                description: "Open Diffusion Derivatives Data. This is a Git Annex of a large open repository of brain diffusion data."
            },
            {
                link: "https://github.com/andnp/NodeTravianBot",
                name: "TravianBot",
                image: "knight.jpg",
                description: "A bot relying on machine learning to automate game play for the MMO game Travian. Used ML to predict market prices, quality of attacks, and budgeting of resources."
            }
        ]
    }
});
