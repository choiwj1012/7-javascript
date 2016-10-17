$(document).ready(function(){

  // dummy data
  var content = [

    { number : "번호", title : "제목", writer : "작성자", views : "조회수" },
    { number : 1, title : "글제목1", writer : "홍길동", views : 10 },
    { number : 2, title : "글제목2", writer : "김길동", views : 20 },
    { number : 3, title : "글제목3", writer : "님길동", views : 30 },
    { number : 4, title : "글제목4", writer : "딤길동", views : 40 },
    { number : 5, title : "글제목5", writer : "림길동", views : 50 },
    { number : 6, title : "글제목6", writer : "밈길동", views : 60 },
    { number : 7, title : "글제목7", writer : "빕길동", views : 70 }

  ];


  // input dummy data
  $("tr").append(function(index){

    var item = content[index];
    var output = "";
    output += "<td>" + item.number + "</td>";
    output += "<td>" + item.title + "</td>";
    output += "<td>" + item.writer + "</td>";
    output += "<td>" + item.views + "</td>";

    return output;

  });


  // input article
  $("#writeBtn").on("click", function(){

    var number = $("#number").val();
    var title = $("#title").val();
    var writer = $("#writer").val();
    var views = $("#views").val();
    var output = "";
    output += "<tr>"
    output += "<td>" + number +"</td>";
    output += "<td>" + title +"</td>";
    output += "<td>" + writer +"</td>";
    output += "<td>" + views +"</td>";
    output += "</tr>"

    $("tbody").append(output);

    $("input").val("");

  });


  // search article
  $("#searchBtn").on("click",function(){

    var isFind = false;
    var selectedNum = $("#searchNum_Search").val();

    $("tr").each(function(){

      var numbers = $(this).children("td").eq(0).text();
      $(this).children("td").css("background","white");

      if(numbers == selectedNum){
        $(this).children("td").css("background","green");
        isFind = true;
      }

    });

    if(isFind){
      alert("찾았습니다 !");
    } else {
      alert("없는 번호입니다");
    }

    $("input").val("");

  });


  // update article
  $("#updateBtn").on("click",function(){

    var isFind = false;
    var selectedNum = $("#searchNum_Update").val();

    $("tr").each(function(){

      var numbers = $(this).children("td").eq(0).text();

      if(numbers == selectedNum){

        var title = $("#updateTitle").val();
        var writer = $("#updateWriter").val();
        var views = $("#updateViews").val();

        $(this).children("td").eq(1).text(title);
        $(this).children("td").eq(2).text(writer);
        $(this).children("td").eq(3).text(views);

        isFind = true;

      }

    });

    if(isFind){
      alert("정상적으로 수정되었습니다");
    } else {
      alert("없는 번호입니다");
    }

    $("input").val("");

  });


  // delete article
  $("#deleteBtn").on("click", function(){

    var deleteNum = $("#deleteNum").val();
    var isFind = false;

    $("tr").each(function(){
      var numbers = $(this).children("td").eq(0).text();
      if(numbers == deleteNum){
        $(this).remove();
        isFind = true;
      }
    });

    if(isFind){
      alert("글 삭제 성공");
    } else {
      alert("글 삭제 실패");
    }

    $("input").val("");

  });

});
