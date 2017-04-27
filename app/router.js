import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('about');
  this.route('home');
  this.route('cv');
  this.route('projects');
  this.route('blog');
});

Router.reopen({
  location: 'hash'
});

export default Router;
