'use strict'

import creditRatesBase from './creditRatesBase.js';
import creditRatesSocial from './creditRatesSocial.js';
import creditRatesBaseRuling from './creditRatesBaseRuling.js';
import creditRatesSocialRuling from './creditRatesSocialRuling.js';

angular.module('dit-calculator', ['ngMaterial'], function($locationProvider){
    $locationProvider.html5Mode(true);
  })
  .controller('mainController', function($scope, $location) {

    this.year = 2016;
    if($location.search().year && [2015, 2016].indexOf($location.search().year) !== -1) {
      this.year = $location.search().year;
    }

    this.salary = {
      grossYear: 0,
      grossMonth: 0,
      netYear: 0,
      netMonth: 0,
      taxRate: 0,
      ruling: !!$location.search().ruling || false,
      age: false,
      socialSecurity: !!$location.search().socialOff || true,
      allowance: false
    };

    this.salary.grossYear = 36000;
    if(+$location.search().salary){
      this.salary.grossYear = +$location.search().salary;
    }

    this.salaryOutputOptions = {
      'taxableYear': 'Taxable Income',
      'incomeTax': 'Income Tax',
      'generalCredit': 'General Tax Credit',
      'labourCredit': 'Labour Tax Credit',
      'netYear': 'Year net income',
      'netMonth': 'Monthly net income'
    };

    $scope.$watchGroup(['main.salary.age',
                        'main.salary.ruling',
                        'main.salary.socialSecurity',
                        'main.salary.grossYear',
                        'main.salary.allowance',
                        'main.year'],
      () => {

        $location.search('salary', this.salary.grossYear);
        $location.search('ruling', this.salary.ruling);
        $location.search('socialOff', +this.salary.socialSecurity);
        $location.search('year', this.year);

        let grossYear = this.salary.grossYear || 0;
        if(this.salary.allowance){
          grossYear = grossYear / 1.08;  //-8%
        }

        this.salary.taxableYear = grossYear;
        if(this.salary.ruling){
          this.salary.taxableYear = this.salary.taxableYear * 0.7;
        }
        this.salary.generalCredit = getCredits(grossYear, this.salary.ruling, this.salary.socialSecurity).lk;
        this.salary.labourCredit = getCredits(grossYear, this.salary.ruling, this.salary.socialSecurity).ak;
        this.salary.grossMonth = ~~(grossYear / 12);
        this.salary.netYear = grossYear - getTaxAmount(this.salary.taxableYear, this.salary.age, this.salary.socialSecurity, this.year);
        this.salary.netYear += this.salary.generalCredit + this.salary.labourCredit;
        this.salary.netMonth = ~~(this.salary.netYear / 12);
        this.salary.incomeTax = getTaxAmount(this.salary.taxableYear, this.salary.age, this.salary.socialSecurity, this.year);
      });

    function getTaxRates(ratesYear, age, socialSecurity) {
      let taxRates = {
        2015 : {
          normal: [.365, .42, .42, .52],
          withoutSocial: [.0835, .1385, .42, .52],
          over64: [0.1860, 0.2410, .42, .52]
        },
        2016 : {
          normal: [.3655, .404, .404, .52],
          withoutSocial: [.0835, .1385, .404, .52],
          over64: [0.1860, 0.2250, .404, .52]
        },
      }, currentTaxRates = taxRates[ratesYear]['normal'];

      if (!socialSecurity) {
        currentTaxRates = taxRates[ratesYear]['withoutSocial'];
      }

      if (age) {
        currentTaxRates = taxRates[ratesYear]['over64'];
      }

      return currentTaxRates;
    }

    function getTaxAmountPeriods(year) {
      const taxAmountPeriods = {
        2015:[
          19822, // 0 - 19,822
          13767, // 33,589 - 19,822
          23996, // 57,585 - 33,589
          Infinity
        ],
        2016:[
          19922, // 0 - 19,922
          13793, // 33,715 - 19,922
          32697, // 66,421 - 33,715
          Infinity
        ],
      };

      return taxAmountPeriods[year];
    }

    function getTaxAmount(taxableIncome, age, socialSecurity, ratesYear) {

      const taxAmountPeriods = getTaxAmountPeriods(ratesYear);
      const taxRates = getTaxRates(ratesYear, age, socialSecurity);
      let taxAmount = 0;

      for (let i = 0; i < taxRates.length; i++) {

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

    function getCredits(salary, ruling, socialSecurity) {
      let index,
        currentRates = creditRatesBase;

      if(!socialSecurity){
        if(!ruling){
          currentRates = creditRatesBase;
        } else {
          currentRates = creditRatesBaseRuling;
        }
      } else {
        if(!ruling){
          currentRates = creditRatesSocial;
        } else {
          currentRates = creditRatesSocialRuling;
        }
      }

      for (index = 0; index < currentRates.length; index++) {
        if (currentRates[index].salary > salary) {
          break;
        }
      }
      return index ? currentRates[index - 1] : currentRates[0];
    }

  });