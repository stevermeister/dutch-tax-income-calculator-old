var app = angular.module('dit-calculator', ['ngMaterial']);

app.controller('mainController', ['$scope', '$mdDialog', '$mdSidenav', '$mdUtil', function($scope, $mdDialog, $mdSidenav, $mdUtil) {

  $scope.salary = {
    grossYear: 36000,
    grossMonth: 3000,
    netYear: 19200,
    netMonth: 1600,
    taxRate: 42,
    ruling: false,
    age: false,
    socialSecurity: true
  }

  $scope.$watchGroup(['salary.age', 'salary.ruling', 'salary.socialSecurity', 'salary.grossYear'], reCalculate);

  function reCalculate() {
    grossYear = $scope.salary.grossYear || 0;
    $scope.salary.taxableYear = ~~$scope.salary.ruling ? grossYear * 0.7 : grossYear;
    $scope.salary.generalCredit = getCredits(grossYear).lk;
    $scope.salary.labourCredit = getCredits(grossYear).ak;
    $scope.salary.grossMonth = ~~(grossYear / 12);
    $scope.salary.netYear = grossYear - getTaxAmount($scope.salary.taxableYear, $scope.salary.age, $scope.salary.socialSecurity) + $scope.salary.generalCredit + $scope.salary.labourCredit;
    $scope.salary.netMonth = ~~($scope.salary.netYear / 12);
    $scope.salary.incomeTax = getTaxAmount($scope.salary.taxableYear, $scope.salary.age, $scope.salary.socialSecurity);
  }

  function getTaxAmount(taxableIncome, age, socialSecurity) {

    var taxAmountPeriods = [
      19822, // 0 - 19,822
      13767, // 33,589 - 19,822
      23996, // 57,585 - 33,589
      Infinity
    ];

    var taxRates = [.365, .42, .42, .52];//2015
    var taxRatesUnSecure = [.0835, .1385, .42, .52]; //2015 without social security
    //var taxRates = [.051, .1085, .42, .52]; //2014
    var taxRates64 = [0.1575, 0.235, .42, .52];

    if (!socialSecurity) {
      taxRates = taxRatesUnSecure;
    }

    if (age) {
      taxRates = taxRates64;
    }

    var taxAmount = 0;

    for (var i = 0; i < taxRates.length; i++) {

      if (taxableIncome - taxAmountPeriods[i] < 0) {
        taxAmount += Math.floor(taxableIncome * taxRates[i]);
        break;
      } else {
        taxAmount += Math.floor(taxAmountPeriods[i] * taxRates[i]);
        taxableIncome = taxableIncome - taxAmountPeriods[i];
      }
    }
    return taxAmount;
  }

  function getCredits(salary) {
    for (var index = 0; index < creditRates.length; index++) {
      if (creditRates[index].salary > salary) {
        break;
      }
    }
    return index ? creditRates[index - 1] : creditRates[0];
  }

<<<<<<< HEAD
	$scope.showAboutDialog = function(event) {
		$mdDialog.show({
			controller: function ($scope, $mdDialog) {
				$scope.hide = function () {
					$mdDialog.hide();
				};
			},
			templateUrl: 'templates/about.html',
			parent: angular.element(document.body),
			targetEvent: event
		});
	};

	$scope.toggleSideBar = (function () {
		var debounceFn =  $mdUtil.debounce(function(){
			$mdSidenav('left').toggle();
		},300);
		return debounceFn;
	})();
}]);