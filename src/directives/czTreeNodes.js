angular.module('cz-tree')
.directive('czTreeNodes', [
	function () {
		return {
			restrict: 'A',
			scope: false,
			link: function(scope, element) {
				// add the cz-tree-nodes class to the element:
				element.addClass('cz-tree-nodes');
			}
		}
	}
]);