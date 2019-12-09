var localdb = DB.newDB();
var dbname = "localEnglish";
var store = "words";
$(document).ready(function () {
    localdb.createDB(dbname, store, "word");
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
    var res = getWords();
    if(res!=null){
        new Promise(function (resolve, reject) {
            localdb.addData(store, res);
        }).catch(function (error) {
            console.log("error", error);
        })
    }
  
}