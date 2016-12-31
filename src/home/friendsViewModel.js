var ko = require('knockout');

/*
  View model for managing friends.
  constArgs:
    service: Service layer to get information about the user's friends from a backing store
*/
function FriendsViewModel(constArgs) {
  var self = this;
  self.service = constArgs.service;

  self.testName = ko.observable('Friends');

  self.friends = ko.observableArray();

  /*
    Promise to initialize this instance of the FriendsViewModel.
    Returns this instance in resolve upon success.
  */
  self.initPromise = function() {
    return new Promise(function(resolve, reject){
      self.service.getFriendsPromise()
        .then(function(friends){
          self.friends(friends);
          resolve(self);
        });
    });
  }
}

module.exports = FriendsViewModel;