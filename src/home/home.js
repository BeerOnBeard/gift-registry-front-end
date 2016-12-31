var ko = require('knockout');
var Service = require('./service');
var ViewModelFactory = require('./viewModelFactory');
var HomeViewModel = require('./homeViewModel');

var service = new Service();
var viewModelFactory = new ViewModelFactory({ service: service });
var homeViewModel = new HomeViewModel({ viewModelFactory: viewModelFactory });

ko.applyBindings(homeViewModel);