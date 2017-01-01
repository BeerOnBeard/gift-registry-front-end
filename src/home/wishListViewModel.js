var ko = require('knockout');

/*
  View model for managing the user's wish list.
  constArgs:
    service: Service layer to get information about the user's wish list from a backing store
*/
function WishListViewModel(constArgs) {
  var self = this;
  self.service = constArgs.service;
  self.template = 'tmpl-wish-list';

  self.items = ko.observableArray();
  self.selectedItem;

  self.select = function(item) {
    if (self.selectedItem) {
      self.selectedItem.selected(false);
    }

    item.selected(true);
    self.selectedItem = item;
  };

  self.go = function(item) {
    window.open(item.url);
  };

  /*
    Promise to initialize this instance of the WishListViewModel.
    Returns this instance in resolve upon success.
  */
  self.initPromise = function() {
    return new Promise(function(resolve, reject){
      self.service.getWishListPromise()
        .then(function(wishListItems){
          self.items(wishListItems);
          resolve(self);
        });
    });
  };
}

module.exports = WishListViewModel;