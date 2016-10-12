
//controller 객체
function UserController() {

	// UserDao Connection
	this.dao = new UserDao();

	// selectList Controller
	this.requestSelectList = function() {

		var users = this.dao.selectListUser();

		new SelectListView(users);

	}

	// selectOne Controller
	this.requestSelectOne = function() {

		var userId = new SelectIdView();

		var user = this.dao.selectOneUser(userId);

		new SelectOneView(user);

	}

	// insert Controller
	this.requestInsert = function() {

		var user = new InsertView();

		this.dao.insertUser(user);

	}

	// update Controller
	this.requestUpdate = function() {

		var userId = new SelectIdView();

		var userInfo = this.dao.selectOneUser(userId);

		var updatedUser = new UpdateView(userInfo);

		this.dao.updateUser(updatedUser);

	}

	// delete Controller
	this.requestDelete = function() {

		var deleteId = new SelectIdView();

		this.dao.deleteUser(deleteId);

	}

}


//dao 객체
function UserDao() {

	// Connection UserRepository
	this.repository = new UserRepository();

	// 전체 조회 dao 메서드
	this.selectListUser = function() {

		var users = this.repository.getUsers();

		return users;

	}

	// 하나 조회 dao 메서드
	this.selectOneUser = function(userId) {

		var users = this.repository.getUsers();
		var currentUserCount = this.repository.getUsers().length;
		var user = {};

		for(var i=0; i<currentUserCount; i++) {
			if(users[i].getId() == userId.getId()) {
				user = users[i];
				break;
			}
		}

		return user;

	}

	// 추가 dao 메서드
	this.insertUser = function(user) {

		var users = this.repository.getUsers();
		users.push(user);

	}

	// 수정 dao 메서드
	this.updateUser = function(updatedUser) {

		var result = false;
		var users = this.repository.getUsers();
		var currentUserCount = this.repository.getUsers().length;

		for(var i =0 ; i < currentUserCount ; i++) {
			if(users[i].getId() == updatedUser.getId()) {
				users[i] = updatedUser;
				result = true;
				break;
			}
		}

		return result;

	}

	// 삭제 dao 메서드
	this.deleteUser = function(deleteId) {

		var result = false;
		var users = this.repository.getUsers();
		var currentUserCount = this.repository.getUsers().length;

		for(var i =0 ; i < currentUserCount ; i++) {
			if(users[i].getId() == deleteId.getId()) {
				users.splice(i, 1);
				result = true;
				break;
			}
		}

		return result;

	}

}


//repository 객체
function UserRepository() {

	this.users = [];

	this.getUsers = function() {
		return this.users;
	}

}


//도메인(domain) 객체
function User(id, name, tel) {

	this.id = id;
	this.name = name;
	this.tel = tel;

	this.getId = function() {
		return this.id;
	}

	this.getName = function() {
		return this.name;
	}

	this.setName = function(name) {
		this.name = name;
	}

	this.getTel = function() {
		return this.tel;
	}

	this.setTel = function(tel) {
		this.tel = tel;
	}

}


// 전체 User 조회 뷰
function SelectListView(users) {

	var output = '아이디\t이름\t전화번호\n';
	for(var i = 0 ; i < users.length ; i++) {
		output = output + users[i].getId() + '\t';
		output = output + users[i].getName() + '\t';
		output = output + users[i].getTel() + '\n';
	}

	alert(output);

}


// 아이디 선택 뷰
function SelectIdView(){

		var userId = prompt("아이디를 입력하세요" , "1");
		var selectedUser = new User(userId);
		return selectedUser;

}


// 하나 User 조회 뷰
function SelectOneView(user){

		var output = "아이디\t이름\t전화번호\n";
		output = output + user.getId() + "\t";
		output = output + user.getName() + "\t";
		output = output + user.getTel() + "\t";
		alert(output);

}


//InsertView 객체
function InsertView() {

	var id = prompt('아이디를 입력하세요.', '1');
	var name = prompt('이름을 입력하세요.', '홍길동');
	var tel = prompt('전화번호를 입력하세요.', '010');

	var user = new User(id, name, tel);

	return user;

}


// 수정 뷰
function UpdateView(userId) {

	 var tel = prompt('수정하실 전화번호를 입력하세요.');

	 userId.setTel(tel);

	 return userId;

}
