// User Domain
function Student(studentNo, userName, korean, math, english){

  // variable
  var studentNo = studentNo;
  var userName = userName;
  var korean = korean;
  var math = math;
  var english = english;
  var sumScore = korean + math + english;
  var averageScore = parseInt(sumScore / 3);

  // getter and setter
  this.getStudentNo = function(){
    return studentNo;
  }

  this.setStudentNo = function(input_studentNo){
    studentNo = input_studentNo;
  }

  this.getUserName = function(){
    return userName;
  }

  this.setUserName = function(input_userName){
    userName = input_userName;
  }

  this.getKorean = function(){
    return korean;
  }

  this.setKorean = function(input_korean){
    korean = input_korean
  }

  this.getMath = function(){
    return math;
  }

  this.setMath = function(input_math){
    math = input_math;
  }

  this.getEnglish = function(){
    return english;
  }

  this.setEnglish = function(input_English){
    english = input_english;
  }

  this.getSumScore = function(){
    return sumScore;
  }

  this.getAverageScore = function(){
    return averageScore;
  }

} // End of Student


// Student Repository
function StudentRepository(){

  // variable
  var students = [];

  // dummy data
  var newStudent = new Student(01, "홍길동", 100, 92, 98);
  students.push(newStudent);
  var newStudent = new Student(02, "가나다", 98, 87, 99);
  students.push(newStudent);
  var newStudent = new Student(03, "하하하", 99, 77, 88);
  students.push(newStudent);

  // getter
  this.getStudents = function(){
    return students;
  }

} // End of StudentRepository


// Student Controller
function StudentController(){

  // connection StudentDao
  var studentDao = new StudentDao();

  // requestSelectListStudent
  this.requestSelectListStudent = function(){

    var studentList = studentDao.studentList();
    var studentListView = new StudentListView();
    studentListView.studentListView(studentList);

  } // End of requestSelectListStudent()


  // requestSelectOneStudent
  this.requestSelectOneStudent = function(){

    // 조회할 학번 선택
    var checkStudentNoView = new CheckStudentNoView();
    var selectStudentNo = checkStudentNoView.checkStudentNoView();

    // 선택한 학번 정보 가져오기
    var selectedStudent = studentDao.checkStudentNo(selectStudentNo);

    // 선택한 학번의 학생이 존재하지 않으면
    if(selectedStudent == null) {

      new AlertView().alert("선택하신 학번은 없는 학번입니다");

    } else {
      // 선택한 학번의 학생이 존재하면
      // 학생 정보 출력
      var selectOneStudentView = new SelectOneStudentView();
      selectOneStudentView.selectOneStudentView(selectedStudent);

    }

  } // End of requestSelectOneStudent()


  // requestCheckStudentNumber
  this.requestCheckStudentNo = function(){

    // 등록할 학생 번호 입력
    var checkStudentNoView = new CheckStudentNoView();
    var checkStudentNo = checkStudentNoView.checkStudentNoView();

    // 입력한 학생 번호가 있는지 체크
    var newStudent = studentDao.checkStudentNo(checkStudentNo);

    //



  } // End of requestCheckStudentNo()


  // requestUpdateStudent
  this.requestUpdateStudent = function(){



  } // End of requestUpdateStudent()


  // requestDeleteStudent
  this.requestDeleteStudent = function(){



  } // End of requestDeleteStudent()


  // requestInsertScore
  this.requestInsertScore = function(){



  } // End of requestInsertScore()


  // requestUpdateScore
  this.requestUpdateScore = function(){



  } // End of requestUpdateScore()

} // End of UserController


// User Dao
function StudentDao(){

  // connection UserRepository
  var studentRepository = new StudentRepository();

  // 학생 리스트 정보 가져가기
  this.studentList = function(){

    var students = studentRepository.getStudents();
    return students;

  } // End of studentList()


  // 존재하는 학생 정보 리턴하기
  this.checkStudentNo = function(selectStudentNo){

    var student = null;
    var students = studentRepository.getStudents();

    for(var i=0; i<selectStudentNo.length; i++){
        if(selectStudentNo == students[i].getStudentNo()){
          student = students[i];
        }
    }

    return student;

  } // End of checkStudentNo()


  // 같은 학번이 있는지 없는지 확인
  




} // End of UserDao


// View

// alert View
function AlertView(){

  this.alert = function(message){

    alert(message);

  }

} // End of AlertView


// studentListView
function StudentListView(){

  this.studentListView = function(studentList){

    var output = "학번\t이름\t국어\t수학\t영어\t총점\t평균\n";
    for(var i=0; i<studentList.length; i++){
      output = output + studentList[i].getStudentNo() + "\t";
      output = output + studentList[i].getUserName() + "\t";
      output = output + studentList[i].getKorean() + "\t";
      output = output + studentList[i].getMath() + "\t";
      output = output + studentList[i].getEnglish() + "\t";
      output = output + studentList[i].getSumScore() + "\t";
      output = output + studentList[i].getAverageScore() + "\n";
    }

    alert(output);

  }

} // End of StudentListView


// checkStudentNoView
function CheckStudentNoView(){

  this.checkStudentNoView = function(){

      var studentNo = window.prompt("학번을 입력하세요","01");
      return studentNo;

  }

} // End of checkStudentNoView


// SelectOneStudentView
function SelectOneStudentView(){

  this.selectOneStudentView = function(selectedStudent){

    var output = "학번\t이름\t국어\t수학\t영어\t총점\t평균\n";
        output = output + selectedStudent.getStudentNo() + "\t";
        output = output + selectedStudent.getUserName() + "\t";
        output = output + selectedStudent.getKorean() + "\t";
        output = output + selectedStudent.getMath() + "\t";
        output = output + selectedStudent.getEnglish() + "\t";
        output = output + selectedStudent.getSumScore() + "\t";
        output = output + selectedStudent.getAverageScore() + "\n";

    alert(output);

  }

} // End of SelectOneStudentView
