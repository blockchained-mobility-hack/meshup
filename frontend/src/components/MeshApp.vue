<template>
  <div class="hello">
    <div class="uk-position-relative uk-cover-container" style="height:calc(100vh)">
      <div id='map-container' class="uk-cover-container" style="height:77vw; width:100vw">
          <a  id="car_1" class="uk-position-absolute uk-transform-center basic-car" 
              href="#" uk-tooltip="title: Car 1">
          </a>
          <a v-on:focus="set_car('car_2')" v-on:blur="set_car('')" id="car_2" class="uk-position-absolute uk-transform-center basic-car" href="#" uk-tooltip="title: Car 2"></a>
          <a v-on:focus="set_car('car_3')" v-on:blur="set_car('')" id="car_3" class="uk-position-absolute uk-transform-center basic-car" href="#" uk-tooltip="title: Car 3"></a>
          <a v-on:focus="set_car('car_4')" v-on:blur="set_car('')" id="car_4" class="uk-position-absolute uk-transform-center basic-car" href="#" uk-tooltip="title: Car 4"></a>
          <a v-on:focus="set_car('car_5')" v-on:blur="set_car('')" id="car_5" class="uk-position-absolute uk-transform-center basic-car" href="#" uk-tooltip="title: Car 5"></a>
          <a v-on:focus="set_car('car_6')" v-on:blur="set_car('')" id="car_6" class="uk-position-absolute uk-transform-center basic-car" href="#" uk-tooltip="title: Car 6"></a>
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
        <div class="uk-card-body uk-padding-remove-vertical uk-margin" 
              style="height: 200px; overflow-y: scroll">
          <div class="uk-alert" uk-alert
                v-for="msg in msgs"
              :key="msg.time + msg.sender"
              :class="{'uk-alert-primary': is_from_me(msg.sender)}">
              <span class='small-time-stamp'>{{msg.time}}</span> 
              <p class="uk-margin-remove"
                  ><b>{{msg.sender}}</b> - {{msg.content}}</p></div>
        </div>
      </div>
    </div>

      <div  class="uk-card uk-card-default uk-width-1-4 uk-position-top-right uk-margin-small uk-margin-small-right console"
            v-bind:class="{display: display_console_2}">
        <div class="uk-card-header">
          <div class="uk-grid-small uk-flex-middle" uk-grid>
            <div class="uk-width-auto">
              <img class="" width="80" height="60" 
                    :src="get_img_path(selected_car)">
            </div>
            <div class="uk-width-expand">
              <h3 class="uk-card-title uk-margin-remove-bottom">{{selected_car}}</h3>
              <p class="uk-text-meta uk-margin-remove-top">{{get_description(selected_car)}}</p>
            </div>
          </div>
        </div>
        <div class="uk-card-body uk-padding-remove-vertical uk-margin" 
              style="height: 200px; overflow-y: scroll">
          <div class="uk-alert" uk-alert
                v-for="msg in msgs"
              :key="msg.time + msg.sender"
              :class="{'uk-alert-primary': is_from_me(msg.sender)}">
              <span class='small-time-stamp'>{{msg.time}}</span> 
              <p class="uk-margin-remove"
                  ><b>{{msg.sender}}</b> - {{msg.content}}</p></div>
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
                      ,'car_3': {'description': 'VW Cedric'}
                      ,'car_4': {'description': 'Audi Aicon'}
                      ,'car_5': {'description': 'BMW Vision i'}
                      ,'car_6': {'description': 'BMW Vision i'}},
      msgs: [{'sender': 'car_3', 'time': '15:32:12', 'content': "I Crashed! Sorry, wasn't paying attention", 'latitude': '48.189926', 'longitude': '11.498083'}
            ,{'sender': 'car_1', 'time': '15:32:24', 'content': "Ok, rereouting via 14th Ave.", 'latitude': '48.189926', 'longitude': '11.498083'}
      
      ],
      msgs_crashed: [{'sender': 'car_3', 'time': '15:32:12', 'content': "I Crashed! Sorry, wasn't paying attention", 'latitude': '48.189926', 'longitude': '11.498083'}
                    ,{'sender': 'car_1', 'time': '15:32:24', 'content': "Ok, rereouting via 14th Ave.", 'latitude': '48.189926', 'longitude': '11.498083'}
      
      ],
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
      let crash_coords = {'latitude': 40.71, 'longitude': 74.0}

      $('#car_1').addClass("crash-car-1")
      $('#car_2').addClass("crash-car-2")
      $('#message-beacon-1').addClass("grow-beacon")
      var that = this;
      setTimeout(function() {
        that.crashed_car = 'car_1'
        that.sendevents('car_1', 'I Crashed! Sorry, I was not paying attention', crash_coords)
      }, 2200);
    },
    get_img_path: function(car_id){
      return './static/' + car_id + '.jpg'
    },
    is_from_me(car_id){
      if(car_id === this.selected_car) {
        return true
      } else {
        return false
      }
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

    let convert_to_coordinates = function(element_position){
      let window_width = $('#map-container').width()
      let top = element_position.top / window_width
      let left = element_position.left / window_width
      let top_edge = 73.9744
      let left_edge = 40.6881
      let coords = {'latitude': left_edge + left * 0.01/0.2, 'longitude': top_edge + top * 0.01/0.2}

      return coords
    }


    JQuery.fn.onPositionChanged = function (trigger, millis) {
      if (millis == null) millis = 100;
      var o = $(this[0]); // our jquery object
      if (o.length < 1) return o;

      var lastPos = null;
      var lastOff = null;
      setInterval(function () {
          if (o == null || o.length < 1) return o; // abort if element is non existend eny more
          if (lastPos == null) lastPos = o.position();
          var newPos = o.position();
          if (lastPos.top != newPos.top || lastPos.left != newPos.left) {
              $(this).trigger('onPositionChanged', { lastPos: lastPos, newPos: newPos });
              lastPos = o.position();
              // console.log('hello')
              if (typeof (trigger) == "function") {
                let coords = trigger(newPos)
                
              }
          }
      }, millis);

      return o;
    };

    $("#car_1").onPositionChanged(convert_to_coordinates);
    $("#car_2").onPositionChanged(convert_to_coordinates);
    $("#car_3").onPositionChanged(convert_to_coordinates);
    $("#car_4").onPositionChanged(convert_to_coordinates);
    $("#car_5").onPositionChanged(convert_to_coordinates);
    $("#car_6").onPositionChanged(convert_to_coordinates);

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

