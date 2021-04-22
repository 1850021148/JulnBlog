const $ = (str) => document.querySelector(str)
const $$ = (str) => document.querySelectorAll(str)

const pro_details = '嗨!**欢迎来到我的个人网站**自我介绍以下' // **代表\n
const details = '我是Juln, 00后, 来自福建晋江, 现在是大二学生, 主要做前端开发, 爱好是听歌'

const show_min_lyric = true

function play() {
    $('audio').play()
    $('.my-audio>.play').style.backgroundPositionY = '0'
}

function pause() {
    $('audio').pause()
    $('.my-audio>.play').style.backgroundPositionY = '35px'
}

function toggelePlay() {
    if( $('audio').paused ) {
        play()
    }
    else{
        pause()
    }
}

function animationTitle() {
    let bool = true
    let interval = setInterval( () => {
        $('title').innerHTML = bool ? '你好,我是Juln' : '欢迎来到我的网站'
        bool = !bool
    },2000)
    window.onblur = () => {
        clearInterval(interval)
        $('title').innerHTML ='╭(⊙o⊙)╮别走啊'
    }
    window.onfocus = () => {
        clearInterval(interval)
        interval = setInterval( () => {
            $('title').innerHTML = bool ? '你好,我是Juln' : '欢迎来到我的网站'
            bool = !bool
        },2000)
    }
}

function nextPlay() {
    let currentSongname = $('.my-audio .songname').innerHTML
    let nextID
    musics.forEach( (music,id) => {
        if(music.songname === currentSongname)
            nextID = (id+1) === musics.length ? 0 : id + 1
    })
    $('#audio').paused || $('#audio').pause()
    $('#audio').src = musics[nextID].url
    play()
    $('.my-audio .songname').innerHTML = musics[nextID].songname
    $('.my-audio .songer').innerHTML = musics[nextID].songer
}

function animationLyric() {
    let currentSongname = $('.my-audio .songname').innerHTML
    let lyricObj = []

    // 若无歌词
    let isReturn = false
    musics.forEach( music => {
        if(music.songname === currentSongname && music.lyric === null){
            $('#min-lyric-box .first').innerHTML = '无歌词'
            $('#min-lyric-box .second').innerHTML = ''
            isReturn = true
            return
        }
    })
    if(isReturn) return

    musics.forEach( music => {
        if(music.songname === currentSongname){
            let lyricArr = music.lyric.split('|||')
            lyricArr.forEach( col => {
                let [time,str] = col.split('[')[1].split(']')
                lyricObj.push( { time, str } )
            })
        }
    })
    let time = $('#audio').currentTime
    
    lyricObj.forEach( (col,id) => {
        if( time >= parseTime(col.time) ) {
            $('#min-lyric-box .first').innerHTML = col.str
            $('#min-lyric-box .second').innerHTML = lyricObj[id+1] ? lyricObj[id+1].str : ''
            return
        }
    })
    
    function parseTime(str) {
        let [min,s] = str.split(':')
        return min * 60 + s * 1
    }
}

// 遍历所有节点
const BFS = {
    nodes: [],
    do (roots) {
        var children = [];
        for (let i = 0;i < roots.length;i++) {
            var root = roots[i];
            // 过滤 text 节点、script 节点
            if ((root.nodeType != 3) && (root.nodeName != 'SCRIPT')) {
                if (root.childNodes.length) children.push(...root.childNodes);
                this.nodes.push(root);
            }
        }
        if (children.length) {
            var tmp = this.do(children);
        } else {
            return this.nodes;
        }
        return tmp;
    }
}

const blogs = [
    {
        blogname: 'electron 笔记大全(未整理完)',
        time: '2020-05-24 23:56:13',
        pageviews: 66,
        type: 'electron',
        href: 'https://blog.csdn.net/ef_ef/article/details/106323923',
    },
    {
        blogname: 'electron本地音乐播放器 JulnMusic@1',
        time: '2020-05-21 13:21:43',
        pageviews: 94,
        type: 'electron',
        href: 'https://blog.csdn.net/ef_ef/article/details/106254953',
    },
    {
        blogname: 'electron 2 - 创建主窗口',
        time: '2020-05-19 23:35:18',
        pageviews: 28,
        type: 'electron',
        href: 'https://blog.csdn.net/ef_ef/article/details/106225597',
    },
    {
        blogname: 'electron 1 安装 / 打包',
        time: '2020-05-19 07:40:47',
        pageviews: 60,
        type: 'electron',
        href: 'https://blog.csdn.net/ef_ef/article/details/106206037',
    },
    {
        blogname: '前端js ~ cookie的基本使用',
        time: '2020-01-25 16:43:28',
        pageviews: 2490,
        type: 'js, cookie, 前端',
    },
]

