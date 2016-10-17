// User Domain
function Student(studentNo, studentName, korean, math, english){

  // variable
  var studentNo = studentNo;
  var studentName = studentName;
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

  this.getStudentName = function(){
    return studentName;
  }

  this.setstudentName = function(input_studentName){
    studentName = input_studentName;
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

  this.setEnglish = function(input_english){
    english = input_english;
  }

  this.getSumScore = function(){
    return sumScore;
  }

  this.getAverageScore = function(){
    return averageScore;
  }

  this.setAverageScore = function(input_averageScore){
    averageScore = input_averageScore;
  }

} // End of Student


// Student Repository
function StudentRepository(){

  // variable
  var students = [];

  // dummy data
  var newStudent = new Student(20161010, "홍길동", 100, 92, 98);
  students.push(newStudent);
  var newStudent = new Student(20161011, "가나다", 98, 87, 99);
  students.push(newStudent);
  var newStudent = new Student(20161012, "하하하", 99, 77, 88);
  students.push(newStudent);
  var newStudent = new Student(20161013, "호호호", 77, 66, 88);
  students.push(newStudent);
  var newStudent = new Student(20161014, "흐흐흐", 88, 77, 80);
  students.push(newStudent);
  var newStudent = new Student(20161015, "헤헤헤", 99, 77, 99);
  students.push(newStudent);
  var newStudent = new Student(20161016, "후후후", 87, 88, 99);
  students.push(newStudent);
  var newStudent = new Student(20161017, "히히히", 77, 86, 95);
  students.push(newStudent);
  var newStudent = new Student(20161018, "크크크", 87, 93, 83);
  students.push(newStudent);
  var newStudent = new Student(20161019, "카카카", 100, 98, 75);
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

  // 전체 학생에 대한 정보 조회
  this.requestSelectListStudent = function(){

    var studentList = studentDao.studentList();
    var studentListView = new StudentListView();
    studentListView.studentListView(studentList);

  } // End of requestSelectListStudent()


  // 선택한 학생에 대한 정보 조회
  this.requestSelectOneStudent = function(){

    // 조회할 학번 선택
    var insertStudentNoView = new InsertStudentNoView();
    var selectStudentNo = insertStudentNoView.insertStudentNoView();

    // 선택한 학번 정보 가져오기
    var selectedStudent = studentDao.selectStudentNo(selectStudentNo);

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


  // 학생 등록전 입력한 학생 번호 중복 체크
  this.requestCheckStudentNo = function(){

    // 등록할 학생 번호 입력
    var insertStudentNoView = new InsertStudentNoView();
    var selectStudentNo = insertStudentNoView.insertStudentNoView();

    // 입력한 학생 번호가 있는지 체크
    var isFind = studentDao.checkStudentNo(selectStudentNo);

    // 중복된 학생 번호가 없다면 등록
    if(isFind) {
      new AlertView().alert("이미 존재하는 학생번호입니다");
    } else {
      this.requestInsertStudent(selectStudentNo);
    }

  } // End of requestCheckStudentNo()


  // 학생 등록
  this.requestInsertStudent = function(selectStudentNo){

      var newStudentInfoView = new NewStudentInfoView();
      var newStudent = newStudentInfoView.newStudentInfoView(selectStudentNo);
      var isSuccess = studentDao.insertStudent(newStudent);

      if(isSuccess) {
        new AlertView().alert("학생정보등록에 성공하였습니다.");
      } else {
        new AlertView().alert("학생정보등록에 실패하였습니다.");
      }

  } // End of requestInsertStudent()


  // 학생 정보 수정
  this.requestUpdateStudent = function(){

    // 조회할 학번 선택
    var insertStudentNoView = new InsertStudentNoView();
    var selectStudentNo = insertStudentNoView.insertStudentNoView();

    // 선택한 학번 정보 가져오기
    var selectedStudent = studentDao.selectStudentNo(selectStudentNo);

    // 선택한 학번의 학생이 존재하지 않으면
    if(selectedStudent == null) {

      new AlertView().alert("선택하신 학번은 없는 학번입니다");

    } else {

      // 선택한 학번의 학생이 존재하면 학생정보 수정하기
      var updateStudentView = new UpdateStudentView();
      var updatedStudent = updateStudentView.updateStudentView(selectedStudent);
      var isSuccess = studentDao.updateStudent(updatedStudent);

      if(isSuccess){

        new AlertView().alert("수정 완료 되었습니다");

      } else {

        new AlertView().alert("수정에 실패하였습니다");

      }

    }

  } // End of requestUpdateStudent()


  // 학생 정보 삭제
  this.requestDeleteStudent = function(){

    // 삭제할 학생의 학번을 입력
    var insertStudentNoView = new InsertStudentNoView();
    var selectStudentNo = insertStudentNoView.insertStudentNoView();

    // 입력한 학생 번호가 있는지 체크
    var isFind = studentDao.checkStudentNo(selectStudentNo);

    // 입력한 학생 번호가 있으면 정보 삭제
    if(isFind) {

      var isSuccess = studentDao.deleteStudent(selectStudentNo);

      if(isSuccess) {

        new AlertView().alert("정상적으로 삭제되었습니다");

      } else {

        new AlertView().alert("삭제에 실패하였습니다");

      }

    } else {

      new AlertView().alert("없는 학생 번호입니다");

    }

  } // End of requestDeleteStudent()

} // End of UserController


// User Dao
function StudentDao(){

  // connection UserRepository
  var studentRepository = new StudentRepository();

  // 학생 리스트 정보 가져가기
  this.studentList = function(){

    var students = studentRepository.getStudents();

    // 퍙균점수 내림차순 처리
    students.sort(function(a,b){
      return b.getAverageScore() - a.getAverageScore();
    });

    // for(var i=0; i<students.length-1; i++){
    //   var changed = false;
    //   for(var j=0; j<students.length-1-i; j++){
    //
    //     if(students[j].getAverageScore() > students[j+1].getAverageScore()){
    //
    //         var temp = students[j].getAverageScore();
    //         students[j].setAverageScore(students[j+1].getAverageScore());
    //         students[j+1].setAverageScore(temp);
    //         changed = true;
    //
    //     }
    //   }
    //
    //   if(!changed){
    //     break;
    //   }
    //
    // }

    return students;

  } // End of studentList()


  // 존재하는 학생 정보 리턴하기
  this.selectStudentNo = function(selectStudentNo){

    var student = null;
    var students = studentRepository.getStudents();

    for(var i=0; i<students.length; i++){
        if(selectStudentNo == students[i].getStudentNo()){
          student = students[i];
        }
    }

    return student;

  } // End of checkStudentNo()


  // 같은 학번이 있는지 없는지 확인
  this.checkStudentNo = function(selectStudentNo){

    var isFind = false;
    var students = studentRepository.getStudents();

    for(var i=0; i<students.length; i++){
      if(selectStudentNo == students[i].getStudentNo()){
        isFind = true;
      }
    }

    return isFind;

  } // End of checkStudentNo()


  // 학생 정보 입력하기
  this.insertStudent = function(newStudent){

    var isSuccess = false;
    var students = studentRepository.getStudents();

    students.push(newStudent);
    isSuccess = true;

    return isSuccess;

  } // End of insertStudent()


  // 학생 정보 수정하기
  this.updateStudent = function(updatedStudent){

    var isSuccess = false;
    var students = studentRepository.getStudents();

    for(var i=0; i<students.length; i++){
      if(updatedStudent.getStudentNo() == students[i].getStudentNo()){

        students[i].setKorean(updatedStudent.getKorean());
        students[i].setMath(updatedStudent.getMath());
        students[i].setEnglish(updatedStudent.getEnglish());
        isSuccess = true;

      }
    }

    return isSuccess;

  } // End of updateStudent()


  // 학생 정보 삭제하기
  this.deleteStudent = function(selectedStudent){

    var isSuccess = false;
    var students = studentRepository.getStudents();

    for(var i=0; i<students.length; i++){
      if(selectedStudent == students[i].getStudentNo()){

        students.splice(i,1);
        isSuccess = true;

      }
    }

    return isSuccess;

  } // End of deleteStudent()

} // End of UserDao


// View

// alert View
function AlertView(){

  this.alert = function(message){

    alert(message);

  }

} // End of AlertView


// 학생 전체 정보 출력하기
function StudentListView(){

  this.studentListView = function(studentList){

    var output = "학번\t이름\t국어\t수학\t영어\t총점\t평균\n";
    for(var i=0; i<studentList.length; i++){
      output = output + studentList[i].getStudentNo() + "\t";
      output = output + studentList[i].getStudentName() + "\t";
      output = output + studentList[i].getKorean() + "\t";
      output = output + studentList[i].getMath() + "\t";
      output = output + studentList[i].getEnglish() + "\t";
      output = output + studentList[i].getSumScore() + "\t";
      output = output + studentList[i].getAverageScore() + "\n";
    }

    alert(output);

  }

} // End of StudentListView


// 학생 번호 입력하기
function InsertStudentNoView(){

  this.insertStudentNoView = function(){

      var studentNo = window.prompt("학번을 입력하세요","20161012");
      return studentNo;

  }

} // End of checkStudentNoView


// 선택된 학생에 대한 정보 출력
function SelectOneStudentView(){

  this.selectOneStudentView = function(selectedStudent){

    var output = "학번\t이름\t국어\t수학\t영어\t총점\t평균\n";
        output = output + selectedStudent.getStudentNo() + "\t";
        output = output + selectedStudent.getStudentName() + "\t";
        output = output + selectedStudent.getKorean() + "\t";
        output = output + selectedStudent.getMath() + "\t";
        output = output + selectedStudent.getEnglish() + "\t";
        output = output + selectedStudent.getSumScore() + "\t";
        output = output + selectedStudent.getAverageScore() + "\n";

    alert(output);

  }

} // End of SelectOneStudentView


// 새로운 학생 정보 출력
function NewStudentInfoView(){

  this.newStudentInfoView = function(selectStudentNo){

    var studentName = window.prompt("학생 이름을 입력하세요", "예시 : 홍길동");
    var korean = parseInt(window.prompt("국어 점수를 입력하세요" , "예시 : 100"));
    var math = parseInt(window.prompt("수학 점수를 입력하세요" , "예시 : 100"));
    var english = parseInt(window.prompt("영어 점수를 입력하세요", "예시 : 100"));

    var newStudent = new Student(selectStudentNo, studentName, korean, math, english);

    return newStudent;

  }

} // End of NewStudentInfoView


// 학생 정보 수정 뷰
function UpdateStudentView(){

  this.updateStudentView = function(selectedStudent){

    var korean = window.prompt("수정할 국어 점수를 입력하세요" , "예시 : 100");
    var math = window.prompt("수정할 수학 점수를 입력하세요" , "예시 : 100");
    var english = window.prompt("수정할 영어 점수를 입력하세요" , "예시 : 100");

    var updatedStudent = new Student(selectedStudent.getStudentNo(),selectedStudent.getStudentName(), korean, math, english);

    return updatedStudent;

  }

} // End of UpdateStudentView
