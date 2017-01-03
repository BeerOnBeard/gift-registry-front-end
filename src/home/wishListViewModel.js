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
  var self = this;

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
    self.template(templates.edit);
  };

  /* Will save the item that is currently being edited.
     It is expected that the edit function was called and
     the item to delete is in self.selectedItem(). */
  self.editSave = function() {
    self.service.saveWishListItemPromise(self.selectedItem())
      .then(function(item) {
        self.selectedItem().id = item.id;
        self.selectedItem().name(item.name()),
        self.selectedItem().description(item.description()),
        self.selectedItem().url(item.url());

        self.template(templates.list);
      });
  };

  /* Will delete the item that is currently being edited.
     It is expected that the edit function was called and
     the item to delete is in self.selectedItem(). */
  self.editDelete = function() {
    var itemToRemove = self.selectedItem();

    // item has never been saved
    if (!itemToRemove.id) {
      self.selectedItem(undefined);
      self.items.remove(itemToRemove);
      self.template(templates.list);
      return;
    }

    // item must be removed from the backing store
    self.service.deleteWishListItemPromise(itemToRemove)
      .then(function() {
        self.selectedItem(undefined);
        self.items.remove(itemToRemove);
        self.template(templates.list);
      });;
  };

  self.add = function() {
    var newItem = {
      name: ko.observable(),
      description: ko.observable(),
      url: ko.observable(),
      selected: ko.observable()
    };

    self.items.push(newItem);
    self.edit(newItem);
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