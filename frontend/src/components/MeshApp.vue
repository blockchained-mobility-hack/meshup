<template>
  <div class="hello">
    <div class="uk-position-relative uk-cover-container" style="height:calc(100vh)">
      <div class="uk-cover-container" style="height:77vw; width:100vw">
          <a  id="car-1" class="uk-position-absolute uk-transform-center basic-car" 
              href="#" uk-tooltip="title: Car 1">
          </a>
          <a v-on:focus="set_car('car_2')" v-on:blur="set_car('')" id="car-2" class="uk-position-absolute uk-transform-center basic-car" href="#" uk-tooltip="title: Car 2"></a>
          <a v-on:focus="set_car('car_3')" v-on:blur="set_car('')" id="car-3" class="uk-position-absolute uk-transform-center basic-car" href="#" uk-tooltip="title: Car 3"></a>
          <a v-on:focus="set_car('car_4')" v-on:blur="set_car('')" id="car-4" class="uk-position-absolute uk-transform-center basic-car" href="#" uk-tooltip="title: Car 4"></a>
          <a v-on:focus="set_car('car_5')" v-on:blur="set_car('')" id="car-5" class="uk-position-absolute uk-transform-center basic-car" href="#" uk-tooltip="title: Car 5"></a>
          <a v-on:focus="set_car('car_6')" v-on:blur="set_car('')" id="car-6" class="uk-position-absolute uk-transform-center basic-car" href="#" uk-tooltip="title: Car 6"></a>
          <div id="message-beacon-1" class="uk-position-absolute uk-transform-center send_message_beacon crash_location" ></div>
          <img  src="../assets/map_bg.png" alt="" style="position: relative; height:77vw; width:100vw; z-index: -4">
          
      </div>

      <div  class="uk-card uk-card-default uk-width-1-4 uk-position-top-left uk-margin-small uk-margin-small-left console"
            v-bind:class="{display: display_console_1}">
        <div class="uk-card-header">
          <div class="uk-grid-small uk-flex-middle" uk-grid>
            <div class="uk-width-auto">
              <img class="" width="80" height="60" src="../assets/car_1.jpg">
            </div>
            <div class="uk-width-expand">
              <h3 class="uk-card-title uk-margin-remove-bottom">{{crashed_car}}</h3>
              <p class="uk-text-meta uk-margin-remove-top">{{get_description(crashed_car)}}</p>
            </div>
          </div>
        </div>
        <div class="uk-card-body uk-padding-remove-vertical uk-margin" style="height: 200px; overflow-y: scroll">
          <div class="uk-alert-primary" uk-alert><span class='small-time-stamp'>14:55:30</span> <p class="uk-margin-remove">Crash!</p></div>
          <div class="uk-alert" uk-alert><span class='small-time-stamp'>14:55:30</span> <p class="uk-margin-remove">Car 1 - Received crash notification, rerouting via 14th Ave.</p></div>
         </div></div>
      </div>

      <div  class="uk-card uk-card-default uk-width-1-4 uk-position-top-right uk-margin-small uk-margin-small-right console"
            v-bind:class="{display: display_console_2}">
        <div class="uk-card-header">
          <div class="uk-grid-small uk-flex-middle" uk-grid>
            <div class="uk-width-auto">
              <img class="" width="80" height="60" src="../assets/car_2.jpg">
            </div>
            <div class="uk-width-expand">
              <h3 class="uk-card-title uk-margin-remove-bottom">{{selected_car}}</h3>
              <p class="uk-text-meta uk-margin-remove-top">{{get_description(selected_car)}}</p>
            </div>
          </div>
        </div>
        <div class="uk-card-body uk-padding-remove-vertical uk-margin" style="height: 200px; overflow-y: scroll">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.</p>
        </div>
      </div>

      <div class="uk-overlay uk-position-bottom uk-background-default">
        <button class="uk-button uk-position-center uk-button-primary uk-light"
                v-on:click="start_crash">
          Start Simulation
        </button>
      </div>
  </div>
</template>

<script>
import axios from 'axios';  
export default {
  name: 'MeshApp',
  data () {
    return {
      msg: 'Demonstration of car to car communication.',
      selected_car: '',
      crashed_car: '',
      car_properties: {'car_1': {'description': 'Mercedes F015'}
                      ,'car_2': {'description': 'BMW Vision i'}
                      ,'car_3': {'description': 'BMW Vision i'}
                      ,'car_4': {'description': 'BMW Vision i'}
                      ,'car_5': {'description': 'BMW Vision i'}
                      ,'car_6': {'description': 'BMW Vision i'}}
    }
  },
  computed: {
    display_console_1: function(){
      if (this.crashed_car === ''){
        return false
      } else {
        return true
      }
    },
    display_console_2: function(){
      if (this.selected_car === ''){
        return false
      } else {
        return true
      }
    }
  },
  methods: {
    getevents: function () {
       axios.get('http://localhost:10010/event').then((response) => {
          console.log(response);
          this.clearTodo();
          this.refreshTodo();
          this.typing = false;
        }).catch((error) => {
          console.log(error);
        });
    },
    sendevents: function () {
      let param = {
          event: ""
      };
      axios.post('http://localhost:10010/event', param).then((response) => {
        console.log(response);
        this.clearTodo();
        this.refreshTodo();xxw
        this.typing = false;
      }).catch((error) => {
        console.log(error);
      });
    },
    start_crash: function(){
      $('#car-1').addClass("crash-car-1")
      $('#car-2').addClass("crash-car-2")
      $('#message-beacon-1').addClass("grow-beacon")
      var that = this;
      setTimeout(function() {
        that.crashed_car = 'car_1'
      }, 2200);
    },
    get_img_path: function(car_id){
      return './assets/' + car_id + '.jpg'
    },
    get_description: function(car_id){
      if (car_id in this.car_properties) {
        return this.car_properties[car_id]['description']
      }
    },

    set_car: function(car_id){
      this.selected_car = car_id
    }
  },
  mounted () {
    this.getevents();
    this.sendevents();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
