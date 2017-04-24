import template from './calc.html';
import c from './calc.json'; // Get JSON containing calculation constants

let calcComponent = {
  template,
  controller: function($scope, $location) {
    this.year = 2017;
    if($location.search().year && [2015, 2016, 2017].indexOf(+$location.search().year) !== -1) {
      this.year = +$location.search().year;
    }

    this.startFrom = 'year';
    if(['year', 'month'].indexOf($location.search().startFrom) !==-1){
      this.startFrom = $location.search().startFrom;
    }

    this.salary = {
      grossMonth: 0,
      netYear: 0,
      netMonth: 0,
      taxFree: 0,
      ruling: !!+$location.search().ruling || false,
      older: !!+$location.search().older || false,
      socialSecurity: (angular.isDefined($location.search().socialSecurity) && $location.search().socialSecurity === '0')?false:true,
      allowance: !!+$location.search().allowance || false,
      hours: +$location.search().hours || c.defaultWorkingHours,
    };

    this.ruling = $location.search().rulingChoice || 'normal';

    this.show = {
      grossMonth: !!+$location.search().grossMonth || false,
      grossWeek: !!+$location.search().grossWeek || false,
      grossDay: !!+$location.search().grossDay || false,
      grossHour: !!+$location.search().grossMonth || false,
      grossAllowance: !!+$location.search().grossAllowance || false,
      taxableYear: !!+$location.search().taxableYear || true,
      taxFreeYear: !!+$location.search().taxFreeYear || false,
      taxFree: !!+$location.search().taxFree || false,
      incomeTax: !!+$location.search().incomeTax || true,
      socialTax: !!+$location.search().socialTax || true,
      generalCredit: !!+$location.search().generalCredit || true,
      labourCredit: !!+$location.search().labourCredit || true,
      totalTax: !!+$location.search().totalTax || false,
      netAllowance: !!+$location.search().netAllowance || false,
      netYear: !!+$location.search().netYear || true,
      netMonth: !!+$location.search().netMonth || true,
      netWeek: !!+$location.search().netWeek || false,
      netDay: !!+$location.search().netDay || false,
      netHour: !!+$location.search().netHour || false,
    };

    this.salary.grossYear = 36000;
    if(+$location.search().salary){
      this.salary.grossYear = +$location.search().salary;
    }

    this.salaryOutputOptions = {
      'grossYear': 'Year Gross Income',
      'grossMonth': 'Month Gross Income',
      'grossWeek': 'Week Gross Income',
      'grossDay': 'Day Gross Income',
      'grossHour': 'Hour Gross Income',
      'grossAllowance': 'Year Gross Holiday Allowance',
      'taxFreeYear': 'Tax Free Income',
      'taxFree': 'Ruling Real Percentage',
      'taxableYear': 'Taxable Income',
      'incomeTax': 'Income Tax',
      'socialTax': 'Social Security Tax',
      'generalCredit': 'General Tax Credit',
      'labourCredit': 'Labour Tax Credit',
      'totalTax': 'Total Tax',
      'netAllowance': 'Year Net Holiday Allowance',
      'netYear': 'Year Net Income',
      'netMonth': 'Month Net Income',
      'netWeek': 'Week Net Income',
      'netDay': 'Day Net Income',
      'netHour': 'Hour Net Income',
    };

    $scope.$watchGroup([
        '$ctrl.startFrom',
        '$ctrl.salary.ruling',
        '$ctrl.salary.socialSecurity',
        '$ctrl.salary.older',
        '$ctrl.salary.grossYear',
        '$ctrl.salary.allowance',
        '$ctrl.salary.hours',
        '$ctrl.year',
        '$ctrl.ruling',       
        '$ctrl.show.grossYear',
        '$ctrl.show.grossMonth',
        '$ctrl.show.grossWeek',
        '$ctrl.show.grossDay',
        '$ctrl.show.grossHour',
        '$ctrl.show.grossAllowance',
        '$ctrl.show.taxableYear',
        '$ctrl.show.taxFreeYear',
        '$ctrl.show.taxFree',
        '$ctrl.show.incomeTax',
        '$ctrl.show.socialTax',
        '$ctrl.show.generalCredit',
        '$ctrl.show.labourCredit',
        '$ctrl.show.totalTax',
        '$ctrl.show.netAllowance',
        '$ctrl.show.netYear',
        '$ctrl.show.netMonth',
        '$ctrl.show.netWeek',
        '$ctrl.show.netDay',
        '$ctrl.show.netHour',
        ],
      () => {

        $location.search('startFrom', this.startFrom);
        $location.search('salary', this.salary.grossYear);
        $location.search('ruling', +this.salary.ruling);
        $location.search('rulingChoice', this.ruling);
        $location.search('socialSecurity', +this.salary.socialSecurity);
        $location.search('older', +this.salary.older);
        $location.search('year', this.year);
        $location.search('allowance', +this.salary.allowance);
        $location.search('hours', +this.salary.hours);
        $location.search('grossMonth', +this.show.grossMonth);
        $location.search('grossWeek', +this.show.grossWeek);
        $location.search('grossDay', +this.show.grossDay);
        $location.search('grossHour', +this.show.grossHour);
        $location.search('grossAllowance', +this.show.grossAllowance);
        $location.search('taxFreeYear', +this.show.taxFreeYear);
        $location.search('taxFree', +this.show.taxFree);
        $location.search('taxableYear', +this.show.taxableYear);
        $location.search('grossMonth', +this.show.grossMonth);
        $location.search('incomeTax', +this.show.incomeTax);
        $location.search('socialTax', +this.show.socialTax);
        $location.search('generalCredit', +this.show.generalCredit);
        $location.search('labourCredit', +this.show.labourCredit);
        $location.search('totalTax', +this.show.totalTax);
        $location.search('netAllowance', +this.show.netAllowance);
        $location.search('netYear', +this.show.netYear);
        $location.search('netMonth', +this.show.netMonth);
        $location.search('netWeek', +this.show.netWeek);
        $location.search('netDay', +this.show.netDay);
        $location.search('netHour', +this.show.netHour);

        // For calculation instructions:
        // https://www.belastingdienst.nl/wps/wcm/connect/bldcontenten/belastingdienst/business/payroll_taxes/you_are_not_established_in_the_netherlands_are_you_required_to_withhold_payroll_taxes/when_you_are_going_to_withhold_payroll_taxes/calculating_payroll_taxes/calculating_wage_tax_national_insurance_contributions

        let s = this.salary;
        let grossYear = s.grossYear;
        if (!grossYear || grossYear < 0) {
          grossYear = 0;
        }

        s.taxFreeYear = 0;
        s.taxableYear = grossYear;
        if (s.ruling) {
          let rulingIncome = getRulingIncome(this.year, this.ruling);
          if (s.taxableYear > rulingIncome) {
            s.taxFreeYear = s.taxableYear * 0.30;
            s.taxableYear -= s.taxFreeYear;
            if (s.taxableYear < rulingIncome) { // For partial
              s.taxFreeYear = grossYear - rulingIncome;
              s.taxableYear = rulingIncome;
            }
          }
        }

        s.grossMonth = ~~(grossYear / 12);
        s.grossWeek = ~~(grossYear / c.workingWeeks);
        s.grossDay = ~~(grossYear / c.workingDays);
        s.grossHour = ~~(grossYear / (c.workingWeeks * s.hours));
        s.grossAllowance = (s.allowance) ? ~~(grossYear * (0.08 / 1.08)) : 0;
        s.taxFreeYear = ~~(s.taxFreeYear);
        s.taxFree = ~~(s.taxFreeYear / grossYear * 100);
        s.taxableYear = ~~(s.taxableYear);
        s.incomeTax = -1 * getIncomeTax(this.year, s.taxableYear);
        s.socialTax = (s.socialSecurity) ? -1 * getSocialTax(this.year, s.taxableYear, s.older) : 0;
        s.generalCredit = getGeneralCredit(this.year, s.taxableYear, s.older);
        s.labourCredit = getLabourCredit(this.year, s.taxableYear, s.older);
        s.totalTax = ~~(s.incomeTax + s.socialTax + s.generalCredit + s.labourCredit);
        s.netYear = s.taxableYear + s.totalTax + s.taxFreeYear;
        s.netAllowance = (s.allowance) ? ~~(s.netYear * (0.08 / 1.08)) : 0;
        s.netYear -= s.netAllowance;
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

    // National Insurance Contributions (Volksverzekeringen)
    // https://www.belastingdienst.nl/wps/wcm/connect/bldcontentnl/belastingdienst/prive/werk_en_inkomen/sociale_verzekeringen/premies_volks_en_werknemersverzekeringen/volksverzekeringen/volksverzekeringen?projectid=98f8c360-e92a-4fe2-aea6-27e9087ce4a1&projectid=98f8c360-e92a-4fe2-aea6-27e9087ce4a1
    function getSocialTax(year, salary, older) {
      return getRates(c.socialTax[year], salary, (older) ? 'older' : 'rate');
    }

    // General Tax Credit (Algemene Heffingskorting)
    // https://www.belastingdienst.nl/wps/wcm/connect/bldcontentnl/belastingdienst/prive/inkomstenbelasting/heffingskortingen_boxen_tarieven/heffingskortingen/algemene_heffingskorting/
    function getGeneralCredit(year, salary, older) {
      return getRates(c.generalCredit[year], salary, (older) ? 'older' : 'rate');
    }

    // Labour Tax Credit (Arbeidskorting)
    // https://www.belastingdienst.nl/wps/wcm/connect/bldcontentnl/belastingdienst/prive/inkomstenbelasting/heffingskortingen_boxen_tarieven/heffingskortingen/arbeidskorting/
    function getLabourCredit(year, salary, older) {
      return getRates(c.labourCredit[year], salary, (older) ? 'older' : 'rate');
    }

    function getRates(brackets, salary, type) {
      let amount = 0,
        tax, delta, percent;

      brackets.some((r, i) => {
        delta = (r.max) ? r.max - r.min : Infinity; // Consider infinity when no upper bound
        tax = (type && r[type]) ? r[type] : r['rate'];
        percent = (tax != 0 && tax > -1 && tax < 1); // Check if rate is percentage or fixed
        if (salary < delta) {
          if (percent) {
            amount += Math.floor((salary * 100) * tax) / 100;
          } else {
            amount = tax;
          }
          console.log(i, salary, delta, tax, percent, amount);
          return true; // Break loop
        } else {
          if (percent) {
            amount += Math.floor((delta * 100) * tax) / 100;
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
