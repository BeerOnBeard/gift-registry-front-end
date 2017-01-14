var ko = require('knockout');

/*
 * TODO: need to split this out to its own file
 * View model for a gift.
 * @param {object} constArgs Should contain the following:
 *        {string} userId Current user identifier
 *        {object} gift Pure JS object returned from the data store
 */
function GiftViewModel(constArgs) {
  var self = this;

  self.id = constArgs.gift.id;
  self.name = constArgs.gift.name;
  self.description = constArgs.gift.description;
  self.claimedBy = ko.observable(constArgs.gift.claimedBy);
  self.selected = ko.observable(false);
  self.canRegister = ko.pureComputed(function(){
    return self.claimedBy() === undefined;
  });
  self.canUnregister = ko.pureComputed(function(){
    return self.claimedBy() === constArgs.userId;
  });
}

function getGift(userId, id, name, description, claimedBy) {
  var expectedReturnFromApi = {
    id: id,
    name: name,
    description: description,
    claimedBy: claimedBy,
    _links: {
      self: 'https://some.uri.com/user/123/gifts/456'
    }
  };

  return new GiftViewModel({ userId: userId, gift: expectedReturnFromApi });
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

/*
 * Mock service layer for prototyping. Accepts all arguments that are going to be
 * necessary for the real service layer to run. We need the 'userId' for building
 * URIs to the service for registering for gifts. Example: /users/{otherUserId}/gifts/{giftId}
 * with a payload of { userId: '{GUID}' }.
 * @param {object} constArgs Should contain the following properties:
 *        {string} userId The user identifier of the currently logged in user.
 */
function service(constArgs) {
  var self = this;

  /*
   * Get the gifts for a friend.
   * @param {object} friend The friend to retrieve gifts for.
   */
  self.getGiftsPromise = function(friend) {
    return new Promise(function(resolve, reject) {
      resolve([
        getGift(constArgs.userId, 1, 'Gift 1', 'Gift 1 Description', undefined),
        getGift(constArgs.userId, 2, 'Gift 2', 'Gift 2 Description', '9284790f-eac7-45d5-b8d2-aab15b3da099'), // claimed by someone else
        getGift(constArgs.userId, 3, 'Gift 3', 'Gift 3 Description', constArgs.userId)
      ]);
    });
  };

  self.registerForGiftPromise = function(gift) {
    return new Promise(function(resolve, reject) {
      // Make like the API call was made and it returned an updated object with the claimedBy set to this user
      resolve(getGift(constArgs.userId, gift.id, gift.name, gift.description, constArgs.userId));
    });
  };

  self.unregisterForGiftPromise = function(gift) {
    return new Promise(function(resolve, reject) {
      // Make like the API call was made and it returned an updated object with the claimedBy set to undefined
      resolve(getGift(constArgs.userId, gift.id, gift.name, gift.description, undefined));
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

  self.unfollowFriendPromise = function(friend) {
    return new Promise(function(resolve, reject) {
      resolve();
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