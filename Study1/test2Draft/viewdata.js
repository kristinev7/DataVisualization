
$(document).ready(function() {
    $('#search').click(function(){
        var wk = $('#week').val();
        var pass = $("#p:checked").val();
        if(wk != '')        
        {
            loadData(wk, pass);
        } else {
            alert("Please select week");
        }
    });
});
