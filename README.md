# Portfolio

고범주의 포트폴리오 웹사이트입니다.

## 기술 스택

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animation**: Framer Motion
- **Icons**: React Icons

## 시작하기

### 설치

```bash
npm install
```

### 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 결과를 확인하세요.

### 빌드

```bash
npm run build
```

### 프로덕션 실행

```bash
npm start
```

## Vercel 배포

이 프로젝트는 Vercel에 배포되어 있습니다.

1. [Vercel](https://vercel.com)에 로그인
2. GitHub 저장소 연결
3. 자동 배포 설정

또는 Vercel CLI를 사용하여 배포:

```bash
npm i -g vercel
vercel
```

## 프로젝트 구조

```
portfolio/
├── app/
│   ├── globals.css      # 전역 스타일
│   ├── layout.tsx       # 루트 레이아웃
│   └── page.tsx          # 메인 페이지
├── public/              # 정적 파일
├── package.json
├── tsconfig.json
├── tailwind.config.js
└── next.config.js
```

## 기능

- 반응형 디자인
- 부드러운 애니메이션
- 다크 테마
- 프로젝트 소개
- 기술 스택 표시
- 연락처 정보

## 라이선스

MIT
