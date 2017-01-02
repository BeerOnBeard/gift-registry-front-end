var WishListViewModel = require('./wishListViewModel');
var templates = {
  list: 'tmpl-wish-list',
  edit: 'tmpl-wish-list-item-edit'
};

describe('WishListViewModel', function(){
  beforeEach(function(){
    this.mockService = jasmine.createSpyObj('service', [ 'saveWishListItemPromise' ]);

    this.saveWishListItemPromise = new Promise(function(resolve){ resolve(); });
    this.mockService.saveWishListItemPromise.and.returnValue(this.saveWishListItemPromise)
    this.SUT = new WishListViewModel({ service: this.mockService });
  });

  describe('when selecting an item', function(){
    beforeEach(function(){
      this.previousItem = jasmine.createSpyObj('previousItem', [ 'selected' ]);
      this.newItem = jasmine.createSpyObj('newItem', [ 'selected' ]);
      this.SUT.selectedItem(this.previousItem);
      this.SUT.select(this.newItem);
    });

    it('should set the new item as selected', function(){
      expect(this.newItem.selected).toHaveBeenCalledWith(true);
    });

    it('should set the previously selected item as not selected', function(){
      expect(this.previousItem.selected).toHaveBeenCalledWith(false);
    });

    it('should set the selectedItem to the new item', function(){
      expect(this.SUT.selectedItem()).toBe(this.newItem);
    });
  });

  describe('when editing an item', function(){
    beforeEach(function(){
      this.mockEditItem = jasmine.createSpy();
      this.SUT.edit(this.mockEditItem);
    });

    it('should set the selected item', function(){
      expect(this.SUT.selectedItem()).toBe(this.mockEditItem);
    });

    it('should update the template', function(){
      expect(this.SUT.template()).toBe(templates.edit);
    });

    describe('and it is saved', function(){
      beforeEach(function(done){
        this.SUT.editSave();
        this.saveWishListItemPromise.then(function(){ done(); });
      });

      it('should save via the service', function(){
        expect(this.mockService.saveWishListItemPromise).toHaveBeenCalledWith(this.mockEditItem);
      });

      it('should update the template', function(){
        expect(this.SUT.template()).toBe(templates.list);
      });
    });
  });
});