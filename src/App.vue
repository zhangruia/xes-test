<template>
  <div id="app">
    <div class="container">
      <canvas-stage :stageObj="rootStageObj" tabindex="-1" v-if="showPage"></canvas-stage>
    </div>
  </div>
</template>
<script>
import {canvasStage} from 'xes_canvas_renderer';
import { PixiExporter } from "xeditor-convertor";
import {pageSizeFun} from "../static/preload";
import mainJson from "../static/main";
import resourceJson from "../static/resource";
export default {
  name: 'App',
  components: {
    canvasStage
  },
  data(){
    return{
      showPage:false,
      rootStageObj:{}
    }
  },
  created(){
    this.inFun();
  },
  methods:{
    inFun() {
      let pixi = new PixiExporter(
        mainJson,
        resourceJson,
        (current, all) => {
          console.log("资源加载个数：" + current);
          console.log("资源总个数：" + all);
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
