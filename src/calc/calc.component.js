import template from './calc.html';
import constants from '../data.json'; // Get JSON containing calculation constants

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
/*        $location.search('hours', +this.salary.hours);
        this.output.forEach((item) => {
          $location.search(item.name, +item.checked);
        });*/

        // For calculation instructions:
        // https://www.belastingdienst.nl/wps/wcm/connect/nl/zoeken/zoeken?q=Rekenvoorschriften+voor+de+geautomatiseerde+loonadministratie

        let salary = this.salary;
        salary.grossYear = salary.grossMonth = salary.grossWeek = salary.grossDay = salary.grossHour = 0;
        salary['gross' + this.startFrom] = salary.income;
        let grossYear = salary.grossYear + salary.grossMonth * 12 + salary.grossWeek * constants.workingWeeks;
        grossYear += salary.grossDay * constants.workingDays + salary.grossHour * constants.workingWeeks * salary.hours;
        if (!grossYear || grossYear < 0) {
          grossYear = 0;
        }

        salary.grossAllowance = (salary.allowance) ? ~~(grossYear * (0.08 / 1.08)) : 0; // Vakantiegeld (8%)
        salary.grossYear = ~~(grossYear);
        salary.grossMonth = ~~(grossYear / 12);
        salary.grossWeek = ~~(grossYear / constants.workingWeeks);
        salary.grossDay = ~~(grossYear / constants.workingDays);
        salary.grossHour = ~~(grossYear / (constants.workingWeeks * salary.hours));

        salary.taxFreeYear = 0;
        salary.taxableYear = grossYear - salary.grossAllowance;
        if (this.ruling.checked) {
          let rulingIncome = getRulingIncome(this.year, this.ruling.choice);
          if (salary.taxableYear > rulingIncome) {
            salary.taxFreeYear = salary.taxableYear * 0.30;
            salary.taxableYear -= salary.taxFreeYear;
            // this was a strange condition, I comment out it for now
            // if (salary.taxableYear < rulingIncome) { // For partial
            //   salary.taxFreeYear = grossYear - rulingIncome;
            //   salary.taxableYear = rulingIncome;
            // }
          }
        }

        salary.taxFreeYear = ~~(salary.taxFreeYear);
        salary.taxFree = ~~(salary.taxFreeYear / grossYear * 100);
        salary.taxableYear = ~~(salary.taxableYear);
        salary.payrollTax = -1 * getPayrollTax(this.year, salary.taxableYear);
        salary.socialTax = (salary.socialSecurity) ? -1 * getSocialTax(this.year, salary.taxableYear, salary.older) : 0;
        let socialCredit = getSocialCredit(this.year, salary.older, salary.socialSecurity);
        salary.generalCredit = getGeneralCredit(this.year, salary.taxableYear, socialCredit);
        salary.labourCredit = getLabourCredit(this.year, salary.taxableYear, socialCredit);
        salary.incomeTax = ~~(salary.payrollTax + salary.socialTax + salary.generalCredit + salary.labourCredit);
        salary.incomeTax = (salary.incomeTax < 0) ? salary.incomeTax : 0;
        salary.incomeTaxMonth = ~~(salary.incomeTax / 12);
        salary.netYear = salary.taxableYear + salary.incomeTax + salary.taxFreeYear;
        salary.netAllowance = (salary.allowance) ? ~~(salary.netYear * (0.08 / 1.08)) : 0;
        //salary.netYear -= salary.netAllowance; // Remove holiday allowance from annual net amount
        salary.netMonth = ~~(salary.netYear / 12);
        salary.netWeek = ~~(salary.netYear / constants.workingWeeks);
        salary.netDay = ~~(salary.netYear / constants.workingDays);
        salary.netHour = ~~(salary.netYear / (constants.workingWeeks * salary.hours));
      });

    /**
     * 30% Ruling (30%-regeling)
     * https://www.belastingdienst.nl/wps/wcm/connect/bldcontentnl/belastingdienst/prive/internationaal/werken_wonen/tijdelijk_in_een_ander_land_werken/u_komt_in_nederland_werken/30_procent_regeling/voorwaarden_30_procent_regeling/u-hebt-een-specifieke-deskundigheid
     * 
     * @param {string} year Year to retrieve information from
     * @param {string} ruling Choice between scientific research workers, young professionals with Master's degree or others cases
     * @returns {number} The 30% Ruling minimum income
     */
    function getRulingIncome(year, ruling) {
      return constants.rulingThreshold[year][ruling];
    }

    /**
     * Payroll Tax Rates (Loonbelasting)
     * https://www.belastingdienst.nl/bibliotheek/handboeken/html/boeken/HL/stappenplan-stap_7_loonbelasting_premie_volksverzekeringen.html
     * 
     * @param {string} year Year to retrieve information from
     * @param {number} salary Taxable wage that will be used for calculation
     * @returns {number} The Payroll Tax Rates after calculating proper bracket amount
     */
    function getPayrollTax(year, salary) {
      $log.debug(`Payroll Tax Brackets ${year}`);
      return getRates(constants.payrollTax[year], salary, 'rate');
    }

    /**
     * Social Security Contribution (Volksverzekeringen - AOW, Anw, Wlz)
     * https://www.belastingdienst.nl/wps/wcm/connect/bldcontentnl/belastingdienst/prive/werk_en_inkomen/sociale_verzekeringen/premies_volks_en_werknemersverzekeringen/volksverzekeringen/volksverzekeringen
     * 
     * @param {string} year Year to retrieve information from
     * @param {number} salary Taxable wage that will be used for calculation
     * @param {string} [older] Whether is after retirement age or not
     * @returns {number} The Social Security Contribution after calculating proper bracket amount
     */
    function getSocialTax(year, salary, older = 'social') {
      $log.debug(`Social Security Contribution Brackets ${year}`);
      return getRates(constants.socialPercent[year], salary, (older) ? 'older' : 'social');
    }

    /**
     * General Tax Credit (Algemene Heffingskorting)
     * https://www.belastingdienst.nl/wps/wcm/connect/bldcontentnl/belastingdienst/prive/inkomstenbelasting/heffingskortingen_boxen_tarieven/heffingskortingen/algemene_heffingskorting/
     * 
     * @param {string} year Year to retrieve information from
     * @param {number} salary Taxable wage that will be used for calculation
     * @param {number} [multiplier] Scalar value to multiple against final result
     * @returns {number} The General Tax Credit after calculating proper bracket amount
     */
    function getGeneralCredit(year, salary, multiplier = 1) {
      $log.debug(`General Tax Credit Brackets ${year}`);
      return getRates(constants.generalCredit[year], salary, 'rate', multiplier);
    }

    /**
     * Labour Tax Credit (Arbeidskorting)
     * https://www.belastingdienst.nl/wps/wcm/connect/bldcontentnl/belastingdienst/prive/inkomstenbelasting/heffingskortingen_boxen_tarieven/heffingskortingen/arbeidskorting/
     * 
     * @param {string} year Year to retrieve information from
     * @param {number} salary Taxable wage that will be used for calculation
     * @param {number} [multiplier] Scalar value to multiple against final result
     * @returns {number} The Labout Tax Credit after calculating proper bracket amount
     */
    function getLabourCredit(year, salary, multiplier = 1) {
      $log.debug(`Labour Tax Credit Brackets ${year}`);
      return getRates(constants.labourCredit[year], salary, 'rate', multiplier);
    }

    /**
     * Social Security Contribution (Volksverzekeringen) Component of Tax Credit
     * https://www.belastingdienst.nl/wps/wcm/connect/bldcontentnl/belastingdienst/prive/werk_en_inkomen/sociale_verzekeringen/premies_volks_en_werknemersverzekeringen/volksverzekeringen/hoeveel_moet_u_betalen
     * 
     * @param {string} year Year to retrieve information from
     * @param {boolean} older Whether is after retirement age or not
     * @param {boolean} socialSecurity Whether social security will be considered or not
     * @returns {number} Social Security contribution percentage to apply to wage credit
     */
    function getSocialCredit(year, older, socialSecurity) {
      /*
      * JSON properties for socialPercent object
      * rate: Higher full rate including social contributions to be used to get proportion
      * social: Percentage of social contributions (AOW + Anw + Wlz)
      * older: Percentage for retirement age (Anw + Wlz, no contribution to AOW)
      */
      let bracket = constants.socialPercent[year][0],
        percentage = 1;
      if (!socialSecurity) {
        percentage = (bracket.rate - bracket.social) / bracket.rate; // Removing AOW + Anw + Wlz from total
      } else if (older) {
        percentage = (bracket.rate + bracket.older - bracket.social) / bracket.rate; // Removing only AOW from total
      }
      return percentage;
    }

    /**
     * Get right amount based on the rate brackets passed
     * https://www.belastingdienst.nl/wps/wcm/connect/bldcontentnl/themaoverstijgend/brochures_en_publicaties/nieuwsbrief-loonheffingen-2020
     * 
     * @param {object[]} brackets Rate brackets to extract information from
     * @param {number} salary Taxable wage that will be used for calculation
     * @param {string} kind Property name to be extracted from bracket
     * @param {number} [multiplier] Scalar value to multiple against final result
     * @returns {number} Accumulated tax/credit amount to be used to calculate the net income
     */
    function getRates(brackets, salary, kind, multiplier = 1) {
      let amount = 0,
        tax, delta, isPercent;

      brackets.some((bracket, index) => {
        delta = (bracket.max) ? bracket.max - bracket.min : Infinity; // Consider infinity when no upper bound
        tax = Math.round(multiplier * ((kind && bracket[kind]) ? bracket[kind] : bracket['rate']) * 100000) / 100000;
        isPercent = (tax != 0 && tax > -1 && tax < 1); // Check if rate is percentage or fixed
        if (salary <= delta) {
          if (isPercent) {
            amount += Math.trunc((salary * 100) * tax) / 100; // Round down at 2 decimal places
          } else {
            amount = tax;
          }
          //console.log(index, salary, delta, tax, isPercent, amount);
          return true; // Break loop when reach last bracket
        } else {
          if (isPercent) {
            amount += (delta * tax);
          } else {
            amount = tax;
          }
          salary -= delta;
        }
      });
      return amount;
    }
  }
};

calcComponent.$inject = ['$scope', '$location', '$log'];
export default calcComponent;
