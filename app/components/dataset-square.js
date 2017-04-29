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
        },
        clickDownload: function() {
            let data = this.get('data');
            window.location = data.location;
        },
        clickGithub: function() {
            let data = this.get('data');
            window.location = data.url;
        }
    }
});
