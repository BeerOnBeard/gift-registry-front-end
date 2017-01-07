var FriendsViewModel = require('./friendsViewModel');
var ko = require('knockout');

describe('FriendsViewModel', function(){
  beforeEach(function(){
    this.mockService = jasmine.createSpyObj('service', [ 'getGiftsPromise' ]);

    this.getGiftsPromise = new Promise(function(resolve){ resolve([{ id: 1 }]); });

    this.mockService.getGiftsPromise.and.returnValue(this.getGiftsPromise);
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
});