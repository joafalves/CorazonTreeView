angular.module('cz-tree')
    .controller('TreeNodeCtrl', ['$scope',
        function ($scope) {

            var INLINE_OFFSET = 3;

            /* quick tip: */
            /* definitions with 'this' will be accessible from the directive */

            this.scope = $scope;

            /* scope variables */

            $scope.$parentNodeScope = null;
            $scope.$treeScope = null;

            $scope.collapsed = false;
            $scope.attachment = null;
            $scope.id = null;

            /* scope functions */

            $scope.depth = function () {
                // is this a root node?
                return ($scope.$parentNodeScope ? $scope.$parentNodeScope.depth() + 1 : 0);
            };

            $scope.toggleCollapse = function () {
                $scope.collapsed = !$scope.collapsed;
            };

            $scope.toggleSelect = function () {
                $scope.isSelected() ? $scope.unselect() : $scope.select();
            };

            $scope.unselect = function () {
                $scope.$treeScope.unselectNode($scope.id || $scope.$id);
            };

            $scope.doubleClick = function () {
                $scope.$treeScope.onDoubleClick({selected: $scope.$treeScope.$selectedNodes});
            };

            $scope.select = function (keepPrevious) {
                $scope.$treeScope.selectNode($scope.id || $scope.$id, $scope.attachment, keepPrevious);
            };

            $scope.isSelected = function () {
                return $scope.$treeScope.isNodeSelected($scope.id || $scope.$id);
            };

            $scope.onDrop = function (e) {
                var dropLocation = CZC.DROP_LOCATION.INLINE;
                if (e.offsetY <= CZC.INLINE_OFFSET) {
                    dropLocation = CZC.DROP_LOCATION.INLINE_TOP;
                } else if (e.offsetY >= e.target.offsetHeight - CZC.INLINE_OFFSET) {
                    dropLocation = CZC.DROP_LOCATION.INLINE_BOTTOM;
                }

                $scope.$treeScope.onDrop($scope.id || $scope.$id, $scope.attachment, dropLocation);
            };

            /* initialize */

            $scope.initialize = function (parentTreeNodeCtrl, treeCtrl) {
                $scope.$parentNodeScope = parentTreeNodeCtrl ? parentTreeNodeCtrl.scope : null;
                $scope.$treeScope = treeCtrl ? treeCtrl.scope : null;
            };
        }
    ]);