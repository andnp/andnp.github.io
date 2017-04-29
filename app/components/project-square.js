import Ember from 'ember';

export default Ember.Component.extend({
    data: {},
    ypos: 0,
    scroll: Ember.computed('ypos', function() {
        return Ember.String.htmlSafe("top: " + this.get('ypos') + "px");
    }),
    onScroll: function(event) {
        // Your code
        let move = event.originalEvent.deltaY / 8;
        let y = this.get('ypos');
        if (y >= 0 && move > 0) {
            move = 0;
        } else if (y + move <= -100 && move < 0) {
            move = 0;
        }
        this.set('ypos', this.get('ypos') + move);
    },
    didInsertElement: function() {
        this.$().on('wheel',this.onScroll.bind(this));
    },

    willDestroyElement: function() {
        this.$().off('wheel');
    }
});
