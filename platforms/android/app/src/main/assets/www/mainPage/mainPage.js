var localdb = DB.newDB();
$(document).on("pagebeforecreate", function () {
    new Promise(function (resolve, reject) {
        localdb.createDB('localEnglish', 'words', 'word');
        setTimeout(() => {
            resolve();
        }, 1000);
    }).then(function () {
        localdb.reverseData('words');
    }).then(function () {
        setTimeout(() => {
            if (localdb.length >= 10) {
                for (let i = 0; i < 10; ++i) {
                    var rand = Math.floor(Math.random() * localdb.length);
                    console.log(localdb.datas[rand]);
                    $('.rand-li').eq(i).children('h3').text(localdb.datas[rand].word);
                }
            }
        }, 1000);
    }).catch(function (error) {
        console.log("error mainpage", error);
    })
})
$(document).ready(function () {
    $('.rand-btn').on('click', function () {
        var $show = $(this).siblings(".rand-word");
        var word = $show.text();
        if ($(this).text() == "Chinese") {
            $(this).text("English");
            localdb.getDataByKey("words", word);
            setTimeout(() => {
                var meaning = localdb.valueByKey.meaning;
                $show.text(meaning);
            }, 500);


        } else {
            $(this).text("Chinese");
            localdb.getDataByValue("words", "meaning", word);
            setTimeout(() => {
                var meaning = localdb.resByVal.word;
                $show.text(meaning);
            }, 500);
        }

    })
})
