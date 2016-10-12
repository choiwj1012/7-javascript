// User Domain
function User(userId, userPw, userName, userTel){

  // variable
  var userId = userId;
  var userPw = userPw;
  var userName = userName;
  var userTel = userTel;

  // getter and setter
  this.getUserId = function(){
    return userId;
  }

  this.setUserId = function(input_userId){
    userId = input_userId;
  }

  this.getUserPw = function(){
    return userPw;
  }

  this.setUserPw = function(input_userPw){
    userPw = input_userPw;
  }

  this.getUserName = function(){
    return userName;
  }

  this.setUserName = function(input_userName){
    userName = input_userName
  }

  this.getUserTel = function(){
    return userTel;
  }

  this.setUserTel = function(input_userTel){
    userTel = input_userTel;
  }

} // End of User


// User Repository
function UserRepository(){

  // variable
  var users = [];

  // getter
  this.getUsers = function(){
    return users;
  }

} // End of UserRepository


// User Controller
function UserController(){

  // connection UserDao
  var userDao = new UserDao();

  // method
  // checkUserId
  this.requestCheckUserId = function(){

    // 체크할 유저 아이디 가져오기
    var checkUserIdView = new CheckUserIdView();
    var UserId = checkUserIdView.checkUserIdInfo();

    // repository에 유저 아이디가 있는지 검사
    var isFind = userDao.checkUserId(UserId);

    // 존재하는 아이디가 없다면
    if(!isFind){

      this.requestInsert(UserId);

    } else {

      // 존재하는 아이디가 있다면
      new AlertView().alert("이미 존재하는 아이디가 있습니다");

    }

  } // End of requestCheckUserId()


  // add new User
  this.requestInsert = function(checkedUserId){

    // 비밀번호, 이름, 전화번호 정보 받음
    var insertView = new InsertView();
    var newUser = insertView.insertView(checkedUserId);

    // 받은 정보 repository 저장
    var isSuccess = userDao.insertUser(newUser);

    // 회원등록 성공여부
    if(isSuccess){
      new AlertView().alert("회원등록이 정상적으로 처리되었습니다");
    } else {
      new AlertView().alert("회원등록에 실패하였습니다");
    }

  } // End of requestInsert()


  // select One User
  this.requestSelectOneUser = function(){

    // 정보를 가져올 아이디 선택
    var checkUserIdView = new CheckUserIdView();
    var checkUserId = checkUserIdView.checkUserIdInfo();

    // 선택된 아이디를 repository에서 검색
    var selectedUser = userDao.selectOneUser(checkUserId);

    // print user Information
    if(selectedUser){

      var selectOneUserView = new SelectOneUserView();
      selectOneUserView.selectOneUserView(selectedUser);

    } else {

      new AlertView().alert("선택하신 아이디는 없는 아이디 입니다");

    }

  } // End of requestSeleteOneUser()


  // selectlistUser
  this.requestSelectListUser = function(){

    var userList = userDao.selectUserList();
    var userListView = new UserListView();
    userListView.userListView(userList);

  } // End of requestSelectListUser


  // update One User
  this.requestUpdateUser = function(){

    // 정보를 가져올 아이디 선택
    var checkUserIdView = new CheckUserIdView();
    var checkUserId = checkUserIdView.checkUserIdInfo();

    // 수정할 정보 가져오기
    var updateUserView = new UpdateUserView();
    var updatedUser = updateUserView.updateUserView(checkUserId);

    // 수정 정보 저장
    var isSuccess = userDao.updateUser(updatedUser);

    if(isSuccess){
      new AlertView().alert("업데이트 성공");
    } else {
      new AlertView().alert("업데이트 실패");
    }

  } // End of requestUpdateUser()


  // delete One User
  this.requestDeleteUser = function(){

    // 정보를 가져올 아이디 선택
    var checkUserIdView = new CheckUserIdView();
    var checkUserId = checkUserIdView.checkUserIdInfo();

    // 정보 삭제하기
    var isSuccess = userDao.deleteUser(checkUserId);

    if(isSuccess){
      new AlertView().alert("유저 정보 삭제 성공");
    } else {
      new AlertView().alert("유저 정보 삭제 실패");
    }

  } // End of requestDeleteUser()

} // End of UserController


