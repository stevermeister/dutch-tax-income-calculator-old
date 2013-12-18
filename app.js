var app = angular.module('dit-calculator', []);

app.controller('mainController', ['$scope', function($scope){

    $scope.salary = {
        grossYear: 36000,
        grossMonth: 3000,
        netYear: 19200,
        netMonth: 1600,
        taxRate: 42,
        ruling: false,
        age: false
    }

    $scope.$watch('salary.age', reCalculate);
    $scope.$watch('salary.ruling', reCalculate);
    $scope.$watch('salary.grossYear', reCalculate);

    function reCalculate(){
        grossYear = $scope.salary.grossYear || 0;
        $scope.salary.grossMonth = ~~(grossYear/12);
        $scope.salary.netYear = grossYear - getTaxAmount(grossYear, $scope.salary.ruling, $scope.salary.age);
        $scope.salary.netMonth = ~~($scope.salary.netYear/12);
        $scope.salary.taxRate = getTaxRate($scope.salary.netYear, grossYear) + '%';
    }

    function getTaxAmount(salary, isRuling, age){
        isRuling = isRuling || false;

        var taxAmountPeriods = [
            19645,
            13718, // 33363 - 19645
            22628, //55991 - 33363
            Infinity
        ];

        var taxRates = [.37 , .42 ,  .42 ,  .52 ];
        var taxRates64 = [0.1575 , 0.235 ,  .42 ,  .52 ];

        if(age){
            taxRates = taxRates64;
        }

        var taxAmount = 0;
        var salaryLeft = salary;

        if( isRuling ){
            salaryLeft = salary * 0.7;
        }

        for(var i=0; i<taxRates.length; i++){

            if(salaryLeft - taxAmountPeriods[i] < 0){
                taxAmount += salaryLeft * taxRates[i];
                break;
            }else{
                taxAmount += taxAmountPeriods[i] * taxRates[i];
                salaryLeft = salaryLeft - taxAmountPeriods[i];
            }
        }
        console.log(taxAmount);
        return taxAmount;
    }

    function getTaxRate(net, gross){
        if(!gross){
            return 0;
        }
        return ((1 - net/gross) * 100).toFixed(2);
    }

}]);