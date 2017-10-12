app.controller('myCtrl', function($scope) {
	$scope.fName = "Ashish";
});

app.directive('myFirstElement', function() {

	return {
		template: "<h4>Made by a directive!</h4>"
	};
});