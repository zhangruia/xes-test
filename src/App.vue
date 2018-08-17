<template>
  <div id="app">
    <div class="container">
      <canvas-stage :stageObj="rootStageObj" tabindex="-1" v-if="showPage"></canvas-stage>
    </div>
  </div>
</template>
<script>
require('xes-choice');
require('xes_fillvacancy');
require('xes-classification');
require('xes-ligature');
import {canvasStage} from 'xes_canvas_renderer';
import { PixiExporter } from "xeditor-convertor";
import {pageSizeFun} from "../static/preload";
import { GetData } from '../location/index'
import mainJson from "../static/main.json";
import resourceJson from "../static/resource";
import mainJson1 from "../static/main1";
import resourceJson1 from "../static/resource1";
import {translate} from "../tangbo/index";
import { ligature } from '../location/common/ligature.js';
export default {
  name: 'App',
  components: {
    canvasStage
  },
  data(){
    return{
      showPage: false,
      rootStageObj: {}
    }
  },
  created(){
    ligature(mainJson);
    this.inFun();
    // new GetData(mainJson)
  },
  methods:{
     inFun() {
      var src=translate(mainJson,resourceJson);
      // var src=translate(mainJson1,resourceJson1);
      // console.log(parseJson(src.main));
      // console.log("================src.main====================")
      // console.log(src.main);
      // console.log(src.resource)
      let pixi = new PixiExporter(
        src.main,
        src.resource,
        (current, all) => {
          // console.log("资源加载个数：" + current);
          // console.log("资源总个数：" + all);
        },
        () => {
          this.rootStageObj = pixi.pixiApp.stage;
          // console.log(1111111111111111111111111);
          // console.log(this.rootStageObj );
          pageSizeFun(document, window,pixi.pixiApp.stage.width,pixi.pixiApp.stage.height);
          this.showPage=true;
        }
      );
    },
  }
}
</script>

<style>
  .container {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 19.20rem;
    height: 10.80rem;
    transform: translate(-50%, -50%);
    background-size: cover;
    background-position: center center;
    background-repeat: no-repeat;
  }
</style>