const musics = [
    {
        songname: '江湖',
        songer: '许嵩',
        url: '../src/music/江湖-许嵩.mp3',
        cover: '../src/cover/江湖-许嵩.jpg',
        lyric: '[00:00.000] 作曲 : 许嵩|||[00:01.000] 作词 : 许嵩|||[00:43.27]今夕是何夕|||[00:46.40]晚风过花庭|||[00:48.88]飘零 予人乐后飘零|||[00:56.01]故地是何地|||[00:59.40]死生不复回|||[01:01.73]热血 风干在旧恨里|||[01:07.69]衣锦夜行 当一生尘埃落定|||[01:14.06]飞鸽来急 那落款沾染血迹|||[01:20.93]夜半嘱小徒复信 言师已故去|||[01:27.80]星云沉默江湖里|||[01:34.44]孤雁飞去 红颜来相许|||[01:40.06]待到酒清醒 她无影 原来是梦里|||[01:47.17]恩怨散去 刀剑已归隐|||[01:52.90]敬属江上雨 寒舟里 我独饮|||[02:24.50]衣锦夜行 当一生尘埃落定|||[02:30.86]飞鸽来急 那落款沾染血迹|||[02:37.78]夜半嘱小徒复信 言师已故去|||[02:44.57]星云沉默江湖里|||[02:51.31]孤雁飞去 红颜来相许|||[02:56.87]待到酒清醒 她无影 原来是梦里|||[03:04.12]恩怨散去 刀剑已归隐|||[03:09.69]敬属江上雨 寒舟里 我独饮|||[03:35.94]孤雁飞去 红颜来相许|||[03:41.65]待到酒清醒 她无影 原来是梦里|||[03:48.89]恩怨散去 刀剑已归隐|||[03:54.50]敬属江上雨 寒舟里 我独饮|||[04:04.25]我独饮'
    },
    {
        songname: '雨幕',
        songer: '许嵩',
        url: '../src/music/雨幕-许嵩.mp3',
        cover: '../src/cover/雨幕-许嵩.jpg',
        lyric: '[00:00.000] 作曲 : 许嵩|||[00:01.000] 作词 : 许嵩|||[00:36.420]桃花岛屿之巅|||[00:39.153]一座残碑镇住想念|||[00:42.866]故人题词十年前|||[00:46.633]而今古苔已横啮|||[00:51.035]冬深春浅时节|||[00:54.217]岛畔福船入港寒夜|||[00:57.653]蒙蒙雾气里跃上甲板|||[01:00.986]道声勿念|||[01:05.421]海上三日无言 卧听雨打舷|||[01:09.038]邻舱客叩门寒暄|||[01:12.837]他鹤发童颜 举着夜光杯|||[01:16.613]与我对饮舷窗前|||[01:19.906]窗外潇潇的雨幕里|||[01:23.163]飘然一曲诱我侧耳听|||[01:27.065]水面箫中剑的倒影|||[01:30.683]是爱中藏恨的诗句|||[01:34.424]我从潇潇的雨幕里|||[01:38.114]遥望漉雪千山都过尽|||[01:42.997]隔海隔山你的背影|||[02:02.700]冬深春浅时节|||[02:05.317]岛畔福船入港寒夜|||[02:09.098]蒙蒙雾气里跃上甲板|||[02:12.150]道声勿念|||[02:16.114]海上三日无言 卧听雨打舷|||[02:20.149]邻舱客叩门寒暄|||[02:24.114]他鹤发童颜 举着夜光杯|||[02:27.640]与我对饮舷窗前|||[02:31.021]窗外潇潇的雨幕里|||[02:34.424]飘然一曲诱我侧耳听|||[02:38.249]水面箫中剑的倒影|||[02:41.924]是爱中藏恨的诗句|||[02:45.768]我从潇潇的雨幕里|||[02:49.452]遥望漉雪千山都过尽|||[02:54.267]隔海隔山你的背影|||[03:01.852]窗外潇潇的雨幕里|||[03:04.473]飘然一曲诱我侧耳听|||[03:08.318]水面箫中剑的倒影|||[03:11.909]是爱中藏恨的诗句|||[03:15.749]我在潇潇的雨幕里|||[03:19.556]漉雪千山都过尽|||[03:24.115]隔海隔山你的背影|||[03:31.615]绯泊之间喘息渐停'
    },
    {
        songname: '绝代风华',
        songer: '许嵩',
        url: '../src/music/绝代风华-许嵩.mp3',
        cover: '../src/cover/绝代风华-许嵩.jpg',
        lyric: '[00:00.000] 作曲 : 许嵩|||[00:01.000] 作词 : 许嵩|||[00:03.775] 编曲：郑楠|||[00:06.375]|||[00:21.150] 林间伞下|||[00:24.515] 你与我执手信步伞下|||[00:29.524] 竹上隐客惊起了雀鸦|||[00:34.548] 速决高下 挥剑一刹那|||[00:37.595]|||[00:41.401] 入鞘还家|||[00:44.716] 你莞尔沏来春涧草茶|||[00:49.745] 子落楸枰 雨落鸳鸯瓦|||[00:54.862] 经年相伴 心饴不化|||[00:58.292]|||[01:00.064] 曾经年少鲜衣怒马|||[01:04.923] 寒沙里征战与杀伐|||[01:10.031] 玉帐外传来了胡笳|||[01:13.765] 如你驻扎 取我牵挂|||[01:20.165] 我心里那一座天下|||[01:25.234] 你坐镇笑靥如桃花|||[01:30.217] 世间当真有两全法|||[01:35.165] 江山深处抚你风华|||[01:40.733]|||[02:02.130] 入鞘还家|||[02:05.590] 你莞尔沏来春涧草茶|||[02:10.620] 子落楸枰 雨落鸳鸯瓦|||[02:15.680] 经年相伴 心饴不化|||[02:19.220]|||[02:20.940] 曾经年少鲜衣怒马|||[02:25.840] 寒沙里征战与杀伐|||[02:30.820] 玉帐外传来了胡笳|||[02:34.670] 如你驻扎 取我牵挂|||[02:41.130] 我心里那一座天下|||[02:46.030] 你坐镇笑靥如桃花|||[02:51.040] 世间当真有两全法|||[02:56.130] 江山深处抚你风华|||[03:01.150] 曾经年少鲜衣怒马|||[03:06.220] 寒沙里征战与杀伐|||[03:11.310] 玉帐外传来了胡笳|||[03:15.090] 如你驻扎 取我牵挂|||[03:21.450] 我心里那一座天下|||[03:26.390] 你坐镇笑靥如桃花|||[03:31.470] 世间当真有两全法|||[03:36.490] 江山深处抚你风华|||[03:41.620] 世间当真有两全法|||[03:46.680] 江山深处抚你风华|||[03:51.530]|||[03:56.710]制作人：许嵩|||[03:58.070]吉他：高飞|||[03:59.340]古筝：程皓如|||[04:00.730]琵琶：刘小菁|||[04:02.080]笛子：冯天石|||[04:03.490]和声：许嵩|||[04:04.910]录音师：许嵩/刘韧|||[04:06.350]混音师：许嵩|||[04:07.780]母带处理：许嵩|||[04:09.090]录音室：Vae Studio/TTL'
    },
    {
        songname: '全世界最好的你',
        songer: '许嵩',
        url: '../src/music/全世界最好的你-许嵩.mp3',
        cover: '../src/cover/全世界最好的你-许嵩.jpg',
        lyric: '[00:00] 全世界最好的你 - 许嵩|||[00:00.2] 词：林乔/刘恩汛|||[00:00.3] 曲：郑国锋|||[00:00.4] 编曲：陈沁扬/刘也|||[00:00.5] 制作人：顾潇予|||[00:00.6] 音乐监制：宋鹏飞|||[00:00.7] 弦乐：国际首席爱乐乐团|||[00:01] 弦乐指导：李朋|||[00:01.1] 混音师：顾潇予|||[00:01.2] 和声：子午|||[00:01.3] 人声录音：许嵩|||[00:01.4] 录音室：Vae Studio|||[00:01.5] 母带处理工程师：顾潇予|||[00:01.6] 音乐出品制作发行：北京听见时代娱乐传媒有限公司|||[00:02] 欲言又止的我|||[00:06] 有些话还没说|||[00:09] 而你又在笑什么|||[00:13] 是不是懂了|||[00:16] 假装无动于衷|||[00:20] 替你收拾难过|||[00:23] 又怕有些话捅破|||[00:27] 我突然词穷|||[00:32] 你讲着 梦的情节|||[00:39] 紧张到 哭红双眼|||[00:46] 思恋如同候鸟等待季节|||[00:52] 飞多久才能 相互察觉|||[00:58] 你就像是夏夜|||[01:02] 我是星空点点|||[01:05] 陪着你 才能闪烁 直到不可或缺|||[01:12] 故意撞你的肩|||[01:16] 听你责备瞬间|||[01:20] 在乎的感觉 竟然那么甜|||[01:39] 你讲着 梦的情节|||[01:46] 紧张到 哭红双眼|||[01:53] 思恋如同候鸟等待季节|||[01:59] 飞多久才能 相互察觉|||[02:05] 你就像是夏夜|||[02:09] 我是星空点点|||[02:12] 陪着你 才能闪烁 直到不可或缺|||[02:20] 故意撞你的肩|||[02:23] 听你责备瞬间|||[02:27] 在乎的感觉 竟然那么甜|||[02:34] 你就像是夏夜|||[02:37] 我是星空点点|||[02:41] 当表白 姗姗来迟 而你不可或缺|||[02:48] 绕了多少个圈|||[02:51] 恍然之中发现|||[02:56] 心动也同样 占据你一切|||[03:03] 把彼此的暗恋 终结',
    }
]

