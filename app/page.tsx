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

  useEffect(() => {
    setMounted(true)
  }, [])

  const personalInfo = {
    name: '고범주',
    birthDate: '1998.10.29',
    address: '경기도 용인시',
    email: 'lom0097@naver.com',
    university: '강남대학교 소프트웨어 전공'
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
          <div className="flex justify-between items-center h-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-xl font-bold text-foreground cursor-pointer"
              onClick={() => setCurrentPage('home')}
            >
              고범주
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
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
                <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6">
                  안녕하세요,{' '}
                  <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                    고범주
                  </span>
                  입니다
                </h1>
                <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                  사용자 경험을 중시하며, 최신 기술을 활용하여 효율적이고 확장 가능한 웹 애플리케이션을 개발합니다.
                </p>
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
                  <div className="flex justify-center">
                    <ProfileCard
                      avatarUrl="/profile.png"
                      name="고범주"
                      title="풀스택 개발자"
                      handle="BeomJuGo"
                      status="Online"
                      contactText="연락하기"
                      showUserInfo={false}
                    />
                  </div>
                  <div className="space-y-6">
                    <Card className="w-full border-2 bg-background/80 backdrop-blur-sm">
                      <CardContent className="pt-6">
                        <p className="text-muted-foreground text-lg leading-relaxed">
                          풀스택 개발자로서 프론트엔드와 백엔드 개발에 열정을 가지고 있습니다.
                          사용자 경험을 중시하며, 최신 기술을 활용하여 효율적이고 확장 가능한 웹 애플리케이션을 개발합니다.
                          코드 품질과 성능 최적화에 관심이 많으며, 지속적으로 학습하고 성장하는 것을 즐깁니다.
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
                      </CardContent>
                    </Card>
                  </div>
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
                          columns={1}
                          rows={teamProjects.length}
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
