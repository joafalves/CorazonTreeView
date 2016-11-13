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

            $scope.$on(CZC.EVENTS.SELECT_NODES_BY_UID, (function (e, targets, keepPrevious) {
                if (targets && targets.length > 0) {
                    for (var i = 0; i < targets.length; i++) {
                        $scope.selectNode(targets[i], null, i == 0 ? keepPrevious : true, true);
                    }
                } else {
                    // clear all existing selection:
                    $scope.clearNodeSelection();
                }

            }).bind(this));

            $scope.safeDigest = function () {
                if (!$scope.$$phase) {
                    $scope.$digest();
                }
            };

            $scope.initialize = function () {

            };

            $scope.selectNode = function (id, attachment, keepPrevious, preventPublishing) {
                if ($scope.$multiSelectEnabled && keepPrevious) {
                    if (!$scope.isNodeSelected(id)) {
                        $scope.$selectedNodes.push({id: id, attachment: attachment});
                    }
                } else {
                    $scope.$selectedNodes = [{id: id, attachment: attachment}];
                }

                if (!preventPublishing) {
                    $scope.onSelectionChange({selected: $scope.$selectedNodes});
                }
            };

            $scope.onDrop = function (id, attachment, inlineLocation) {
                var dropEvent = {};
                dropEvent.inlineLocation = inlineLocation;
                dropEvent.target = {
                    id: id,
                    attachment: attachment
                };
                dropEvent.source = $scope.$selectedNodes;

                $scope.onDropEvent({dropEvent: dropEvent})
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

            $scope.getSelectedNodeIndex = function (id) {
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