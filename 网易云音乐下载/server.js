const puppeteer = require('puppeteer');
const request = require('superagent')
const path = require('path');
const fs = require('fs-extra');

(async () => {
    // 启动浏览器实例
    const browser = await (puppeteer.launch({ headless: true }));

    //创建一个新页面
    const page = await browser.newPage();

    //进入指定网页
    await page.goto('https://music.163.com/discover/toplist?id=3778678');

    //等待2秒
    await page.waitFor(2000);

    // 获取当前页面所有的 iframe，然后根据 iframe 的名字精确获取某个想要的 iframe
    let iframe = await page.frames().find(f => f.name() === 'contentFrame');

    // 获取 iframe 中的某个元素
    const SONG_LS_SELECTOR = await iframe.$('.m-table tbody');

    // 在浏览器中执行函数，相当于在控制台中执行函数，返回一个 Promise
    const selectedSongHref = await iframe.evaluate(e => {
        let idArr = [];
        let items = e.childNodes;
        const songList = Array.from(items);
        message()
        async function message() {

            //遍历每条数据找出歌曲名称和id
            for (let i = 0; i < songList.length; i++) {
                if (i == 0 || i == 1 || i == 2) {
                    var str = await songList[i].childNodes[1].firstChild.firstChild.childNodes[2].firstChild.firstChild.getAttribute('href');
                    var title = await songList[i].childNodes[1].firstChild.firstChild.childNodes[2].firstChild.firstChild.firstChild.getAttribute('title');
                } else {
                    var str = await songList[i].childNodes[1].firstChild.firstChild.childNodes[1].firstChild.firstChild.getAttribute('href');
                    var title = await songList[i].childNodes[1].firstChild.firstChild.childNodes[1].firstChild.firstChild.firstChild.getAttribute('title');
                }
                if (title.indexOf('-') != -1) {
                    title = title.split('-')[0]
                }
                if (str != null && title != null) {
                    var obj = {
                        songId: str.split('=')[1],
                        title: title
                    }
                    idArr.push(obj);
                }

            }
        }
        return idArr;
    }, SONG_LS_SELECTOR);

    //创建song文件夹
    await fs.mkdir(path.join(__dirname, 'song'))
    console.log(`创建song文件夹`)
    for (let j = 0; j < selectedSongHref.length; j++) {
        const songUrl = 'http://music.163.com/song/media/outer/url?id=' + selectedSongHref[j].songId + '.mp3'
		// 去掉两边的空格符
		var title = selectedSongHref[j].title.replace(/(^\s*)|(\s*$)/g, "")
        console.log(`正在下载第${j + 1}首歌曲《${title}》${songUrl}`)

        //下载歌曲并保存在本地
        const req = request.get(songUrl).set({ 'Referer': 'http://music.163.com' })
        req.pipe(fs.createWriteStream(path.join(__dirname, 'song', title + '.mp3')))
        await sleep(random(2000, 3000))
    }
    browser.close();
})()

//获取两个数之间的随机数
function random(max, min) {
    let range = max - min;
    let rand = Math.random();
    let num = min + Math.round(range * rand);
    return num;
}

//休眠函数
function sleep(time) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve()
        }, time)
    })
}