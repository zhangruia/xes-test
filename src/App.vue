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
import { ergodic } from '../location/index'
import mainJson from "../static/main选择.json";
import resourceJson from "../static/resource";
import mainJson1 from "../static/main1";
import resourceJson1 from "../static/resource1";

import {translate} from "../tangbo/index";
import { modifyData } from '../location/common/modifyData.js';
export default {
  name: 'App',
  components: {
    canvasStage
  },
  data(){
    return{
      showPage: false,
      rootStageObj: {},
      listJson: null
    }
  },
  created(){
     translate(mainJson1,resourceJson1).then((data)=>{
       ergodic(data.main)
       console.log(111);
       // console.log(this.inFun(data.main));
       this.inFun(data.main,data.resource)
     });
  },
  methods:{
     inFun(main,resource) {
      let pixi = new PixiExporter(
        main,
        resource,
        (current, all) => {
          // console.log("资源加载个数：" + current);
          // console.log("资源总个数：" + all);
        },

        () => {
          this.rootStageObj = pixi.pixiApp.stage;
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
