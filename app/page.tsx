'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  FaGithub, 
  FaEnvelope,
  FaCode,
  FaRocket,
  FaUser,
  FaTools,
  FaArrowLeft,
  FaCalendar,
  FaMapMarkerAlt,
  FaGraduationCap,
  FaPhoneAlt,
  FaExternalLinkAlt,
} from 'react-icons/fa'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import ColorBends from '@/components/ColorBends'
import GooeyNav from '@/components/GooeyNav'
import ProfileCard from '@/components/ProfileCard'
import ChromaGrid, { ChromaItem } from '@/components/ChromaGrid'
import SplitText from '@/components/SplitText'
import SplashCursor from '@/components/SplashCursor'
import { campCourses, universityCourse, totalEducationHours } from '@/lib/education'

type Page = 'home' | 'about' | 'projects' | 'project-detail'

interface ProjectDetail {
  id: string
  title: string
  description: string
  fullDescription: string
  techStack: string[]
  githubUrl?: string
  demoUrl?: string
  features?: string[]
}

export default function Home() {
  const [mounted, setMounted] = useState(false)
  const [currentPage, setCurrentPage] = useState<Page>('home')
  const [selectedProject, setSelectedProject] = useState<ProjectDetail | null>(null)
  const [educationTab, setEducationTab] = useState<'camp' | 'university'>('camp')
  const [selectedCampIndex, setSelectedCampIndex] = useState(0)
  const [selectedUniversityIndex, setSelectedUniversityIndex] = useState(0)

  useEffect(() => {
    setMounted(true)
  }, [])

  const personalInfo = {
    name: '고범주',
    birthDate: '1998.10.29',
    address: '경기도 용인시',
    email: 'lom0097@naver.com',
    university: '강남대학교 소프트웨어 전공',
    phone: '010-2920-0097'
  }

  const skills = [
    { name: 'JavaScript', level: 90 },
    { name: 'TypeScript', level: 85 },
    { name: 'React', level: 90 },
    { name: 'Next.js', level: 85 },
    { name: 'Node.js', level: 80 },
    { name: 'Python', level: 75 },
  ]

  const projectDetails: Record<string, ProjectDetail> = {
    'health-site': {
      id: 'health-site',
      title: 'Healthcare Platform',
      description: '건강한 라이프스타일을 위한 헬스케어 플랫폼',
      fullDescription: 'Spring Boot와 React를 활용한 풀스택 헬스케어 플랫폼입니다. 사용자들이 건강한 라이프스타일을 유지할 수 있도록 다양한 기능을 제공합니다. JWT 기반 인증 시스템을 통해 안전한 사용자 관리를 구현했으며, 트레이너와 사용자를 매칭하여 개인 맞춤형 운동 및 식단 플랜을 제공합니다. AI 기반 트레이너 추천 시스템을 통해 사용자에게 최적의 식단 및 운동방법을 알려주며, 실시간 채팅 기능으로 트레이너와의 소통을 지원합니다. 커뮤니티 기능을 통해 사용자들이 운동 경험과 정보를 공유할 수 있으며, 리뷰 시스템을 통해 트레이너에 대한 평가를 남길 수 있습니다. 또한, 관리자 페이지를 통해 플랫폼 전체를 관리할 수 있습니다',
      techStack: ['Java', 'Spring Boot', 'Spring Security', 'JWT', 'React', 'Vite', 'MySQL', 'PostgreSQL', 'Tailwind CSS', 'Shadcn UI', 'GSAP', 'FullCalendar', 'Cloudinary', 'Flyway'],
      githubUrl: 'https://github.com/BeomJuGo/Health-site',
      features: [
        '사용자 인증 및 권한 관리 시스템',
        '트레이너 매칭 시스템 - 사용자가 원하는 트레이너를 매칭',
        '운동 및 식단 플랜 관리 - 개인 맞춤형 건강 계획 수립 및 추적',
        '커뮤니티 기능 - 게시글, 댓글, 좋아요를 통한 사용자 간 소통',
        'AI 트레이너 추천 - 사용자 프로필 기반 최적 트레이너 추천',
        '실시간 채팅 - 트레이너와 사용자 간 실시간 메시징',
        '리뷰 시스템 - 트레이너에 대한 평가 및 피드백',
        '관리자 페이지 - 플랫폼 전체 관리 및 모니터링',
        '이미지 업로드 - 프로필 및 게시글 이미지 관리',
        'FullCalendar 통합 - 운동 일정 및 예약 관리'
      ]
    },
    'pc-site': {
      id: 'pc-site',
      title: 'GoodPricePC',
      description: 'PC 부품 비교 및 AI 견적 추천 플랫폼',
      fullDescription: 'React를 기반으로 제작된 PC 부품 비교 및 추천 웹 애플리케이션입니다. 사용자가 예산과 용도에 맞는 최적의 PC 구성을 찾을 수 있도록 AI 기반 견적 추천 시스템을 제공합니다. 8가지 주요 부품 카테고리(CPU, GPU, 메모리, 메인보드, 저장장치, 케이스, 쿨러, 파워)별로 상세한 정보를 제공하며, 실시간 가격 비교와 성능 데이터를 통해 사용자가 직접 품목을 확인하며 각 품목의 가격추이를 확인할 수 있습니다. 백엔드 API와 연동하여 수천 가지의 부품 조합을 분석하고, 호환성을 검증한 후 사용자에게 최적의 구성을 추천합니다. AI 전문가 평가 기능을 통해 각 빌드의 장단점과 추천사항을 제공하며, MongoDB를 이용하여 견적 데이터를 저장하여 나중에 다시 확인할 수 있습니다.',
      techStack: ['React', 'React Router', 'Axios', 'Tailwind CSS', 'Shadcn UI', 'Recharts', 'JavaScript'],
      githubUrl: 'https://github.com/BeomJuGo/pc-site-frontend',
      demoUrl: 'https://pc-site-frontend.vercel.app',
      features: [
        'AI 기반 PC 견적 추천 - 예산과 용도(게임용/작업용/사무용/가성비)에 맞는 최적 구성 추천',
        '8가지 부품 카테고리 - CPU, GPU, 메모리, 메인보드, 저장장치, 케이스, 쿨러, 파워 상세 정보 제공',
        '실시간 가격 비교 - 다양한 부품의 최신 가격 정보 제공',
        '가격 추이 확인 - 각 부품의 가격추이 확인 가능',
        '성능 데이터 및 벤치마크 - 부품별 성능 점수와 실제 사용 데이터',
        '부품 호환성 검증 - CPU 소켓, 메모리 타입, 전력 소비, 케이스 폼팩터 자동 검증',
        'AI 전문가 평가 - 각 빌드의 장점, 추천사항, 종합 평가 제공',
        '다중 빌드 비교 - 가성비/균형/고성능 등 여러 옵션 제공 및 비교',
        '견적 저장 기능 - localStorage를 통한 견적 데이터 저장 및 복원',
        '부품 상세 정보 - 각 부품의 상세 스펙 및 성능 정보 확인',
        '반응형 디자인 - 모바일, 태블릿, 데스크톱 모든 기기에서 최적화된 경험'
      ]
    },
    'voice-detection': {
      id: 'voice-detection',
      title: '음성감지 프로젝트',
      description: '공장 안전을 위한 실시간 음성/소음 감지 시스템',
      fullDescription: '공장 현장에서 비상 음성(구조요청, 비명 등)과 이상 소음을 실시간으로 감지하는 풀스택 프로젝트입니다. Spring Boot 백엔드, React 프론트엔드, Python ML 서비스로 구성되어 있으며, Mel Spectrogram 기반 CNN 모델로 7가지 클래스(비명, 구조요청, 비상, 배경소음, 공장소음, 도로소음, 정상)를 분류합니다. 마이크 설정, 구역별 모니터링, 이벤트·알림 관리, 시스템 상태 대시보드를 제공하며, 웹소켓을 통한 실시간 오디오 스트리밍과 AI 예측 결과를 연동합니다.',
      techStack: ['Java', 'Spring Boot', 'Spring Security', 'JWT', 'React', 'Python', 'Flask', 'TensorFlow', 'Keras', 'MySQL', 'WebSocket'],
      githubUrl: 'https://github.com/BeomJuGo/factory-main',
      features: [
        '실시간 음성/소음 감지 - 마이크 입력 기반 24시간 모니터링',
        'AI 분류 모델 - CNN 기반 7-class 음성 분류 (비명, 구조요청, 비상 등)',
        '구역별 모니터링 - 공장 구역별 상태 및 이상 감지 이력 표시',
        '이벤트·알림 - 감지 이벤트 저장 및 알림 설정',
        '시스템 대시보드 - 마이크 상태, PC 리소스, ML 서비스 상태',
        'JWT 인증 및 사용자/관리자 역할 관리',
        '웹소켓 실시간 오디오 스트리밍 및 예측 결과 연동'
      ]
    }
  }

  const projects: ChromaItem[] = [
    {
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop',
      title: 'Health-site',
      subtitle: '건강 관련 웹사이트 프로젝트',
      techStack: ['JavaScript', 'React'],
      videoUrl: '/videos/health-site-demo.mp4',
      borderColor: '#4F46E5',
      gradient: 'linear-gradient(145deg, #4F46E5, #000)',
      detailPageId: 'health-site',
      projectType: 'Team',
    },
    {
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop',
      title: 'PC Site',
      subtitle: 'PC 관련 풀스택 프로젝트',
      techStack: ['JavaScript', 'React', 'Node.js'],
      videoUrl: '/videos/pc-site-demo.mp4',
      borderColor: '#10B981',
      gradient: 'linear-gradient(210deg, #10B981, #000)',
      detailPageId: 'pc-site',
      projectType: 'Personal',
    },
    {
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=300&fit=crop',
      title: '음성감지 프로젝트',
      subtitle: '공장 안전 실시간 음성/소음 감지 시스템',
      techStack: ['Java', 'Spring Boot', 'React', 'Python', 'TensorFlow'],
      videoUrl: '/videos/voice-detection-demo.mp4',
      borderColor: '#ED4B5E',
      gradient: 'linear-gradient(145deg, #ED4B5E, #000)',
      detailPageId: 'voice-detection',
      projectType: 'Team',
    },
  ]

  const teamProjects = projects.filter(p => p.projectType === 'Team')
  const personalProjects = projects.filter(p => p.projectType === 'Personal')

  const getActiveIndex = (): number => {
    const pageMap: Record<Page, number> = {
      'home': 0,
      'about': 1,
      'projects': 2,
      'project-detail': 2,
    }
    return pageMap[currentPage] || 0
  }

  const navItems = [
    { label: '홈', onClick: () => setCurrentPage('home') },
    { label: '소개', onClick: () => setCurrentPage('about') },
    { label: '프로젝트', onClick: () => setCurrentPage('projects') },
  ]

  const handleProjectClick = (item: ChromaItem) => {
    if (item.detailPageId && projectDetails[item.detailPageId]) {
      setSelectedProject(projectDetails[item.detailPageId])
      setCurrentPage('project-detail')
    } else if (item.url) {
      window.open(item.url, '_blank', 'noopener,noreferrer')
    }
  }

  if (!mounted) return null

  const pageVariants = {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 }
  }

  const pageTransition = {
    type: 'tween',
    ease: 'anticipate',
    duration: 0.5
  }

  return (
    <div className="min-h-screen relative bg-transparent overflow-hidden">
      <ColorBends
        colors={["#ff5c7a", "#8a5cff", "#00ffd1"]}
        rotation={0}
        speed={0.2}
        scale={1}
        frequency={1}
        warpStrength={1}
        mouseInfluence={1}
        parallax={0.5}
        noise={0.1}
        transparent
        autoRotate={0}
      />
      
      {/* Fluid Cursor Effect */}
      {mounted && (
        <SplashCursor
          SIM_RESOLUTION={128}
          DYE_RESOLUTION={1440}
          DENSITY_DISSIPATION={3.5}
          VELOCITY_DISSIPATION={2}
          PRESSURE={0.1}
          PRESSURE_ITERATIONS={20}
          CURL={3}
          SPLAT_RADIUS={0.2}
          SPLAT_FORCE={6000}
          SHADING={true}
          COLOR_UPDATE_SPEED={10}
          TRANSPARENT={true}
        />
      )}
      
      {/* SVG Filter for Gooey Effect */}
      <svg style={{ position: 'absolute', width: 0, height: 0 }}>
        <defs>
          <filter id="gooey">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9" result="gooey" />
            <feComposite in="SourceGraphic" in2="gooey" operator="atop" />
          </filter>
        </defs>
      </svg>

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-sm border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14 sm:h-16 gap-2 min-w-0">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-sm sm:text-xl font-bold text-foreground cursor-pointer shrink-0"
              onClick={() => setCurrentPage('home')}
            >
              고범주
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="min-w-0 shrink"
            >
              <GooeyNav
                items={navItems}
                activeIndex={getActiveIndex()}
                initialActiveIndex={getActiveIndex()}
              />
            </motion.div>
          </div>
        </div>
      </nav>

      {/* Page Content */}
      <div className="relative z-10 pt-16 min-h-screen">
        <AnimatePresence mode="wait">
          {currentPage === 'home' && (
            <motion.div
              key="home"
              initial="initial"
              animate="animate"
              exit="exit"
              variants={pageVariants}
              transition={pageTransition}
              className="h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-background/40 backdrop-blur-sm"
            >
              <div className="max-w-7xl mx-auto text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring" }}
                  className="inline-block mb-6"
                >
                  <Badge variant="secondary" className="text-lg px-4 py-2">
                    <FaRocket className="mr-2" />
                    풀스택 개발자
                  </Badge>
                </motion.div>
                <div className="text-5xl md:text-7xl font-bold text-foreground mb-6">
                  <SplitText
                    text="안녕하세요, "
                    tag="span"
                    className="inline-block"
                    splitType="chars"
                    delay={50}
                    duration={0.6}
                    from={{ opacity: 0, y: 30 }}
                    to={{ opacity: 1, y: 0 }}
                    threshold={1.0}
                    rootMargin="0px"
                  />
                  <span className="inline-block text-primary">
                    <SplitText
                      text="고범주"
                      tag="span"
                      className=""
                      splitType="chars"
                      delay={50}
                      duration={0.6}
                      from={{ y: 30, scale: 0.8 }}
                      to={{ y: 0, scale: 1 }}
                      threshold={1.0}
                      rootMargin="0px"
                    />
                  </span>
                  <SplitText
                    text=" 입니다"
                    tag="span"
                    className="inline-block"
                    splitType="chars"
                    delay={50}
                    duration={0.6}
                    from={{ opacity: 0, y: 30 }}
                    to={{ opacity: 1, y: 0 }}
                    threshold={1.0}
                    rootMargin="0px"
                  />
                </div>
                <SplitText
                  text="사용자 경험을 중시하며, 최신 기술을 활용하여 효율적이고 확장 가능한 웹 애플리케이션을 개발합니다."
                  tag="p"
                  className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto block"
                  splitType="words"
                  delay={50}
                  duration={0.8}
                  from={{ opacity: 0, y: 20 }}
                  to={{ opacity: 1, y: 0 }}
                  threshold={1.0}
                  rootMargin="0px"
                />
                <div className="flex justify-center gap-4">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button asChild size="lg" className="gap-2">
                      <a
                        href="https://github.com/BeomJuGo"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FaGithub />
                        GitHub
                      </a>
                    </Button>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button asChild variant="outline" size="lg" className="gap-2">
                      <a href="mailto:lom0097@naver.com">
                        <FaEnvelope />
                        이메일
                      </a>
                    </Button>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )}

          {currentPage === 'about' && (
            <motion.div
              key="about"
              initial="initial"
              animate="animate"
              exit="exit"
              variants={pageVariants}
              transition={pageTransition}
              className="h-screen overflow-y-auto px-4 sm:px-6 lg:px-8 py-20 bg-background/40 backdrop-blur-sm"
            >
              <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                  <Badge variant="outline" className="mb-4">
                    <FaUser className="mr-2" />
                    소개
                  </Badge>
                  <h2 className="text-4xl font-bold text-foreground mb-4">About Me</h2>
                  <Separator className="mx-auto w-24 mb-6" />
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start mb-12">
                  <div className="flex flex-col items-center gap-2">
                    <ProfileCard
                      avatarUrl="/profile.png"
                      name="고범주"
                      title="풀스택 개발자"
                      handle="BeomJuGo"
                      status="Online"
                      contactText="연락하기"
                      showUserInfo={false}
                    />
                    <p className="text-[11px] sm:text-xs text-muted-foreground/80 text-center max-w-[280px]">
                      어두운 화면 모드 강제 적용 시 카드가 어둡게 보일 수 있습니다. 라이트 모드 사용을 권장합니다.
                    </p>
                  </div>
                  <div className="space-y-6">
                    <Card className="w-full border-2 bg-background/80 backdrop-blur-sm">
                      <CardContent className="pt-6">
                        <p className="text-muted-foreground text-lg leading-relaxed whitespace-pre-line">
                          웹개발, 웹디자인, 크롤링, 웹표준, Java, JSP, Servlet 등의 기술을 습득하며 전공 지식을 쌓아왔습니다. 학업과 K-디지털 트레이닝 훈련을 통해 이론적인 지식 뿐만 아니라 실무 경험 또한 쌓을 수 있었습니다.
                          {'\n\n'}
                          이를 통해 다양한 프로젝트를 경험하며 문제 해결 능력과 창의적 사고를 기를 수 있었으며, 빠르게 변화하는 IT 산업에 발맞춰 지속적인 학습과 발전을 추구하고 있습니다.
                          {'\n\n'}
                          저는 꾸준한 노력과 열정으로 성장하며 주어진 일에 최선을 다하고 팀원들과 협력하여 목표를 달성하는 데 기여하고 싶습니다.
                          {'\n\n'}
                          끊임없는 도전으로 더 나은 결과물을 만들어내는 모습을 보여드리겠습니다.
                        </p>
                      </CardContent>
                    </Card>
                    <Card className="w-full border-2 bg-background/80 backdrop-blur-sm">
                      <CardContent className="pt-6 space-y-4">
                        <div className="flex items-center gap-4">
                          <FaUser className="text-primary text-lg flex-shrink-0" />
                          <span className="text-sm text-foreground">{personalInfo.name}</span>
                        </div>
                        <div className="flex items-center gap-4">
                          <FaCalendar className="text-primary text-lg flex-shrink-0" />
                          <span className="text-sm text-foreground">{personalInfo.birthDate}</span>
                        </div>
                        <div className="flex items-center gap-4">
                          <FaMapMarkerAlt className="text-primary text-lg flex-shrink-0" />
                          <span className="text-sm text-foreground">{personalInfo.address}</span>
                        </div>
                        <div className="flex items-center gap-4">
                          <FaEnvelope className="text-primary text-lg flex-shrink-0" />
                          <a 
                            href={`mailto:${personalInfo.email}`}
                            className="text-sm text-primary hover:underline"
                          >
                            {personalInfo.email}
                          </a>
                        </div>
                        <div className="flex items-center gap-4">
                          <FaGraduationCap className="text-primary text-lg flex-shrink-0" />
                          <span className="text-sm text-foreground">{personalInfo.university}</span>
                        </div>
                        <div className="flex items-center gap-4">
                          <FaPhoneAlt className="text-primary text-lg flex-shrink-0" />
                          <span className="text-sm text-foreground">{personalInfo.phone}</span>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
                <div className="mt-12">
                  <div className="text-center mb-8">
                    <Badge variant="outline" className="mb-4">
                      <FaGraduationCap className="mr-2" />
                      교육이수
                    </Badge>
                    <h2 className="text-4xl font-bold text-foreground mb-4">Education & Training</h2>
                    <Separator className="mx-auto w-24 mb-6" />
                  </div>
                  {/* 최상위 탭: 취업캠프 / 강남대학교 */}
                  <div className="max-w-5xl mx-auto mb-6">
                    <div className="flex gap-2 p-1 rounded-lg bg-muted/50 border border-border">
                      <button
                        type="button"
                        onClick={() => setEducationTab('camp')}
                        className={`flex-1 py-2.5 px-4 rounded-md text-sm font-medium transition-all ${educationTab === 'camp' ? 'bg-background text-foreground shadow border border-border' : 'text-muted-foreground hover:text-foreground'}`}
                      >
                        클라우드 데브옵스 프론트엔드&백엔드 자바 풀스택 개발자 취업캠프
                      </button>
                      <button
                        type="button"
                        onClick={() => setEducationTab('university')}
                        className={`flex-1 py-2.5 px-4 rounded-md text-sm font-medium transition-all ${educationTab === 'university' ? 'bg-background text-foreground shadow border border-border' : 'text-muted-foreground hover:text-foreground'}`}
                      >
                        강남대학교 소프트웨어 전공
                      </button>
                    </div>
                  </div>
                  {/* 취업캠프 탭 */}
                  {educationTab === 'camp' && (
                    <div className="max-w-5xl mx-auto flex flex-col lg:flex-row gap-6 lg:gap-8">
                      <p className="text-muted-foreground text-sm -mt-2 lg:hidden">총 {totalEducationHours}시간 수료</p>
                      <nav className="lg:w-56 flex-shrink-0">
                        <div className="flex lg:flex-col gap-2 overflow-x-auto pb-2 lg:pb-0 lg:overflow-visible">
                          {campCourses.map((course, index) => (
                            <button
                              key={course.name}
                              type="button"
                              onClick={() => setSelectedCampIndex(index)}
                              className={`
                                flex-shrink-0 lg:flex-shrink text-left px-4 py-3 rounded-lg border-2 transition-all
                                ${selectedCampIndex === index ? 'border-primary bg-primary/10 text-foreground font-medium' : 'border-border bg-background/60 hover:border-primary/40 hover:bg-muted/50 text-muted-foreground'}
                              `}
                            >
                              <span className="block truncate pr-2">{course.name}</span>
                              <span className="text-xs mt-0.5 opacity-80">{course.totalHours}시간</span>
                            </button>
                          ))}
                        </div>
                      </nav>
                      <div className="flex-1 min-w-0">
                        <p className="text-muted-foreground text-sm mb-4 hidden lg:block">총 {totalEducationHours}시간 수료</p>
                        <AnimatePresence mode="wait">
                          {(() => {
                            const course = campCourses[selectedCampIndex]
                            return (
                              <motion.div
                                key={course.name}
                                initial={{ opacity: 0, x: 12 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -12 }}
                                transition={{ duration: 0.2 }}
                                className="space-y-4"
                              >
                                <div className="flex items-center justify-between gap-4 mb-4">
                                  <h3 className="text-xl font-bold text-foreground">{course.name}</h3>
                                  <Badge variant="secondary" className="text-sm">총 {course.totalHours}시간</Badge>
                                </div>
                                <ul className="space-y-3">
                                  {course.items.map((item, i) => (
                                    <motion.li key={item.subject} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                                      <Card className="border-2 bg-background/80 backdrop-blur-sm hover:border-primary/30 transition-colors overflow-hidden">
                                        <CardContent className="p-4 sm:p-5">
                                          <div className="flex justify-between items-start gap-3 mb-2">
                                            <CardTitle className="text-base sm:text-lg">{item.subject}</CardTitle>
                                            <Badge variant="outline" className="flex-shrink-0 text-primary">{item.hours}h</Badge>
                                          </div>
                                          <p className="text-sm text-muted-foreground leading-relaxed">{item.detail}</p>
                                        </CardContent>
                                      </Card>
                                    </motion.li>
                                  ))}
                                </ul>
                              </motion.div>
                            )
                          })()}
                        </AnimatePresence>
                      </div>
                    </div>
                  )}
                  {/* 강남대학교 소프트웨어 전공 탭 */}
                  {educationTab === 'university' && (
                    <div className="max-w-5xl mx-auto flex flex-col lg:flex-row gap-6 lg:gap-8">
                      <nav className="lg:w-56 flex-shrink-0">
                        <div className="flex lg:flex-col gap-2 overflow-x-auto pb-2 lg:pb-0 lg:overflow-visible">
                          {universityCourse.items.map((item, index) => (
                            <button
                              key={item.subject}
                              type="button"
                              onClick={() => setSelectedUniversityIndex(index)}
                              className={`
                                flex-shrink-0 lg:flex-shrink text-left px-4 py-3 rounded-lg border-2 transition-all
                                ${selectedUniversityIndex === index ? 'border-primary bg-primary/10 text-foreground font-medium' : 'border-border bg-background/60 hover:border-primary/40 hover:bg-muted/50 text-muted-foreground'}
                              `}
                            >
                              <span className="block truncate pr-2">{item.subject}</span>
                            </button>
                          ))}
                        </div>
                      </nav>
                      <div className="flex-1 min-w-0">
                        <AnimatePresence mode="wait">
                          {(() => {
                            const item = universityCourse.items[selectedUniversityIndex]
                            return (
                              <motion.div
                                key={item.subject}
                                initial={{ opacity: 0, x: 12 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -12 }}
                                transition={{ duration: 0.2 }}
                              >
                                <h3 className="text-xl font-bold text-foreground mb-4">{universityCourse.name}</h3>
                                <p className="text-sm text-muted-foreground mb-4">{item.subject} 이수 교과목</p>
                                <div className="flex flex-wrap gap-2">
                                  {item.detail.split(', ').map((name) => (
                                    <Badge key={name} variant="secondary" className="font-normal text-xs">
                                      {name}
                                    </Badge>
                                  ))}
                                </div>
                              </motion.div>
                            )
                          })()}
                        </AnimatePresence>
                      </div>
                    </div>
                  )}
                </div>
                <div className="mt-12">
                  <div className="text-center mb-8">
                    <Badge variant="outline" className="mb-4">
                      <FaTools className="mr-2" />
                      기술 스택
                    </Badge>
                    <h2 className="text-4xl font-bold text-foreground mb-4">Skills</h2>
                    <Separator className="mx-auto w-24 mb-6" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {skills.map((skill, index) => (
                      <motion.div
                        key={skill.name}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Card className="border-2 hover:border-primary/50 transition-colors bg-background/80 backdrop-blur-sm">
                          <CardHeader>
                            <div className="flex justify-between items-center">
                              <CardTitle className="text-lg">{skill.name}</CardTitle>
                              <Badge variant="secondary">{skill.level}%</Badge>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <div className="w-full bg-secondary rounded-full h-2.5">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${skill.level}%` }}
                                transition={{ duration: 1, delay: index * 0.1 }}
                                className="bg-gradient-to-r from-primary to-primary/60 h-2.5 rounded-full"
                              />
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {currentPage === 'projects' && (
            <motion.div
              key="projects"
              initial="initial"
              animate="animate"
              exit="exit"
              variants={pageVariants}
              transition={pageTransition}
              className="h-screen overflow-y-auto px-4 sm:px-6 lg:px-8 py-20 bg-background/40 backdrop-blur-sm"
            >
              <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                  <Badge variant="outline" className="mb-4">
                    <FaCode className="mr-2" />
                    프로젝트
                  </Badge>
                  <h2 className="text-4xl font-bold text-foreground mb-4">Projects</h2>
                  <Separator className="mx-auto w-24 mb-6" />
                </div>
                <div className="space-y-16">
                  {teamProjects.length > 0 && (
                    <div>
                      <h3 className="text-3xl font-bold text-foreground mb-8 text-center">Team Project</h3>
                      <div className="min-h-[600px]">
                        <ChromaGrid
                          items={teamProjects}
                          columns={2}
                          rows={Math.ceil(teamProjects.length / 2)}
                          radius={300}
                          onCardClick={handleProjectClick}
                        />
                      </div>
                    </div>
                  )}
                  {personalProjects.length > 0 && (
                    <div>
                      <h3 className="text-3xl font-bold text-foreground mb-8 text-center">Personal Project</h3>
                      <div className="min-h-[600px]">
                        <ChromaGrid
                          items={personalProjects}
                          columns={1}
                          rows={personalProjects.length}
                          radius={300}
                          onCardClick={handleProjectClick}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {currentPage === 'project-detail' && selectedProject && (
            <motion.div
              key="project-detail"
              initial="initial"
              animate="animate"
              exit="exit"
              variants={pageVariants}
              transition={pageTransition}
              className="h-screen overflow-y-auto px-4 sm:px-6 lg:px-8 py-20 bg-background/40 backdrop-blur-sm"
            >
              <div className="max-w-4xl mx-auto">
                <Button
                  variant="ghost"
                  className="mb-6"
                  onClick={() => setCurrentPage('projects')}
                >
                  <FaArrowLeft className="mr-2" />
                  프로젝트 목록으로
                </Button>
                <Card className="w-full border-2 bg-background/80 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-3xl mb-2">{selectedProject.title}</CardTitle>
                    <CardDescription className="text-lg">{selectedProject.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold mb-3">프로젝트 소개</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {selectedProject.fullDescription}
                      </p>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-3">사용된 기술 스택</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedProject.techStack.map((tech) => (
                          <Badge key={tech} variant="secondary" className="text-sm px-3 py-1">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    {selectedProject.features && (
                      <div>
                        <h3 className="text-xl font-semibold mb-3">주요 기능</h3>
                        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                          {selectedProject.features.map((feature, index) => (
                            <li key={index}>{feature}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    <div className="flex gap-4 pt-4">
                      {selectedProject.githubUrl && (
                        <Button asChild>
                          <a
                            href={selectedProject.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2"
                          >
                            <FaGithub />
                            GitHub에서 보기
                          </a>
                        </Button>
                      )}
                      {selectedProject.demoUrl && (
                        <Button asChild variant="default" className="bg-primary hover:bg-primary/90">
                          <a
                            href={selectedProject.demoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2"
                          >
                            <FaExternalLinkAlt />
                            사이트로 이동
                          </a>
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer */}
      <footer className="fixed bottom-0 w-full py-4 px-4 sm:px-6 lg:px-8 border-t border-border bg-background/40 backdrop-blur-sm z-40">
        <div className="max-w-7xl mx-auto text-center text-muted-foreground text-sm">
          <p>© 2026 고범주. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
