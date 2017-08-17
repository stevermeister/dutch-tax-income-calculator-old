import template from './calc.html';
import constants from '../data.json'; // Get JSON containing calculation constants

let calcComponent = {
  template,
  controller: function($scope, $location) {
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
        'checked': !!+$location.search().grossAllowance || false
      },
      {
        'name': 'grossYear',
        'sign': '',
        'title': 'Year Gross Income',
        'checked': !!+$location.search().grossYear || false
      },
      {
        'name': 'grossMonth',
        'sign': '',
        'title': 'Month Gross Income',
        'checked': !!+$location.search().grossMonth || false
      },
      {
        'name': 'grossWeek',
        'sign': '',
        'title': 'Week Gross Income',
        'checked': !!+$location.search().grossWeek || false
      },
      {
        'name': 'grossDay',
        'sign': '',
        'title': 'Day Gross Income',
        'checked': !!+$location.search().grossDay || false
      },
      {
        'name': 'grossHour',
        'sign': '',
        'title': 'Hour Gross Income',
        'checked': !!+$location.search().grossHour || false
      },
      {
        'name': 'taxFreeYear',
        'sign': '-',
        'title': 'Tax Free Income',
        'checked': !!+$location.search().taxFreeYear || false
      },
      {
        'name': 'taxFree',
        'sign': '',
        'title': 'Ruling Real Percentage',
        'checked': !!+$location.search().taxFree || false
      },
      {
        'name': 'taxableYear',
        'sign': '',
        'title': 'Taxable Income',
        'checked': !!+$location.search().taxableYear || true
      },
      {
        'name': 'payrollTax',
        'sign': '',
        'title': 'Payroll Tax',
        'checked': !!+$location.search().payrollTax || true
      },
      {
        'name': 'socialTax',
        'sign': '',
        'title': 'Social Security Tax',
        'checked': !!+$location.search().socialTax || true
      },
      {
        'name': 'generalCredit',
        'sign': '+',
        'title': 'General Tax Credit',
        'checked': !!+$location.search().generalCredit || true
      },
      {
        'name': 'labourCredit',
        'sign': '+',
        'title': 'Labour Tax Credit',
        'checked': !!+$location.search().labourCredit || true
      },
      {
        'name': 'incomeTax',
        'sign': '-',
        'title': 'Total Income Tax',
        'checked': !!+$location.search().incomeTax || false
      },
      {
        'name': 'netAllowance',
        'sign': '',
        'title': 'Year Net Holiday Allowance',
        'checked': !!+$location.search().netAllowance || false
      },
      {
        'name': 'netYear',
        'sign': '',
        'title': 'Year Net Income',
        'checked': !!+$location.search().netYear || true
      },
      {
        'name': 'netMonth',
        'sign': '',
        'title': 'Month Net Income',
        'checked': !!+$location.search().netMonth || true
      },
      {
        'name': 'netWeek',
        'sign': '',
        'title': 'Week Net Income',
        'checked': !!+$location.search().netWeek || false
      },
      {
        'name': 'netDay',
        'sign': '',
        'title': 'Day Net Income',
        'checked': !!+$location.search().netDay || false
      },
      {
        'name': 'netHour',
        'sign': '',
        'title': 'Hour Net Income',
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
      ],
/*        '$ctrl.ruling.choice',
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
/*        $location.search('rulingChoice', this.ruling.choice);
        $location.search('hours', +this.salary.hours);
        this.output.forEach((item) => {
          $location.search(item.name, +item.checked);
        });*/

        // For calculation instructions:
        // https://www.belastingdienst.nl/wps/wcm/connect/bldcontentnl/themaoverstijgend/brochures_en_publicaties/rekenvoorschriften-voor-de-geautomatiseerde-loonadministratie-januari-2017

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
            if (salary.taxableYear < rulingIncome) { // For partial
              salary.taxFreeYear = grossYear - rulingIncome;
              salary.taxableYear = rulingIncome;
            }
          }
        }

        salary.taxFreeYear = ~~(salary.taxFreeYear);
        salary.taxFree = ~~(salary.taxFreeYear / grossYear * 100);
        salary.taxableYear = ~~(salary.taxableYear);
        salary.payrollTax = -1 * getPayrollTax(this.year, salary.taxableYear);
        salary.socialTax = (salary.socialSecurity) ? -1 * getSocialTax(this.year, salary.taxableYear, salary.older) : 0;
        let socialCredit = getSocialCredit(this.year, salary.older, salary.socialSecurity);
        salary.generalCredit = socialCredit * getGeneralCredit(this.year, salary.taxableYear, salary.older);
        salary.labourCredit = socialCredit * getLabourCredit(this.year, salary.taxableYear, salary.older);
        salary.incomeTax = ~~(salary.payrollTax + salary.socialTax + salary.generalCredit + salary.labourCredit);
        salary.incomeTax = (salary.incomeTax < 0) ? salary.incomeTax : 0;
        salary.netYear = salary.taxableYear + salary.incomeTax + salary.taxFreeYear;
        salary.netAllowance = (salary.allowance) ? ~~(salary.netYear * (0.08 / 1.08)) : 0;
        //salary.netYear -= salary.netAllowance; // Remove holiday allowance from annual net amount
        salary.netMonth = ~~(salary.netYear / 12);
        salary.netWeek = ~~(salary.netYear / constants.workingWeeks);
        salary.netDay = ~~(salary.netYear / constants.workingDays);
        salary.netHour = ~~(salary.netYear / (constants.workingWeeks * salary.hours));
      });

    // 30% Ruling (30%-regeling)
    // https://www.belastingdienst.nl/wps/wcm/connect/bldcontentnl/belastingdienst/prive/internationaal/werken_wonen/tijdelijk_in_een_ander_land_werken/u_komt_in_nederland_werken/30_procent_regeling/voorwaarden_30_procent_regeling/u_hebt_een_specifieke_deskundigheid
    function getRulingIncome(year, ruling) {
      return constants.rulingThreshold[year][ruling || 'normal'];
    }

    // Payroll Tax Rates (Loonbelasting)
    // https://www.belastingdienst.nl/bibliotheek/handboeken/html/boeken/HL/stappenplan-stap_7_loonbelasting_premie_volksverzekeringen.html
    function getPayrollTax(year, salary) {
      return getRates(constants.payrollTax[year], salary, 'rate');
    }

    // Social Security Contribution (Volksverzekeringen - AOW, Anw, Wlz)
    // https://www.belastingdienst.nl/wps/wcm/connect/bldcontentnl/belastingdienst/prive/werk_en_inkomen/sociale_verzekeringen/premies_volks_en_werknemersverzekeringen/volksverzekeringen/volksverzekeringen?projectid=98f8c360-e92a-4fe2-aea6-27e9087ce4a1&projectid=98f8c360-e92a-4fe2-aea6-27e9087ce4a1
    function getSocialTax(year, salary, older) {
      return getRates(constants.socialPercent[year], salary, (older) ? 'older' : 'social');
    }

    // General Tax Credit (Algemene Heffingskorting)
    // https://www.belastingdienst.nl/wps/wcm/connect/bldcontentnl/belastingdienst/prive/inkomstenbelasting/heffingskortingen_boxen_tarieven/heffingskortingen/algemene_heffingskorting/
    function getGeneralCredit(year, salary) {
      return getRates(constants.generalCredit[year], salary, 'rate');
    }

    // Labour Tax Credit (Arbeidskorting)
    // https://www.belastingdienst.nl/wps/wcm/connect/bldcontentnl/belastingdienst/prive/inkomstenbelasting/heffingskortingen_boxen_tarieven/heffingskortingen/arbeidskorting/
    function getLabourCredit(year, salary) {
      return getRates(constants.labourCredit[year], salary, 'rate');
    }

    // Social Security Contribution (Volksverzekeringen) Component of Tax Credit
    // https://www.belastingdienst.nl/wps/wcm/connect/bldcontentnl/belastingdienst/prive/internationaal/fiscale_regelingen/sociale_zekerheid_bij_grensoverschrijdend_werken_en_ondernemen/hoe_wordt_de_premie_berekend/berekening_premie_volksverzekeringen_heffingskorting_deel_van_het_jaar_premieplichtig/heffingskortingen/
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

    // https://www.belastingdienst.nl/wps/wcm/connect/bldcontentnl/themaoverstijgend/brochures_en_publicaties/handboek-loonheffingen-2017
    function getRates(brackets, salary, type) {
      let amount = 0,
        tax, delta, percent;

      brackets.some((bracket, index) => {
        delta = (bracket.max) ? bracket.max - bracket.min : Infinity; // Consider infinity when no upper bound
        tax = (type && bracket[type]) ? bracket[type] : bracket['rate'];
        percent = (tax != 0 && tax > -1 && tax < 1); // Check if rate is percentage or fixed
        if (salary <= delta) {
          if (percent) {
            amount += Math.trunc((salary * 100) * tax) / 100; // Round down at 2 decimal places
          } else {
            amount = tax;
          }
          //console.log(index, salary, delta, tax, percent, amount);
          return true; // Break loop when reach last bracket
        } else {
          if (percent) {
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

export default calcComponent;