const htmls = [

    // 首页
    `
        <link rel="stylesheet" href="../css/index.css">

        <div id='index-body'>
            <p class='hai'></p>
            <p></p>
            <p></p>
            <p class='details'></p>
            <p class='show-ablum-txt'> <span></span> <a class='ablum-start' href='javaScript:void(0)'></a> </p>
        </div>
    `,

    // 博客
    `
        <link rel="stylesheet" href="../css/blog.css">

        <div id='blog-type-box'>
            <span>全部</span>
            <span>时间排序</span>
            <span>浏览量排序</span>
            <span>分类</span>
        </div>

        <div id='rec-blog-box'>
            <p>我的推荐</p>
            <li>
                <a href='http://lhyd.top/' target='_blank'>学长的python及人工智能博文系列</a>
            </li>
            <li>
                <a href='https://captainbed.vip/1-2-3/' target='_blank'>床长人工智能教学</a>
            </li>
            <li>
                <a href='https://es6.ruanyifeng.com/#README' target='_blank'>阮一峰ES6教学</a>
            </li>
        </div>

        <div id='blog-body'>
        
        </div>
    `,

    // 音乐
    `
        <link rel="stylesheet" href="../css/music.css">

        <div id='music-body'>

            <div class='my-search'>
                <input id='music-search' type='search' placeholder='想听什么音乐?' />
            </div>

            <ul id='song-list-box'>
            
            </ul>
        </div>
    `,

    // 设置
    `
        <link rel="stylesheet" href="../css/setting.css">

        <div id='setting-body'>
            <h2>Setting</h2>
            <ul>
                <li>
                    <p class='label'>基本设置</p>
                    <p class='cont'>护眼模式</p>
                    <div class='selector'>    
                        <button class='up'></button>
                        <button class='down'></button>
                    </div>
                </li>
                <li>
                    <p class='label'>音乐设置</p>
                    <p class='cont'>歌词显示</p>
                    <div class='selector'>    
                        <button class='up'></button>
                        <button class='down'></button>
                    </div>
                </li>
            </ul>
        </div>
    `,
]

