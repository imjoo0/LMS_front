import React, { useEffect, useState } from 'react';
import axios from 'axios';

function TeacherHome({ userId }) {
  console.log(userId)
  const [studentList, setStudentList] = useState([]);
  const [banList, setBanList] = useState([]);
  const [studentTaskList, setStudentTaskList] = useState([]);
  const [categoryGroupedTaskList, setCategoryGroupedTaskList] = useState([]);
  const [unlearnedStudentList, setUnlearnedStudentList] = useState([]);
  
  // 학생 수와 카테고리별 학생 수를 저장할 상태 변수 정의
  const [totalStudents, setTotalStudents] = useState(0);
  const [holdStudents, setHoldStudents] = useState(0);
  const [outStudents, setOutStudents] = useState(0);

  useEffect(() => {
    // 서버에 요청을 보내 학생 목록을 가져옵니다.
    axios.get(`http://purpleacademy.net:2305/teacher/get_students_data/${userId}`)
      .then((response) => {
        const students = response.data.all_students;
        
        // 학생 수 설정
        setTotalStudents(students.length);
        
        // 카테고리별 학생 수 계산
        const holdStudentsCount = students.filter(student => student.category_id === 2).length;
        const outStudentsCount = students.filter(student => student.category_id === 3).length;
        
        setHoldStudents(holdStudentsCount);
        setOutStudents(outStudentsCount);

        setStudentList(students);
      });
  }, [userId]); // id가 변경될 때마다 실행

  useEffect(() => {
    // 서버에 요청을 보내 학생 목록을 가져옵니다.
    axios.get(`http://purpleacademy.net:2305/teacher/get_unlearned_data/${userId}`)
      .then((response) => {
        const unlearnedConsultings = response.data.unlearned_consulting
        const groupedData = {};
        unlearnedConsultings.forEach((consulting) => {
          const studentId = consulting.student_id;
          if (!groupedData[studentId]) {
            // studentId로 그룹화된 데이터 객체 생성
            groupedData[studentId] = {
              student_id: studentId,
              deadline: new Date(consulting.deadline),
              missed: new Date(consulting.missed),
              unlearnedList: [],
            };
          }
          
          // 해당 studentId 그룹의 unlearnedList에 데이터 추가
          groupedData[studentId].unlearnedList.push(consulting);

          // deadline과 missed를 비교하여 최신값으로 업데이트
          if (!groupedData[studentId].deadline || new Date(consulting.deadline) < new Date(groupedData[studentId].deadline)) {
            groupedData[studentId].deadline = new Date(consulting.deadline);
          }
          
          if (!groupedData[studentId].missed || new Date(consulting.missed) > new Date(groupedData[studentId].missed)) {
            groupedData[studentId].missed = new Date(consulting.missed);
          }
        });
        
        // groupData의 객체를 배열로 변환하여 processedData에 저장
        for (const studentId in groupedData) {
          unlearnedStudentList.push(groupedData[studentId]);
        }
        console.log(unlearnedStudentList)
        setUnlearnedStudentList(unlearnedStudentList);
      })
      .catch((error) => {
        console.error('미학습 목록을 가져오는 중 오류 발생:', error);
      });
  }, [userId]); // id가 변경될 때마다 실행

  useEffect(() => {
    // 서버에 요청을 보내 학생 목록을 가져옵니다.
    axios.get(`http://purpleacademy.net:2305/teacher/get_task_data/${userId}`)
      .then((response) => {
        setBanList(response.data.ban_data)
        const ban_task = response.data.ban_task;
        const categoryGrouped = ban_task.reduce((acc, item) => {
          if (!acc[item.category]) {
              acc[item.category] = [];
          }
          acc[item.category].push(item);
          return acc;
        }, []);
        setCategoryGroupedTaskList(categoryGrouped)
        setStudentTaskList(response.data.student_task); 
      })
      .catch((error) => {
        console.error('미학습 목록을 가져오는 중 오류 발생:', error);
      });
  }, [userId]); // id가 변경될 때마다 실행
  return (
    <div>
      <h2>Teacher Home</h2>
      <h3>선생님 ID: {userId}</h3>
      {/* <h3>원생 목록:</h3>
      <ul>
        {studentList.map((student) => (
          <li key={student.id}>{student.name}</li>
        ))}
      </ul> */}
      
      <h3>초기 배정 원생 수: {totalStudents}</h3>
      <h3>관리: {totalStudents - holdStudents - outStudents}</h3>
      <h3>보류: {holdStudents}</h3>
      <h3>퇴소: {outStudents}</h3>
      {Object.entries(categoryGroupedTaskList).map(([category, tasks]) => (
        <div key={category}>
          <table className="table">
            <thead style={{ backgroundColor: '#ffc107' }}>
              <tr className="row">
                <th className="col-10">{category} 업무</th>
                <th className="col-2">업무순서</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task) => (
                <tr key={task.id} className="row">
                  <td className="col-8">{task.contents}</td>
                  <td className="col-2">{task.priority}</td>
                  <td className="col-2">{task.ban_id}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}

export default TeacherHome;
