// Article domain
function Article(title, content, writer){

  // local variable
  var articleNum = 0;
  var articleTitle = title;
  var articleWriter = writer;
  var readCount = 0;

  // getter and setter
  this.getArticleNum = function(){
    return articleNum;
  }

  this.setArticleNum = function(input_articleNum){
    articleNum = input_articleNum;
  }

  this.getArticleTitle = function(){
    return articleTitle;
  }

  this.setArticleTitle = function(input_articleTitle){
    articleTitle = input_articleTitle;
  }

  this.getArticleWriter = function(){
    return articleWriter;
  }

  this.setArticleWriter = function(input_articleWriter){
    articleWriter = input_articleWriter;
  }

  this.getReadCount = function(){
    return readCount;
  }

  this.setReadCount = function(input_readCount){
    readCount = input_readCount;
  }

} // End of Article


// Article Repository
function ArticleRepository(){

  // local variable
  var articleNum = 0;
  var articles = [];

  // getter and setter
  this.getArticleNum = function(){
    return articleNum;
  }

  this.setArticleNum = function(input_articleNum){
    articleNum = input_articleNum;
  }

  this.getArticles = function(){
    return articles;
  }

} // End of ArticleRepository


// Article controller
function ArticleController(){

  // connect ArticleDao
  var articleDao = new ArticleDao();

  // method
  // writing article method
  this.requestInsert = function(article){

    var isSuccess = articleDao.insertDao(article);
    return isSuccess;

  } // End of requestInsert()


  // delete Article method
  this.requestDelete = function(delete_num){

    var isSuccess = articleDao.deleteDao(delete_num);
    return isSuccess;

  } // End of requestDelete()


  // update Article method
  this.requestUpdate = function(article){

    var isSuccess = articleDao.updateDao(article);
    return isSuccess;

  } // End of requestUpdate()


  // read Article Method
  this.requestRead = function(articleNum){

    var article = articleDao.readDao(articleNum);
    return article;

  } // End of requestRead()


} // End of ArticleController


// Article dao
function ArticleDao(){

  // connect ArticleRepository
  var articleRepository = new ArticleRepository();

  // method
  // writing article method
  this.insertDao = function(article){

    var isSuccess = false;

    try{

      articleRepository.setArticleNum(articleRepository.getArticleNum() + 1);
      article.setArticleNum(articleRepository.getArticleNum());

      var prev_array_length = articleRepository.getArticles().length;
      // .push() return value = A Number, representing the new length of the array
      var next_array_length = articleRepository.getArticles().push(article);

      if((next_array_length - 1) == prev_array_length) {
        alert("새글이 정상적으로 추가되었습니다");
        isSuccess = true;
      }

    } catch(e) {

      alert("새글 추가과정에서 예외가 발생했습니다");
      isSuccess = false;

    } finally {

    }

    return isSuccess;

  } // End of insertDao()


  // delete article method
  this.deleteDao = function(delete_num){

    var isSuccess = false;

    try{

      var articles = articleRepository.getArticles();
      for(var i = 0; i < articles.length; i++){
        if(delete_num == articles[i].getArticleNum()){
          var article = articles.splice(i, 1);
          if(article != undefined){
            isSuccess = true;
            break;
          }
        }
      }

    } catch(e) {

      alert("기존 글을 삭제하는 과정에서 예외가 발생함");
      isSuccess = false;

    } finally {

    }

    return isSuccess;

  } // End of deleteDao()


  // update article method
  this.updateDao = function(article){

    var isSuccess = false;

    try{

      var articles = articleRepository.getArticles();

      for(var i = 0; i < articles.length; i++){
        if(article.getArticleNum() == articles[i].getArticleNum()){
          articles[i].setArticleTitle(article.getArticleTitle());
          articles[i].setArticleContent(article.getArticleContent());
          articles[i].setArticleWriter(article.getArticleWriter());
          isSuccess = true;
          break;
        }
      }

    } catch(e) {

      alert("기존 글을 수정하는 과정에 예외가 발생하였습니다");
      isSuccess = false;

    } finally {

    }

    return isSuccess;

  } // End of updateDao()



}
