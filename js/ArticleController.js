// article Controllers
function ArticleController(){

  var dao = new ArticleDao();

  // insert Article controller method
  this.requestInsert = function(article){

    var isSuccess = dao.insertDao(article);
    return isSuccess;

  }


  // delete article controller method
  this.requestDelete = function(num){

    var isSuccess = dao.deleteDao(num);
    return isSuccess;

  }


  // update article controller method
  this.requestUpdate = function(article){

    var isSuccess = dao.updateDao(article);
    return isSuccess;

  }


  // read article controller method
  this.requestRead = function(num){

    var article = dao.readDao(num);
    return article;

  }


  // selectDelete controller method
  this.requestSelectedDelete = function(nums){

    var isSuccess = dao.selectedDeleteDao(nums);
    return isSuccess;

  }


}
