import { useState } from 'react';
import SignUpPage from '../components/SignUp';
import LoginPage from '../components/login';
import { ShieldCheck, Trophy, User, Users, AlertCircle, Flame, BookOpen, BarChart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';


export default function Home() {
  const [modalType, setModalType] = useState(null); // null | 'login' | 'signup'

  return (
  <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-100">
      {/* Auth Modal */}
      {modalType && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-50 flex items-center justify-center overflow-y-auto"
          onClick={() => setModalType(null)}
        >
          <div 
            onClick={e => e.stopPropagation()} 
            className="relative w-full h-full"
          >
            <button 
              onClick={() => setModalType(null)}
              className="absolute top-4 right-4 text-white text-xl z-50 hover:text-gray-300"
            >
              ✕
            </button>
            {modalType === 'login' ? <LoginPage /> : <SignUpPage />}
          </div>
        </div>
      )}

      {/* Navigation Header */}
  <nav className="sticky top-0 z-40 bg-white border-b border-blue-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Brand */}
            <div className="flex items-center space-x-3">
              <div className="bg-indigo-500 text-white px-3 py-2 rounded-lg font-bold text-lg flex items-center gap-2">
                <ShieldCheck size={24} />
                SE
              </div>
              <span className="text-xl font-semibold text-indigo-700">SurakshaEd</span>
            </div>
            {/* Navigation Links */}
            <div className="hidden md:flex items-center space-x-8">
                <a href="#faq" className="text-indigo-700 hover:text-indigo-400 font-bold transition-colors flex items-center gap-1">
                  <BookOpen size={18} /> FAQ's
                </a>
                <a href="#emergency" className="text-indigo-700 hover:text-indigo-400 font-bold transition-colors flex items-center gap-1">
                  <AlertCircle size={18} /> Emergency
                </a>
            </div>
            {/* Auth Buttons */}
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => setModalType('login')}
                className="text-indigo-600 hover:text-indigo-500 px-4 py-2 font-medium transition-colors"
              >
                Login
              </button>
              <button 
                onClick={() => setModalType('signup')}
                className="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-2 rounded-lg font-medium transition-colors"
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </nav>
      


  {/* Gamified Disaster Hero Section */}
  <section className="bg-gradient-to-br from-indigo-100 via-blue-50 to-white py-12 lg:py-20 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none select-none">
          {/* SVG Disaster Theme Background */}
          <svg width="100%" height="100%" viewBox="0 0 1440 320" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute bottom-0 left-0 w-full h-40 opacity-30">
            <path fill="#f87171" fillOpacity="0.3" d="M0,160L60,165.3C120,171,240,181,360,165.3C480,149,600,107,720,117.3C840,128,960,192,1080,218.7C1200,245,1320,235,1380,229.3L1440,224L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path>
            <path fill="#fde68a" fillOpacity="0.2" d="M0,96L60,122.7C120,149,240,203,360,197.3C480,192,600,128,720,117.3C840,107,960,149,1080,176C1200,203,1320,213,1380,218.7L1440,224L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path>
          </svg>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Hero Content */}
            <div className="space-y-8">
              <AnimatePresence>
                <motion.div
                  className=""
                  initial={{ x: 100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -100, opacity: 0 }}
                  transition={{ type: 'spring', stiffness: 80, damping: 20, duration: 0.8 }}
                >
                  <h1 className="text-4xl lg:text-5xl font-extrabold text-indigo-800 leading-tight drop-shadow-lg">
                    Gamify Disaster Preparedness
                  </h1>
                  <p className="text-lg text-indigo-700 max-w-xl mt-4">
                    Experience disaster management like a game! Complete challenges, earn badges, and climb the leaderboard while learning how to stay safe. Join drills, unlock achievements, and become a Digaster Hero.
                  </p>
                  {/* Gamified Badges */}
                  <div className="flex gap-4 mt-8">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex flex-col items-center"
                    >
                      <ShieldCheck size={28} className="text-indigo-500" />
                      <span className="text-xs font-semibold text-indigo-600 mt-1">First Drill</span>
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex flex-col items-center"
                    >
                      <BarChart size={28} className="text-indigo-500" />
                      <span className="text-xs font-semibold text-indigo-600 mt-1">Quiz Master</span>
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex flex-col items-center"
                    >
                      <Trophy size={28} className="text-indigo-500" />
                      <span className="text-xs font-semibold text-indigo-600 mt-1">Digaster Hero</span>
                    </motion.div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
            {/* Gamified Progress Widget */}
            <div className="flex justify-center lg:justify-end">
              <div className="bg-white rounded-2xl p-8 shadow-2xl border border-indigo-100 w-full max-w-md hover:shadow-3xl transition-shadow duration-300">
                <div className="flex items-center gap-2 mb-6">
                  <Flame size={24} className="text-indigo-500 animate-pulse" />
                  <h3 className="text-lg font-bold text-indigo-800">Your Disaster Readiness</h3>
                </div>
                <div className="mb-8">
                  <div className="text-sm text-indigo-600 mb-2">Level</div>
                  <div className="text-3xl font-extrabold text-indigo-500 mb-4">Level 3: Rescuer</div>
                  {/* Progress Bar */}
                  <div className="w-full bg-indigo-100 rounded-full h-3 mb-4">
                    <div className="bg-gradient-to-r from-indigo-500 to-blue-400 h-3 rounded-full transition-all duration-300" style={{width: '60%'}}></div>
                  </div>
                  <div className="flex gap-2">
                    <span className="bg-indigo-200 text-indigo-800 px-2 py-1 rounded text-xs font-medium">Next: Hero</span>
                  </div>
                </div>
                {/* Challenge Cards */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-gradient-to-br from-indigo-50 to-blue-50 rounded-lg shadow text-center">
                    <div className="flex items-center justify-center mb-1"><BarChart size={18} className="text-indigo-500" /></div>
                    <div className="text-xs text-indigo-700">Complete 3 quizzes</div>
                  </div>
                  <div className="p-3 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg shadow text-center">
                    <div className="flex items-center justify-center mb-1"><ShieldCheck size={18} className="text-indigo-500" /></div>
                    <div className="text-xs text-indigo-700">Join 2 drills</div>
                  </div>
                  <div className="p-3 bg-gradient-to-br from-indigo-50 to-pink-50 rounded-lg shadow text-center col-span-2">
                    <div className="flex items-center justify-center mb-1"><AlertCircle size={18} className="text-indigo-500" /></div>
                    <div className="text-xs text-indigo-700">Respond to a live alert</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

  {/* Gamified Stakeholders Section */}
  <section className="py-12 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-4 drop-shadow">Who Can Play?</h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
              Digaster is for everyone! Students, Teachers, and Admins each have their own dashboard, challenges, and rewards. Compete, collaborate, and prepare together.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Student Card */}
            <div className="bg-gradient-to-br from-indigo-50 to-blue-100 border-2 border-indigo-300 rounded-2xl p-8 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col items-center">
              <User size={40} className="text-indigo-500 mb-4" />
              <h3 className="text-xl font-bold text-indigo-700 mb-2">Students</h3>
              <p className="text-indigo-700 mb-4 text-center">Play quizzes, join drills, and earn badges. Track your progress and climb the leaderboard!</p>
              <span className="bg-indigo-200 text-indigo-800 px-3 py-1 rounded-full text-xs font-semibold">XP: 1200</span>
            </div>
            {/* Teacher Card */}
            <div className="bg-gradient-to-br from-indigo-50 to-green-100 border-2 border-green-300 rounded-2xl p-8 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col items-center">
              <Users size={40} className="text-green-500 mb-4" />
              <h3 className="text-xl font-bold text-green-700 mb-2">Teachers</h3>
              <p className="text-green-700 mb-4 text-center">Create challenges, monitor student progress, and organize virtual drills. Reward top performers!</p>
              <span className="bg-green-200 text-green-800 px-3 py-1 rounded-full text-xs font-semibold">XP: 800</span>
            </div>
            {/* Admin Card */}
            <div className="bg-gradient-to-br from-indigo-50 to-pink-100 border-2 border-pink-300 rounded-2xl p-8 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col items-center">
              <ShieldCheck size={40} className="text-pink-500 mb-4" />
              <h3 className="text-xl font-bold text-pink-700 mb-2">Admins</h3>
              <p className="text-pink-700 mb-4 text-center">Manage content, send alerts, and oversee institution-wide preparedness. Unlock achievements for your school!</p>
              <span className="bg-pink-200 text-pink-800 px-3 py-1 rounded-full text-xs font-semibold">XP: 1500</span>
            </div>
          </div>
        </div>
      </section>

      {/* Gamified Call to Action Section */}
      <section className="bg-gradient-to-r from-indigo-100 to-blue-100 py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl p-8 lg:p-12 shadow-2xl border-2 border-indigo-300 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="flex-1 text-center lg:text-left">
              <h2 className="text-3xl font-extrabold text-indigo-700 mb-4 drop-shadow">Are You Ready to Play?</h2>
              <p className="text-lg text-indigo-700 leading-relaxed">
                Join Digaster now and turn disaster preparedness into an adventure. Start earning XP, unlock new levels, and help your community stay safe!
              </p>
            </div>
            <div className="flex-shrink-0">
              <button className="bg-gradient-to-r from-indigo-500 to-blue-400 hover:from-indigo-600 hover:to-blue-500 text-white px-8 py-4 rounded-2xl text-lg font-bold shadow-lg hover:scale-105 transition-transform flex items-center gap-2">
                <Trophy size={22} /> Play Now
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}