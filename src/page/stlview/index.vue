<template>
  <div class="qsm-3dview">
    1
  </div>
</template>

<script>
// import { mapState, mapMutations, mapGetters, mapActions } from 'vuex';
import * as THREE from 'three';
import OrbitControls from 'three-orbitcontrols'; //鼠标 旋转 平移  缩放
import { MTLLoader,OBJLoader } from 'three-obj-mtl-loader';
import * as dat from 'dat.gui';
import { resolve } from 'url';
// import STLLoader from '@/utils/loader/STLLoader.js';  
// import STLLoader from 'three-stl-loader';  
var STLLoader = require('three-stl-loader')(THREE);

    console.log( STLLoader );


var modelStl = require( './ji.stl' );
// console.log( modelStl );

function getDataURL(file, callback) {
    var reader = new FileReader();
    reader.onload = function(event) {
        callback(event.target.result);
    };
    reader.readAsDataURL(file);
}

function dataURItoBlob(dataURI) {
    var byteString = atob(dataURI.split(',')[1]);
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]

    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }

    var blob = new Blob([ab], {
        type: mimeString
    });
    return blob;
}

export default {
  name: 'stlview',
  data() {
    return {
      renderer: null, //渲染器
      camera: null, //摄像机
      scene: null, //场景
      light: null, //光照
      controls: null, //交互控制器
      gui: null,
      stlLoader: null //stl loader加载器
    };
  },
  methods: {
    loadModel () {
      this.initWebGLRenderer()
        .then( _ => {
          return this.initScene()
        } )
        .then( _ => {
          this.initCamera();
          this.initLight();
          this.initControls();
          // this.initMeshBox();
          this.initRender();
          this.initAnimate();
          this.initModel();
        } )
    },
    initModel () {
      console.log(1111);
      // this.stlLoader = new STLLoader();
      // getDataURL( new Blob( ['./1111.stl'], { type: 'application/vnd.ms-pki.stl' }), function ( ed ) {
      //     that.stlLoader.load( form.values, function ( geometry ) {
      //       var mat = new THREE.MeshLambertMaterial({color: 0x00ffff});
      //       var mesh = new THREE.Mesh( geometry, mat );
      //       mesh.rotation.x = -0.5 * Math.PI; //将模型摆正
      //       mesh.scale.set(0.1, 0.1, 0.1); //缩放
      //       geometry.center();
      //       that.scene.add( mesh );
      //     } )
      // } );
        STLLoader.load( './ji.stl', ( geometry ) => {
            console.log( geometry );
            var mat = new THREE.MeshLambertMaterial({color: 0x00ffff});
            var mesh = new THREE.Mesh( geometry, mat );
            mesh.rotation.x = -0.5 * Math.PI; //将模型摆正
            mesh.scale.set(0.1, 0.1, 0.1); //缩放
            geometry.center();
            this.scene.add( mesh );
        } );
    },
    initMeshBox () {
      var geometry = new THREE.BoxGeometry( 1, 1, 1 );
      var material = new THREE.MeshBasicMaterial({ color: 'red' });
      const cube = new THREE.Mesh( geometry,  material);
      this.scene.add( cube );
    },
    initAnimate () {
      this.initRender();
      this.controls.update();  //实时更新
      requestAnimationFrame( this.initAnimate );
    },
    //渲染器
    initWebGLRenderer () {
      return new Promise( ( resolve, reject ) => {
        this.renderer = new THREE.WebGLRenderer({
          alpha: true,    //背景透明
          antialias: true //抗锯齿
        });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild( this.renderer.domElement );
        resolve( true );
      } );
    },
    initCamera () {
      this.camera = new THREE.PerspectiveCamera( 45, window.innerWidth/window.innerHeight, 0.1, 1000 );
      this.camera.position.set( 0, 40, 50 );
      this.camera.lookAt( new THREE.Vector3( 0, 0, 0 ) );
    },
    initScene () {
      return new Promise( (resolve, reject) => {
        this.scene = new THREE.Scene();
        resolve( true );
      } )
    },
    initLight () {
      this.scene.add( new THREE.AmbientLight(0x444444) );   //环境光
      this.light = new THREE.PointLight(0xffffff);  //点光源
      this.light.position.set( 0, 50, 50 );  

      this.light.castShadow = true;  //平行光开启阴影投射
      this.scene.add( this.light );
    },
    initControls () {
      this.controls = new OrbitControls( this.camera, this.renderer.domElement );
      this.controls.enableDamping = true;   //旋转惯性
      this.controls.enableZoom = true;      //缩放
      this.controls.autoRotate = true;      //自动旋转
      this.controls.autoRotateSpeed = 3;  //自动旋转速度
      this.controls.minDistance = 1;        //设置相机距离原点的最近距离
      this.controls.maxDistance = 200;      //设置相机距离原点的最远距离
      // this.controls.enablePan = true;       //右键拖拽
    },
    initGUI () {
      this.gui = {};
      const datGui = new dat.GUI();
    },
    initRender () {
      this.renderer.render( this.scene, this.camera );
    },
    init () {
      //创建场景
      // var scene = new THREE.Scene();
      // //创建透视相机
      // var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
      // //创建一个webGL渲染器
      // var renderer = new THREE.WebGLRenderer({
      //     alpha: true  //白色透明桌布
      // });
      // //全屏渲染
      // renderer.setSize( window.innerWidth, window.innerHeight );
      // //创建一个 长宽高都为1个单位的立方体 boxgeometry是Three.js自带的方法
      // var geometry = new THREE.BoxGeometry( 1, 1, 1 );
      // //创建 对光照无感的 普通材质  （绿色）
      // var material = new THREE.MeshBasicMaterial({ color: 'red' });
      // //创建包裹的网格
      // const cube = new THREE.Mesh( geometry,  material);
      // //初始化控制器实例
      // var controls = new OrbitControls( camera );

      // const objLoader = new OBJLoader();

      // const stlloaderThree = STLLoader( THREE );  //stl加载器
      // const stlloader = new stlloaderThree();
      

      // const STLLoaderIns = new STLLoader();
      // new Promise( ( resolve, reject ) => {
      //    STLLoaderIns.load( './dd.stl', geometryInfo => {
      //         //创建一个网格
      //         var stlCube = new THREE.Mesh( geometryInfo,  material);
      //         scene.add( stlCube );  //载入场景中
      //         resolve( true );
      //     }, _ => {}, err => {
      //         console.log( err );
      //     } );
      // } )
      // .then( data => {
      //   console.log( data );
      // } )

      //将立方体添加到场景中
      // scene.add( cube );
      // camera.position.z = 5; //指定相机位置
      // controls.target.set( 0, 0, 0 ); //设置控制器的焦点，使控制器围绕这个焦点进行旋转
      // controls.minDistance = 10;// 设置移动的最短距离（默认为零）
      // controls.maxDistance = 400;// 设置移动的最长距离（默认为无穷）
      // controls.maxPolarAngle = Math.PI / 3;//绕垂直轨道的距离（范围是0-Math.PI,默认为Math.PI）
      // controls.update();// 照相机转动时，必须更新该控制器

      // objLoader.load('./obj.obj', obj => {
      //     obj.scale.set(10, 10, 10);
      //     obj.position.set(-10, 0, 0);
      //     scene.add( obj );
      //     renderer.render( scene, camera );  //webgl渲染器 渲染当前的三维场景
      //     document.body.appendChild( renderer.domElement );
      // }, () => {}, e => {
      //   console.log( e );
      // });
      //geometryInfo是载入的stl模型实体
      // stlloader.load('./12_GG_AxeMani.stl', function ( f ) {
      //     var stlCube = new THREE.Mesh( f,  material);
      //     scene.add( stlCube );  //载入场景中
      //     renderer.render( scene, camera );  //webgl渲染器 渲染当前的三维场景
      //     document.body.appendChild( renderer.domElement );
      // }, q => {
      //   console.log( q );
      // }, e => {
      //   console.log( e );
      // });
      
  //     const render = () => {
  //       //  cube.rotation.x += 0.05;  //网格不断运动
  //       //  cube.rotation.y += 0.05;
  //        renderer.render( scene, camera );  //webgl渲染器 渲染当前的三维场景
  //        requestAnimationFrame( render );  //递归的运行当前函数
  //     }
  //     // render()
  //     renderer.render( scene, camera );
  // //  把webgl生成的html插进去
  //     document.body.appendChild(  renderer.domElement );
    }
  },  
  mounted () {
    this.loadModel();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>

</style>
