// Controller 객체(static)
Controllers = function (){

}

Controllers.articleController = new ArticleController();

Controllers.getArticleController = function(){

	return Controllers.articleController;

}
