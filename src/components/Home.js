import React from 'react';
import Cookies from 'js-cookie';
import { StudentProvider } from '../StudentContext';
import TeacherHome from './TeacherHome';
import ManagerHome from './ManagerHome';

function Home() {
  const user = JSON.parse(Cookies.get('user'));
  console.log(user)
  
  return (
    <div>
      <h2>UserInfo</h2>
      <span>{user.name}({user.eng_name})님 안녕하세요</span>

      {user.category === 2 && (
        <div>
          {/* user.category가 2인 경우 TeacherHome 표시 */}
          <StudentProvider>
            <TeacherHome userId={user.id} />
          </StudentProvider>
        </div>
      )}
      {/*  "만약 user.category가 2라면 아래의 내용을 실행하고 그렇지 않다면 실행하지 말라"는 의미 */}

      {user.category === 1 && (
        <div>
          {/* user.category가 1인 경우 ManagerHome 표시 */}
          <ManagerHome />
        </div>
      )}
    </div>
  );
}

export default Home;
