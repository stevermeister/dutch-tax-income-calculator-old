var app = angular.module('dit-calculator', []);

app.controller('mainController', ['$scope', function($scope) {

  var taxAmountPeriods = [
    19822, // 0 - 19,822
    13767, // 33,589 - 19,822
    23996, // 57,585 - 33,589
    Infinity
  ];

  // * 0.7
  var taxAmountPeriodsRuling = [
    (taxAmountPeriods[0] * 0.7),
    ((taxAmountPeriods[1] - taxAmountPeriods[0]) * 0.7),
    ((taxAmountPeriods[2] - taxAmountPeriods[1]) * 0.7),
    Infinity
  ];

  var taxRates = [.365, .42, .42, .52];
  var taxRates64 = [0.1575, 0.235, .42, .52];

  $scope.salary = {
    grossYear: 36000,
    taxableYear: 36000,
    grossMonth: 3000,
    netYear: 19200,
    netMonth: 1600,
    ruling: false,
    age: false
  }

  $scope.$watch('salary.age', reCalculateFromGross);
  $scope.$watch('salary.ruling', reCalculateFromGross);

  function reCalculateFromGross() {
    var grossYear = $scope.salary.grossYear || 0;
    $scope.salary.taxableYear = getTaxableIncome(grossYear, $scope.salary.ruling)
    $scope.salary.grossMonth = ~~(grossYear / 12);
    $scope.salary.netYear = grossYear - getTaxAmount($scope.salary.taxableYear, $scope.salary.age);
    $scope.salary.netMonth = ~~($scope.salary.netYear / 12);
  }

  $scope.reCalculateFromGross = reCalculateFromGross;

  $scope.reCalculateFromGrossMonth = function() {
    $scope.salary.grossYear = $scope.salary.grossMonth * 12;
    $scope.salary.taxableYear = getTaxableIncome($scope.salary.grossYear, $scope.salary.ruling)
    $scope.salary.netYear = $scope.salary.grossYear - getTaxAmount($scope.salary.taxableYear, $scope.salary.age);
    $scope.salary.netMonth = ~~($scope.salary.netYear / 12);
  }

  $scope.reCalculateFromNetMonth = function() {
    var netYear = $scope.salary.netMonth * 12;
    $scope.salary.grossYear = getGrossFromNet(netYear, $scope.salary.ruling);
    $scope.salary.taxableYear = getTaxableIncome($scope.salary.grossYear, $scope.salary.ruling)
    $scope.salary.grossMonth = ~~($scope.salary.grossYear / 12);
    $scope.salary.netYear = grossYear - getTaxAmount($scope.salary.taxableYear, $scope.salary.age);
  }

  function getTaxableIncome(grossYear, isRuling) {
    isRuling = isRuling || false;

    if (isRuling) {
      return grossYear * 0.7;
    }

    return grossYear;
  }

  function getTaxAmount(taxableIncome, age) {

    var currentTaxRates = taxRates;

    if (age) {
      currentTaxRates = taxRates64;
    }

    var taxAmount = 0;

    for (var i = 0; i < currentTaxRates.length; i++) {

      if (taxableIncome - taxAmountPeriods[i] < 0) {
        taxAmount += taxableIncome * currentTaxRates[i];
        break;
      } else {
        taxAmount += taxAmountPeriods[i] * currentTaxRates[i];
        taxableIncome = taxableIncome - taxAmountPeriods[i];
      }
    }
    return taxAmount;
  }

  function getGrossFromNet(netYear, ruling, age) {
    var taxableIncome = netYear,
      grossYear = 0,
      currentTaxRates = taxRates,
      currentTaxAmountPeriods = taxAmountPeriods;
    ruling = ruling || false;
    age = age || false;

    if (age) {
      currentTaxRates = taxRates64;
    }

    if(ruling){
      currentTaxAmountPeriods = taxAmountPeriodsRuling;
    }

    var i = 0;
    while(taxableIncome > 0) {
      if(taxableIncome < currentTaxAmountPeriods[i]) {
        grossYear += taxableIncome / currentTaxRates[i];
        break;
      }
      grossYear += currentTaxAmountPeriods[i];
      taxableIncome -= currentTaxAmountPeriods[i];
      i++;
    }

    return Math.floor(grossYear);
  }

}]);