const scripts = [
    function index() {
        animation({
            el: $('#index-body>p:nth-child(1)'),
            str: '嗨!', // 2 num
            delay: 0,
        })
        animation({
            el: $('#index-body>p:nth-child(2)'),
            str: '欢迎来到我的个人网站',  // 10 num
            delay: 2,
        })
        animation({
            el: $('#index-body>p:nth-child(3)'),
            str: '自我介绍以下', // 6 num
            delay: 12,
        })
        animation({
            el: $('#index-body>p:nth-child(4)'),
            str: details, // 44 num
            delay: 18,
        })
        animation({
            el: $('#index-body>p:nth-child(5)>span'),
            str: '说到听歌，给大家推荐我的个人歌单', // 16
            delay: 62,
        })
        animation({
            el: $('#index-body>p:nth-child(5)>a'),
            str: '《vae》',
            delay: 80,
        })
        $('#index-body>.show-ablum-txt>a').onclick = () => $('audio').paused && play()
        // delay: 前面的字数和
        // delay*transistion 即为总延时
        function animation( { el,str,transistion = 100,delay } ) {
            let timeout = setTimeout( () => {
                let i = 1
                let interval = setInterval( () => {
                    if(i === str.length) {
                        clearTimeout(timeout)
                        clearInterval(interval)
                    }
                    el.innerHTML = str.slice(0,i)
                    i ++
                },transistion)
            },delay*transistion)
        }
    },
    function blog() {
        blogs.forEach( (blog,id) => {
            setTimeout( () => {
                let li = document.createElement('li')
                li.innerHTML =  `
                    <li>
                        <h2> <a href='${blog.href}' target='_blank'>${blog.blogname}</a> </h2>
                        <div class='details'>
                            <span>${blog.time}</span>
                            <span>&nbsp;&nbsp;</span>
                            <img style='width: 20px; height: 20px; position: relative; top: 5px;' src='../src/read.png' />
                            <span>${blog.pageviews}</span>
                            <span>&nbsp;&nbsp;</span>
                            <span>类型: ${blog.type}</span>
                        </div>
                    </li>
                `
                $('#blog-body').appendChild(li)
                li.style.transition = `.5s`
                li.style.transform = `translateX(100px)`
                setTimeout(()=>{li.style.transform = `translateX(0px)`},20)
            },id * 200)
        })
    },
    function music() {
        musics.forEach( music => {
            let li = document.createElement('li')
            li.innerHTML = `
                <li class='song'>
                    <img width='30px' height='30px' src='${music.cover}' />
                    <span class='songname'>${music.songname}</span>
                    <span class='songer'>${music.songer}</span>
                    <span class='play'>播放</span>
                </li>
            `
            $('#song-list-box').appendChild(li)
        })
        setTimeout( () => [
            $$('#song-list-box .play').forEach( (btn,id) => {
                btn.onclick = function() {
                    $('#audio').pause || $('#audio').pause()
                    $('#audio').src = musics[id].url
                    play()
                    $('.my-audio .songname').innerHTML = musics[id].songname
                    $('.my-audio .songer').innerHTML = musics[id].songer 
                }
            })
        ],20)
        $('#music-search').onkeydown = function(event) {
            if(event.keyCode !== 13) return
            window.open(`https://music.163.com/#/search/m/?s=${this.value}&type=1004`)
        }
    },
    function setting() {
        if( localStorage.getItem('护眼模式') ) {
            $$('#setting-body .down')[0].style.opacity = '1'
        }
        if( localStorage.getItem('歌词显示') ) {
            $$('#setting-body .down')[1].style.opacity = '1'
        }
        $$('#setting-body .down').forEach( btn => {
            btn.onclick = function() {
                let settingName = btn.parentNode.parentNode.children[1].innerHTML
                let uped = localStorage.getItem(settingName) ? true : false
                // 取消
                if(uped) {
                    localStorage.removeItem(settingName)
                    this.style.opacity = '.5'
                }
                // 确认
                else{
                    this.style.opacity = '1'
                    localStorage.setItem(settingName,'true')
                }
                if(settingName === '护眼模式') {
                    reloadColorStyle()
                }
                else if(settingName === '歌词显示') {
                    reloadShowLyricStyle()
                }
            }
        })
    },
]

