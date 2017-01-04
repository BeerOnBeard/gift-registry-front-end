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
  
  self.users = ko.observableArray();
  self.selectedUser = ko.observable();
  self.selectedGift = ko.observable();

  self.selectUser = function(user) {
    if (self.selectedGift()) {
      self.selectedGift().selected(false);
      self.selectedGift(undefined);
    }

    var selectedUserId;
    if (self.selectedUser()) {
      selectedUserId = self.selectedUser().id;
      self.selectedUser().selected(false);
    }

    if (user.id === selectedUserId){
      self.selectedUser(undefined);
      return;
    }

    user.selected(true);
    self.selectedUser(user);
  };

  self.selectGift = function(gift) {
    var selectedGiftId;
    if (self.selectedGift()) {
      selectedGiftId = self.selectedGift().id;
      self.selectedGift().selected(false);
    }

    if (gift.id === selectedGiftId) {
      self.selectedGift(undefined);
      return;
    }

    gift.selected(true);
    self.selectedGift(gift);
  };

  /*
    Promise to initialize this instance of the GiftsViewModel.
    Returns this instance in resolve upon success.
  */
  self.initPromise = function() {
    return new Promise(function(resolve, reject){
      self.service.getUserGiftsPromise()
        .then(function(users){
          self.users(users);
          resolve(self);
        });
    });
  };
}

module.exports = GiftsViewModel;