angular.module('cz-tree')
.directive('czTreeNodeHeader', ['$timeout', 'settings',
	function ($timeout, settings) {
		return {
			require: '^czTreeNode',
			restrict: 'A',
			scope: true,
			replace: false,
			link: function(scope, element, attributes, treeNode) {
				// add the cz-tree-nodes class to the element:
				element.addClass('cz-tree-header');

				function applyDynamicStyle () {
					var multiplier = treeNode ? treeNode.scope.depth() * settings.itemPadding + settings.baseItemPadding : 0;
					element.css({'padding-left': multiplier + "px"});
				}

				$timeout(applyDynamicStyle);

				// set the attributes for dragging:
				element.attr('draggable', 'true');
				element.attr('dragstart', '{{onDragStart(e)}}');
				element.attr('onmouseup', '{{onClick(e)}}');

				// event handlers:
				var nodeScope = treeNode ? treeNode.scope : scope;

				element[0].ondblclick = function(e) {
					// based on the shift key state we are going to keep the previous selection or not
					nodeScope.select(e.ctrlKey);
					nodeScope.doubleClick();
					scope.$apply();
				};

				element[0].onmouseup = function(e) {
					// if the mouse clicked button isn't left or right, there's no need to go further
					if (e.which != 1 && e.which != 3) {
						return;
					}

					// based on the shift key state we are going to keep the previous selection or not
					nodeScope.select(e.ctrlKey);

					scope.$apply();

					// stop the event propagation.
					e.stopPropagation();
				};

				element[0].ondragstart = function(e) {
					e.dataTransfer.setData('text/plain', '');
					scope.$apply();
				};

				element[0].ondragend = function(e) {
					console.log("end" + e);
				}
			}
		}
	}
]);