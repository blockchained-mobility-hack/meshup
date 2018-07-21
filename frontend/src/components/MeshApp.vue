<template>
  <div class="hello">
    <div class="uk-position-relative">
      <div class="uk-cover-container" style="height:calc(100vh)">
          <canvas width="0" height="100%"></canvas>
          <img src="../assets/map_bg.png" alt="" uk-cover>
          <a  id="car-1" class="uk-position-absolute uk-transform-center basic-car" 
              href="#" uk-tooltip="title: Hello I am a Car">
          </a>
          <a id="car-2" class="uk-position-absolute uk-transform-center basic-car" href="#" uk-tooltip="title: Hello I am a Car"></a>
          <a id="car-3" class="uk-position-absolute uk-transform-center basic-car" href="#" uk-tooltip="title: Hello I am a Car"></a>
          <a id="car-4" class="uk-position-absolute uk-transform-center basic-car" href="#" uk-tooltip="title: Hello I am a Car"></a>
          <a id="car-5" class="uk-position-absolute uk-transform-center basic-car" href="#" uk-tooltip="title: Hello I am a Car"></a>
          <a id="car-6" class="uk-position-absolute uk-transform-center basic-car" href="#" uk-tooltip="title: Hello I am a Car"></a>
          <div id="message-beacon-1" class="uk-position-absolute uk-transform-center send_message_beacon crash_location" ></div>
        
        <div class="uk-overlay uk-position-bottom uk-background-default">
          <button class="uk-button uk-position-center uk-button-primary uk-light"
                  v-on:click="start_crash">
            Crash
          </button>
        </div>
      
      </div>
      <div class="uk-position-top">
          
      </div>
      
    </div>
    
  </div>
</template>

<script>
import axios from 'axios';  
export default {
  name: 'MeshApp',
  data () {
    return {
      msg: 'Demonstration of car to car communication.'
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
