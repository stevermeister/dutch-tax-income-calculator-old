import template from './calc.html';
import c from '../data.json'; // Get JSON containing calculation constants

let calcComponent = {
  template,
  controller: function($scope, $location) {
    this.year = c.currentYear;
    this.years = c.years;
    if ($location.search().year && this.years.indexOf(+$location.search().year) !== -1) {
      this.year = +$location.search().year;
    }

    this.startFrom = $location.search().startFrom || 'Year';

    this.salary = {
      income: +$location.search().salary || 36000,
      grossYear: 0,
      grossMonth: 0,
      grossWeek: 0,
      grossDay: 0,
      grossHour: 0,
      netYear: 0,
      netMonth: 0,
      taxFree: 0,
      older: !!+$location.search().older || false,
      socialSecurity: (angular.isDefined($location.search().socialSecurity) && $location.search().socialSecurity === '0')?false:true,
      allowance: !!+$location.search().allowance || false,
      hours: +$location.search().hours || c.defaultWorkingHours,
    };

    this.ruling = {
      checked: !!+$location.search().rulingChecked || false,
      choice: $location.search().rulingChoice || 'normal',
    }

    this.output = {
      'grossAllowance': {
        'title': 'Year Gross Holiday Allowance',
        'checked': !!+$location.search().grossAllowance || false
      },
      'grossYear': {
        'title': 'Year Gross Income',
        'checked': !!+$location.search().grossYear || false
      },
      'grossMonth': {
        'title': 'Month Gross Income',
        'checked': !!+$location.search().grossMonth || false
      },
      'grossWeek': {
        'title': 'Week Gross Income',
        'checked': !!+$location.search().grossWeek || false
      },
      'grossDay': {
        'title': 'Day Gross Income',
        'checked': !!+$location.search().grossDay || false
      },
      'grossHour': {
        'title': 'Hour Gross Income',
        'checked': !!+$location.search().grossHour || false
      },
      'taxFreeYear': {
        'title': 'Tax Free Income',
        'checked': !!+$location.search().taxFreeYear || false
      },
      'taxFree': {
        'title': 'Ruling Real Percentage',
        'checked': !!+$location.search().taxFree || false
      },
      'taxableYear': {
        'title': 'Taxable Income',
        'checked': !!+$location.search().taxableYear || true
      },
      'incomeTax': {
        'title': 'Income Tax',
        'checked': !!+$location.search().incomeTax || true
      },
      'socialTax': {
        'title': 'Social Security Tax',
        'checked': !!+$location.search().socialTax || true
      },
      'generalCredit': {
        'title': 'General Tax Credit',
        'checked': !!+$location.search().generalCredit || true
      },
      'labourCredit': {
        'title': 'Labour Tax Credit',
        'checked': !!+$location.search().labourCredit || true
      },
      'totalTax': {
        'title': 'Total Tax',
        'checked': !!+$location.search().totalTax || false
      },
      'netAllowance': {
        'title': 'Year Net Holiday Allowance',
        'checked': !!+$location.search().netAllowance || false
      },
      'netYear': {
        'title': 'Year Net Income',
        'checked': !!+$location.search().netYear || true
      },
      'netMonth': {
        'title': 'Month Net Income',
        'checked': !!+$location.search().netMonth || true
      },
      'netWeek': {
        'title': 'Week Net Income',
        'checked': !!+$location.search().netWeek || false
      },
      'netDay': {
        'title': 'Day Net Income',
        'checked': !!+$location.search().netDay || false
      },
      'netHour': {
        'title': 'Hour Net Income',
        'checked': !!+$location.search().netHour || false
      },
    };

    $scope.$watchGroup([
        '$ctrl.startFrom',
        '$ctrl.salary.ruling',
        '$ctrl.salary.socialSecurity',
        '$ctrl.salary.older',
        '$ctrl.salary.income',
        '$ctrl.salary.allowance',
        '$ctrl.salary.hours',
        '$ctrl.year',
        '$ctrl.ruling.checked',
        '$ctrl.ruling.choice',
        '$ctrl.output.grossAllowance.checked',   
        '$ctrl.output.grossYear.checked',
        '$ctrl.output.grossMonth.checked',
        '$ctrl.output.grossWeek.checked',
        '$ctrl.output.grossDay.checked',
        '$ctrl.output.grossHour.checked',
        '$ctrl.output.taxableYear.checked',
        '$ctrl.output.taxFreeYear.checked',
        '$ctrl.output.taxFree.checked',
        '$ctrl.output.incomeTax.checked',
        '$ctrl.output.socialTax.checked',
        '$ctrl.output.generalCredit.checked',
        '$ctrl.output.labourCredit.checked',
        '$ctrl.output.totalTax.checked',
        '$ctrl.output.netAllowance.checked',
        '$ctrl.output.netYear.checked',
        '$ctrl.output.netMonth.checked',
        '$ctrl.output.netWeek.checked',
        '$ctrl.output.netDay.checked',
        '$ctrl.output.netHour.checked',
        ],
      () => {
        $location.search('startFrom', this.startFrom);
        $location.search('salary', this.salary.income);
        $location.search('rulingChecked', +this.ruling.checked);
        $location.search('rulingChoice', this.ruling.choice);
        $location.search('socialSecurity', +this.salary.socialSecurity);
        $location.search('older', +this.salary.older);
        $location.search('year', this.year);
        $location.search('allowance', +this.salary.allowance);
        $location.search('hours', +this.salary.hours);
        $location.search('grossAllowance', +this.output.grossAllowance.checked);
        $location.search('grossYear', +this.output.grossYear.checked);
        $location.search('grossMonth', +this.output.grossMonth.checked);
        $location.search('grossWeek', +this.output.grossWeek.checked);
        $location.search('grossDay', +this.output.grossDay.checked);
        $location.search('grossHour', +this.output.grossHour.checked);
        $location.search('taxFreeYear', +this.output.taxFreeYear.checked);
        $location.search('taxFree', +this.output.taxFree.checked);
        $location.search('taxableYear', +this.output.taxableYear.checked);
        $location.search('grossMonth', +this.output.grossMonth.checked);
        $location.search('incomeTax', +this.output.incomeTax.checked);
        $location.search('socialTax', +this.output.socialTax.checked);
        $location.search('generalCredit', +this.output.generalCredit.checked);
        $location.search('labourCredit', +this.output.labourCredit.checked);
        $location.search('totalTax', +this.output.totalTax.checked);
        $location.search('netAllowance', +this.output.netAllowance.checked);
        $location.search('netYear', +this.output.netYear.checked);
        $location.search('netMonth', +this.output.netMonth.checked);
        $location.search('netWeek', +this.output.netWeek.checked);
        $location.search('netDay', +this.output.netDay.checked);
        $location.search('netHour', +this.output.netHour.checked);

        // For calculation instructions:
        // https://www.belastingdienst.nl/wps/wcm/connect/bldcontenten/belastingdienst/business/payroll_taxes/you_are_not_established_in_the_netherlands_are_you_required_to_withhold_payroll_taxes/when_you_are_going_to_withhold_payroll_taxes/calculating_payroll_taxes/calculating_wage_tax_national_insurance_contributions

        let s = this.salary;
        s.grossYear = s.grossMonth = s.grossWeek = s.grossDay = s.grossHour = 0;

        s['gross' + this.startFrom] = s.income;
        
        let grossYear = s.grossYear + s.grossMonth * 12 + s.grossWeek * c.workingWeeks;
        grossYear += s.grossDay * c.workingDays + s.grossHour * c.workingWeeks * s.hours;
        console.log(s['gross' + this.startFrom], s.income, grossYear);
        if (!grossYear || grossYear < 0) {
          grossYear = 0;
        }

        s.grossAllowance = (s.allowance) ? ~~(grossYear * (0.08 / 1.08)) : 0; // Vakantiegeld (8%)
        s.grossYear = ~~(grossYear);
        s.grossMonth = ~~(grossYear / 12);
        s.grossWeek = ~~(grossYear / c.workingWeeks);
        s.grossDay = ~~(grossYear / c.workingDays);
        s.grossHour = ~~(grossYear / (c.workingWeeks * s.hours));

        s.taxFreeYear = 0;
        s.taxableYear = grossYear;
        if (this.ruling.checked) {
          let rulingIncome = getRulingIncome(this.year, this.ruling.choice);
          if (s.taxableYear > rulingIncome) {
            s.taxFreeYear = s.taxableYear * 0.30;
            s.taxableYear -= s.taxFreeYear;
            if (s.taxableYear < rulingIncome) { // For partial
              s.taxFreeYear = grossYear - rulingIncome;
              s.taxableYear = rulingIncome;
            }
          }
        }

        s.taxFreeYear = ~~(s.taxFreeYear);
        s.taxFree = ~~(s.taxFreeYear / grossYear * 100);
        s.taxableYear = ~~(s.taxableYear);
        s.incomeTax = -1 * getIncomeTax(this.year, s.taxableYear);
        s.socialTax = (s.socialSecurity) ? -1 * getSocialTax(this.year, s.taxableYear, s.older) : 0;
        let socialCredit = getSocialCredit(this.year, s.older, s.socialSecurity);
        s.generalCredit = socialCredit * getGeneralCredit(this.year, s.taxableYear, s.older);
        s.labourCredit = socialCredit * getLabourCredit(this.year, s.taxableYear, s.older);
        s.totalTax = ~~(s.incomeTax + s.socialTax + s.generalCredit + s.labourCredit);
        s.totalTax = (s.totalTax < 0) ? s.totalTax : 0;
        s.netYear = s.taxableYear + s.totalTax + s.taxFreeYear;
        s.netAllowance = (s.allowance) ? ~~(s.netYear * (0.08 / 1.08)) : 0;
        //s.netYear -= s.netAllowance; // Remove holiday allowance from annual net amount
        s.netMonth = ~~(s.netYear / 12);
        s.netWeek = ~~(s.netYear / c.workingWeeks);
        s.netDay = ~~(s.netYear / c.workingDays);
        s.netHour = ~~(s.netYear / (c.workingWeeks * s.hours));
      });

    // 30% Ruling (30%-regeling)
    // https://www.belastingdienst.nl/wps/wcm/connect/bldcontentnl/belastingdienst/prive/internationaal/werken_wonen/tijdelijk_in_een_ander_land_werken/u_komt_in_nederland_werken/30_procent_regeling/voorwaarden_30_procent_regeling/u_hebt_een_specifieke_deskundigheid
    function getRulingIncome(year, ruling) {
      return c.rulingThreshold[year][ruling || 'normal'];
    }

    // Income Tax Rates (Inkomstenbelasting)
    // https://www.belastingdienst.nl/wps/wcm/connect/nl/werk-en-inkomen/content/hoeveel-inkomstenbelasting-betalen
    function getIncomeTax(year, salary) {
      return getRates(c.incomeTax[year], salary, 'rate');
    }

    // Social Security Contribution (Volksverzekeringen - AOW, Anw, Wlz)
    // https://www.belastingdienst.nl/wps/wcm/connect/bldcontentnl/belastingdienst/prive/werk_en_inkomen/sociale_verzekeringen/premies_volks_en_werknemersverzekeringen/volksverzekeringen/volksverzekeringen?projectid=98f8c360-e92a-4fe2-aea6-27e9087ce4a1&projectid=98f8c360-e92a-4fe2-aea6-27e9087ce4a1
    function getSocialTax(year, salary, older) {
      return getRates(c.socialPercent[year], salary, (older) ? 'older' : 'social');
    }

    // General Tax Credit (Algemene Heffingskorting)
    // https://www.belastingdienst.nl/wps/wcm/connect/bldcontentnl/belastingdienst/prive/inkomstenbelasting/heffingskortingen_boxen_tarieven/heffingskortingen/algemene_heffingskorting/
    function getGeneralCredit(year, salary) {
      return getRates(c.generalCredit[year], salary, 'rate');
    }

    // Labour Tax Credit (Arbeidskorting)
    // https://www.belastingdienst.nl/wps/wcm/connect/bldcontentnl/belastingdienst/prive/inkomstenbelasting/heffingskortingen_boxen_tarieven/heffingskortingen/arbeidskorting/
    function getLabourCredit(year, salary) {
      return getRates(c.labourCredit[year], salary, 'rate');
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
      let b = c.socialPercent[year][0],
        percentage = 1;
      if (!socialSecurity) {
        percentage = (b.rate - b.social) / b.rate; // Removing AOW + Anw + Wlz from total
      } else if (older) {
        percentage = (b.rate + b.older - b.social) / b.rate; // Removing only AOW from total
      }
      return percentage;
    }

    function getRates(brackets, salary, type) {
      let amount = 0,
        tax, delta, percent;

      brackets.some((r, i) => {
        delta = (r.max) ? r.max - r.min : Infinity; // Consider infinity when no upper bound
        tax = (type && r[type]) ? r[type] : r['rate'];
        percent = (tax != 0 && tax > -1 && tax < 1); // Check if rate is percentage or fixed
        if (salary <= delta) {
          if (percent) {
            amount += Math.trunc((salary * 100) * tax) / 100; // Round down at 2 decimal places
          } else {
            amount = tax;
          }
          //console.log(i, salary, delta, tax, percent, amount);
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
