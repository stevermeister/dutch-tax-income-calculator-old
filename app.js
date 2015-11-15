'use strict'

angular.module('dit-calculator', ['ngMaterial'])
  .controller('mainController', function($scope) {

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

    $scope.$watchGroup(['main.salary.age',
                        'main.salary.ruling',
                        'main.salary.socialSecurity',
                        'main.salary.grossYear',
                        'main.salary.allowance'],
      () => {

        let grossYear = this.salary.grossYear || 0;
        this.salary.taxableYear = grossYear;
        if(this.salary.ruling){
          this.salary.taxableYear = this.salary.taxableYear * 0.7;
        }
        this.salary.generalCredit = getCredits(grossYear).lk;
        this.salary.labourCredit = getCredits(grossYear).ak;
        this.salary.grossMonth = ~~(grossYear / 12);
        this.salary.netYear = grossYear - getTaxAmount(this.salary.taxableYear, this.salary.age, this.salary.socialSecurity);
        if(this.salary.allowance){
          this.salary.netYear = this.salary.netYear * 0.92;  //-8%
        }
        this.salary.netYear += this.salary.generalCredit + this.salary.labourCredit;
        this.salary.netMonth = ~~(this.salary.netYear / 12);
        this.salary.incomeTax = getTaxAmount(this.salary.taxableYear, this.salary.age, this.salary.socialSecurity);
      });


    function getTaxAmount(taxableIncome, age, socialSecurity) {

      const taxAmountPeriods = [
        19822, // 0 - 19,822
        13767, // 33,589 - 19,822
        23996, // 57,585 - 33,589
        Infinity
      ];

      let taxRates = [.365, .42, .42, .52];//2015
      let taxRatesUnSecure = [.0835, .1385, .42, .52]; //2015 without social security
      //let taxRates = [.051, .1085, .42, .52]; //2014
      let taxRates64 = [0.1575, 0.235, .42, .52];

      if (!socialSecurity) {
        taxRates = taxRatesUnSecure;
      }

      if (age) {
        taxRates = taxRates64;
      }

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

    function getCredits(salary) {
      let index;
      for (index = 0; index < creditRates.length; index++) {
        if (creditRates[index].salary > salary) {
          break;
        }
      }
      return index ? creditRates[index - 1] : creditRates[0];
    }

  });