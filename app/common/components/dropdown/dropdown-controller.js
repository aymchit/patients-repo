'use strict';
function DropdownController($element, $rootScope, $sce, $timeout) {
	
	const ENTER_KEY_CODE = 13;
	const UP_ARROW_KEY_CODE = 38;
	const DOWN_ARROW_KEY_CODE = 40;

	let vm = this;

	//Items to be searched
	vm.items = [];
	
	//Keys to be search & displayed for each item
	vm.keys = [];
	
	//Controls the visibility of results
	vm.isOpen = false;
	
	//Filter text
	vm.searchText = "";
	
	//index of the item currently focused
	vm.focusedIndex = 0;
	
	//Local vars
	let searchRegEx;
	let previousSearchString = "";
	let isScrolling = false;
	let $dropdownMenu = $($element).find('.dropdown-menu');
	let $searchBox = $($element).find('input.search-box');

	/**
	 * Called on click of the dropdown icon. 
	 * Works as a toggle button.
	 * Opens the dropdown with the existing state, 
	 * if search string isnt blank.
	 */
	vm.showDropdownMenu = () => {	
		if (vm.searchText !== '' && !vm.isOpen) {
			$searchBox.focus();
			vm.onInputChange();
		} else {
			vm.isOpen = false;
		}
	}

	/**
	 * Called whenever the input field value is changed.
	 * It opens the dropdown meny, 
	 * sets the active index to 0
	 * and also resets the scroll position to 0
	 */
	vm.onInputChange = () => {
		vm.isOpen = true;
		vm.focusedIndex = 0;
		//So that scrollTop is called only when the dropdown has been opened
		$timeout(() => {
			$dropdownMenu.scrollTop(0);
		});
	}

	/**
	 * Called on Mouse over of the dropdown item.
	 * Sets the focus to input field if lost,
	 * so arrow up and down events start working
	 */
	vm.onItemHover = ($index) => {
		vm.focusedIndex = $index;
		$searchBox.focus();
		if($searchBox[0]) {
			$searchBox[0].selectionStart = $searchBox[0].selectionEnd = vm.searchText.length;
		}
	}

	/**
	 * Called on dropdown item select, or when clicked on View Details
	 * and also on Enter.
	 * Selects the active item and broadcasts the 'dropdown-item-select' 
	 * along with the selected item
	 */
	vm.selectItem = (item) => {
		vm.searchText = item.name;
		vm.isOpen = false;
		
		//Calls the parent controller's function if passed into it.
		vm.onItemSelect({ item: item });
		//broadcast, so it can be subscribe anywhere in  the app
		$rootScope.$broadcast('dropdown-item-select', { selectedItem: item });
	}

	//Resets the search string/filter
	vm.resetFilter = () => {
		vm.searchText = "";
	}

	/**
	 * Highlights the part of the item 
	 * that is matched with the search string 
	 */
	vm.highlight = (text) => {
		if (!vm.searchText) {
			return $sce.trustAsHtml(text);
		}
		return $sce.trustAsHtml(text.replace(getRegExForSearch(), '<span class="highlightedText">$&</span>'));
	};
	
	/**
	 * Checks if any of the expected keys's value - of item object 
	 * matches with the search string
	 */
	vm.filterFn = (item, index, items) => {
		if (vm.searchText === "") {
			return false;
		}

		let searchString = vm.searchText;
		if (/\W|[_]/g.test(searchString)) { //if searchString has any symbols
			searchString = searchString.replace(/\W|_/g, '[$&]'); //use brekits [ ] for that symbols
		}

		//checks if the search string matches with any of the key.
		let matchedKeys = vm.keys.filter((key) => item[key].match(getRegExForSearch()));
		return (matchedKeys.length > 0);
	}

	/**
	 * Called on arrow key, up down and on enter presss on the input field.
	 * Updates the active item selection for on arrows and
	 * selects items on enter.
	 */
	vm.onKeyUp = (event, filteredItems) => {
		if (filteredItems && filteredItems.length > 0) {
			let filteredItemsLength = filteredItems.length;
			let isLast = (vm.focusedIndex === filteredItemsLength - 1);
			let isFirst = (vm.focusedIndex === 0);
			let allItems = $dropdownMenu.find('li');
			let optionHeight = $(allItems[0]).height();
			switch (event.keyCode) {
				case ENTER_KEY_CODE:
					vm.selectItem(filteredItems[vm.focusedIndex]);
					break;
				case UP_ARROW_KEY_CODE:
					if (!isFirst) {
						vm.focusedIndex--;
					}
					scrollToActiveOption(vm.focusedIndex, filteredItemsLength, optionHeight);
					break;
				case DOWN_ARROW_KEY_CODE:
					if (isLast) {
						vm.focusedIndex = 0;
						$dropdownMenu.scrollTop(0);
					} else {
						vm.focusedIndex++
						let currentItem = allItems[vm.focusedIndex];
						let currentYPos = $(currentItem).offset().top

						scrollToActiveOption(vm.focusedIndex, filteredItemsLength, optionHeight);
					}
					break;
			}
		}
	}

	//Checks for the scroll position of the active it and updats the scrollbar
	function scrollToActiveOption(index, filteredItemsLength, optionHeight) {
		let padding = 10;
		optionHeight += padding;
		let dropdownHeight = $dropdownMenu.height();
		var belowView = (index + 1) * optionHeight - $dropdownMenu.scrollTop() > dropdownHeight;
		var aboveView = (index + 1) * optionHeight - $dropdownMenu.scrollTop() < optionHeight;
		if (index === 0) {
			$dropdownMenu.scrollTop(0);
			return;
		}
		if (index >= filteredItemsLength - 1) {
			$dropdownMenu.scrollTop(filteredItemsLength * optionHeight);
			return;
		}
		if (belowView) { // Then scroll down
			scrollTo($dropdownMenu.scrollTop() + optionHeight * 2);
		}
		if (aboveView) { // Then scroll up
			scrollTo($dropdownMenu.scrollTop() - optionHeight * 2);
		}

	}

	//Updates the scrollbar of the dropdown menu as per the active item
	function scrollTo(scrollTop) {
		if (!isScrolling) {
			$dropdownMenu.animate({ scrollTop: scrollTop }, "fast", () => {
				isScrolling = false;
			});
			isScrolling = true;
			return;
		} else {
			$dropdownMenu.scrollTop(scrollTop);
			return;
		}
	}

	//Creates and return the regex expression using the search string
	function getRegExForSearch() {
		//Calculates on when the search string in different then the previous one for better performance
		if (previousSearchString !== vm.searchText) {
			let searchString = previousSearchString = vm.searchText;
			if (/\W|[_]/g.test(searchString)) { //if searchString has any symbols
				searchString = searchString.replace(/\W|_/g, '[$&]'); //use brackets [ ] for those symbols
			}
			searchRegEx = new RegExp(searchString, 'gi');
		}
		return searchRegEx;
	}
}
DropdownController.$inject = ['$element', '$rootScope', '$sce', '$timeout'];