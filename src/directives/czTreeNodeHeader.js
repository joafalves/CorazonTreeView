angular.module('cz-tree')
    .directive('czTreeNodeHeader', ['$timeout', 'settings',
        function ($timeout, settings) {
            return {
                require: '^czTreeNode',
                restrict: 'A',
                scope: true,
                replace: false,
                link: function (scope, element, attributes, treeNode) {
                    // add the cz-tree-nodes class to the element:
                    element.addClass('cz-tree-header');

                    function applyDynamicStyle() {
                        var multiplier = treeNode ? treeNode.scope.depth() * settings.itemPadding + settings.baseItemPadding : 0;
                        element.css({'padding-left': multiplier + "px"});
                    }

                    $timeout(applyDynamicStyle);

                    // set the attributes for dragging:
                    element.attr('draggable', 'true');

                    // event handlers:
                    var nodeScope = treeNode ? treeNode.scope : scope;

                    element[0].ondblclick = function (e) {
                        // based on the shift key state we are going to keep the previous selection or not
                        nodeScope.select(e.ctrlKey);
                        nodeScope.doubleClick();
                        scope.$apply();

                        // stop the event propagation.
                        e.stopPropagation();
                    };

                    element[0].onclick = function (e) {
                        // based on the shift key state we are going to keep the previous selection or not
                        nodeScope.select(e.ctrlKey);
                        scope.$apply();

                        // stop the event propagation.
                        e.stopPropagation();
                    };

                    element[0].ondragstart = function (e) {
                        if (!nodeScope.isSelected()) {
                            nodeScope.select(e.ctrlKey);
                        }

                        //e.dataTransfer.setData('text/plain', '');
                        scope.$apply();
                    };

                    element[0].ondrop = function (e) {
                        nodeScope.onDrop(e);
                    };

                    element[0].ondragover = function (event) {
                        event.preventDefault();
                    };
                }
            }
        }
    ]);