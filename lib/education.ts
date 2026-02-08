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
    totalHours: 288,
    items: [
      {
        subject: '1차 프로젝트',
        detail: 'MSA 기반 커피 전문점 매장관리 서비스 — 회원/주문/서빙 마이크로서비스',
        hours: 120,
      },
      {
        subject: '2차 프로젝트',
        detail: '클라우드 기반 차세대 디지털교육 통합 플랫폼 — 입학지원·학사관리·LMS 비대면교육',
        hours: 168,
      },
    ],
  },
  {
    name: '재량교과',
    totalHours: 6,
    items: [
      { subject: '입과식', detail: '원장 인사·강사/매니저 소개·취업지원 프로세스·사전평가', hours: 1 },
      { subject: '수료식', detail: '수료증·우수 훈련생 상·취업지원 안내', hours: 1 },
      { subject: '취업지원', detail: '맞춤형 취업가이드·이력서/자기소개서 클리닉·실전 면접', hours: 4 },
    ],
  },
]

export const totalEducationHours = educationCourses.reduce((sum, c) => sum + c.totalHours, 0)
