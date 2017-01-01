var ko = require('knockout');

/*
  View model for managing the user's wish list.
  constArgs:
    service: Service layer to get information about the user's wish list from a backing store
*/
function GiftsViewModel(constArgs) {
  var self = this;
  self.service = constArgs.service;
  self.template = 'tmpl-gifts';
  
  self.gifts = ko.observableArray();

  /*
    Promise to initialize this instance of the GiftsViewModel.
    Returns this instance in resolve upon success.
  */
  self.initPromise = function() {
    return new Promise(function(resolve, reject){
      self.service.getGiftsPromise()
        .then(function(gifts){
          self.gifts(gifts);
          resolve(self);
        });
    });
  };
}

module.exports = GiftsViewModel;