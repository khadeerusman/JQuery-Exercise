
var pagepointer=0;
jQuery(document).ready(function(){
    btnclick(1);
   
});

$(document).on('click', '.delete', function () {
    $("#myModal").appendTo('body');
    $("#myModal").modal("show");
    $(document).on('click','#delete',function(){
        $(".delete").closest('tr').remove();
        return false;
        })
        $(document).on('click','#cancel',function(){
            $("#myModal").modal("hide");
        })
  });

 $(document).on("click", ".edit", function(){		
    $(this).parents("tr").find("td:not(:last-child)").each(function(){
        $(this).html('<input type="text" class="form-control" value="' + $(this).text() + '">');
    });		
    $(this).parents("tr").find(".add, .edit").toggle();
    $(".add-new").attr("disabled", "disabled");
});

$(function(){
    $("#sub").click(function(){
    var fname=$("#f").val();
    var lname=$("#l").val();
    var mail=$("#e").val();
    if(fname=="" ||lname==""||mail=="")
    {
        alert("Please enter the value");
    }
    else{
    $.ajax({
        url: "https://reqres.in/api/users",
        type: "POST",
        data: {
           first_name: fname,
           last_name:lname,
           email:mail
        },
        success: function(response){
            console.log(response);
        }
    });
    var mark="<tr><td style='text-align:center'>"+fname+" "+lname+"</td><td style='text-align:center'>"+mail+"</td><td style='text-align:center'>"+" "+"</td><td  style='text-align:center' > <a class='edit' title='Edit' data-toggle='tooltip'><i style='color:green' class='material-icons'>&#xE254;</a> <a  title='Delete' data-toggle='tooltip'><i id='d'style='color:red' class='delete' class='material-icon'>&#xE872;</i></a></td></tr>";
    $("table tbody").append(mark);
}
});
    
});

$(function () {
    $("#add").click(function () {
        $("#MyPopup").appendTo('body');
        $("#MyPopup").modal("show");
       
    });
});

function btnclick(btnvalue)
{
pagepointer=btnvalue;
if(pagepointer===4)
{
    $('#lastt').blur();
}

if(pagepointer<1)
{
    alert("No more records")
}
$("tbody").children().remove();
jQuery.ajax({
    url: "https://reqres.in/api/users?page="+btnvalue,
    data: {},
    beforeSend: function(){}
}).done(function(response) {
    var trArr = new Array();
    $.each(response.data, function(i, v){
        trArr.push('<tr><td style="text-align:center">' + v.first_name+" "+v.last_name +'</td><td style="text-align:center" >' + v.email + '</td><td style="text-align:center"><img id="img" src="' 
        + v.avatar + '" width="100px" /></td><td style="text-align:center"> <a class="edit" title="Edit" data-toggle="tooltip"><i style="color:green" class="material-icons">&#xE254;</a> <a  title="Delete" data-toggle="tooltip"><i id="d" style="color:red" class="delete" class="material-icons">&#xE872;</i></a>' + '</td></tr>'  );
        
    });
    $('table#usertable tbody').append(trArr.join('\n')); 
});
}

