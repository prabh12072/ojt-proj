
// create our angular app and inject ngAnimate and ui-router 
// =============================================================================
angular.module('formApp', ['ngAnimate', 'ui.router'])



// configuring our routes 
// =============================================================================
.config(function($stateProvider, $urlRouterProvider) {
    
    $stateProvider
    
        // route to show our basic form (/form)
        .state('form', {
            url: '/form',
            templateUrl: 'form.html',
            controller: 'formController'
        })
        
        // nested states 
        // each of these sections will have their own view
        // url will be nested (/form/profile)
        .state('form.profile', {
            url: '/profile',
            templateUrl: 'form-profile.html'
        })
        
        // url will be /form/interests
        .state('form.interests', {
            url: '/interests',
            templateUrl: 'form-interests.html'
        })
        
        // url will be /form/payment
        .state('form.payment', {
            url: '/payment',
            templateUrl: 'form-payment.html'
        });
       
    // catch all route
    // send users to the form page 
    $urlRouterProvider.otherwise('/form/profile');
})
// controller for the header
// =============================================================================
.controller('HeaderController', function ($scope, $location) {
    $scope.isActive = function (viewLocation) {
        return viewLocation === $location.path();
    };
})

// our controller for the form
// =============================================================================
.controller('formController', function($scope,$location) {
    
    // we will store all of our form data in this object
    $scope.formData = {};
    $scope.formStore = [];
   
    // function to process the form
    $scope.processForm = function() {
    	var data = $scope.formData;
    	$scope.formStore.push({
    		"name": data.name,
    		"email": data.email,
    		"book": data.book
    	})
        $scope.formData.name="";
        $scope.formData.email="";
        $scope.formData.book="";
        $location.path('/profile');
        //setTimeout ( abc(), 50000 );
       
       
    };


    
    var validateProfile = function(newVal) {
        // run your check here
        return (newVal[0].length > 0 && newVal[1].length > 0 && /(.+)@(.+){2,}\.(.+){2,}/.test(newVal[1]) && /^[A-Za-z\s]+$/.test(newVal[0]));
    }
    var validateInterest = function(newv) {
    	/*alert(newv[0].length);*/
    		  return (newv[0].length > 0 );

    }

    
    $scope.$watchGroup(['formData.name', 'formData.email'], function (newVal) {
        $scope.profileValid = validateProfile(newVal);
    });

    $scope.$watchGroup(['formData.book'], function (newv) {

        $scope.interest = validateInterest(newv);
    });
});

