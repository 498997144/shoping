import Backtop from "../components/common/backtop/Backtop";
export const backTop = {
    data(){
        return{
            backTop:false,      //返回顶部控制
        }
    },
    components:{
        Backtop,
    },
    methods:{
        backClick(){
            window.scroll(0,0);
        },
        windowScroll(){
            if(window.pageYOffset >= 3000) {
                this.backTop = true;
            }
            else {
                this.backTop = false;
            }
        },
    },
    mounted(){
        //  显示返回顶部按钮以及吸顶效果
        window.addEventListener("scroll",this.windowScroll);
    },
    destroyed(){
        window.removeEventListener("scroll", this.windowScroll);
    },
}