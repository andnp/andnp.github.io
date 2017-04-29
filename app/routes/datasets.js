import Ember from 'ember';

export default Ember.Route.extend({
    model() {
        return [
            {
                name: "Landmine",
                tags: ["multitask", "regression"],
                info: [
                    {
                        type: "Features",
                        value: 10
                    },
                    {
                        type: "Tasks",
                        value: 20
                    }
                ],
                description: "This is a multitask dataset attempting to classify the existance of landmines in a patch of territory. Each task attempts to detect landmines in a different territory, so we expect certain aspects to be different (desert vs. grassland) while other aspects will be similar (texture)."
            }
        ]
    }
});
