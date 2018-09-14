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
import { getData } from '../location/modules/optimize/index'
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
import {translate} from "../tangbo/index";
import { Container } from 'xpixi-data'
// let a = null

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
       // let current = JSON.parse(JSON.stringify(data.main.pages[0].children[2].children[0]))
       // let cont = current.texture

       // a = new XPIXI.Container(
         // {
         //   transform: [0, 0, 0, 0, 0, 0]
         // }
       // )
       // let text = new XPIXI.Text({
       //   conName: 'Text',
       //   texture: cont,
       //   rectangle: [0, 0, 400, 50],
       //   transform: [100, 100, 0, 0, 0, 0]
       // })
       // let g = new PIXI.Graphics()
       // g.lineColor = 'red'
       // g.lineWidth = 200
       // g.x = 100
       // g.y = 50
       // a.addChild(text)
       // a.addChild(g)
       // setTimeout(() => {
       //   console.log(111111);
       // }, 5000)
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
          // window.abc.children[2].children.unshift(a)
          // console.log(window.abc.children[2]);
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
