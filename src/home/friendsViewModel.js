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
  self.selectedGift = ko.observable();

  self.selectedFriend.subscribe(function(friend) {
    if (!friend) {
      return;
    }

    self.service.getGiftsPromise(friend)
      .then(function(gifts) {
        friend.gifts(gifts);
      });
  });

  self.selectFriend = function(friend) {
    if (self.selectedGift()) {
      self.selectedGift(undefined);
    }

    var currentFriendId;
    if (self.selectedFriend()) {
      currentFriendId = self.selectedFriend().id;
      self.selectedFriend().selected(false);
    }

    // If same friend was selected again, unselect friend and get out of here
    if (friend.id === currentFriendId) {
      self.selectedFriend(undefined);
      return;
    }

    friend.selected(true);
    self.selectedFriend(friend);
  };

  self.selectGift = function(gift) {
    var currentGiftId;
    if (self.selectedGift()) {
      currentGiftId = self.selectedGift().id;
      self.selectedGift().selected(false);
    }

    // If the same gift was selected again, unselect gift and get out of here
    if (gift.id === currentGiftId) {
      self.selectedGift(undefined);
      return;
    }

    gift.selected(true);
    self.selectedGift(gift);
  };

  self.unfollow = function(friend) {
    self.service.unfollowFriendPromise(friend)
      .then(function(){
        self.friends.remove(friend);
      });
  };

  self.registerForGift = function(gift) {
    if (!gift.canRegister()) {
      return;
    }

    self.service.registerForGiftPromise(gift)
      .then(function(updatedGift) {
        // TODO: Not sure this is the best idea. Maybe create a .clone() method on
        //       GiftViewModel that would accept gift and clone all the pure properties?
        gift.claimedBy(updatedGift.claimedBy());
      });
  };

  self.unregisterForGift = function(gift) {
    if (!gift.canUnregister) {
      return;
    }

    self.service.unregisterForGiftPromise(gift)
      .then(function(updatedGift) {
        // TODO: Not sure this is the best idea. Maybe create a .clone() method on
        //       GiftViewModel that would accept gift and clone all the pure properties?
        gift.claimedBy(updatedGift.claimedBy());
      });
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