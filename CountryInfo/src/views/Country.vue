<template>
  <div>
    <router-link to="/" class="btnHome"><i class="fa fa-chevron-left"></i> Home</router-link>

    <div class="container">
      <div class="row">
        <div class="col-lg-6 col-md-12 col-sm-12">
          <div class="jumbotron no-border-radius-top d-flex align-items-center" style="height: 200px;">
            <h1 class="countryName">{{ country.name }}</h1>
          </div>
          <div class="jumbotron" style="height: calc(50vh - 12rem);">
            <img :src="country.flag" :alt="country.name + ' flag'" class="country-flag">
          </div>
          <div class="jumbotron" style="height: calc(50vh + 6rem - 200px);">
            <gmap-map :center="center" :zoom="zoom" map-type-id="roadmap" style="height: 100%">
              <gmap-marker :key="index" v-for="(m, index) in markers" :position="m.position" :clickable="true" :draggable="true"></gmap-marker>
            </gmap-map>
          </div>
        </div>

        <div class="col-lg-6 col-md-12 col-sm-12">
          <div class="jumbotron no-border-radius-top" style="height: calc(100vh - 2rem);">

            <div id="accordion" role="tablist" aria-multiselectable="true">
              <div class="card">
                <div class="card-header" role="tab" id="headingOne">
                  <h3 class="mb-0">
                    <a data-toggle="collapse" data-parent="#accordion" href="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                    Properties
                  </a>
                  </h3>
                </div>

                <div id="collapseOne" class="collapse show" role="tabpanel" aria-labelledby="headingOne">
                  <div class="card-block">
                    <table class="table table-striped">
                      <tbody>
                        <tr>
                          <td width="200">
                            English Name
                          </td>
                          <td>
                            {{ country.name }}
                          </td>
                        </tr>
                        <tr>
                          <td>
                            Native Name
                          </td>
                          <td>
                            {{ country.nativeName }}
                          </td>
                        </tr>
                        <tr>
                          <td>
                            Country Code<br> [ <a href="https://en.wikipedia.org/wiki/ISO_3166-1">ISO 3166-1</a> ]
                          </td>
                          <td>
                            {{ country.numericCode }}<br> {{ country.alpha2Code }}<br> {{ country.alpha3Code }}
                          </td>
                        </tr>
                        <tr>
                          <td>
                            Region
                          </td>
                          <td>
                            <h4>
                              <span class="badge badge-pill badge-primary">{{ country.region }}</span>
                            </h4>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            Language
                          </td>
                          <td>
                            <h4 v-for="item in country.languages">
                              <span class="badge badge-pill badge-info">{{ item.name }}</span>
                            </h4>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            Latitude & Longitude
                          </td>
                          <td>
                            [ {{ country.latlng[0] | Lat }} , {{ country.latlng[1] | Lng }} ]
                          </td>
                        </tr>
                        <tr>
                          <td>
                            Capital
                          </td>
                          <td>
                            {{ country.capital }}
                          </td>
                        </tr>
                        <tr>
                          <td>
                            Area
                          </td>
                          <td>
                            {{ country.area | numberWithCommas }} km<sup>2</sup>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            Population
                          </td>
                          <td>
                            {{ country.population | numberWithCommas }}
                          </td>
                        </tr>
                        <tr>
                          <td>
                            Calling Code
                          </td>
                          <td>
                            <h4 v-for="item in country.callingCodes">
                              <span class="badge badge-success">
                          <i class="fa fa-phone"></i>
                        </span>
                              <small>+{{ item }}</small>
                            </h4>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            Currency
                          </td>
                          <td>
                            <h4 v-for="item in country.currencies">
                              <span class="badge badge-pill badge-warning">{{ item.symbol }}</span>
                              <small>{{ item.code ? item.code : item.name }}</small>
                            </h4>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            Top Level Domain
                          </td>
                          <td>
                            <h4 v-for="item in country.topLevelDomain">
                              <span class="badge badge-default">{{ item }}</span>
                            </h4>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            Land Borders
                          </td>
                          <td>
                            <div v-if="nearby.length > 0">
                              <router-link :to="item.alpha3Code" v-for="item in nearby" :key="item.id">
                                <img :src="item.flag" :title="item.name" :alt="item.name" style="width: 50px; margin: 0 10px 10px 0;">
                              </router-link>
                            </div>
                            <p v-else>-----</p>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            Time Zones
                          </td>
                          <td>
                            <p v-for="item in country.timezones">
                              {{ item }}
                            </p>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <!-- collapseOne -->

              <div class="card">
                <div class="card-header" role="tab" id="headingTwo">
                  <h3 class="mb-0">
                    <a class="collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                    Exchange Rates
                  </a>
                  </h3>
                </div>
                <div id="collapseTwo" class="collapse" role="tabpanel" aria-labelledby="headingTwo">
                  <div class="card-block">
                    <div v-if="country_currencies_codes.length > 0">

                      <b-form-select v-model="country_currency_code" :options="country_currencies_codes" class="form-control form-control-lg"></b-form-select>
                      <p></p>
                      <div v-if="exchange_rate.length > 0">
                        <div class="input-group input-group-lg amountInput">
                          <span class="input-group-addon">{{ country.currencies[0].symbol }}</span>
                          <input type="number" class="form-control" v-model="amount" min="1" max="99999999">
                          <span class="input-group-btn">
                          <button class="btn btn-secondary" type="button" @click="increaseAmount()">+</button>
                          <button class="btn btn-secondary" type="button" @click="decreaseAmount()">-</button>
                        </span>
                        </div>
                        <p></p>
                        <table class="table table-striped">
                          <thead class="thead-inverse">
                            <tr>
                              <th class="center" width="150">
                                Currency
                              </th>
                              <th class="center">
                                Equals
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr v-for="(item, index) in exchange_rate" style="max-height: 20px;">
                              <td class="center" style="position: relative; height: 20px; overflow-y: hidden;">
                                <i class="block fa" :class="'fa-' + best_5_currencies[index].toLowerCase()"></i>
                                <span class="block">{{ best_5_currencies[index] }}</span>
                              </td>
                              <td>
                                <span class="block" style="padding-right: calc(50% - 40px); text-align: right;">{{ ( item.rates * amount ).toFixed(2) | numberWithCommas }}</span>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <div v-else>
                        <p>Sorry, unable to find available datas about {{ country_currency_code }}.</p>
                      </div>
                    </div>
                    <div v-else>
                      <p>Sorry, unable to find available datas about this country.</p>
                    </div>
                  </div>
                </div>
              </div>
              <!-- collapseTwo -->

              <div class="card">
                <div class="card-header" role="tab" id="headingThree">
                  <h3 class="mb-0">
                    <a class="collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                      Time
                    </a>
                  </h3>
                </div>
                <div id="collapseThree" class="collapse" role="tabpanel" aria-labelledby="headingThree">
                  <div class="card-block">
                    <div class="row">
                      <div class="col-lg-6 col-md-12">
                        <hero-clock :hour="taipei_time.hour" :minute="taipei_time.minute" :second="taipei_time.second" color="#BF0000" title="Taipei"></hero-clock>
                      </div>

                      <div class="col-lg-6 col-md-12">
                        <hero-clock :hour="capital_time.hour" :minute="capital_time.minute" :second="capital_time.second" color="#BF0000" :title="country.capital"></hero-clock>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!-- collapseThree -->
            </div>

          </div>
          <!-- .jumbotron -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  import moment from 'moment'
  import HeroClock from '../components/HeroClock.vue'

  export default {
    name: 'country',
    components: {
      'hero-clock': HeroClock
    },
    data() {
      return {
        alpha3Code: '',
        zoom: 0,
        center: {
          lat: 0,
          lng: 0
        },
        markers: [],
        country: [], // 國家資料
        country_currency_code: '', // 選擇的貨幣
        country_currencies_codes: [], // 國家使用的貨幣
        nearby: [],
        amount: 1,
        exchange_rate: [],
        best_5_currencies: ['USD', 'EUR', 'GBP', 'JPY', 'CNY'],
        taipei_time: {
          hour: 0,
          minute: 0,
          second: 0
        },
        capital_time_offset: 0,
        capital_time: {
          hour: 0,
          minute: 0,
          second: 0
        }
      }
    },
    filters: {
      Lat: function (lat) {
        return lat > 0 ? (lat + '°N') : ((lat * -1) + '°S');
      },
      Lng: function (lng) {
        return lng > 0 ? (lng + '°E') : ((lng * -1) + '°W');
      },
    },
    methods: {
      getProperties() {
        var that = this;
        $.getJSON('https://restcountries.eu/rest/v2/alpha/' + that.alpha3Code,
          function (res) {
            // 修改「台灣」資料
            if (that.alpha3Code == 'TW' || that.alpha3Code == 'TWN') {
              res.name = 'Taiwan';
            }
            // 刪除「貨幣 code」不正確的貨幣
            res.currencies.forEach((currency, index) => {
              var null_code_count = 0;
              if (currency.code == null || currency.code == '(none)') {
                res.currencies.splice(index, 1);
                null_code_count += 1;
              } else {
                that.country_currencies_codes.push(res.currencies[index - null_code_count].code);
              }
            });
            // 設定國家資料
            that.country = res;
            // 設定地圖中心點及地標
            that.setMapData(res);
            // 設定地圖放大倍率
            that.zoom = 5;

            // 取得邊界國家國旗
            that.nearby = [];
            res.borders.forEach(nearby => {
              $.getJSON('https://restcountries.eu/rest/v2/alpha/' + nearby, (country) => {
                that.nearby.push({
                  alpha3Code: nearby,
                  name: country.name,
                  flag: country.flag
                });
              });
            });

            // 取得匯率資料
            if (res.currencies.length > 0) {
              that.country_currency_code = res.currencies[0].code;
            }

          }).fail(function () {
          that.$router.push('/');
        });
      },
      getExchangeRates(currencyCode) {
        var endpoint = 'live',
          access_key = 'ca643ae806c9ced49fa531684bc736d2';

        // 設定下拉式選單 值
        this.country_currency_code = currencyCode;
        // 清空
        this.exchange_rate = [];

        // 呼叫 匯率 API
        axios.get('http://apilayer.net/api/' + endpoint + '?access_key=' + access_key + '&source=' +
            currencyCode +
            '&currencies=' + this.best_5_currencies.join(',') + '&format=1')
          .then(res2 => {
            console.log(res2.data);
            console.log('success: ' + res2.data.success);
            if (res2.data.success) {
              // console.log(res2.data.quotes);
              // 取5大貨幣，與 source 組合成 key，例：USDUSD、USDEUR、USDGBP、USDJPY、USDCNY。
              this.best_5_currencies.forEach((currency, index) => {
                var key = currencyCode + this.best_5_currencies[index] + "";
                // { key: USDUSD, rates: 1 }
                this.exchange_rate.push({
                  key: key,
                  rates: res2.data.quotes["" + key]
                });
              });
            } else {
              console.log(res2.data.error);
            }
          }).catch(e => {
            console.log(e);
          });

      },
      getCapitalTimeOffset() {
        var key = 'ST5HIDJ8O3GT',
          country = this.country.alpha2Code,
          zone = this.country.capital;
          axios.get('http://api.timezonedb.com/v2/list-time-zone?key=' + key + '&country=' + country + '&zone=*' + zone +
            '*&fields=zoneName,gmtOffset&format=json')
          .then(res => {
            console.log(res.data)
            if (res.data.status == 'OK') {
              console.log(res.data);
              this.capital_time_offset = res.data.zones[0].gmtOffset;
            } else {
              console.log(res.data.message);
            }
          }).catch(e => {
            console.log(e);
          });
      },
      setMapData(country) {
        this.markers = [];
        this.markers.push({
          position: {
            lat: country.latlng[0],
            lng: country.latlng[1]
          }
        });
        this.center = {
          lat: country.latlng[0],
          lng: country.latlng[1]
        };
      },
      increaseAmount() {
        this.amount = (this.amount < 99999999) ? this.amount + 1 : 99999999;
      },
      decreaseAmount() {
        this.amount = (this.amount > 1) ? this.amount - 1 : 1;
      },
      timeUpdate() {
        let taipei_now = moment();
        let capital_now = moment().utcOffset(this.capital_time_offset);
        // 更新台灣時間
        this.taipei_time.hour = taipei_now.format('hh');
        this.taipei_time.minute = taipei_now.format('mm');
        this.taipei_time.second = taipei_now.format('ss');
        // 更新首都時間
        this.capital_time.hour = capital_now.format('hh');
        this.capital_time.minute = capital_now.format('mm');
        this.capital_time.second = capital_now.format('ss');

        setTimeout(this.timeUpdate, 1000);
      }
    },
    watch: {
      $route(to, from) {
        this.alpha3Code = this.$route.params.alpha3Code;
        this.getProperties();
      },
      country_currency_code() {
        this.getExchangeRates(this.country_currency_code);
      }
    },
    mounted() {
      this.alpha3Code = this.$route.params.alpha3Code;
      this.getProperties();
      this.timeUpdate();
    }
  }

