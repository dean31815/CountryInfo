<template>
  <div>
    <div class="jumbotron">
      <div class="container">
        <div class="row">
          <div class="col-lg-6 col-md-8 col-sm-12 col-xs-12">
            <h1>Countries of <b style="font-size: 130%; margin-left: 10px;">{{ region == 'All' ? 'the World' : region }}</b></h1>
            <br>
            <b-form-select v-model="region" :options="regions" class="form-control form-control-lg"></b-form-select>
            <p></p>
            <br>
            <div class="input-group input-group-lg">
              <input type="text" v-model="search" class="form-control" placeholder="Search By Name or Country codes or Capital city" aria-describedby="search-addon">
              <span class="input-group-addon" id="search-addon"><i class="fa fa-search"></i></span>
            </div>
          </div>
          <div class="col-lg-6 col-md-4 col-sm-12 col-xs-12">
            <span style="font-size: 150px;" class="pull-right">{{ f_countries.length }}</span>
          </div>
        </div>

      </div>
    </div>

    <div class="container" style="min-height: calc(100vh - 426px);">
      <div class="row">
        <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12" v-for="(country, index) in f_countries">
          <router-link :to="'country/' + country.alpha3Code">
            <div class="card">
              <img class="card-img-top" :src="country.flag" :alt="country.name + ' flag'">
              <div class="card-block">
                <h6 class="card-title">
                  {{ country.name }}<br> {{ (country.nativeName != country.name) ? '( ' + country.nativeName + ' )' : '' }}
                </h6>
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </div>

    <nav class="navbar sticky-bottom navbar-light bg-faded">
      <div class="container">
        <b-btn v-b-modal.modal1>References</b-btn>
        <!-- Modal Component -->
        <b-modal id="modal1" title="References" :hide-footer="true">
          <ul class="list-group">
            <li class="list-group-item">
              <a href="https://restcountries.eu/">REST Countries : Information About Countries</a>
            </li>
            <li class="list-group-item">
              <a href="https://currencylayer.com/">CurrencyLayer : Exchange Rates & Currency Conversion</a>
            </li>
            <li class="list-group-item">
              <a href="https://timezonedb.com/">TimeZoneDB : Free Time Zone Database for Cities</a>
            </li>
          </ul>
        </b-modal>
        <span class="navbar-text pull-right">Copyright © 2017.06 BoChen Chen All rights reserved</span>
      </div>
    </nav>
  </div>
</template>

<script>
  import axios from 'axios';

  export default {
    name: 'home',
    data() {
      return {
        countries: [],
        f_countries: [],
        search: '',
        region: 'All',
        regions: [{
          text: 'All',
          value: 'All'
        }, {
          text: 'Africa',
          value: 'Africa'
        }, {
          text: 'Americas',
          value: 'Americas'
        }, {
          text: 'Asia',
          value: 'Asia'
        }, {
          text: 'Europe',
          value: 'Europe'
        }, {
          text: 'Oceania',
          value: 'Oceania'
        }]
      }
    },
    watch: {
      region() {
        this.searchCountries();
      },
      search() {
        this.searchCountries();
      }
    },
    mounted() {
      this.getCountries();

    },
    methods: {
      getCountries() {
        axios.get('https://restcountries.eu/rest/v2/all')
          .then(res => {
            console.log(res.data);
            res.data.find((element, index, array) => {
              if (element.alpha2Code == 'TW') {
                array[index].name = 'Taiwan';
              }
            });

            this.countries = res.data;
            this.f_countries = res.data;
          })
          .catch(function (error) {
            console.log(error);
          });

        // let that = this;
        // $.getJSON('https://restcountries.eu/rest/v2/all', function (res) {
        //   res.find((element, index, array) => {
        //     if (element.alpha2Code == 'TW') {
        //       array[index].name = 'Taiwan';
        //     }

        //     if (element.currencies.length > 1) {
        //       console.log(element);
        //     }
        //   });
        //   // console.log(res);
        //   that.countries = res;
        //   that.f_countries = res;
        // });
      },
      searchCountries() {
        var tmp_result = [];
        // filter: region
        this.f_countries = this.countries.filter((country) => {
          return this.region == 'All' || country.region == this.region;
        });

        // filter: search text 
        var _search = this.search;
        this.f_countries = this.f_countries.filter((country) => {
          return _search == '' ||
            country.name.includes(_search) ||
            country.nativeName.includes(_search) ||
            country.alpha2Code.includes(_search) ||
            country.alpha3Code.includes(_search) ||
            country.capital.includes(_search) ||
            country.altSpellings.some(alt => {
              return alt.includes(_search);
            })
        });
      }
    }
  }

</script>

<style scoped>
  a:hover {
    text-decoration: none;
  }

  .card {
    background-color: transparent;
    border: unset;
    max-height: 350px;
    margin-bottom: 10px;
    padding: 15px;
  }

  .card-img-top {
    max-height: 150px;
  }

  .card-title {
    font-weight: bold;
    font-size: 16px;
    line-height: 30px;
    height: 70px;
    color: #2e3750;
  }

  .card:hover .card-title {
    --color: #c0392b;
  }

  .card:hover {
    background-color: rgba(236, 238, 239, .5);
    transition: .2s;
  }

  .custom-select {
    padding-left: 25px;
  }

  .figure-caption {
    font-weight: bold;
    font-size: 24px;
    line-height: 30px;
    height: 70px;
    color: #2e3750;
  }

  .figure:hover .figure-caption {
    color: #c0392b;
  }

</style>
