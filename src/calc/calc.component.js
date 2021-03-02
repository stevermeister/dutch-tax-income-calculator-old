import template from './calc.html';
import { constants, SalaryPaycheck } from 'dutch-tax-income-calculator';

let calcComponent = {
  template,
  controller: function($scope, $location, $log) {
    this.year = constants.currentYear;
    this.years = constants.years;
    if ($location.search().year && this.years.indexOf(+$location.search().year) !== -1) {
      this.year = +$location.search().year;
    }

    this.startFrom = $location.search().startFrom || 'Year';

    this.salary = {
      income: +$location.search().salary || 36000,
      allowance: !!+$location.search().allowance || false,
      socialSecurity: (angular.isDefined($location.search().socialSecurity) && $location.search().socialSecurity === '0')?false:true,
      older: !!+$location.search().retired || false,
      hours: +$location.search().hours || constants.defaultWorkingHours,
    };

    this.ruling = {
      checked: !!+$location.search().ruling || false,
      choice: $location.search().rulingChoice || 'normal',
    }

    this.output = [
      {
        'name': 'grossAllowance',
        'sign': '',
        'title': 'Year Gross Holiday Allowance',
        'label': 'Gross Holiday Allowance per year',
        'checked': !!+$location.search().grossAllowance || false
      },
      {
        'name': 'grossYear',
        'sign': '',
        'title': 'Year Gross Income',
        'label': 'Annual Gross Income',
        'checked': !!+$location.search().grossYear || false
      },
      {
        'name': 'grossMonth',
        'sign': '',
        'title': 'Month Gross Income',
        'label': 'Monthly Gross Income',
        'checked': !!+$location.search().grossMonth || false
      },
      {
        'name': 'grossWeek',
        'sign': '',
        'title': 'Week Gross Income',
        'label': 'Gross Income per week',
        'checked': !!+$location.search().grossWeek || false
      },
      {
        'name': 'grossDay',
        'sign': '',
        'title': 'Day Gross Income',
        'label': 'Gross Income per day',
        'checked': !!+$location.search().grossDay || false
      },
      {
        'name': 'grossHour',
        'sign': '',
        'title': 'Hour Gross Income',
        'label': 'Gross Income per hour',
        'checked': !!+$location.search().grossHour || false
      },
      {
        'name': 'taxFreeYear',
        'sign': '-',
        'title': 'Tax Free Income',
        'label': 'Ammount of income that goes tax free',
        'checked': !!+$location.search().taxFreeYear || false
      },
      {
        'name': 'taxFree',
        'sign': '',
        'title': 'Ruling Real Percentage',
        'label': 'Absolute Percentage calculated from ruling income and non ruling',
        'checked': !!+$location.search().taxFree || false
      },
      {
        'name': 'taxableYear',
        'sign': '',
        'title': 'Taxable Income',
        'label': 'Taxable Income Amount',
        'checked': !!+$location.search().taxableYear || true
      },
      {
        'name': 'payrollTax',
        'sign': '',
        'title': 'Payroll Tax',
        'label': 'Payroll tax is tax imposed on employers or employees, and is calculated as a percentage of the salary that employer pay their staff',
        'checked': !!+$location.search().payrollTax || true
      },
      {
        'name': 'socialTax',
        'sign': '',
        'title': 'Social Security Tax',
        'label': 'Social Security tax is the tax levied on both employers and employees to fund the Social Security program',
        'checked': !!+$location.search().socialTax || true
      },
      {
        'name': 'generalCredit',
        'sign': '+',
        'title': 'General Tax Credit',
        'label': 'General tax credit (algemene heffingskorting) that everyone is entitled',
        'checked': !!+$location.search().generalCredit || true
      },
      {
        'name': 'labourCredit',
        'sign': '+',
        'title': 'Labour Tax Credit',
        'label': 'Labour tax credit (arbeidskorting) that is given to those that are still in the labour force',
        'checked': !!+$location.search().labourCredit || true
      },
      {
        'name': 'incomeTax',
        'sign': '-',
        'title': 'Total Income Tax',
        'label': 'Total Amount of Taxes',
        'checked': !!+$location.search().incomeTax || false
      },
      {
        'name': 'incomeTaxMonth',
        'sign': '-',
        'title': 'Month Total Income Tax',
        'label': 'Total Amount of Taxes per Month',
        'checked': !!+$location.search().incomeTaxMonth || false
      },
      {
        'name': 'netAllowance',
        'sign': '',
        'title': 'Year Net Holiday Allowance',
        'label': 'Year Net Holiday Allowance',
        'checked': !!+$location.search().netAllowance || false
      },
      {
        'name': 'netYear',
        'sign': '',
        'title': 'Year Net Income',
        'label': 'Annual Net Income',
        'checked': !!+$location.search().netYear || true
      },
      {
        'name': 'netMonth',
        'sign': '',
        'title': 'Month Net Income',
        'label': 'Monthly Net Income',
        'checked': !!+$location.search().netMonth || true
      },
      {
        'name': 'netWeek',
        'sign': '',
        'title': 'Week Net Income',
        'label': 'Weekly Net Income',
        'checked': !!+$location.search().netWeek || false
      },
      {
        'name': 'netDay',
        'sign': '',
        'title': 'Day Net Income',
        'label': 'Daily Net Income',
        'checked': !!+$location.search().netDay || false
      },
      {
        'name': 'netHour',
        'sign': '',
        'title': 'Hour Net Income',
        'label': 'Hourly Net Income',
        'checked': !!+$location.search().netHour || false
      },
    ];


    $scope.$watchGroup([
        '$ctrl.year',
        '$ctrl.startFrom',
        '$ctrl.salary.hours',
        '$ctrl.salary.income',
        '$ctrl.salary.allowance',
        '$ctrl.salary.socialSecurity',
        '$ctrl.salary.older',
        '$ctrl.ruling.checked',
        '$ctrl.ruling.choice',
      ],
/*
        '$ctrl.salary.hours',
      ].concat(this.output.map((item, index) => {
          return '$ctrl.output[' + index + '].checked';
        })),*/
      () => {
        $location.search('year', +this.year);
        $location.search('startFrom', this.startFrom);
        $location.search('salary', +this.salary.income);
        $location.search('allowance', +this.salary.allowance);
        $location.search('socialSecurity', +this.salary.socialSecurity);
        $location.search('retired', +this.salary.older);
        $location.search('ruling', +this.ruling.checked);
        $location.search('rulingChoice', this.ruling.choice);
        ga('send', 'pageview', $location.path());
/*        $location.search('hours', +this.salary.hours);
        this.output.forEach((item) => {
          $location.search(item.name, +item.checked);
        });*/

        const paycheck = new SalaryPaycheck(this.salary, this.startFrom, this.year, this.ruling);
        $log.debug(paycheck);
        this.salary = {
          ...this.salary,
          ...paycheck,
        }
      });
  }
};

calcComponent.$inject = ['$scope', '$location', '$log'];
export default calcComponent;
