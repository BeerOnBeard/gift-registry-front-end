var WishListViewModel = require('./wishListViewModel');

describe('WishListViewModel', function(){
  beforeEach(function(){
    var mockService = jasmine.createSpy();
    this.SUT = new WishListViewModel({ service: mockService });
  });

  describe('when selecting an item', function(){
    beforeEach(function(){
      this.previousItem = jasmine.createSpyObj('previousItem', [ 'selected' ]);
      this.newItem = jasmine.createSpyObj('newItem', [ 'selected' ]);
      this.SUT.selectedItem = this.previousItem;
      this.SUT.select(this.newItem);
    });

    it('should set the new item as selected', function(){
      expect(this.newItem.selected).toHaveBeenCalledWith(true);
    });

    it('should set the previously selected item as not selected', function(){
      expect(this.previousItem.selected).toHaveBeenCalledWith(false);
    });

    it('should set the selectedItem to the new item', function(){
      expect(this.SUT.selectedItem).toBe(this.newItem);
    });
  });
});