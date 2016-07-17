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

            $scope.initialize = function () {

            };

            $scope.selectNode = function (id, attachment, keepPrevious) {
                if ($scope.$multiSelectEnabled && keepPrevious) {
                    if (!$scope.isNodeSelected(id)) {
                        $scope.$selectedNodes.push({id: id, attachment: attachment});
                    }
                } else {
                    $scope.$selectedNodes = [{id: id, attachment: attachment}];
                }

                $scope.onSelectionChange({selected: $scope.$selectedNodes});
            };

            $scope.unselectNode = function (node) {
                var index = $scope.getSelectedNodeIndex(node);
                if (index >= 0) {
                    $scope.$selectedNodes.splice(index, 1);
                }
            };

            $scope.clearNodeSelection = function () {
                $scope.$selectedNodes = [];
            };

            $scope.getSelectedNodeIndex = function(id) {
                for (var i = 0; i < $scope.$selectedNodes.length; i++) {
                    if ($scope.$selectedNodes[i].id == id) {
                        return i;
                    }
                }

                return -1;
            };

            $scope.isNodeSelected = function (id) {
                var index = $scope.getSelectedNodeIndex(id);
                return index >= 0;
            };
        }
    ]);