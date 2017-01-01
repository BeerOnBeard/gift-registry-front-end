var ko = require('knockout');
var $ = require('jquery');

var templates = {
  list: 'tmpl-wish-list',
  edit: 'tmpl-wish-list-item-edit'
};

/*
  View model for managing the user's wish list.
  constArgs:
    service: Service layer to get information about the user's wish list from a backing store
*/
function WishListViewModel(constArgs) {
  var self = this,
      selectedItemBeforeEdit; // when editing, this will hold the original state of the item if the user cancels

  self.service = constArgs.service;
  self.template = ko.observable(templates.list);

  self.items = ko.observableArray();
  self.selectedItem = ko.observable();

  self.select = function(item) {
    if (self.selectedItem()) {
      self.selectedItem().selected(false);
    }

    item.selected(true);
    self.selectedItem(item);
  };

  self.go = function(item) {
    window.open(item.url());
  };

  self.edit = function(item) {
    self.selectedItem(item);
    selectedItemBeforeEdit = {
      name: item.name(),
      description: item.description(),
      url: item.url()
    };
    
    self.template(templates.edit);
  };

  self.editSave = function() {
    self.service.saveWishListItemPromise(self.selectedItem())
      .then(function() {
        self.template(templates.list);
      });
  };

  self.editCancel = function() {
    self.selectedItem().name(selectedItemBeforeEdit.name);
    self.selectedItem().description(selectedItemBeforeEdit.description);
    self.selectedItem().url(selectedItemBeforeEdit.url);

    self.template(templates.list);
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