function getGift(id, name) {
  return { id: id, name: name };
}

function getFriend(name) {
  return { name: name };
}

function getWishListItem(id, name) {
  return { id: id, name: name };
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
        getWishListItem(1, 'Item 1'),
        getWishListItem(2, 'Item 2'),
        getWishListItem(3, 'Item 3')
      ]);
    });
  };
}

module.exports = service;