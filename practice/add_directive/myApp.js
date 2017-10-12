var app = angular.module('myApp', []);


app.directive('myFirstDirective', function() {
	return {
		template: "I was made in a directive constructor!"
	}
});