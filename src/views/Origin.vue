<template>
    <div>
        <el-button icon="el-icon-caret-left" type="primary" @click="$router.go(-1)" class="btn">GO BACK</el-button>
        <div id="origin-root"></div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import echarts from 'echarts';

@Component({})
export default class Album extends Vue {
        initEchart(){
            const option = {
                    backgroundColor: 'orange',
                    title: {
                        text: '16级建智02班学生分布表',
                        left: 'center',
                        top: 30,
                        textStyle: {
                            color: '#000',
                            fontSize:"16"
                        }
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: '{a} <br/>{b} : {c} ({d}%)'
                    },
                    visualMap: {
                        show: false,
                        min: 0,
                        max: 10,
                        inRange: {
                            colorLightness: [0, .600]
                        }
                    },
                    series: [
                        {
                            name: '市区',
                            type: 'pie',
                            radius: '70%',
                            center: ['50%', '50%'],
                            data: [
                                {value: 6, name: '邵阳市'},
                                {value: 1, name: '娄底市'},
                                {value: 2, name: '郴州市'},
                                {value: 1, name: '永州市'},
                                {value: 1, name: '怀化市'},
                                {value: 6, name: '常德市'},
                                {value: 4, name: '株洲市'},
                                {value: 1, name: '湘潭市'},
                                {value: 1, name: '江苏省泰州市'},
                                {value: 1, name: '湘西土家族苗族自治州'},
                                {value: 5, name: '岳阳市'},
                                {value: 5, name: '衡阳市'},
                                {value: 1, name: '湖北省荆州市'},
                                {value: 1, name: '安徽枞阳县'}
                            ].sort(function (a, b) { return a.value - b.value; }),
                            roseType: 'radius',
                            label: {
                                color: '#000',
                                fontSize:"18"
                            },
                            labelLine: {
                                lineStyle: {
                                    color: 'rgba(255, 255, 255, 0.3)'
                                },
                                smooth: 0.2,
                                length: 10,
                                length2: 20
                            },
                            itemStyle: {
                                color: 'red',
                                shadowBlur: 200,
                                shadowColor: 'rgba(0, 0, 0, 0.2)'
                            },
                            animationType: 'scale',
                            animationEasing: 'elasticOut',
                            animationDelay: function (idx) {
                                return Math.random() * 200;
                            }
                        }
                    ]
                };
            const myChart=echarts.init(document.getElementById("origin-root"));
            myChart.setOption(option);
        }
        mounted(){
            this.initEchart();
        }
};
</script>


<style scoped>
.btn{
    position: absolute;
    z-index: 10000;
    left: 100px;
    top: 20px;
}
    #origin-root{
        position: absolute;
        width: 100%;
        height: 100%;
        /* color: #000; */
    }
</style>
