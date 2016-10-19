function Article(title, content, writer){

  var num = 0;
  var title = title;
  var content = content;
  var writer = writer;
  var readCount = 0;

  this.getNum = function(){

    return num;

  }

  this.setNum = function(n){

    num = n;

  }

  this.getTitle = function(){

    return title;

  }

  this.setTitle = function(t){

    title = t;

  }

  this.getContent = function(){

    return content;

  }

  this.setContent = function(c){

    content = c;

  }

  this.getWriter = function(){

    return writer;

  }

  this.setWriter = function(w){

    writer = w;

  }

  this.getReadCount = function(){

    return readCount;

  }

  this.setReadCount = function(rc){

    readCount = rc;

  }

}
