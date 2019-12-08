$(document).ready(function () {
    try{
        let urlpara=decodeURIComponent(location.search);
        console.log(urlpara);
        let paras=urlpara.split("?")[1].split("&");
        console.log(paras[0].split("=")[1]);
        $('input[name="word"]').val(paras[0].split("=")[1]);
        $('textarea[name="meaning"]').val(paras[1].split("=")[1]);
        $('textarea[name="sentence"]').val(paras[2].split("=")[1]);
    }catch(error){
        console.log("parseUrl error",error);
    }
   
})
function addSpeech() {
    $(".group-form-speech").append($(".group-speech").clone(true));
}
function addSentence() {
    $('.group-form-sentence').append($('.group-sentence').clone(true));
}
function deleteSpeech(that) {
    $(that).parents('.group-speech').remove();
}
function deleteSentence(that) {
    $(that).parents('.group-sentence').remove();
}
function getWords() {
    var dict = {};
    dict['word'] = $('input[name="word"]').val();
    dict['meaning'] = $('textarea[name="meaning"]').val();
    if(dict['meaning'])
    var $sentences = $('textarea[name="sentence"]').val();
    dict['sentence'] = $sentences;
    if(dict['word']!=""&&dict['meaning']!=''){
        return dict;
    }else{
        alert("没有填写完整");
    }
    return null;
}
function saveWord() {
    var localdb = DB.newDB();
    var dbname = "localEnglish";
    var store = "words";
    var res = getWords();
    if(res!=null){
        new Promise(function (resolve, reject) {
            localdb.createDB(dbname, store, "word");
            setTimeout(() => {
                resolve();
            }, 1000);
        }).then(function () {
            localdb.addData(store, res);
        }).then(function () {
            location.href = "../AllPage/AllPage.html";
        }).catch(function (error) {
            console.log("error", error);
        }).finally(function(){
            setTimeout(() => {
                localdb.closeDB();
            }, 1000);
        })
    
    }
  
}