// ============== main ==============

console.log("%c ", "padding:112px 150px;background:url('http://returnc.com/frontend/images/console.gif') no-repeat;")

animationTitle()

// audio
$('.my-audio>.play').onclick = toggelePlay
$('.my-audio>.next').onclick = nextPlay
$('#audio').ontimeupdate = function() {
    animationLyric()
}
$('#audio').onended = function() {
    nextPlay()
}

reRender()

function reRender() {
    reloadScript()
    reloadColorStyle()
    reloadShowLyricStyle()
}

function reloadScript() {
    $$('header>nav>li').forEach( (li,id) => {
        if(li.className !== 'active') return
        $('.scroll>article').innerHTML = htmls[id]
        setTimeout(() => {
            scripts[id]()
        },20)
    })
}

function reloadColorStyle() {
    if(!localStorage.getItem('护眼模式')) {
        let bfs = BFS.do(document.body.childNodes)
        for(let i = 0; i < bfs.length; i++) {
            bfs[i].style && ( bfs[i].style.color = '#ddd' )
        }
        document.body.style.backgroundColor = 'rgb(32, 30, 30)'
    }
    else{
        let bfs = BFS.do(document.body.childNodes)
        for(let i = 0; i < bfs.length; i++) {
            bfs[i].style && ( bfs[i].style.color = 'black' )
        }
        document.body.style.backgroundColor = '#aaa'
    }
    $('.songname').style.color = 'rgb(221, 221, 221)'
    $('.songer').style.color = 'rgb(221, 221, 221)'
    $('h1').style.color = 'rgb(255, 166, 0)'
}

function reloadShowLyricStyle() {
    if(!localStorage.getItem('歌词显示')) {
        $('#min-lyric-box').style.visibility = ''
    }
    else{
        $('#min-lyric-box').style.visibility = 'hidden'
    }
}