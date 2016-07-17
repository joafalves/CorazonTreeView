angular.module('cz-tree')
    .directive('czTreeNode', [
        function () {
            return {
                require: ['?^^czTreeNode', '^^czTree'],
                restrict: 'AE',
                scope: true,
                controller: 'TreeNodeCtrl',
                replace: true,
                link: function (scope, element, attributes, controllers) {
                    // initialize the controller:
                    scope.initialize(controllers[0], controllers[1]);

                    // set the attachment (if any)
                    scope.attachment = attributes["attachment"];

                    // add the cz-tree-node class to the element:
                    element.addClass('cz-tree-node');
                }
            }
        }
    ]);