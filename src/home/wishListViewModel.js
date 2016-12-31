var ko = require('knockout');

/*
  View model for managing the user's wish list.
  constArgs:
    service: Service layer to get information about the user's wish list from a backing store
*/
function WishListViewModel(constArgs) {
  var self = this;
  self.service = constArgs.service;

  self.testName = ko.observable('Wish List');

  self.wishList = ko.observableArray();

  /*
    Promise to initialize this instance of the WishListViewModel.
    Returns this instance in resolve upon success.
  */
  self.initPromise = function() {
    return new Promise(function(resolve, reject){
      self.service.getWishListPromise()
        .then(function(wishList){
          self.wishList(wishList);
          resolve(self);
        });
    });
  };
}

module.exports = WishListViewModel;