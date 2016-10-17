// Article Domain
function Article(number, title, content, writer, views){

  // variable
  var number = number;
  var title = title;
  var content = content;
  var writer = writer;
  var views = views;

  // getter and setter
  this.getNumber = function(){
    return number;
  }

  this.setNumber = function(input_number){
    number = input_number;
  }

  this.getTitle = function(){
    return title;
  }

  this.setTitle = function(input_title){
    title = input_title;
  }

  this.getContent = function(){
    return content;
  }

  this.setContent = function(input_content){
    content = input_content;
  }

  this.getWriter = function(){
    return writer;
  }

  this.setWriter = function(input_writer){
      writer = input_writer;
  }

  this.getViews = function(){
    return views;
  }

  this.setViews = function(input_views){
    views = input_views;
  }

} // End of Article


// Article Repository
function ArticleRepository(){

  // variable
  var articles = [];

  // dummy data
  var article = new Article(1, "글제목1", "내용1", "홍길동", 10);
  articles.push(article);
  var article = new Article(2, "글제목2", "내용2", "김길동", 20);
  articles.push(article);
  var article = new Article(3, "글제목3", "내용3", "님길동", 30);
  articles.push(article);
  var article = new Article(4, "글제목4", "내용4", "딤길동", 40);
  articles.push(article);
  var article = new Article(5, "글제목5", "내용5", "림길동", 50);
  articles.push(article);
  var article = new Article(6, "글제목6", "내용6", "밈길동", 60);
  articles.push(article);
  var article = new Article(7, "글제목7", "내용7", "빕길동", 70);
  articles.push(article);

  // getter
  this.getArticles = function(){
    return articles;
  }

} // End of articleRepository


// Article Controller
function ArticleController(){

  // Connection articleDao
  var articleDao = new ArticleDao();

  // request input dummy article
  this.requestInputDummyData = function(){

    articleDao.inputDummyData();

  } // End of requestInputDummyData()


  // request input article
  this.requestInsertArticle = function(newArticle){

    var isSuccess = articleDao.insertArticle(newArticle);

    var alertView = new AlertView();
    if(isSuccess == true){

      alertView.alert("글 작성에 성공하였습니다");

    } else {

      alertView.alert("글 작성에 실패하였습니다");

    }

  } // End of requestInputArticle()


  // request search article
  this.requestSearchArticle = function(selectedNum){

    var isFind = articleDao.searchArticle(selectedNum);
    // 왜 isFind 가 undefined이지?
    var alertView = new AlertView();
    if(isFind){
      alertView.alert("정상적으로 검색되었습니다")
    } else {
      alertView.alert("입력하신 글번호는 없는 번호입니다");
    }

  } // End of requestSearchArticle()


  // request update article
  this.requestUpdateArticle = function(updateArticle){

    var isFind = articleDao.updateArticle(updateArticle);

    var alertView = new AlertView();
    if(isFind){
      alertView.alert("정상적으로 변경되었습니다")
    } else {
      alertView.alert("입력하신 글번호는 없는 번호입니다");
    }

  } // End of requestUpdateArticle()


  // request delete article
  this.requestDeleteArticle = function(deleteNum){

    var isFind = articleDao.deleteArticle(deleteNum);

    var alertView = new AlertView();
    if(isFind){
      alertView.alert("정상적으로 삭제되었습니다")
    } else {
      alertView.alert("입력하신 글번호는 없는 번호입니다");
    }

  } // End of requestDeleteArtice()


} // End of ArticleController


// Article Dao
function ArticleDao(){

  // Connection articleRepository
  var articleRepository = new ArticleRepository();

  // input dummy data
  this.inputDummyData = function(){

    $(document).ready(function(){

      $("tbody > tr").append(function(index){

        var articles = articleRepository.getArticles();
        articles = articles[index];
        var output = "";
        output += "<td>" + articles.getNumber() + "</td>";
        output += "<td>" + articles.getTitle() + "</td>";
        output += "<td>" + articles.getWriter() + "</td>";
        output += "<td>" + articles.getViews() + "</td>";

        return output;

      });

    });

  } // End of inputDummyData()


  // insert Article
  this.insertArticle = function(newArticle){

    var isSuccess = false;
    var articles = articleRepository.getArticles();
    var output = "";
    output += "<tr>";
    output += "<td>" + newArticle.getNumber() + "</td>";
    output += "<td>" + newArticle.getTitle() + "</td>";
    output += "<td>" + newArticle.getWriter() + "</td>";
    output += "<td>" + newArticle.getViews() + "</td>";
    output += "<tr>";

    articles.push(newArticle);
    $("tbody").append(output);
    $("input").val("");
    isSuccess = true;
    return isSuccess;

  } // End of insertArticle()


  // searchArticle
  this.searchArticle = function(selectedNum){

    $(document).ready(function(){
      var isFind = false;
      $("tr").each(function(){

        var numbers = $(this).children("td").eq(0).text();
        $(this).children("td").css("background","white");

        if(numbers == selectedNum){
          $(this).children("td").css("background","green");
          isFind = true;
        }

      });

      $("input").val("");
      return isFind;

    });

  } // End of searchArticle()


  // update article
  this.updateArticle = function(updateArticle){

    var isFind = false;

    $("tr").each(function(){

      var numbers = $(this).children("td").eq(0).text();

      if(numbers == updateArticle.getNumber()){

        $(this).children("td").eq(1).text(updateArticle.getTitle());
        $(this).children("td").eq(2).text(updateArticle.getContent());
        $(this).children("td").eq(3).text(updateArticle.getWriter());
        $(this).children("td").eq(4).text(updateArticle.getViews());
        isFind = true;

      }

    });

    return isFind;

  } // End of updateArticle()


  // delete article
  this.deleteArticle = function(deleteNum){

    var isFind = false;
    $("tr").each(function(){

      var numbers = $(this).children("td").eq(0).text();
      if(numbers == deleteNum){
        $(this).remove();
        $("input").val("");
        isFind = true;
      }

    });

    return isFind;

  } // End of deleteArticle()

} // End of ArticleDao


// AlertView
function AlertView(){

  this.alert = function(msg){
    alert(msg);
  }

} // End of AlertView()
