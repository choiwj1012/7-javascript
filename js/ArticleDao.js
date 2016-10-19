// article dao
function ArticleDao(){

  var repository = new ArticleRepository();

  // insert article dao method
  this.insertDao = function(article){

    var isSuccess = false;

    try{

      repository.setArticleNum(repository.getArticleNum() + 1);
      article.setNum(repository.getArticleNum());

      var prev_array_length = repository.getArticles().length;
      var next_array_length = repository.getArticles().push(article);

      if((next_array_length - 1) == prev_array_length){
        alert("새글 추가 완료");
        isSuccess = true;
      }

    } catch(e) {
      alert("예외 발생");
      isSuccess = false;
    }

    return isSuccess;

  }

  // read article dao method
  this.readDao = function(readNum){

    try{

      var readArticle = new Article();
      var articles = repository.getArticles();

      for(var i=0; i<articles.length; i++){
          if(readNum == articles[i].getNum()){
            articles[i].setReadCount(articles[i].getReadCount() + 1);
            readArticle = articles[i];
          }
      }

    } catch(e) {
      alert("예외 발생");
      return null;
    }

    return readArticle;

  }

}
