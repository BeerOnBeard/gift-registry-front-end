<script type="text/html" id="tmpl-wish-list">
<div class="wish-list" data-bind="foreach: items">
  <div class="wish-list-item" data-bind="click: $parent.select, css: { 'wish-list-item--selected': selected }">
    <p class="wish-list-item__name" data-bind="text: name"></p>

    <!-- ko if: selected -->
    <p class="wish-list-item__description" data-bind="text: description"></p>
    <div class="wish-list-item__controls">
      <div class="wli-control wli-control__edit" data-bind="click: $parent.edit">Edit</div>
      <div class="wli-control wli-control__go" data-bind="click: $parent.go">Go to Site</div>
    </div>
    <!-- /ko -->
  </div>
</div>
<div class="wish-list__add"><span>+</span></div>
</script>

<script type="text/html" id="tmpl-wish-list-item-edit">
<div class="wli-edit" data-bind="with: selectedItem">
  <label for="wli-name">Name</label>
  <input type="text" name="wli-name" id="wli-name" data-bind="value: name" />
  
  <label for="wli-description">Description</label>
  <textarea name="wli-description" id="wli-description" data-bind="value: description"></textarea>
  
  <label for="wli-link">Link</label>
  <input type="text" name="wli-link" id="wli-link" data-bind="value: url" />
  
  <div class="wli-edit__controls">
    <div class="wli-edit-control wli-edit-control__delete">Delete</div>
    <div class="wli-edit-control wli-edit-control__save" data-bind="click: $parent.editSave">Save</div>
  </div>
</div>
</script>

<script type="text/html" id="tmpl-friends">
</script>

<script type="text/html" id="tmpl-gifts">
</script>