var ko = require('knockout');

function getGift(id, name, description) {
  return { id: id, name: name, description: description, selected: ko.observable(false) };
}

function getUserGift(id, name) {
  return {
    id: id,
    name: name,
    selected: ko.observable(false),
    gifts: [
      getGift(1, 'Gift 1', 'Gift 1 Description'),
      getGift(2, 'Gift 2', 'Gift 2 Description'),
      getGift(3, 'Gift 3', 'Gift 3 Description')
    ]
  };
}

function getFriend(id, name) {
  return {
    id: id,
    name: name,
    birthday: '2016-01-01',
    selected: ko.observable(false),
    gifts: ko.observableArray()
  };
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
        getGift(1, 'Gift 1', 'Gift 1 Description'),
        getGift(2, 'Gift 2', 'Gift 2 Description'),
        getGift(3, 'Gift 3', 'Gift 3 Description')
      ]);
    });
  };

  self.getUserGiftsPromise = function() {
    return new Promise(function(resolve, reject) {
      resolve([
        getUserGift(1, 'Smara'),
        getUserGift(2, 'Matt'),
        getUserGift(3, 'Adam')
      ]);
    });
  };

  self.getFriendsPromise = function() {
    return new Promise(function(resolve, reject) {
      resolve([
        getFriend(1, 'Smara'),
        getFriend(2, 'Matt'),
        getFriend(3, 'Adam')
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
    /* NOTE: The real version of this service will have to deal with
             creating a new item if there's no ID and updating if the
             ID does exist. */
    if (!item.id) {
      // get a number between 100 and 1000 and assign as the ID
      item.id = Math.floor(Math.random() * 900) + 100;
    }

    return new Promise(function(resolve, reject) {
      resolve(item);
    });
  };

  self.deleteWishListItemPromise = function(item) {
    return new Promise(function(resolve, reject) {
      resolve();
    });
  };
}

module.exports = service;