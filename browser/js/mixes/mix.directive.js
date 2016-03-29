'use strict';

app.directive('mixItem', function() {
  return {
    restrict: 'E',
    templateUrl: '/js/mixes/mix.detail.html',
    scope: {
    	mix: '='
    },
    controller: function($scope, UserFactory, MixFactory){

        $scope.favorited=false;

        $scope.edit = function(mixId){
            //check adn write
            MixFactory.edit(mixId);
        }

    	$scope.toggle = function(mixId){
    		if($scope.favorited) {
    			unfavorite(mixId)
    		} else {
    			favorite(mixId)
    		}
    		$scope.favorited=!$scope.favorited;
    	}

	    function favorite(mixId) {
            UserFactory.favorite(mixId)

			// UserFactory.addToBucket($scope.loop)
			// .then(function(user){
			// 	console.log('user from add', user)
			// })
		}

		function unfavorite(mixId) {
            //write in factory
            UserFactory.unfavorite(mixId)
		}

    }
  };
});
