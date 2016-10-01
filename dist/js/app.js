(function(){
	'use strict';

	angular
		.module('todoApp', [

		]);

}());

(function(){
	'use strict';

	angular
		.module('todoApp')
		.controller('control', control)

	function control($scope, $location){
		$scope.todos = JSON.parse(localStorage.getItem("todoList")) || [];

		$scope.$watch('todos', function(newValue, oldValue) {
			if (angular.isObject(newValue)) {
				localStorage.setItem('todoList', JSON.stringify(newValue));
				$scope.toggleAll = !!$scope.countStatus();
			}
		}, true);

		/** Add Todo */
		$scope.add = function(){
			$scope.todos.push({ "subject": $scope.subject, "status": false });
			$scope.subject = '';
		}

		/** Counter */
		$scope.countStatus = function() {
			return $scope.todos.filter(function(todo) { return todo.status == false; }).length;
		}

		/** Checking */
		$scope.checking = function() {
			$scope.todos = $scope.todos.map(function(todo) {
				todo.status = $scope.toggleAll;

				return todo;
			});
		}

		/** Remove One Todo */
		$scope.removeOne = function(index) {
			$scope.todos.splice(index, 1);
		}

		/** Remove Done Todos */
		$scope.removeDoneTodos = function() {
			$scope.todos = $scope.todos.filter(function(todo) {
				return todo.status === false;
			});
		}
	}
}());

(function () {
	'use strict';

	angular
		.module ('todoApp')
		.directive("focus", ["$timeout",
			function ($timeout) {
				return {
					restrict: 'A',
					link: function (scope, element) {
						$timeout(function () {
							element[0].focus();
						});
					}
				};
			}
			]);

	angular
		.module ('todoApp')
		.directive("escape", function() {
			return {
				restrict: 'A',
				link: function (scope, element, attrs) {
					element.bind("keydown  keypress", function (event) {
						if (event.keyCode === 27) {
							scope.$apply(function (){
								scope.$eval(attrs.escape);
							});
							event.preventDefault();
						}
					});
				}
			};
			});
} ());