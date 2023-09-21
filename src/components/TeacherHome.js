import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function TeacherHome() {
  const { id } = useParams(); // URL에서 ID 파라미터 추출
  const [studentList, setStudentList] = useState([]);

  useEffect(() => {
    // 서버에 요청을 보내 학생 목록을 가져옵니다.
    axios.get(`http://example.com/api/teacher/${id}/students`)
      .then((response) => {
        setStudentList(response.data); // 학생 목록을 상태에 저장
      })
      .catch((error) => {
        console.error('학생 목록을 가져오는 중 오류 발생:', error);
      });
  }, [id]); // id가 변경될 때마다 실행

  return (
    <div>
      <h2>Teacher Home</h2>
      <h3>선생님 ID: {id}</h3>
      <h3>학생 목록:</h3>
      <ul>
        {studentList.map((student) => (
          <li key={student.id}>{student.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default TeacherHome;
