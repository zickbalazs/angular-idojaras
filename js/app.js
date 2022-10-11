let app = angular.module('app', []);



app.controller('weather', function ($scope){
    $scope.current = {
        day: new Date(),
        location: "Baja"
    };
    $scope.conditions = [
        new Weather({condition: 'Napsütéses', icon: 'bi-sun', color:'#87ceeb'}),
        new Weather({condition: 'Borult', icon: 'bi-cloudy', color:'#87ceeb'}),
        new Weather({condition: 'Eső', icon: 'bi-cloud-rain', color:'#87ceeb'}),
        new Weather({condition: 'Jégeső', icon: 'bi-cloud-lighting-rain', color:'#87ceeb'}),
        new Weather({condition: 'Napsütéses', icon: 'bi-cloud-snow', color:'#87ceeb'})
    ]
    console.log($scope.conditions)
    $scope.forecasts = [];
    console.log($scope.forecasts);
    if (window.localStorage.getItem('weather')!=null) $scope.forecasts = angular.fromJson(window.localStorage.getItem('weather'));
});