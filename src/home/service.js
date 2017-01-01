var ko = require('knockout');

function getGift(id, name) {
  return { id: id, name: name };
}

function getFriend(name) {
  return { name: name };
}

function getWishListItem(id, name, description) {
  return {
    id: id,
    name: ko.observable(name),
    description: ko.observable(description),
    url: ko.observable('https://css-tricks.com/snippets/css/a-guide-to-flexbox/'),
    selected: ko.observable(false)
  };
}

function service() {
  var self = this;

  self.getGiftsPromise = function() {
    return new Promise(function(resolve, reject) {
      resolve([
        getGift(1, 'Gift 1'),
        getGift(2, 'Gift 2'),
        getGift(3, 'Gift 3')
      ]);
    });
  };

  self.getFriendsPromise = function() {
    return new Promise(function(resolve, reject) {
      resolve([
        getFriend('Smara'),
        getFriend('Matt'),
        getFriend('Adam')
      ]);
    });
  };

  self.getWishListPromise = function() {
    return new Promise(function(resolve, reject) {
      resolve([
        getWishListItem(1, 'Item 1', 'Item 1 Description'),
        getWishListItem(2, 'Item 2', 'Item 2 Description'),
        getWishListItem(3, 'Item 3', 'Item 3 Description'),
        getWishListItem(2, 'Item 4', 'Item 4 Description'),
        getWishListItem(2, 'Item 5', 'Item 5 Description'),
        getWishListItem(2, 'Item 6', 'Item 6 Description'),
        getWishListItem(2, 'Item 7', 'Item 7 Description'),
        getWishListItem(2, 'Item 8', 'Item 8 Description'),
        getWishListItem(2, 'Item 9', 'Item 9 Description')
      ]);
    });
  };

  self.saveWishListItemPromise = function(item) {
    return new Promise(function(resolve, reject) {
      resolve();
    });
  };
}

module.exports = service;