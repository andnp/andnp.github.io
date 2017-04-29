import Ember from 'ember';

export default Ember.Component.extend({
    show: false,
    actions: {
        closeWindow: function() {
            this.toggleProperty('show');
        }
    }
});
