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
      this.mockEditItem = jasmine.createSpyObj('item', [ 'name', 'description', 'url' ]);
      this.mockEditItem.name.and.returnValue('good');
      this.mockEditItem.description.and.returnValue('good');
      this.mockEditItem.url.and.returnValue('good');
      this.SUT.edit(this.mockEditItem);
    });

    it('should set the selected item', function(){
      expect(this.SUT.selectedItem()).toBe(this.mockEditItem);
    });

    it('should update the template', function(){
      expect(this.SUT.template()).toBe(templates.edit);
    });

    describe('and editing is canceled', function(){
      beforeEach(function(){
        this.SUT.selectedItem().name('bad');
        this.SUT.selectedItem().description('bad');
        this.SUT.selectedItem().url('bad');
        this.SUT.editCancel();
      });

      it('should revert all changes', function(){
        expect(this.SUT.selectedItem().name()).toBe('good');
        expect(this.SUT.selectedItem().description()).toBe('good');
        expect(this.SUT.selectedItem().url()).toBe('good');
      });

      it('should update the template', function(){
        expect(this.SUT.template()).toBe(templates.list);
      });
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
      })
    })
  });
});