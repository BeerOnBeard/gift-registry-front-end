var HomeViewModel = require('./homeViewModel');

describe('HomeViewModel', function() {
  beforeEach(function() {
    var self = this;
    self.mockWishListViewModel = jasmine.createSpy('wishListViewModel');
    self.mockFriendsViewModel = jasmine.createSpy('friendsViewModel');
    self.mockGiftsViewModel = jasmine.createSpy('giftsViewModel');

    self.getWishListPromise = new Promise(function(resolve) { resolve(self.mockWishListViewModel); });
    self.getFriendsPromise = new Promise(function(resolve) { resolve(self.mockFriendsViewModel); });
    self.getGiftsPromise = new Promise(function(resolve) { resolve(self.mockGiftsViewModel); });

    self.factorySpy = jasmine.createSpyObj('factory', [ 'getWishListViewModelPromise', 'getFriendsViewModelPromise', 'getGiftsViewModelPromise' ]);
    self.factorySpy.getWishListViewModelPromise.and.returnValue(self.getWishListPromise);
    self.factorySpy.getFriendsViewModelPromise.and.returnValue(self.getFriendsPromise);
    self.factorySpy.getGiftsViewModelPromise.and.returnValue(self.getGiftsPromise);
    self.SUT = new HomeViewModel({ viewModelFactory: self.factorySpy });
  });

  describe('when wish list is selected', function() {
    beforeEach(function(done) {
      this.SUT.selectWishList();
      this.getWishListPromise.then(function() { done(); });
    });

    it('should set currentView to the correct view model', function() {
      expect(this.SUT.currentView()).toBe(this.mockWishListViewModel);
    });

    it('isWishListSelected should return true', function() {
      expect(this.SUT.isWishListSelected()).toBe(true);
    });

    it('others should not be selected', function() {
      expect(this.SUT.isFriendsSelected()).toBe(false);
      expect(this.SUT.isGiftsSelected()).toBe(false);
    });
  });

  describe('when friends is selected', function() {
    beforeEach(function(done) {
      this.SUT.selectFriends();
      this.getFriendsPromise.then(function() { done(); });
    });

    it('should set currentView to the correct view model', function() {
      expect(this.SUT.currentView()).toBe(this.mockFriendsViewModel);
    });

    it('isFriendsSelected should return true', function() {
      expect(this.SUT.isFriendsSelected()).toBe(true);
    });

    it('others should not be selected', function() {
      expect(this.SUT.isWishListSelected()).toBe(false);
      expect(this.SUT.isGiftsSelected()).toBe(false);
    });
  });

  describe('when gifts is selected', function() {
    beforeEach(function(done) {
      this.SUT.selectGifts();
      this.getGiftsPromise.then(function() { done(); });
    });

    it('should set currentView to the correct view model', function() {
      expect(this.SUT.currentView()).toBe(this.mockGiftsViewModel);
    });

    it('isGiftsSelected should return true', function() {
      expect(this.SUT.isGiftsSelected()).toBe(true);
    });

    it('others should not be selected', function() {
      expect(this.SUT.isWishListSelected()).toBe(false);
      expect(this.SUT.isFriendsSelected()).toBe(false);
    });
  });
});