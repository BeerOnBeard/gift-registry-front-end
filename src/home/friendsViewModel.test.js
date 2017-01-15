var FriendsViewModel = require('./friendsViewModel');
var ko = require('knockout');

describe('FriendsViewModel', function(){
  beforeEach(function(){
    this.mockService = jasmine.createSpyObj(
      'service',
      [ 'getGiftsPromise', 'unfollowFriendPromise', 'registerForGiftPromise', 'unregisterForGiftPromise' ]
    );

    this.getGiftsPromise = new Promise(function(resolve){ resolve([{ id: 1 }]); });
    this.unfollowFriendPromise = new Promise(function(resolve){ resolve(); });
    this.registerForGiftPromise = new Promise(function(resolve){ resolve({ claimedBy: function(){ return 'expectedClaimer'; }}); });
    this.unregisterForGiftPromise = new Promise(function(resolve){ resolve({ claimedBy: function(){ return undefined; }}); });

    this.mockService.getGiftsPromise.and.returnValue(this.getGiftsPromise);
    this.mockService.unfollowFriendPromise.and.returnValue(this.unfollowFriendPromise);
    this.mockService.registerForGiftPromise.and.returnValue(this.registerForGiftPromise);
    this.mockService.unregisterForGiftPromise.and.returnValue(this.unregisterForGiftPromise);
    this.SUT = new FriendsViewModel({ service: this.mockService });
  });

  describe('when selecting a friend', function(){
    beforeEach(function(done){
      var mockGifts = ko.observableArray();
      this.mockFriend = { id: 1, selected: function(){}, gifts: mockGifts };
      spyOn(this.mockFriend, 'selected');

      this.SUT.selectFriend(this.mockFriend);
      this.getGiftsPromise.then(function(){ done(); });
    });

    it('should set selected on the friend', function(){
      expect(this.mockFriend.selected).toHaveBeenCalledWith(true);
    });

    it('should set selectedFriend', function(){
      expect(this.SUT.selectedFriend()).toBe(this.mockFriend);
    });

    it('should get gifts for the friend', function(){
      expect(this.mockFriend.gifts().length).toBe(1);
    });
    
    describe('and another friend had already been selected', function(){
      beforeEach(function(done){
        var friendTheSecondGifts = ko.observableArray();
        this.mockFriendTheSecond = { id: 2, selected: function(){}, gifts: friendTheSecondGifts };
        spyOn(this.mockFriendTheSecond, 'selected');

        this.SUT.selectFriend(this.mockFriendTheSecond);
        this.getGiftsPromise.then(function(){ done(); });
      });

      it('should set selected to false on the frist friend', function(){
        expect(this.mockFriend.selected).toHaveBeenCalledWith(false);
      });
    });

    describe('and the same friend is selected again', function(){
      beforeEach(function(done){
        this.SUT.selectFriend(this.mockFriend);
        this.getGiftsPromise.then(function(){ done(); });
      });

      it('should set selected to false', function(){
        expect(this.mockFriend.selected).toHaveBeenCalledWith(false);
      });

      it('should set selectedFriend to undefined', function(){
        expect(this.SUT.selectedFriend()).toBe(undefined);
      });
    });
  });

  describe('when selecting a gift', function(){
    beforeEach(function(){
      this.mockGift = { id: 1, selected: function(){} };
      spyOn(this.mockGift, 'selected');
      this.SUT.selectGift(this.mockGift);
    });

    it('should set selected to true', function(){
      expect(this.mockGift.selected).toHaveBeenCalledWith(true);
    });

    it('should set selectedGift', function(){
      expect(this.SUT.selectedGift()).toBe(this.mockGift);
    });

    describe('and it is selected again', function(){
      beforeEach(function(){
        this.SUT.selectGift(this.mockGift);
      });

      it('should set selected to false', function(){
        expect(this.mockGift.selected).toHaveBeenCalledWith(false);
      });

      it('should set selectedGift to undefined', function(){
        expect(this.SUT.selectedGift()).toBe(undefined);
      });
    });
  });

  describe('when unfollowing a friend', function(){
    beforeEach(function(done){
      this.mockFriend = { id: 1 };
      this.SUT.friends.push(this.mockFriend);
      this.SUT.unfollow(this.mockFriend);

      this.unfollowFriendPromise.then(function(){ done(); });
    });

    it('should unfollow friend using the service', function(){
      expect(this.mockService.unfollowFriendPromise).toHaveBeenCalledWith(this.mockFriend);
    });

    it('should remove the friend from the friends collection', function(){
      expect(this.SUT.friends).not.toContain(this.mockFriend);
    });
  });

  describe('when registering for a gift', function(){
    beforeEach(function(){
      this.mockGift = jasmine.createSpyObj('mockGift', [ 'canRegister', 'claimedBy' ]);
    });

    describe('and the gift cannot be registered for', function(){
      beforeEach(function(done){
        this.mockGift.canRegister.and.returnValue(false);
        this.SUT.registerForGift(this.mockGift);
        this.registerForGiftPromise.then(function(){ done(); });
      });

      it('should not register for the gift', function(){
        expect(this.mockService.registerForGiftPromise).not.toHaveBeenCalled();
      });
    });

    describe('and the gift can be registered for', function(){
      beforeEach(function(done){
        this.mockGift.canRegister.and.returnValue(true);
        this.SUT.registerForGift(this.mockGift);
        this.registerForGiftPromise.then(function(){ done(); });
      });

      it('should register for the gift', function(){
        expect(this.mockService.registerForGiftPromise).toHaveBeenCalledWith(this.mockGift);
      });

      it('should set claimedBy with the returned value', function(){
        expect(this.mockGift.claimedBy).toHaveBeenCalledWith('expectedClaimer');
      });
    });
  });

  describe('when unregistering for a gift', function(){
    beforeEach(function(){
      this.mockGift = { canUnregister: false, claimedBy: function(){} };
      spyOn(this.mockGift, 'claimedBy');
    });
    
    describe('and the gift cannot be unregistered', function(){
      beforeEach(function(done){
        this.mockGift.canUnregister = false;
        this.SUT.unregisterForGift(this.mockGift);
        this.unregisterForGiftPromise.then(function() { done(); });
      });

      it('should not unregister for the gift', function(){
        expect(this.mockService.unregisterForGiftPromise).not.toHaveBeenCalled();
      });
    });

    describe('and the gift can be unregistered', function(){
      beforeEach(function(done){
        this.mockGift.canUnregister = true;
        this.SUT.unregisterForGift(this.mockGift);
        this.unregisterForGiftPromise.then(function() { done(); });
      });

      it('should unregister for the gift', function(){
        expect(this.mockService.unregisterForGiftPromise).toHaveBeenCalledWith(this.mockGift);
      });

      it('should set claimedBy', function(){
        expect(this.mockGift.claimedBy).toHaveBeenCalledWith(undefined);
      });
    });
  });
});