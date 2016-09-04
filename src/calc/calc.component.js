import template from './calc.html';

let calcComponent = {
  template,
  controller: function($scope, $location) {
    this.year = 2016;
    if($location.search().year && [2015, 2016].indexOf(+$location.search().year) !== -1) {
      this.year = +$location.search().year;
    }

    this.startFrom = 'year';
    if(['year', 'month'].indexOf($location.search().startFrom) !==-1){
      this.startFrom = $location.search().startFrom;
    }

    this.salary = {
      grossYear: 0,
      grossMonth: 0,
      netYear: 0,
      netMonth: 0,
      taxRate: 0,
      ruling: !!+$location.search().ruling || false,
      socialSecurity: (angular.isDefined($location.search().socialSecurity) && $location.search().socialSecurity === '0')?false:true,
      allowance: !!+$location.search().allowance || false
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

    $scope.$watchGroup([
        '$ctrl.startFrom',
        '$ctrl.salary.ruling',
        '$ctrl.salary.socialSecurity',
        '$ctrl.salary.grossYear',
        '$ctrl.salary.allowance',
        '$ctrl.year'],
      () => {

        $location.search('startFrom', this.startFrom);
        $location.search('salary', this.salary.grossYear);
        $location.search('ruling', +this.salary.ruling);
        $location.search('socialSecurity', +this.salary.socialSecurity);
        $location.search('year', this.year);
        $location.search('allowance', +this.salary.allowance);

        let grossYear = this.salary.grossYear || 0;
        if(this.salary.allowance){
          grossYear = grossYear / 1.08;  //-8%
        }

        this.salary.taxableYear = grossYear;
        if(this.salary.ruling){
          this.salary.taxableYear = this.salary.taxableYear * 0.7;
        }
        this.salary.generalCredit = getAlgemeneHeffingskorting(this.salary.taxableYear);
        this.salary.labourCredit = getArbeidskorting(this.salary.taxableYear);
        this.salary.grossMonth = ~~(grossYear / 12);
        this.salary.netYear = grossYear - getTaxAmount(this.salary.taxableYear, this.salary.socialSecurity, this.year);
        this.salary.netYear += this.salary.generalCredit + this.salary.labourCredit;
        this.salary.netMonth = ~~(this.salary.netYear / 12);
        this.salary.incomeTax = getTaxAmount(this.salary.taxableYear, this.salary.socialSecurity, this.year);
      });

    function getTaxRates(ratesYear, socialSecurity) {
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

    function getTaxAmount(taxableIncome, socialSecurity, ratesYear) {

      const taxAmountPeriods = getTaxAmountPeriods(ratesYear);
      const taxRates = getTaxRates(ratesYear, socialSecurity);
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

    //labor discount
    function getArbeidskorting(salary){
      if(salary < 9147){
        return salary * 1.793 / 100;
      }
      if(salary < 19758){
        return 164 + (salary - 9147) * 27.698 / 100;
      }
      if(salary < 34015){
        return 3103;
      }
      if(salary < 111590){
        return 3103 - (salary - 39015) * 4 / 100;
      }

      return 0;
    }

    //general discount
    function getAlgemeneHeffingskorting(salary) {
      if(salary < 19922){
        return 2242;
      }
      if(salary < 66417){
        return 2242 - (salary - 19922) * 4.822 / 100;
      }

      return 0;
    }
    
  }
};

export default calcComponent;
