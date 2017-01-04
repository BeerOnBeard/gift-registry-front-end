var WishListViewModel = require('./wishListViewModel');
var templates = {
  list: 'tmpl-wish-list',
  edit: 'tmpl-wish-list-item-edit'
};

describe('WishListViewModel', function(){
  beforeEach(function(){
    this.mockService = jasmine.createSpyObj('service', [ 'saveWishListItemPromise', 'deleteWishListItemPromise' ]);

    this.saveWishListItemPromise = new Promise(
      function(resolve){
        resolve({
          id: 1,
          name: function(){},
          description: function(){},
          url: function(){}
        });
    });

    this.deleteWishListItemPromise = new Promise(function(resolve, reject){ resolve(); });

    this.mockService.saveWishListItemPromise.and.returnValue(this.saveWishListItemPromise);
    this.mockService.deleteWishListItemPromise.and.returnValue(this.deleteWishListItemPromise);
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
      this.mockEditItem = jasmine.createSpyObj('item', [ 'id', 'name', 'description', 'url' ]);
      this.mockEditItem.id.and.returnValue(1);
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

      it('should set the values of the selected item with the values returned from the save call', function(){
        expect(this.mockEditItem.id).toBe(1);
        expect(this.mockEditItem.name).toHaveBeenCalled();
        expect(this.mockEditItem.description).toHaveBeenCalled();
        expect(this.mockEditItem.url).toHaveBeenCalled();
      });
    });
  });

  describe('when adding an item', function(){
    beforeEach(function(){
      spyOn(this.SUT, 'edit').and.callThrough();

      this.SUT.add();
    });

    it('should add a new item with no ID to the items collection', function(){
      if (!this.SUT.items().some(function(item) { return item.id === undefined; })) {
        fail('New item was not added to the items collection.');
      }
    });

    it('should edit the item', function(){
      expect(this.SUT.edit).toHaveBeenCalled();
    });
  });

  describe('when deleting an existing item', function(){
    beforeEach(function(done){
      var existingItem = { id: 1 };
      this.SUT.items.push(existingItem);
      this.SUT.selectedItem(existingItem);
      this.SUT.editDelete();

      this.deleteWishListItemPromise.then(function() { done(); });
    });

    it('should delete from backing store', function(){
      expect(this.mockService.deleteWishListItemPromise).toHaveBeenCalled();
    });

    it('should set selectedItem to undefined', function(){
      expect(this.SUT.expectedItem).toBe(undefined);
    });

    it('should remove the deleted item from the items collection', function(){
      expect(this.SUT.items().length).toBe(0);
    });

    it('should set the template to list', function(){
      expect(this.SUT.template()).toBe(templates.list);
    });
  });

  describe('when deleting a new item', function(){
    beforeEach(function(done){
      var newItem = { id: undefined };
      this.SUT.items.push(newItem);
      this.SUT.selectedItem(newItem);
      this.SUT.editDelete();

      this.deleteWishListItemPromise.then(function() { done(); });
    });

    it('should not delete from backing store', function(){
      expect(this.mockService.deleteWishListItemPromise).not.toHaveBeenCalled();
    });

    it('should set selectedItem to undefined', function(){
      expect(this.SUT.expectedItem).toBe(undefined);
    });

    it('should remove the deleted item from the items collection', function(){
      expect(this.SUT.items().length).toBe(0);
    });

    it('should set the template to list', function(){
      expect(this.SUT.template()).toBe(templates.list);
    });
  });
});