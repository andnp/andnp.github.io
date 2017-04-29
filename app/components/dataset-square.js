import Ember from 'ember';

export default Ember.Component.extend({
    data: {},
    modalVisible: false,
    actions: {
        openModal: function() {
            this.toggleProperty('modalVisible');
        },
        selectTag: function() {
            return false;
        }
    }
});
