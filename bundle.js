/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	'use strict';

	angular.module('dit-calculator', ['ngMaterial']).controller('mainController', function ($scope) {
	  var _this = this;

	  this.salary = {
	    grossYear: 0,
	    grossMonth: 0,
	    netYear: 0,
	    netMonth: 0,
	    taxRate: 0,
	    ruling: false,
	    age: false,
	    socialSecurity: true
	  };

	  this.salary.grossYear = 36000;

	  this.salaryOutputOptions = {
	    'taxableYear': 'Taxable Income',
	    'incomeTax': 'Income Tax',
	    'generalCredit': 'General Tax Credit',
	    'labourCredit': 'Labour Tax Credit',
	    'netYear': 'Year net income',
	    'netMonth': 'Monthly net income'
	  };

	  $scope.$watchGroup(['main.salary.age', 'main.salary.ruling', 'main.salary.socialSecurity', 'main.salary.grossYear'], function () {
	    var grossYear = _this.salary.grossYear || 0;
	    _this.salary.taxableYear = ~ ~_this.salary.ruling ? grossYear * 0.7 : grossYear;
	    _this.salary.generalCredit = getCredits(grossYear).lk;
	    _this.salary.labourCredit = getCredits(grossYear).ak;
	    _this.salary.grossMonth = ~ ~(grossYear / 12);
	    _this.salary.netYear = grossYear - getTaxAmount(_this.salary.taxableYear, _this.salary.age, _this.salary.socialSecurity) + _this.salary.generalCredit + _this.salary.labourCredit;
	    _this.salary.netMonth = ~ ~(_this.salary.netYear / 12);
	    _this.salary.incomeTax = getTaxAmount(_this.salary.taxableYear, _this.salary.age, _this.salary.socialSecurity);
	  });

	  function getTaxAmount(taxableIncome, age, socialSecurity) {

	    var taxAmountPeriods = [19822, // 0 - 19,822
	    13767, // 33,589 - 19,822
	    23996, // 57,585 - 33,589
	    Infinity];

	    var taxRates = [.365, .42, .42, .52]; //2015
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
	});

/***/ }
/******/ ]);