angular.module('cz-tree')
.controller('TreeCtrl', ['$scope', 'settings',
	function ($scope, settings) {
		/* quick tip: */
		/* definitions with 'this' will be accessible from the directive */

		this.scope = $scope;

		/* scope variables */

		$scope.$selectedNodes = [];
		$scope.$multiSelectEnabled = settings.multiSelect;

		/* scope functions */

		$scope.initialize = function() {

		};

		$scope.selectNode = function(node, keepPrevious) {
			if($scope.$multiSelectEnabled && keepPrevious) {
				if(!$scope.isNodeSelected(node)) {
					$scope.$selectedNodes.push(node);
				}
			} else {
				$scope.$selectedNodes = [node];
			}
		};

		$scope.unselectNode = function(node) {
			if($scope.isNodeSelected(node)) {
				$scope.$selectedNodes.splice($scope.$selectedNodes.indexOf(node), 1);
			}
		};

		$scope.clearNodeSelection = function() {
			$scope.$selectedNodes = [];
		};

		$scope.isNodeSelected = function(node) {
			return $scope.$selectedNodes.indexOf(node) >= 0;
		};
	}
]);