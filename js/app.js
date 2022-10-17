let app = angular.module('app', []);

let date;

app.controller('weather', function ($scope){
    $scope.current = {
        day: new Date(),
        location: "Baja"
    };
    $scope.canModify = false;
    $scope.minDate = new Date().toISOString().split('T')[0];
    $scope.conditions = [
        new Weather({id:0, condition: 'Napsütéses', icon: 'bi-sun', color:'#87ceeb'}),
        new Weather({id:1, condition: 'Borult', icon: 'bi-cloudy', color:'#b7c9ff'}),
        new Weather({id:2, condition: 'Eső', icon: 'bi-cloud-rain', color:'#e4d1bd'}),
        new Weather({id:3, condition: 'Jégeső', icon: 'bi-cloud-lightning-rain', color:'#ff7052'}),
        new Weather({id:4, condition: 'Havazás', icon: 'bi-cloud-snow', color:' #ff70ff'})
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
                        let n = {
                            date: new Date($scope._new.date).toISOString().split('T')[0],
                            minC: $scope._new.minC,
                            maxC: $scope._new.maxC,
                            cond: $scope._new.cond
                        }
                        $scope.forecasts.push(n);
                        window.localStorage.setItem('weather', angular.toJson($scope.forecasts))
                    }
                }
                else alert('Hibás dátum')
            }
            else alert('Adjon meg viszonyt!')
        }
        else alert('Adjon dátumot!');
    }
    
    $scope.Delete = function(index){
        $scope.forecasts.splice($scope.forecasts.findIndex(x=>x.date==index), 1);
        window.localStorage.setItem('weather', angular.toJson($scope.forecasts));
    }
    $scope.forecasts = [];
    if (window.localStorage.getItem('weather')!=null) $scope.forecasts = angular.fromJson(window.localStorage.getItem('weather'));
    $scope.AllowModify = function(index){
        $scope.canModify = true;
        $scope.modindex = index;
        let to_mod = {
            cond: $scope.forecasts[index].cond,
            date: new Date($scope.forecasts[index].date),
            minC: $scope.forecasts[index].minC,
            maxC: $scope.forecasts[index].maxC,
        }
        to_mod.cond = JSON.stringify(to_mod.cond)
        $scope.modW = to_mod;
        console.log(to_mod);
        console.log($scope.forecasts)
    }
    $scope.modindex;
    $scope.CantModify = function(){
        $scope.canModify = false;
    }
    $scope.Modify = function(index){
        console.log(index);
        if ($scope.modW.date!=null) {
            if ($scope.modW.minC!=null && $scope.modW.maxC!=null){
                if ($scope.modW.minC<$scope.modW.maxC){
                    if ($scope.modW.cond!=null){
                        asd = new Date($scope.modW.date);
                        $scope.modW.cond = JSON.parse($scope.modW.cond);
                        $scope.modW.date = new Date($scope.modW.date)
                        $scope.forecasts[index] = {
                            cond: $scope.modW.cond,
                            date: new Date($scope.modW.date).toISOString().split('T')[0],
                            minC: $scope.modW.minC,
                            maxC: $scope.modW.maxC
                        };
                        window.localStorage.setItem('weather', angular.toJson($scope.forecasts))
                        $scope.canModify = false;
                        modW = {};
                    }
                    else alert('Hibás viszonyok!');
                }
                else alert('Hibás hőfokok!');
            }
            else alert('Hibás adatok!');
        }
        else alert('Hibás dátum!');
    }
});

