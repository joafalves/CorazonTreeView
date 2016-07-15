angular.module('demo')
.controller('BasicCtrl', ['$scope',
		function ($scope) {
			$scope.data = [
				{
					name: 'MasterNode',
					nodes: [
						{
							name: "SubNode",
							nodes: [
								{
									name: "SubNode",
									nodes: [
										{
											name: "SubNode",
											nodes: [
												{
													name: "SubNode"
												},
												{
													name: "SubNode"
												}]
										}]
								},
								{
									name: "SubNode"
								}]
						},
						{
							name: "SubNode"
						}
					]
				}
			];
		}
	]
);