<script type="text/html" id="tmpl-wish-list">
<div class="wish-list" data-bind="foreach: items">
  <div class="wish-list-item" data-bind="click: $parent.select, css: { 'wish-list-item--selected': selected }">
    <p class="wish-list-item__name" data-bind="text: name"></p>

    <!-- ko if: selected -->
    <p class="wish-list-item__description" data-bind="text: description"></p>
    <div class="wish-list-item__controls">
      <div data-bind="click: $parent.edit">Edit</div>
      <div data-bind="click: $parent.go">Go to Site</div>
    </div>
    <!-- /ko -->
  </div>
</div>
<div class="wish-list__add" data-bind="click: add"><span>+</span></div>
</script>

<script type="text/html" id="tmpl-wish-list-item-edit">
<div class="wli-edit" data-bind="with: selectedItem">
  <label for="wli-name">Name</label>
  <input type="text" name="wli-name" id="wli-name" data-bind="value: name" />
  
  <label for="wli-description">Description</label>
  <textarea name="wli-description" id="wli-description" data-bind="value: description"></textarea>
  
  <label for="wli-link">Link</label>
  <input type="text" name="wli-link" id="wli-link" data-bind="value: url" />
  
  <div class="wli-edit-controls">
    <div class="wli-edit-controls__delete" data-bind="click: $parent.editDelete">Delete</div>
    <div class="wli-edit-controls__save" data-bind="click: $parent.editSave">Save</div>
  </div>
</div>
</script>

<script type="text/html" id="tmpl-friends">
<div class="friends-list" data-bind="foreach: friends">
  <div class="friends-list-item" data-bind="click: $parent.selectFriend, css: { 'friends-list-item--selected': selected }">
    <p class="friends-list-item__name" data-bind="text: name"></p>

    <!-- ko if: selected -->
      <p>Birthday: <span data-bind="text: birthday"></span></p>
      <div class="friends-list-item__controls">
        <div>Unfollow</div>
      </div>
    <!-- /ko -->
  </div>

  <!-- ko if: gifts -->
  <div class="friends-list-item__gifts" data-bind="foreach: gifts">
    <!-- TODO: $parentContext.$parent is no good. Figure out a better way. -->
    <div class="friends-gift" data-bind="click: $parentContext.$parent.selectGift, css: { 'friends-gift--selected': selected }">
      <p class="friends-gift__name" data-bind="text: name"></p>

      <!-- ko if: selected -->
      <p data-bind="text: description"></p>
      <div class="friends-gift__controls">
        <div>Register</div>
      </div>
      <!-- /ko -->
    </div>
  </div>
  <!-- /ko -->
</div>
</script>

<script type="text/html" id="tmpl-gifts">
<div class="user-list" data-bind="foreach: users">
  <div class="user-list-item" data-bind="click: $parent.selectUser, css: { 'user-list-item--selected': selected }">
    <p class="user-list-item__name" data-bind="text: name"></p>
  </div>
  <!-- ko if: selected -->
  <div class="user-list__gifts" data-bind="foreach: gifts">
    <div class="user-gift" data-bind="click: $parentContext.$parent.selectGift, css: { 'user-gift--selected': selected }">
      <p class="user-gift__name" data-bind="text: name"></p>

      <!-- ko if: selected -->
      <p data-bind="text: description"></p>
      <!-- /ko -->
    </div>
  </div>
  <!-- /ko -->
</div>
</script>