// User Dao
function UserDao(){

  // connection UserRepository
  var userRepository = new UserRepository();

  // checkUserId
  this.checkUserId = function(userId){

    var isFind = false;
    var users = userRepository.getUsers();

    for(var i = 0; i < users.length; i++){
      if(userId == users[i].getUserId()){
        isFind = true;
      }
    }

    return isFind;

  } // End of checkUserId()


  // insert New User
  this.insertUser = function(newUser){

    var isSuccess = false;
    var users = userRepository.getUsers();

    users.push(newUser);
    isSuccess = true;
    return isSuccess;

  } // End of insertUser()


  // select One User
  this.selectOneUser = function(checkUserId){

    var users = userRepository.getUsers();
    var selectedUser = null;

    for(var i=0; i<users.length; i++){
        if(checkUserId == users[i].getUserId()){
          selectedUser = users[i];
        }
    }

    return selectedUser;

  } // End of selectOneUser()


  // select list User
  this.selectUserList = function(){

    var users = userRepository.getUsers();
    return users;

  } // End of selectUserList()


  // update One User
  this.updateUser = function(updatedUser){

      var isSuccess = false;
      var users = userRepository.getUsers();

      for(var i=0; i<users.length; i++){
        if(updatedUser.getUserId() == users[i].getUserId()){

            users[i].setUserPw(updatedUser.getUserPw());
            users[i].setUserName(updatedUser.getUserName());
            users[i].setUserTel(updatedUser.getUserTel());
            isSuccess = true;

        }
      }

      return isSuccess;

  } // End of updateUser()


  // delete One User
  this.deleteUser = function(selectedUser){

    var isSuccess = false;
    var users = userRepository.getUsers();

    for(var i=0; i<users.length; i++){
      if(selectedUser == users[i].getUserId()){
        users.splice(i,1);
        isSuccess = true;
      }
    }

    return isSuccess;

  } // End of deleteUser()

} // End of UserDao


// View

// alert View
function AlertView(){

  this.alert = function(message){

    alert(message);

  }

} // End of AlertView


// check user id View
function CheckUserIdView(){

  this.checkUserIdInfo = function(){

    // insert new user id for check
    var userId = window.prompt("아이디를 입력하세요","8자 이하로 작성하세요");
    return userId;

  }

} // End of CheckUserIdView


// insert View
function InsertView(){

  this.insertView = function(checkedUserId){

    // insert new user Information
    var userPw = window.prompt("등록할 패스워드를 입력하세요","8자 이하로 작성하세요");
    var userName = window.prompt("등록할 이름을 입력하세요","8자 이하로 작성하세요");
    var userTel = window.prompt("등록할 전화번호를 입력하세요","-는 빼고 숫자만 입력하세요");

    var newUser = new User(checkedUserId, userPw, userName, userTel);
    return newUser;

  }

} // End of InsertView


// selectOneUser View
function SelectOneUserView(){

  this.selectOneUserView = function(selectedUser){

      var output = "아이디\t이름\t전화번호\n";
      output = output + selectedUser.getUserId() + "\t";
      output = output + selectedUser.getUserName() + "\t";
      output = output + selectedUser.getUserTel() + "\t";

      alert(output);

  }

} // End of SelectOneUserView


// userListView
function UserListView(){

  this.userListView = function(userList){

    var output = "아이디\t이름\t전화번호\n";
    for(var i=0; i<userList.length; i++){
        output = output + userList[i].getUserId() + "\t";
        output = output + userList[i].getUserName() + "\t";
        output = output + userList[i].getUserTel() + "\n";
    }

    alert(output);

  }

} // End of UserListView


// updateUserView
function UpdateUserView(){

  this.updateUserView = function(selectedUser){

    var userPw = window.prompt("바꾸실 비밀번호 입력하세요");
    var userName = window.prompt("바꾸실 이름을 입력하세요");
    var userTel = window.prompt("바꾸실 전화번호를 입력하세요");
    var updatedUser = new User(selectedUser, userPw, userName, userTel);
    return updatedUser;

  }

} // End of UpdateUserView
