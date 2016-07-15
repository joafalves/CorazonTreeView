angular.module('cz-tree')
.directive('czTreeNode', ['$parse',
	function ($parse) {
		return {
			require: ['?^^czTreeNode', '^^czTree'],
			restrict: 'A',
			scope: true,
			controller: 'TreeNodeCtrl',
			link: function(scope, element, attributes, controllers) {
				pre: {
					// initialize the controller:
					scope.initialize(controllers[0], controllers[1]);

					// add the cz-tree-node class to the element:
					element.addClass('cz-tree-node');
				}
			}
		}
	}
]);