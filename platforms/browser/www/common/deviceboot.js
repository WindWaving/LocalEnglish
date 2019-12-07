// document.addEventListener('deviceReady', onOpenDB);
$(document).on('ready',onOpenDB);
function onOpenDB() {
    console.log("open database");
    var localdb=DB.newDB();
    localdb.createDB('localEnglish', 'words', 'word');
}