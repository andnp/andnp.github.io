import Ember from 'ember';

export default Ember.Route.extend({
    model() {
        return [
            {
                name: "Landmine",
                tags: ["multitask", "classification"],
                info: [
                    {
                        type: "Features",
                        value: 9
                    },
                    {
                        type: "Tasks",
                        value: 19
                    },
                    {
                        type: "Samples",
                        value: 9674
                    }
                ],
                location: "https://github.com/andnp/ml_data/raw/master/landmine.tar.gz",
                url: "https://github.com/andnp/ml_data",
                description: "This is a multitask dataset attempting to classify the existance of landmines in a patch of territory. Each task attempts to detect landmines in a different territory, so we expect certain aspects to be different (desert vs. grassland) while other aspects will be similar (texture).",
                file_description: "The dataset is broken into separate files for each task. The first column in the csv gives the binary classification value (0 or 1). The remaining 9 columns give the values for each feature."
            }
        ]
    }
});
