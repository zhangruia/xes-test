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
import { ligature } from '../location/common/ligature.js'
export default {
  name: 'App',
  components: {
    canvasStage
  },
  data(){
    return{
      showPage: false,
      rootStageObj: {},
      coordinate: [
        //选择题数据
        {
          spaceX: 200,
          spaceY: 0,
          contentX: 200,
          contentY: 700,
          rightX: 0,
          modelType: 1},
        //填空题数据
       {
          spaceX: 0,
          soaceY: 0,
          contentX: 0,
          contentY: 0,
          rightX: 0,
          modelType: 2},
        //分类题
        {
          spaceX: 0,
          soaceY: 0,
          contentX: 0,
          contentY: 0,
          rightX: 0,
          modelType: 3},
        //连线题数据
       {
          spaceX: 0,//x轴图片间距
          spaceY: 200,//y轴图片间距
          contentX:360,//x容器坐标
          contentY:130,//y容器坐标
          rightX: 1300,
          modelType: 4} //题型
      ]

    }
  },
  created(){

    ligature(mainJson, this.coordinate[mainJson.pages[0].modelType - 1]);
    this.inFun();
    // new GetData(mainJson)
  },
  methods:{
    inFun() {
      let pixi = new PixiExporter(
        mainJson,
        resourceJson,
        (current, all) => {
          // console.log("资源加载个数：" + current);
          // console.log("资源总个数：" + all);
        },
        () => {
          this.rootStageObj = pixi.pixiApp.stage;
          pageSizeFun(document, window, pixi.pixiApp.stage.width, pixi.pixiApp.stage.height);
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
