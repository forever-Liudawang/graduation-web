<template>
<div>
    <h1></h1>
    <div class="nav">
        <el-button type="warning"  size="medium" @click="$router.push('/album')">班级相册</el-button>
        <el-button type="warning" size="medium" @click="$router.push('/talkRoom')">班级聊天室</el-button>
        <el-button type="warning" size="medium" @click="$router.push('/origin')">成员分布</el-button>
    </div>
    <div id="main-root" @mousemove="handleMouse">
    </div>
</div>
</template>

<script lang="ts">
import * as THREE from '../assets/three.js';
import moon from '../assets/moon.jpg';
import earth from '../assets/earth.jpg';
import { Component, Vue, Prop } from 'vue-property-decorator';


@Component({})
export default class Main extends Vue {
    initThree(){
        var scene=new THREE.Scene();
        const container=document.getElementById("main-root")
        var camera=new THREE.PerspectiveCamera( 45, 791/730, 1, 1000 );
        camera.position.z=535;
        var renderer=new THREE.WebGLRenderer({
            antialias:true ,         //去除锯齿
            alpha: true
        })
        renderer.setSize(791,686);
        renderer.setClearColor(0xffffff);       //更改背景颜色
        renderer.setClearAlpha(0);
        container.appendChild(renderer.domElement);
        var earthGeometry=new THREE.SphereGeometry( 40, 64, 64 );
        var moonGeometry=new THREE.SphereGeometry( 10, 64, 64 );
        var sunGeometry=new THREE.SphereGeometry( 60, 64, 64 );
        var moonEarth=null;
        var textureEarth = new THREE.TextureLoader().load( require('../../public/static/eath.jpg'),function(texture){
                renderer.render(scene,camera);
                // animate();
        },undefined,function(err){console.log(err)});  //纹理
        
        var material=new THREE.MeshLambertMaterial({
            // color:0xffffff,
            map:textureEarth,
            side:THREE.DoubleSide,
        })
        var material1=new THREE.MeshLambertMaterial({
            // color:0xffffff,
            map:new THREE.TextureLoader().load(require('../../public/static/moon.jpg')),
            side:THREE.DoubleSide,
        })
        var material2=new THREE.MeshLambertMaterial({
            map:new THREE.TextureLoader().load(require('../../public/static/sun.jpg')),
            side:THREE.DoubleSide,
        })
        var light = new THREE.AmbientLight( 0xffffff ); // 环境光
        var lightPoint = new THREE.PointLight( 0xFF4500, 1, 0 );   //点光源
        lightPoint.position.set(0,0,100)
        var earthGeometryMesh=new THREE.Mesh(earthGeometry,material)
        var moonGeometeryMesh=new THREE.Mesh(moonGeometry,material1)
        var sunGeometryMesh=new THREE.Mesh(sunGeometry,material2)
        moonGeometeryMesh.position.x=-100;
        earthGeometryMesh.position.x=-400;
        sunGeometryMesh.position.z=-200
        scene.add(moonGeometeryMesh)
        scene.add(earthGeometryMesh)
        scene.add(light)
        scene.add(lightPoint);
        scene.add(sunGeometryMesh)
        var deg1=0;
        var deg2=0;
        function animate(){
            deg1+=.5;
            deg2+=0.6
            requestAnimationFrame(animate);
            earthGeometryMesh.rotation.x+=0.01;
            earthGeometryMesh.rotation.y+=0.01;
            sunGeometryMesh.rotation.y+=0.001;
            sunGeometryMesh.rotation.x+=0.001;
            moonGeometeryMesh.rotation.x+=0.01;
            moonGeometeryMesh.rotation.y+=0.005;
            moonGeometeryMesh.position.set(200*Math.cos(deg1*Math.PI/180),0,200*Math.sin(deg1*Math.PI/180))
            earthGeometryMesh.position.set(320*Math.cos(deg2*Math.PI/180),0,320*Math.sin(deg2*Math.PI/180))
            // cube.rotation.z+=0.01;
            renderer.render(scene,camera);
        }
        animate();
    }
    mounted(){
        this.initThree();
    }
    handleMouse(e){
        // console.log(e)
    }
};
</script>


<style lang="scss" scoped>
/* #main-root{
    opacity: .6;
    background: url('../assets/sky.jpg') no-repeat center;
    background-size: cover;
} */
.nav{
    display: flex;
    justify-content: space-around;
    font-size: 20px;
    font-weight: 600;
    color:#fff;
    cursor: pointer;
}
h1{
    font-weight: bold;
    color: #000;
    text-align: center;
    font-size: 24px;
    margin-bottom: 20px;
}
.el-card__header{
    padding: 9px 10px;
    background: #409EFF;
    opacity: .8;
}
.el-card__body{
    background: #409EFF;
    opacity: .8;
}
.el-button{
    color:rgb(44, 44, 44);
}
</style>
