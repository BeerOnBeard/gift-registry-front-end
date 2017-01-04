var ko = require('knockout');
var viewTypes = {
  wishList: 'wishList',
  friends: 'friends',
  gifts: 'gifts'
};

/*
  Controls what view the user see's at the highest level on the home page.
  constArgs:
    viewModelFactory: Factory used to create the Friends, Wish List and Gifts view models
 */
function HomeViewModel(constArgs) {
  var self = this;

  self.viewModelFactory = constArgs.viewModelFactory;

  self.currentViewType = ko.observable();
  self.currentView = ko.observable();

  self.selectWishList = function() {
    self.viewModelFactory.getWishListViewModelPromise()
      .then(function(vm) {
        self.currentView(vm);
        self.currentViewType(viewTypes.wishList);
      });
  };

  self.selectFriends = function() {
    self.viewModelFactory.getFriendsViewModelPromise()
      .then(function(vm){
        self.currentView(vm);
        self.currentViewType(viewTypes.friends);
      });
  };

  self.selectGifts = function() {
    self.viewModelFactory.getGiftsViewModelPromise()
      .then(function(vm){
        self.currentView(vm);
        self.currentViewType(viewTypes.gifts);
      });
  };

  self.isWishListSelected = ko.pureComputed(function() { return self.currentViewType() === viewTypes.wishList; });
  self.isFriendsSelected = ko.pureComputed(function() { return self.currentViewType() === viewTypes.friends; });
  self.isGiftsSelected = ko.pureComputed(function() { return self.currentViewType() === viewTypes.gifts; });
}

module.exports = HomeViewModel;