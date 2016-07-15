angular.module('cz-tree')
.directive('czTree', [
	function () {
		return {
			restrict: 'A',
			scope: true,
			controller: 'TreeCtrl',
			link: function(scope, element, attributes) {
				// add the cz-tree class to the element:
				element.addClass('cz-tree');

				// initialize the controller:
				scope.initialize();
			}
		}
	}
]);