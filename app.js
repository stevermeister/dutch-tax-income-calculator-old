var app = angular.module('dit-calculator', []);

app.controller('mainController', ['$scope', function($scope) {

	var taxRates = [0.365, 0.42, 0.42, 0.52],
		taxRates64 = [0.1575, 0.235, 0.42, 0.52],
		coefficient = 0.7,
		months = 12;

	var taxAmountPeriods = [
		19822, // 0 - 19,822
		13767, // 33,589 - 19,822
		23996, // 57,585 - 33,589
		Infinity
	];

	// * 0.7
	var taxAmountPeriodsRuling = [
		(taxAmountPeriods[0] * coefficient),
		((taxAmountPeriods[1] - taxAmountPeriods[0]) * coefficient),
		((taxAmountPeriods[2] - taxAmountPeriods[1]) * coefficient),
		Infinity
	];

	$scope.salary = {
		grossYear: 36000,
		taxableYear: 36000,
		grossMonth: 3000,
		netYear: 19200,
		netMonth: 1600,
		ruling: false,
		age: false
	};

	// Private functions

	function reCalculateFromGross() {
		var grossYear = $scope.salary.grossYear || 0;

		$scope.salary.taxableYear = getTaxableIncome(grossYear, $scope.salary.ruling);
		$scope.salary.grossMonth = ~~(grossYear / months);
		$scope.salary.netYear = grossYear - getTaxAmount($scope.salary.taxableYear, $scope.salary.age);
		$scope.salary.netMonth = ~~($scope.salary.netYear / months);
	}

	function getTaxableIncome(grossYear, isRuling) {
		isRuling = isRuling || false;

		if (isRuling) {
			return grossYear * coefficient;
		}

		return grossYear;
	}

	function getTaxAmount(taxableIncome, age) {
		var currentTaxRates = taxRates,
			taxAmount = 0;

		if (age) {
			currentTaxRates = taxRates64;
		}

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

	// Public methods

	$scope.reCalculateFromGross = reCalculateFromGross;

	$scope.reCalculateFromGrossMonth = function() {
		$scope.salary.grossYear = $scope.salary.grossMonth * months;
		$scope.salary.taxableYear = getTaxableIncome($scope.salary.grossYear, $scope.salary.ruling);
		$scope.salary.netYear = $scope.salary.grossYear - getTaxAmount($scope.salary.taxableYear, $scope.salary.age);
		$scope.salary.netMonth = ~~($scope.salary.netYear / months);
	};

	$scope.reCalculateFromNetMonth = function() {
		var netYear = $scope.salary.netMonth * months;

		$scope.salary.grossYear = getGrossFromNet(netYear, $scope.salary.ruling);
		$scope.salary.taxableYear = getTaxableIncome($scope.salary.grossYear, $scope.salary.ruling);
		$scope.salary.grossMonth = ~~($scope.salary.grossYear / months);
		$scope.salary.netYear = $scope.salary.grossYear - getTaxAmount($scope.salary.taxableYear, $scope.salary.age);
	};

	// Watchers

	$scope.$watch('salary.age', reCalculateFromGross);
	$scope.$watch('salary.ruling', reCalculateFromGross);

}]);