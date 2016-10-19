// Article Repository
function ArticleRepository(){

  var articleNum = 0;
  var articles = [];

  this.getArticleNum = function(){

    return articleNum;

  }

  this.setArticleNum = function(n){

    articleNum = n;

  }

  this.getArticles = function(){

    return articles;

  }

}
