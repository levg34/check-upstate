var app = angular.module('app', ['jsonFormatter'])

app.controller('testCtrl', function($scope,$http,$location) {
	$scope.init = function() {
		$scope.upstate = {}
		$scope.color = 'info'
		$scope.tooltip = 'Press enter or click on Check first!'
	}
	$scope.init()
	//$scope.selfUrl = $location.$$absUrl
	$scope.checkUpstate = function(evt) {
		if (!evt||evt.key=='Enter') {
			var url = '/up?url='+$scope.url
			$http.get(url).then(function successCallback(response) {
				$scope.upstate = response.data
				$scope.color = response.data.color
				$scope.tooltip = 'Click to follow link'
			}, function errorCallback(response) {
				console.log(response)
			})
		} else {
			$scope.init()
		}
	}
})
