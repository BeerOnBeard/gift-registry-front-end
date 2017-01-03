var ko = require('knockout');

/*
  View model for managing friends.
  constArgs:
    service: Service layer to get information about the user's friends from a backing store
*/
function FriendsViewModel(constArgs) {
  var self = this;
  self.service = constArgs.service;
  self.template = 'tmpl-friends';

  self.friends = ko.observableArray();
  self.selectedFriend = ko.observable();
  self.selectedFriend.subscribe(function(friend) {
    self.service.getGiftsPromise(friend)
      .then(function(gifts) {
        friend.gifts(gifts);
      });
  });

  self.selectedGift = ko.observable();

  self.selectFriend = function(friend) {
    if (self.selectedGift()) {
      self.selectedGift(undefined);
    }

    if (self.selectedFriend()) {
      self.selectedFriend().gifts.removeAll();
      self.selectedFriend().selected(false);
    }

    friend.selected(true);
    self.selectedFriend(friend);
  };

  self.selectGift = function(gift) {
    if (self.selectedGift()) {
      self.selectedGift().selected(false);
    }

    gift.selected(true)
    self.selectedGift(gift);
  };

  /*
    Promise to initialize this instance of the FriendsViewModel.
    Returns this instance in resolve upon success.
  */
  self.initPromise = function() {
    return new Promise(function(resolve, reject) {
      self.service.getFriendsPromise()
        .then(function(friends){
          self.friends(friends);
          resolve(self);
        });
    });
  };
}

module.exports = FriendsViewModel;