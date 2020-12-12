$(function(){
    var btnUpload=$('#upload');
    var status=$('#status');
    new AjaxUpload(btnUpload, {
        action: 'upload-file.php',
        name: 'uploadfile',
        onSubmit: function(file, ext){
            if (! (ext && /^(jpg|png|jpeg|gif)$/.test(ext))){ 
                status.text('Поддерживаемые форматы JPG, PNG или GIF');
                return false;
            }
            status.text('Загрузка...');
        },
        onComplete: function(file, response){
            status.text('');
            if(response==="success"){
                $('<li></li>').appendTo('#files').html('<img src="./uploads/'+file+'" alt="" /><br />'+file).addClass('success');
            } else{
                $('<li></li>').appendTo('#files').text('Файл не загружен' + file).addClass('error');
            }
        }
    });
        
});