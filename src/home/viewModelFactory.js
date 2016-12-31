var FriendsViewModel = require('./friendsViewModel');
var WishListViewModel = require('./wishListViewModel');
var GiftsViewModel = require('./giftsViewModel');

/*
  Factory to create view models for the home page.
  constArgs:
    service: Service to get friends, gifts and wish list information from an backing store
*/
function ViewModelFactory(constArgs) {
  var self = this;
  self.service = constArgs.service;
  
  self.getFriendsViewModelPromise = function() {
    return new FriendsViewModel({ service: self.service }).initPromise();
  };

  self.getWishListViewModelPromise = function() {
    return new WishListViewModel({ service: self.service }).initPromise();
  };

  self.getGiftsViewModelPromise = function() {
    return new GiftsViewModel({ service: self.service }).initPromise();
  };
}

module.exports = ViewModelFactory;