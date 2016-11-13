angular.module('cz-tree')
    .directive('czTree', [
        function () {
            return {
                restrict: 'AE',
                controller: 'TreeCtrl',
                scope: {
                    onSelectionChange: '&',
                    onDropEvent: '&',
                    onDoubleClick: '&'
                },
                link: function (scope, element, attributes) {
                    // add the cz-tree class to the element:
                    element.addClass('cz-tree');

                    if (attributes['multiselect']) {
                        scope.$multiSelectEnabled = attributes['multiselect'].toLowerCase() === "true";
                    }

                    // initialize the controller:
                    scope.initialize();
                }
            }
        }
    ]);