var localdb = DB.newDB();
$(document).on("pagebeforecreate", function () {
    console.log("all page");
    new Promise(function (resolve, reject) {
        localdb.createDB('localEnglish', 'words', 'word');
        setTimeout(() => {
            resolve();
        }, 1000);
    }).then(function () {
        localdb.reverseData("words");
    }).then(function () {
        setTimeout(() => {
            $('ul.wordlist').empty();
            var wordArr = localdb.datas;
            for (let i in wordArr) {
                var spanhid = '<span hidden>' + '&' + wordArr[i].meaning + '&' + wordArr[i].sentence + '</span>';
                var deletebtn = '<a class="ui-icon-mydelete mydelete">delete</a>';
                var li = '<li><a href="#card" data-rel="popup" data-transition="flip" class="wordpop"> <h3>' + wordArr[i].word + '</h3>' + spanhid + '</a>' + deletebtn + '</li>';
                $('.wordlist').on('tap', 'li a.wordpop', onTapEvent);
                $('.wordlist').on('taphold', 'li a.wordpop', onTapHoldEvt);
                $('.wordlist').on('tap', 'li a.mydelete', onTapDelete);
                $('.wordlist').append(li);
                $('ul.wordlist').listview('refresh');
            }
        }, 1000);
    }).catch(function (error) {
        console.log("error:" + error);
    })
})
function clearAllWords() {
    localdb.deleteDB('localEnglish');
}
function onTapEvent() {
    var $conts = $(this).text().split("&");
    $('#card h2').text($conts[0]);
    $('#card .meanings').text($conts[1]);
    $('#card .sentences').text($conts[2]);
}
function onTapHoldEvt() {
    var conts = $(this).text().split("&");
    location.href = "../AddPage/AddPage.html?word=" + conts[0] + "&meaning=" + conts[1] + "&sentence=" + conts[2];
}
function onTapDelete() {
    if (confirm("确认删除？")) {
        localdb.deleteData('words', $(this).siblings('a.wordpop').children('h3').text());
        $(this).parent().remove();
        $('ul.wordlist').listview('refresh');
    }
}