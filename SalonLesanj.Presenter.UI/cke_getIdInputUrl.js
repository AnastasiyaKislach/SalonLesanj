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


$(document).ready(function () {
    $('.returnImage').click('click',
        function (e) {
            var urlImage = $(this).attr('data-url');
            var doc = window.opener.document;
            var labels = doc.getElementsByTagName('label');
            for (var i = 0; i < labels.length; i++) {
                if (labels[i].textContent === "Ссылка") {
                    var id = labels[i].id;
                    var control = doc.getElementById(id).control;
                    control.value = urlImage;
                }
            }
            window.close();
        });
});