app.config(function ($stateProvider) {

    $stateProvider.state('loop', {
        url: '/loop/:loopId',
        controller: 'LoopController',
        templateUrl: 'js/loop/loop.html',
        resolve: {
          loop: function($http, $stateParams) {
            return $http.get('/api/loops/' + $stateParams.loopId)
            .then(function(res) {
              console.log(res);
              return res.data;
            })
          }
        }
    })
    .state('loops', {
      url: '/loops',
      templateUrl: 'js/loop/loops.html',
      resolve: {
        loops: function($http) {
          return $http.get('/api/loops')
            .then(function(res) {
              return res.data;
            })
        }
      }
    })

});