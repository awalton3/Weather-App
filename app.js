//MODULE

var weatherApp = angular.module('weatherApp', ['ngRoute', 'ngResource']);

//  ROUTES

weatherApp.config(function ($routeProvider) {
    
    $routeProvider 
    
       .when ('/',{
        
            templateUrl: 'pages/main.htm',
            controller: 'mainController'
        })
    
    
        .when ('/forecast',{
        
            templateUrl: 'pages/forecast.htm',
            controller: 'forecastController'
        })
    
          .when ('/contact',{
        
            templateUrl: 'pages/contact.htm',
            controller: 'contactController'
        })
    
});

//SERVICES 

weatherApp.service('cityService', function() {
    
    this.city = "South Bend, Indiana";
    
});

//CONTROLLERS

weatherApp.controller('mainController', ['$scope', 'cityService', function($scope, cityService) {
    
    $scope.cityinput = cityService.city; 
    
    $scope.$watch('cityinput', function() {
        
        cityService.city = $scope.cityinput;
    
    });
    
    $scope.characters = 10; 
    
}]);


weatherApp.controller('forecastController', ['$scope', '$resource', 'cityService', function($scope, $resource, cityService) {

    $scope.cityinput = cityService.city; 
    
    $scope.$watch('cityinput', function() {
        
        cityService.city = $scope.cityinput;
    
    });
    
   $scope.weatherAPI = $resource("http://api.openweathermap.org/data/2.5/weather?APPID=2a1033acc54bbf8eae534d2efd033a53",{ callback: "JSON_CALLBACK" }, { get: { method: "JSONP" }});
    
    $scope.weatherResult = $scope.weatherAPI.get({ q: $scope.cityinput });
    
    $scope.convertToFahrenheit = function(degK) {
      
        return Math.round((1.8 * (degK - 273)) + 32); 
        
    };
    
    $scope.convertToDate = function(dt) {
        
        return new Date(dt * 1000);
    };
    
}]);
 

weatherApp.controller('contactController', ['$scope', function($scope) {
    
    
    
}]); 

//DIRECTIVES 

weatherApp.directive('weatherReport', function() {
    
    return {
        
        restrict: 'E',
        templateUrl: 'Directives/weatherReport.html',
        replace: true,
        scope: {
            weatherDay: "=", 
            convertToStandard: "&",
            convertToDate: "&",
            dateFormat: "@",
        }
    }
});