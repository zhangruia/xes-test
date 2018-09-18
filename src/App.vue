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
import mainJson1 from "../static/main1";
import resourceJson1 from "../static/resource1";
import mainJsonC1 from "../static/main_ceshi1";
import mainJsonC2 from "../static/main_ceshi2";
import mainJsonC3 from "../static/main_ceshi3";
import mainJsonC4 from "../static/main_ceshi4";
import resourceJsonC1 from "../static/resource_ceshi1";
import resourceJsonC2 from "../static/resource_ceshi2";
import resourceJsonC3 from "../static/resource_ceshi3";
import resourceJsonC4 from "../static/resource_ceshi4";
import { getData } from '../location/optimize/index'
import {translate} from "../tangbo/index";
import { Container } from 'xpixi-data'
import  Global  from '../location/optimize/feature/json/global.json'

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
    translate(mainJsonC2,resourceJsonC2).then((data)=>{
      getData(data.main)
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
          window.abc = this.rootStageObj
          pageSizeFun(document, window,pixi.pixiApp.stage.width,pixi.pixiApp.stage.height);
          this.showPage=true;
          const graphics = Global.graphics
          graphics.map(val => {
            window.abc.children[2].addChildAt(val.newContainer, val.ind)
            window.abc.children[2].children.splice(val.ind+1, 1)
          })
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
