<template>
  <div class="hero-clock">
    <div class="hero-circle">
      <div class="hero-face">
        <div class="hero-hour" :style="{ transform: 'rotate(' + hour_deg + 'deg)', background: color  }"></div>
        <div class="hero-minute" :style="{ transform: 'rotate(' + minute_deg + 'deg)', background: color }"></div>
        <div class="hero-second" :style="{ transform: 'rotate(' + second_deg + 'deg)', background: color }"></div>
        <span class="text-time">{{ hour }} <span style="font-size: 80%; vertical-align: top;" :style="(second % 2 == 0) ? { color: '#ECEEEF' } : { color: '#2e3e50' }">:</span> {{ minute }}</span>
      </div>
    </div>
    <span class="hero-clock-title">{{ title }}</span>
  </div>
</template>

<script>
  import moment from 'moment'

  export default {
    name: 'hero-clock',
    props: ['hour', 'minute', 'second', 'color', 'title'],
    data() {
      return {
        second_deg: '',
        minute_deg: '',
        hour_deg: '',
      }
    },
    watch: {
      second: function (val) {
        this.second_deg = this.second * 6;
        this.minute_deg = this.minute * 6 + this.second / 60;
        this.hour_deg = ((this.hour % 12) / 12) * 360 + 90 + this.minute / 12;
      }
    },
    methods: {}
  }

</script>

<style>
  .hero-clock {
    position: relative;
    width: 180px;
    height: 260px;
    margin: 0 auto;
  }

  .hero-circle {
    width: 180px;
    height: 180px;
    position: relative;
    border: 6px solid #2e3e50;
    border-radius: 50%;
    box-shadow: 0 1px 8px rgba(34, 34, 34, 0.3), inset 0 1px 8px rgba(34, 34, 34, 0.3);
  }

  .hero-face {
    width: 100%;
    height: 100%;
  }

  .hero-face:after {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 12px;
    height: 12px;
    margin: -6px 0 0 -6px;
    background: #2e3e50;
    border-radius: 6px;
    content: "";
    display: block;
    z-index: 2;
  }

  .hero-hour {
    width: 0;
    height: 0;
    position: absolute;
    top: 50%;
    left: 50%;
    margin: -4px 0 -4px -25%;
    padding: 2px 0 4px 25%;
    background: #2e3e50;
    -webkit-transform-origin: 100% 50%;
    -ms-transform-origin: 100% 50%;
    transform-origin: 100% 50%;
    border-radius: 4px 0 0 4px;
    z-index: 1;
  }

  .hero-minute {
    width: 0;
    height: 0;
    position: absolute;
    top: 50%;
    left: 50%;
    margin: -40% -3px 0;
    padding: 40% 3px 0;
    background: #2e3e50;
    -webkit-transform-origin: 50% 100%;
    -ms-transform-origin: 50% 100%;
    transform-origin: 50% 100%;
    border-radius: 3px 3px 0 0;
    z-index: 1;
  }

  .hero-second {
    width: 0;
    height: 0;
    position: absolute;
    top: 50%;
    left: 50%;
    margin: -40% -1px 0 0;
    padding: 40% 1px 0;
    background: #2e3e50;
    -webkit-transform-origin: 50% 100%;
    -ms-transform-origin: 50% 100%;
    transform-origin: 50% 100%;
    z-index: 1;
  }

  .hero-clock-title {
    display: block;
    width: 180px;
    height: 80px;
    font-size: 28px;
    line-height: 40px;
    font-weight: bold;
    color: #2e3e50;
    padding-top: 10px;
    text-align: center;
  }

  .text-time {
    font-size: 26px;
    font-weight: bold;
    width: 100px;
    margin-left: 50%;
    transform: translateX(-50%);
    position: absolute;
    top: 100px;
    text-align: center;
    color: #ECEEEF;
    border-radius: 10px;
    background-color: #2e3e50;
    z-index: 0;
  }

</style>
