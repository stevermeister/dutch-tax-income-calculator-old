var app = angular.module('dit-calculator', []);

app.controller('mainController', ['$scope', function($scope){

    $scope.salary = {
        grossYear: 36000,
        grossMonth: 3000,
        netMonth: 1600,
        taxRate: 42,
        ruling: false
    }

    $scope.$watch('salary.ruling', function(){
        $scope.salary.netMonth = ~~(($scope.salary.grossYear-getTaxAmount($scope.salary.grossYear, $scope.salary.ruling))/12);
        $scope.salary.taxRate = getTaxRate($scope.salary.netMonth, $scope.salary.grossMonth) + '%';
    });

    $scope.$watch('salary.grossYear', function(grossYear){
        grossYear = grossYear || 0;
        $scope.salary.grossMonth = ~~(grossYear/12);
        $scope.salary.netMonth = ~~((grossYear-getTaxAmount(grossYear, $scope.salary.ruling))/12);
        $scope.salary.taxRate = getTaxRate($scope.salary.netMonth, $scope.salary.grossMonth) + '%';
    });


    function getTaxAmount(salary, isRuling){
        isRuling = isRuling || false;

        var taxAmountPeriods = [
            19645,
            13718, // 33363 - 19645
            22628, //55991 - 33363
            Infinity
        ];

        var taxRates = [.37 , .42 ,  .42 ,  .52 ];
        var taxRates64 = [.37 , .42 ,  .42 ,  .52 ];

        var taxAmount = 0;
        var salaryLeft = 0;
        var taxableAmount = salary;

        if( isRuling ){
            taxableAmount = salary * 0.7;
        }
        salaryLeft = taxableAmount;
        for(var i=0; i<taxRates.length; i++){

            if(salaryLeft - taxAmountPeriods[i] < 0){
                taxAmount += salaryLeft * taxRates[i];
                break;
            }else{
                taxAmount += taxAmountPeriods[i] * taxRates[i];
                salaryLeft = salaryLeft - taxAmountPeriods[i];
            }
        }

        return taxAmount;
    }

    function getTaxRate(net, gross){
        return ((1 - net/gross) * 100).toFixed(2);
    }

}]);