</script>


<style scoped>
  a {
    color: #2e3e50;
  }

  a:hover {
    color: #e74c3c;
    text-decoration: none;
  }

  a:enabled {
    text-decoration: none;
  }

  .jumbotron {
    padding: 2rem;
    overflow-y: hidden;
  }

  .jumbotron.no-border-radius-top {
    border-top-left-radius: unset;
    border-top-right-radius: unset;
  }


  .collapse {
    max-height: calc(100vh - 6rem - 170px);
    overflow-y: auto;
  }

  .countryName {
    transition: .3s;
  }

  .countryName:hover {
    color: #e74c3c;
    transition: .3s;
  }

  .country-flag {
    height: 100%;
    position: relative;
    left: 50%;
    transform: translateX(-50%);
  }

  .btnHome {
    font-size: 30px;
    position: absolute;
    left: 20px;
    top: 20px;
    color: #899696;
    transition: 1s;
    font-weight: bold;
  }

  .btnHome:hover {
    color: #eceeef;
    transition: 1s;
  }

  .amountInput .input-group-addon {
    font-size: 45px;
  }

  .amountInput input {
    font-size: 45px;
    text-align: right;
  }

  .amountInput .input-group-btn .btn:first-child {
    border-top-right-radius: 0.3rem;
    border-bottom-right-radius: 0;
  }

  .amountInput .input-group-btn .btn:last-child {
    border-top: unset;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0.3rem;
  }

</style>
