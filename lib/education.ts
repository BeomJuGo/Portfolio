/**
 * 교과편성+연계표 기반 교육 과정 데이터 (총 약 960시간)
 */
export interface CurriculumItem {
  subject: string   // 세부 주제 (예: DevOps, Linux)
  detail: string    // 세부내용 요약
  hours: number
}

export interface EducationCourse {
  name: string
  totalHours: number
  items: CurriculumItem[]
}

export const educationCourses: EducationCourse[] = [
  {
    name: '클라우드 개발환경 이해 및 구축',
    totalHours: 140,
    items: [
      {
        subject: 'DevOps',
        detail: 'CI/CD·젠킨스, TerraForm, 서버리스·도커·쿠버네티스, Git·GitHub, JSON/XML',
        hours: 70,
      },
      {
        subject: '보안관리 기술',
        detail: '클라우드 자산·취약점·네트워크 보안, 침해 탐지·대응·복구',
        hours: 10,
      },
      {
        subject: 'Linux',
        detail: '가상화·Linux 설치, 기본 명령어·환경변수·파일/디렉토리, SSH·프로세스·웹 개발환경',
        hours: 40,
      },
      {
        subject: 'MSA 개발방법',
        detail: 'MSA 개념·특징, Monolithic·SOA·MSA 비교, DDD·스크럼·API 설계·마이크로서비스 통신·자동 테스트',
        hours: 20,
      },
    ],
  },
  {
    name: '클라우드 객체지향 프로그래밍',
    totalHours: 112,
    items: [
      { subject: '프로그래밍 기본문법', detail: '식별자·자료형·연산자·제어문·반복문·배열, 기본 알고리즘', hours: 32 },
      { subject: '클래스와 객체', detail: 'OOP·클래스 설계·상속·다형성·추상클래스·인터페이스·제네릭·컬렉션·람다·쓰레드', hours: 48 },
      { subject: '입출력 스트림', detail: '바이트/문자 스트림·ObjectStream·직렬화·역직렬화', hours: 16 },
      { subject: '네트워크 프로그래밍', detail: 'TCP/IP·소켓·서버/클라이언트·채팅 프로그래밍', hours: 16 },
    ],
  },
  {
    name: '클라우드 프론트엔드 개발',
    totalHours: 88,
    items: [
      { subject: 'HTML5', detail: '문서 구조·시맨틱 태그', hours: 8 },
      { subject: 'CSS3', detail: '속성·스타일·레이아웃·반응형·Bootstrap', hours: 8 },
      { subject: 'Javascript', detail: '기본문법·DOM·이벤트·TypeScript·Node.js·npm/yarn', hours: 32 },
      { subject: 'React', detail: '컴포넌트·JSX·라이프사이클·폼·라우팅·Redux·GraphQL·Jest', hours: 40 },
    ],
  },
  {
    name: '클라우드 데이터베이스 구축 및 활용',
    totalHours: 50,
    items: [
      { subject: '데이터베이스 구현', detail: 'DBMS·권한·테이블·뷰·모델링(개념·논리·물리)·ERD·정규화', hours: 24 },
      { subject: 'SQL 응용 및 활용', detail: 'DDL·DML·DCL·조인·PL/SQL·저장 프로시저·트리거', hours: 26 },
    ],
  },
  {
    name: '클라우드 서버 백엔드 개발',
    totalHours: 176,
    items: [
      { subject: 'JDBC', detail: 'DB 연동·Connection Pool·PreparedStatement', hours: 8 },
      { subject: 'JSP', detail: '디렉티브·스크립트·내장객체·JSTL·MVC·Model2·게시판', hours: 40 },
      { subject: 'Servlet', detail: 'Model2·라이프사이클·get/post·Redirect·Forward·Connection Pool', hours: 16 },
      { subject: 'MyBatis', detail: 'CRUD·REST API·DAO·프로시저/함수 호출', hours: 24 },
      { subject: 'Spring Boot', detail: 'IOC/DI·AOP·Spring JDBC·트랜잭션·Spring MVC·ORM·인터셉터·JPA·Maven/Gradle·Thymeleaf', hours: 88 },
    ],
  },
  {
    name: '클라우드 플랫폼 기반 서비스 운영 실습',
    totalHours: 100,
    items: [
      {
        subject: 'AWS 플랫폼 웹서비스 구현',
        detail: 'EC2·Route 53·S3·RDS·Kinesis·SQS·SNS·Lambda·ElastiCache·CloudWatch·ECS·Elastic Beanstalk',
        hours: 100,
      },
    ],
  },
  {
    name: '클라우드 데브옵스 응용 실무 프로젝트',
    totalHours: 240,
    items: [
      {
        subject: 'Healthcare Platform (Health-site)',
        detail: 'Spring Boot·React 풀스택 헬스케어 플랫폼. JWT 인증·트레이너 매칭·맞춤형 운동/식단 플랜·AI 트레이너 추천·실시간 채팅·커뮤니티·리뷰·관리자 페이지·FullCalendar 일정/예약·MySQL/PostgreSQL·Flyway',
        hours: 120,
      },
      {
        subject: '공장 안전 음성감지 시스템 (factory-main)',
        detail: '공장 현장 비상 음성·이상 소음 실시간 감지. Spring Boot·React·Python(Flask) 백엔드/프론트/ML 분리 구성, Mel Spectrogram CNN 7-class 분류·구역별 모니터링·이벤트/알림·웹소켓 실시간 오디오 스트리밍·시스템 대시보드·JWT 인증',
        hours: 120,
      },
    ],
  },
  {
    name: '강남대학교 소프트웨어 전공',
    totalHours: 0,
    items: [
      {
        subject: '2024학년도 1학기',
        detail: '컴퓨터프로그래밍, 소프트웨어개발, 자바프로그래밍, 컴퓨터구조, 알고리즘, UNIX서버',
        hours: 0,
      },
      {
        subject: '2024학년도 2학기',
        detail: '자료구조및알고리즘, 프로그래밍언어, 파이썬프로그래밍, 객체지향프로그래밍, 임베디드기초',
        hours: 0,
      },
      {
        subject: '2025학년도 1학기',
        detail: '웹개발기초, 실강피지컬컴퓨팅, 웹프로그래밍, 정보보호개론, 캡스톤디자인(SW)I, AIOT소프트웨어',
        hours: 0,
      },
      {
        subject: '2025학년도 2학기',
        detail: '정보통신개론, 모바일프로그래밍, 컴퓨터비전, 캡스톤디자인(SW)II, C프로그래밍, 졸업종합평가',
        hours: 0,
      },
    ],
  },
]

/** 취업캠프 과정만 (대학 제외) */
export const campCourses = educationCourses.filter((c) => c.totalHours > 0)

/** 강남대학교 소프트웨어 전공 (별도 탭용) */
export const universityCourse = educationCourses.find((c) => c.totalHours === 0)!

/** 화면 표시용 총 교육시간 (고정) */
export const totalEducationHours = 960
