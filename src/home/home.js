var jquery = require('jquery');
var ko = require('knockout');
var Service = require('./service');
var ViewModelFactory = require('./viewModelFactory');
var HomeViewModel = require('./homeViewModel');

var service = new Service();
var viewModelFactory = new ViewModelFactory({ service: service });
var homeViewModel = new HomeViewModel({ viewModelFactory: viewModelFactory });

// exposing ko for debug
window.ko = ko;

jquery.ajax({ url: '/home.template.js', dataType: 'html' })
.done(function(response){
  jquery('body').append(response);
  ko.applyBindings(homeViewModel);
});