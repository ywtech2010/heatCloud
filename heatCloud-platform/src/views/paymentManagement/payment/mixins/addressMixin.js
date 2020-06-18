import { mapGetters, mapActions } from 'vuex';

export default {
  data() {
    return {}
  },
  computed: {
    ...mapGetters('area',
      [
        'areaPartOne',
        'areaPartTwo',
        'provinces',
        'cities',
        'counties',
        'streets',
        'villages',
      ]
    ),
  },
  methods: {
    ...mapActions('area', [
      'GetAreaAll',
      'GetAreaForCountry',
      'GetAreaForVillage',
      'SetProvinces',
      'SetCities',
      'SetCounties',
      'SetStreets',
      'SetVillages',
    ]),
    initQueryConditions() {
      let provinces = [];
      this.SetProvinces(provinces);
      this.clearCities();
      this.clearCounties();
      this.clearStreets();
      this.clearVillages();
      this.GetAreaForCountry({}).then(res => {
        this.SetProvinces(res.listProvince);
      })
    },
    async clearCities() {
      let cities = [];
      await this.SetCities(cities);
    },
    async clearCounties() {
      let counties = [];
      await this.SetCounties(counties);
    },
    async clearStreets() {
      let streets = [];
      await this.SetStreets(streets);
    },
    async clearVillages() {
      let villages = [];
      await this.SetVillages(villages);
    },
    handleAddressForm(form) {
      const addressForm = {}
      for( let key in form.areaForm) {
        let list = [];
        switch (key) {
          case 'province':
            list = this.provinces;
            addressForm[key] = form.areaForm[key];
            break;
          case 'city':
            list = this.cities;
            addressForm[key] = form.areaForm[key];
            break;
          case 'county':
            list = this.counties;
            addressForm[key] = form.areaForm[key];
            break;
          case 'street':
            list = this.streets;
            addressForm[key] = form.areaForm[key];
            break;
        }
      }
      return addressForm;
    },
    getAreaName(list, code, param) {
      const resultArr = list.filter(item => {
        return item.code === code
      })
      return resultArr.length ? resultArr[0][param] : '';
    },
    async handleAddressData(selectResult) {
      let cities = [],
        counties = [],
        streets = [],
        villages = [];
      switch (selectResult.type) {
        case 'province':
          await this.clearCounties();
          await this.clearStreets();
          await this.clearVillages();
          // 调用组件通用方法逐级清除当前所选select框后面的数据
          this.clearSearchArea && this.clearSearchArea('province');
          this.areaPartOne.listCity.forEach(item => {
            if(item.parentCode === selectResult.value) {
              cities.push(item)
            }
          })
          this.SetCities(cities)
          break;
        case 'city':
          if(selectResult.form['city']) {
            await this.clearStreets();
            await this.clearVillages();
            // 调用组件通用方法逐级清除当前所选select框后面的数据
            this.clearSearchArea && this.clearSearchArea('city');
            this.areaPartOne.listCounty.forEach(item => {
              if(item.parentCode === selectResult.value) {
                counties.push(item)
              }
            })
            this.SetCounties(counties)
          } else {
            this.getHadCities(selectResult.form['province']);
          }
          break;
        case 'county':
          if(selectResult.form['county']) {
            await this.clearVillages();
            // 调用组件通用方法逐级清除当前所选select框后面的数据
            this.clearSearchArea && this.clearSearchArea('county');
            await this.GetAreaForVillage({countyCode: selectResult.value});
            this.areaPartTwo.listStreet.forEach(item => {
              if(item.parentCode === selectResult.value) {
                streets.push(item)
              }
            })
            this.SetStreets(streets)
          } else {
            this.getHadCounties(selectResult.form['city']);
          }
          break;
        case 'street':
          if(selectResult.form['street']) {
            // 调用组件通用方法逐级清除当前所选select框后面的数据
            this.clearSearchArea && this.clearSearchArea('street');
            this.areaPartTwo.listVillage.forEach(item => {
              if(item.parentCode === selectResult.value) {
                villages.push(item)
              }
            })
            this.SetVillages(villages)
          } else {
            this.getHadStreets(selectResult.form['county']);
          }
          break;
        case 'village':
          if(!selectResult.form['village']) {
            this.getHadVillages(selectResult.form['street']);
          }
          break;
      }
    },
    getHadCities(parentCode) {
      let cities = [];
      this.areaPartOne.listCity.forEach(item => {
        if(item.parentCode === parentCode) {
          cities.push(item)
        }
      })
      this.SetCities(cities)
    },
    getHadCounties(parentCode) {
      let counties = [];
      this.areaPartOne.listCounty.forEach(item => {
        if(item.parentCode === parentCode) {
          counties.push(item)
        }
      })
      this.SetCounties(counties)
    },
    async getHadStreets(parentCode) {
      await this.GetAreaForVillage({countyCode: parentCode});
      let streets = [];
      this.areaPartTwo.listStreet.forEach(item => {
        if(item.parentCode === parentCode) {
          streets.push(item)
        }
      })
      this.SetStreets(streets)
    },
    getHadVillages(parentCode) {
      let villages = []
      this.areaPartTwo.listVillage.forEach(item => {
        if(item.parentCode === parentCode) {
          villages.push(item)
        }
      })
      this.SetVillages(villages)
    },
    async getProvinces() {
      const provinces = await this.GetAreaAll({longCode: 0});
      this.SetProvinces(provinces.list);
    },
    async getCities(code) {
      const cities = await this.GetAreaAll({longCode: code});
      this.SetCities(cities.list);
    },
    async getCounties(code) {
      const counties = await this.GetAreaAll({longCode: code});
      this.SetCounties(counties.list);
    },
    async getStreets(code) {
      const streets = await this.GetAreaAll({longCode: code});
      this.SetStreets(streets.list);
    },
    async handleAreaChange(selectResult) {
      switch (selectResult.type) {
        case 'province':
          this.clearOperationArea && this.clearOperationArea('province');
          await this.clearCounties();
          await this.clearStreets();
          await this.clearVillages();
          this.getCities(selectResult.value);
          break;
        case 'city':
          this.clearOperationArea && this.clearOperationArea('city');
          await this.clearStreets();
          await this.clearVillages();
          this.getCounties(selectResult.value);
          break;
        case 'county':
          await this.clearVillages();
          this.getStreets(selectResult.value)
          break;
        case 'street':
          break;
        case 'village':
          break;
      }
    }
  }
}
