# 카카오페이 사전과제 일정 캘린더 [![Build Status](https://travis-ci.com/boxfox619/Planning-Calendar.svg?branch=master)](https://travis-ci.com/boxfox619/Planning-Calendar) [![Coverage Status](https://coveralls.io/repos/github/boxfox619/Planning-Calendar/badge.svg?branch=master)](https://coveralls.io/github/boxfox619/Planning-Calendar?branch=master)
일정관리 Calendar 웹 어플리케이션

## 프로젝트 실행 방법
아래 명령어 또는 페이지 접속 [https://boxfox619.github.io/Planning-Calendar/](https://boxfox619.github.io/Planning-Calendar/)
```
npm start
```
#### 주의사항
- 초기 접속시 github pages 에러로 인해 페이지가 안나오는 경우 발생 -> 새로고침 해주시면 됩니다.
- AWS Lambda 사용으로 초기 접속 또는 장시간 reqeust 없을 시 request 응답속도가 느릴 수 있습니다.
- 백엔드 API는 aws lambda에서 구동중입니다. https://8y7lkefwd2.execute-api.ap-northeast-2.amazonaws.com/kakao-calendar/task?year=2019&month=4
- 백엔드 repository : https://github.com/boxfox619/Planning-Calendar-Backend

### 환경
- node version : 10.15.3
- React v16
- Typescript

### Project 구조
```
├─api           // network api
├─common        // 공통적으로 사용되는 모듈
├─components    // store state를 직접적으로 사용하지 않는 컴포넌트
├─containers    // store state를 직접적으로 사용하는 컨테이너
├─models        // interface, payload, model 이 정의된 디렉토리
├─reducers      // redux store, action, redux-observable의 epic 정의
└─utils         // 유틸리티 모듈
```
### Dependencies
| dependencies | version |
| ------ | ------ |
| antd | ^3.16.3 |
| axios | ^0.18.0 |
| immutability-helper | ^3.0.0 |
| lodash | ^4.17.11 |
| moment | ^2.24.0 |
| react | ^16.8.6 |
| react-dom | ^16.8.6 |
| react-redux | ^7.0.2 |
| react-scripts-ts | 3.1.0 |
| redux | ^4.0.1 |
| redux-actions | ^2.6.5 |
| redux-observable | ^1.1.0 |
| rxjs | ^6.4.0 |
| styled-components | ^4.2.0 |

| dev-dependencies | version |
| ------ | ------ |
| enzyme | ^3.9.0 |
| enzyme-adapter-react-16 | ^1.12.1 |
| coveralls | ^3.0.3 |
| gh-pages | ^2.0.1 |
| typescript | ^3.4.4 |

### API 문서
[Swagger](https://app.swaggerhub.com/apis-docs/boxfox619/Planning-Calendar/1.0.0)

### Database schema
```
create table task(
 id SERIAL PRIMARY KEY,
 name varchar NOT NULL,
 day date NOT NULL,
 startHour smallint NOT NULL,
 endHour smallint NOT NULL
);
```

## 컴포넌트 설계
![Montly Calendar UI](https://user-images.githubusercontent.com/14067209/56738166-01dd7200-67a7-11e9-86f2-6a6b24c7d0cd.png)
![웹 1920 – 3@2x](https://user-images.githubusercontent.com/14067209/56738134-f2f6bf80-67a6-11e9-885d-ac3b3a51efe2.png)
![웹 1920 – 4](https://user-images.githubusercontent.com/14067209/56738135-f38f5600-67a6-11e9-8431-1934ea772786.png)

## 의존성 결정 
- redux : 익숙하여 빠르게 개발가능, 레퍼런스 많음, State 관리 효과적
- rxjs, redux-observable : 비동기 작업, redux-saga, redux-thunk에 비해 operator, 기능이 많음
- axios : 가장 보편적으로 사용되는 HTTP 라이브러리
- enzyme : dom에 직접 렌더링하는 방식 x 해당 컴포넌트만 격리하여 테스트하는 방식 : 단위테스트
- styled-components : 익숙하여 빠르게 개발 가능, 컴포넌트 스타일링 단순화, 복잡성 감소
- antd : 필요한 UI 컴포넌트를 빠르게 구현, 일관성 있는 디자인

# 문제해결 전략
#### 월간 캘린더
- 날짜 계산을 위해 moment.js를 사용
- 선택된 달의 1일의 요일 번호(0~6)을 구하고 1이상이면 이전 달의 마지막날 - 요일 번호 만큼의 이전달의 날짜를 렌더링
- 선택된 달의 마지막 요일 번호를 구하고 6미만이면 6 - 요일번호 만큼의 다음달의 날짜를 렌더링
#### 주간 캘린더
- 선택된 주가 첫번째 주라면 월간 캘린더와 같이 이전달의 날짜렌더링
- 선택된 주가 마지막 주리면 월간 캘린더와 같이 이전달의 날짜렌더링
- 0~24시까지 고정된 높이의 시간 cell을 렌더링
- 일정(task) 컴포넌트의 style 속성 중 height를 (시간 cell 높이) * (종료시간 - 시작시간), top을 (시간 cell 높이) * (시작시간)으로 계산하여 렌더링
#### drag-n-drop
- onDrop, onDragOver, onDragStart 이벤트와 draggable 속성을 통해 컴포넌트 드래깅
- 각 월별 캘린더의 날짜 박스 / 주간 캘린더에 시간 cell 마다 해당하는 datetime정보를 dataset 속성에 저장
- drop 이벤트 발생시 event target의 dataset으로부터 datetime을 가져와 드래그한 일정(Task)에 반영
#### form validation
- 시작시간 선택 콤보박스는 최소 한시간 일정을 위해 24시는 선택 불가능하게 설정
- 시작시간 선택시 종료시간을 계산하여 시작시간과 같거나 작을경우 (시작시간 + 1) 시간으로 설정함
- 시작시간 선택시 종료시간 콤보박스의 항목을 시작시간 이후 시간들만 선택가능하도록 함
- 비즈니스 로직을 최대한 분리하기 위해 epic에서 중복된 일정이 있는지 검사함
#### 기타
- 코드 품질 관리, github pages 지속적 배포를 위해 travis, coveralls 사용
- 월/주를 빠르게 변경시 중복 request로 인한 문제 발생 : 다음 조회 리퀘스트를 요청할 때 기존에 요청했던 request는 무시 (Redux-Observable, rx - TakeUntil)
- 일정 생성/수정 중복요청 방지를 위해 create, update request에 throttle 3초를 적용
- 일정 모델 : 일정이름, 연월일, 시작시간, 종료시간으로 구성
