
//ES5 寫法
$(document).ready(function () {
    
    //新增vue
    var vm = new Vue({
        el:"#app",  //元件
        data: {     
            movies:[], //資料是movies 是個陣列
            cart:[],
            currentMoive: null,
            isCartOpen :false
        },
        created() { //vue 元件建立出來,但html 尚未產生時, 先去跟API要資料
            var apiUrl = "https://awiclass.monoame.com/api/command.php?type=get&name=movies"
            var that = this;
            axios.get(apiUrl).then(function(res) {
                that.movies=res.data
                console.log(res.data)
            })
        },
        //轉換圖片
        methods: {
            bgcss(url) {
                return {
                    "background-image" :"url("+url+")",
                    "background-position": "center center",
                    "background-size": "cover"
                }
            },
            wheel(evt){
                // console.log(evt.deltaY)
                TweenMax.to(".cards", 0.8, {
                    left: "-="+ evt.deltaY*4+"px"
                }) 
            },
            addCart(movie, evt) {
                this.currentMoive = movie
                var target = evt.target
                this.$nextTick(()=>{     //執行完網頁更新後再做動畫
                    TweenMax.from(".buybox", 0.8, {
                        left: $(target).offset().left,
                        top: $(target).offset().top,
                        opacity:1,
                        ease: Power1.easeOut
                    })
                })
                setTimeout(() => {
                    this.cart.push(movie)
                }, 800);
            },
        },
        computed: {
            totalPrice(){
                return this.cart
                .map(movie=>movie.price) //把movie 過濾
                .reduce((total,p)=> total+p, 0) // 把tatol+現在價格Ｐ, 預設值為0
            }
        },
        watch: {
            cart() {
                TweenMax.from(".fa-shopping-cart", 0.3, {
                    scale:0.5
                })
            }
        }
    })
          
    console.log(vm.movies)
});

//ES6 寫法
// $(document).ready(function () {
    
//     //新增vue
//     var vm = new Vue({
//         el:"#app",  //元件
//         data: {     //資料是movies 是個陣列
//             movies:[]
//         },
//         created() { //vue 元件建立出來,但html 尚未產生時, 先去跟API要資料
//             var apiUrl = "https://awiclass.monoame.com/api/command.php?type=get&name=movies"
//             axios.get(apiUrl).then(res=>{
//                 this.movies=res.data
//                 console.log(res.data)
//             })
//         }

//     })
          
//     console.log(vm.movies)
// });