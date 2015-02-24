var app = angular.module('dit-calculator', []);

app.controller('mainController', ['$scope', function($scope) {

  $scope.salary = {
    grossYear: 36000,
    grossMonth: 3000,
    netYear: 19200,
    netMonth: 1600,
    taxRate: 42,
    ruling: false,
    age: false
  }

  $scope.$watchCollection('[salary.age, salary.ruling, salary.grossYear]', reCalculate);

  function reCalculate() {
    grossYear = $scope.salary.grossYear || 0;
    $scope.salary.taxableYear = getTaxableIncome(grossYear, $scope.salary.ruling)
    $scope.salary.grossMonth = ~~(grossYear / 12);
    $scope.salary.netYear = grossYear - getTaxAmount($scope.salary.taxableYear, $scope.salary.age);
    $scope.salary.netMonth = ~~($scope.salary.netYear / 12);
    $scope.salary.taxRate = getTaxRate($scope.salary.netYear, grossYear) + '%';
  }

  function getTaxableIncome(grossYear, isRuling) {
    isRuling = isRuling || false;

    if (isRuling) {
      return grossYear * 0.7;
    }

    return grossYear;
  }

  function getTaxAmount(taxableIncome, age) {

    var taxAmountPeriods = [
      19822, // 0 - 19,822
      13767, // 33,589 - 19,822
      23996, // 57,585 - 33,589
      Infinity
    ];

    var taxRates = [.365, .42, .42, .52];
    var taxRates64 = [0.1575, 0.235, .42, .52];

    if (age) {
      taxRates = taxRates64;
    }

    var taxAmount = 0;

    for (var i = 0; i < taxRates.length; i++) {

      if (taxableIncome - taxAmountPeriods[i] < 0) {
        taxAmount += taxableIncome * taxRates[i];
        break;
      } else {
        taxAmount += taxAmountPeriods[i] * taxRates[i];
        taxableIncome = taxableIncome - taxAmountPeriods[i];
      }
    }
    return taxAmount;
  }

  function getTaxRate(net, gross) {
    if (!gross) {
      return 0;
    }
    return ((1 - net / gross) * 100).toFixed(2);
  }

}]);