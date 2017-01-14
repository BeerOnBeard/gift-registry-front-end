var jquery = require('jquery');
var ko = require('knockout');
var Service = require('./service');
var ViewModelFactory = require('./viewModelFactory');
var HomeViewModel = require('./homeViewModel');

// get user identifier from cookie dropped at login
var userId = '29a369d2-e5ab-4e06-8584-27c47faca4c7'; // NOTE: For testing purposes

var service = new Service({ userId: userId });
var viewModelFactory = new ViewModelFactory({ service: service });
var homeViewModel = new HomeViewModel({ viewModelFactory: viewModelFactory });

// exposing ko for debug
window.ko = ko;
ko.options.deferUpdates = true;

jquery.ajax({ url: '/home.template.js', dataType: 'html' })
.done(function(response){
  jquery('body').append(response);
  ko.applyBindings(homeViewModel);
});