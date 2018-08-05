'use strict';

describe('myApp.dropdown controller', function () {
	let scope, rootScope, controller;
	let element = angular.element('<div></div>')
	let item = {
		name: "Chitwan Kaur",
		phone: "770322833",
		city: "Pune",
		doctor: "Dr. Mathur"
	};
	beforeEach(module('myApp.dropdown'));

	beforeEach(inject(function ($rootScope, $controller) {
		scope = $rootScope.$new();
		rootScope = $rootScope;
		controller = $controller(DropdownController, {
			$element: element
		});
		controller.onItemSelect = () => {};
		spyOn(controller, 'onItemSelect');
		spyOn(rootScope, '$broadcast');
    
	}));
	describe("on init", () => {
		it("should define controller", () => {
			expect(controller).toBeDefined();
		});

		it("should set items to []", () => {
			expect(controller.items).toEqual([]);
		});
		it("should set keys to []", () => {
			expect(controller.keys).toEqual([]);
		});
		it("should set isOpen to false", () => {
			expect(controller.isOpen).toBe(false);
		});
		it("should set searchText to ''", () => {
			expect(controller.searchText).toEqual("");
		});
		it("should set focusedIndex to 0", () => {
			expect(controller.focusedIndex).toEqual(0);
		});

	});

	describe("on showDropdownMenu", () => {
		it("should set isOpen to false if dropdown is open", () => {
			controller.isOpen = true;
	 		controller.searchText = "test";
	 		controller.showDropdownMenu();
	 		expect(controller.isOpen).toBe(false);
		});

		it("should set isOpen to false if search text is empty", () => {
			controller.isOpen = true;
	 		controller.searchText = "";
	 		controller.showDropdownMenu();
	 		expect(controller.isOpen).toBe(false);
		});

		it("should set isOpen to true if search text is not empty and dropdown is closed", () => {
			controller.isOpen = false;
	 		controller.searchText = "test";
	 		controller.showDropdownMenu();
	 		expect(controller.isOpen).toBe(true);
		});

		it("should set focusedIndex to 0 if search text is not empty and dropdown is closed", () => {
			controller.isOpen = false;
	 		controller.searchText = "test";
	 		controller.showDropdownMenu();
	 		expect(controller.focusedIndex).toBe(0);
		});
	});

	describe("onInputChange", () => {
		it("should set isOpen to true", () => {
			controller.isOpen = false;
			controller.onInputChange();
			expect(controller.isOpen).toBe(true);
			controller.isOpen = true;
			controller.onInputChange();
			expect(controller.isOpen).toBe(true);
		});

		it("should set focusedIndex to 0", () => {
			controller.focusedIndex = 1;
			controller.onInputChange();
			expect(controller.focusedIndex).toEqual(0);
			controller.focusedIndex = 0;
			controller.onInputChange();
			expect(controller.focusedIndex).toEqual(0);
		});
	});

	describe("onItemHover", () => {
		it("should set focusedIndex to the passed index", () => {
			controller.onItemHover(4);
			expect(controller.focusedIndex).toEqual(4);
		});
	});

	describe("selectItem", () => {
		beforeEach(() => {
			controller.selectItem(item);
		});
		
		it("should set searchText to item's name", () => {
			expect(controller.searchText).toEqual(item.name);
		});
		it("should set isOpen to false", () => {
			expect(controller.isOpen).toBe(false);
		});
		it("should call onItemSelect with selected item", () => {
			expect(controller.onItemSelect).toHaveBeenCalledWith({item: item});
		});
		it("should call $rootScope.$broadcast with dropdown-item-select", () => {
			expect(rootScope.$broadcast).toHaveBeenCalledWith('dropdown-item-select', { 
				selectedItem: { 
					name: 'Chitwan Kaur', phone: '770322833', city: 'Pune', doctor: 'Dr. Mathur' 
				} 
			});
		});	
	});
	
	describe("resetFilter", () => {
		it("should set searchText to blank", () => {
			controller.resetFilter();
			expect(controller.searchText).toEqual("");
		});
	});
	/**item = {
		name: "Chitwan Kaur",
		phone: "770322833",
		city: "Pune",
		doctor: "Dr. Mathur"
	}; */
	describe("filterFn", () => {
		beforeEach(() => {
			controller.keys = ["name", "phone", "city", "doctor"];
		});

		it("should return true when item's any key's value, is matched with the search text", () => {
			controller.searchText = "wan";
			expect(controller.filterFn(item, 0, [item])).toBe(true);

			controller.searchText = "77";
			expect(controller.filterFn(item, 0, [item])).toBe(true);

			controller.searchText = "Pune";
			expect(controller.filterFn(item, 0, [item])).toBe(true);

			controller.searchText = "Math";
			expect(controller.filterFn(item, 0, [item])).toBe(true);
		});

		it("should return false when not key's value of the item is matched with the search text", () => {
			controller.searchText = "ram";
			expect(controller.filterFn(item, 0, [item])).toBe(false);
		});
	});
});