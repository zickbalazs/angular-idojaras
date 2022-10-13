let app = angular.module('app', []);

let date;

app.controller('weather', function ($scope){
    $scope.current = {
        day: new Date(),
        location: "Baja"
    };
    $scope.minDate = new Date().toISOString().split('T')[0];
    $scope.conditions = [
        new Weather({id:0, condition: 'Napsütéses', icon: 'bi-sun', color:'#87ceeb'}),
        new Weather({id:1, condition: 'Borult', icon: 'bi-cloudy', color:'#87ceeb'}),
        new Weather({id:2, condition: 'Eső', icon: 'bi-cloud-rain', color:'#87ceeb'}),
        new Weather({id:3, condition: 'Jégeső', icon: 'bi-cloud-lighting-rain', color:'#87ceeb'}),
        new Weather({id:4, condition: 'Havazás', icon: 'bi-cloud-snow', color:'#87ceeb'})
    ]
    $scope.Submit = function(){
        if ($scope._new.date!=undefined){
            if ($scope._new.cond!=null){
                $scope._new.cond = JSON.parse($scope._new.cond);
                $scope._new.date.setDate($scope._new.date.getDate()+1);
                console.log($scope._new.date);
                if ($scope.forecasts.findIndex(e=>e.date==($scope._new.date.toISOString()))==-1) {
                    if ($scope._new.maxC==null || $scope._new.minC==null) alert('Adjon meg hőfokokat!');
                    else{
                        $scope.forecasts.push($scope._new);
                        window.localStorage.setItem('weather', angular.toJson($scope.forecasts))
                        alert('Sikeres feltöltés!');
                    }
                }
                else alert('Hibás dátum')
            }
            else alert('Adjon meg viszonyt!')
        }
        else alert('Adjon dátumot!');
    }
    $scope.forecasts = [];
    if (window.localStorage.getItem('weather')!=null) $scope.forecasts = angular.fromJson(window.localStorage.getItem('weather'));
    console.log($scope.forecasts);
});