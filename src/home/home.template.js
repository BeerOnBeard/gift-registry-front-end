<script type="text/html" id="tmpl-wish-list">
<div class="wish-list" data-bind="foreach: items">
  <div class="wish-list__item" data-bind="click: $parent.select">
    <p class="wish-list-item__name" data-bind="text: name"></p>

    <!-- ko if: selected -->
    <p class="wish-list-item__description" data-bind="text: description"></p>
    <div class="wish-list-item__controls">
      <div class="wli-control wli-control__delete">Del</div>
      <div class="wli-control">Edit</div>
      <div class="wli-control wli-control__go" data-bind="click: $parent.go">Go</div>
    </div>
    <!-- /ko -->
  </div>
</div>
</script>