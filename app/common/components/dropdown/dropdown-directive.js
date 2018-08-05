'use strict';
angular.module('myApp.dropdown.dropdown-directive', [])
	.directive('customDropdown', [() => {
		return {
			restrict: 'E',
			scope: {},
			controller: DropdownController,
			controllerAs: 'vm',
			bindToController: {

				/**        
				 * Pass the list in which you want to search. eg. list of cities, list of patients etc.
				 */
				itemsList: '<',

				/**        
				 * Pass the array of fields which will be displayed in the dropdown and which will be search
				 * For eg. ["name", "age", "phone"] etc. 
				 */
				fields: '<',

				/**
				 * Pass the function to be called whenever an item is selected from the dropdown
				 */
				onItemSelect: '&'
			},
			template: `
        <div class="custom-dropdown input-group dropdown">
          <!-- INPUT SEARCH BOX -->
          <input type="text" class="form-control search-box" ng-change="vm.onInputChange()" 
                  placeholder="Search..." ng-model="vm.searchText" ng-escape="vm.resetFilter()" ng-keyup="vm.onKeyUp($event, filteredItems)">
          <div class="input-group-btn">
            <div class="btn btn-default dd-open-link" ng-click="vm.showDropdownMenu()">
              <span class="caret"></span>
            </div>
          </div>
          <!-- DROPDOWN MENU -->
          <ul class="dropdown-menu" ng-class="{'open': vm.isOpen && vm.searchText !== ''}" >
            <li ng-repeat="item in filteredItems = (vm.items  | filter: vm.filterFn | orderBy : 'name' | limitTo: 50)" class="item" 
                ng-class="{'active': vm.focusedIndex == $index}" ng-mouseover="vm.onItemHover($index)" ng-click="vm.selectItem(item)">
                <div class="view-details"><a href="" ng-click="vm.selectItem(item)">View Details</a></div>
                <div class="item-info" ng-repeat="key in vm.keys" title="{{item[key]}}" ng-bind-html="vm.highlight(item[key])"></div>
            </li>
            <li ng-if="filteredItems.length === 0">
                No results found
            </li>
          </ul>
        </div>
        `,
		link: (scope, element, attrs, controller) => {		
			let vm = controller;
			vm.items = vm.itemsList;
			vm.keys = vm.fields;

			$('body').on("click", (event) => {
				if (!$(event.target).hasClass("dd-open-link") && !$(event.target).hasClass("caret")) {
					vm.isOpen = false;
					scope.$digest();
				}
			});
		}
	};
}]);