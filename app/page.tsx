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
  FaHome,
} from 'react-icons/fa'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import ColorBends from '@/components/ColorBends'
import GooeyNav from '@/components/GooeyNav'
import ProfileCard from '@/components/ProfileCard'

type Page = 'home' | 'about' | 'skills' | 'projects' | 'contact'

export default function Home() {
  const [mounted, setMounted] = useState(false)
  const [currentPage, setCurrentPage] = useState<Page>('home')

  useEffect(() => {
    setMounted(true)
  }, [])

  const skills = [
    { name: 'JavaScript', level: 90 },
    { name: 'TypeScript', level: 85 },
    { name: 'React', level: 90 },
    { name: 'Next.js', level: 85 },
    { name: 'Node.js', level: 80 },
    { name: 'Python', level: 75 },
  ]

  const projects = [
    {
      title: 'Health-site',
      description: '건강 관련 웹사이트 프로젝트',
      tech: ['JavaScript', 'React'],
      link: 'https://github.com/BeomJuGo/Health-site',
    },
    {
      title: 'PC Site',
      description: 'PC 관련 풀스택 프로젝트',
      tech: ['JavaScript', 'React', 'Node.js'],
      link: 'https://github.com/BeomJuGo/pc-site-frontend',
    },
  ]

  const getActiveIndex = (): number => {
    const pageMap: Record<Page, number> = {
      'home': 0,
      'about': 1,
      'skills': 2,
      'projects': 3,
      'contact': 4,
    }
    return pageMap[currentPage]
  }

  const navItems = [
    { label: '홈', onClick: () => setCurrentPage('home') },
    { label: '소개', onClick: () => setCurrentPage('about') },
    { label: '기술', onClick: () => setCurrentPage('skills') },
    { label: '프로젝트', onClick: () => setCurrentPage('projects') },
    { label: '연락', onClick: () => setCurrentPage('contact') },
  ]

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
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                  <div className="flex justify-center">
                    <ProfileCard
                      avatarUrl="/profile.jpg"
                      name="고범주"
                      title="풀스택 개발자"
                      handle="BeomJuGo"
                      status="Online"
                      contactText="연락하기"
                      showUserInfo={true}
                      onContactClick={() => setCurrentPage('contact')}
                    />
                  </div>
                  <div className="flex items-center">
                    <Card className="w-full border-2 bg-background/80 backdrop-blur-sm">
                      <CardContent className="pt-6">
                        <p className="text-muted-foreground text-lg leading-relaxed">
                          풀스택 개발자로서 프론트엔드와 백엔드 개발에 열정을 가지고 있습니다.
                          사용자 경험을 중시하며, 최신 기술을 활용하여 효율적이고 확장 가능한 웹 애플리케이션을 개발합니다.
                          코드 품질과 성능 최적화에 관심이 많으며, 지속적으로 학습하고 성장하는 것을 즐깁니다.
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {currentPage === 'skills' && (
            <motion.div
              key="skills"
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {projects.map((project, index) => (
                    <motion.div
                      key={project.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.2 }}
                      whileHover={{ y: -8 }}
                    >
                      <Card className="border-2 hover:border-primary/50 transition-all h-full flex flex-col bg-background/80 backdrop-blur-sm">
                        <CardHeader>
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-primary/10 rounded-lg">
                              <FaCode className="text-primary" size={20} />
                            </div>
                            <CardTitle className="text-2xl">{project.title}</CardTitle>
                          </div>
                          <CardDescription className="text-base mt-2">
                            {project.description}
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="flex-grow">
                          <div className="flex flex-wrap gap-2">
                            {project.tech.map((tech) => (
                              <Badge key={tech} variant="secondary">
                                {tech}
                              </Badge>
                            ))}
                          </div>
                        </CardContent>
                        <CardFooter>
                          <Button asChild variant="outline" className="w-full">
                            <a
                              href={project.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center justify-center gap-2"
                            >
                              <FaGithub />
                              GitHub에서 보기
                            </a>
                          </Button>
                        </CardFooter>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {currentPage === 'contact' && (
            <motion.div
              key="contact"
              initial="initial"
              animate="animate"
              exit="exit"
              variants={pageVariants}
              transition={pageTransition}
              className="h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-background/40 backdrop-blur-sm"
            >
              <div className="max-w-7xl mx-auto text-center">
                <h2 className="text-4xl font-bold text-foreground mb-4">연락하기</h2>
                <Separator className="mx-auto w-24 mb-8" />
                <p className="text-muted-foreground mb-8 text-lg">
                  프로젝트나 협업에 관심이 있으시다면 언제든지 연락주세요!
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
