$(document).ready(function () {
    $('.returnImage').click('click',
        function (e) {
            var urlImage = $(this).attr('data-url');

            var doc = window.opener.document;
            var id = doc.getElementsByTagName('label')[3].control.id;
            doc.getElementById(id).value = urlImage;

            window.close();
        });
});

//<style type="text/css">
//   .returnImage { 
//    margin: 10px;
//    padding: 5px;
//    width: 210px;
//   }
  
//.returnImage img{
//    box-sizing: border-box;
//    border: 1px solid black;
//    padding: 5px;
//}
//</style>