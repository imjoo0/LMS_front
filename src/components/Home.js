// Home.js 파일 또는 다른 컴포넌트 파일에서
import React from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../UserContext';

function Home() {
    const {user} = useUser()
    return (
        <div>
            <h2>UserInfo</h2>
            <span>{user.name}({user.eng_name})님 안녕하세요</span>
        </div>
    );
}

export default Home;



