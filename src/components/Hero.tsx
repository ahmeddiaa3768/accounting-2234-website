import { useEffect, useRef, useState } from 'react';
import { ArrowRight, TrendingUp, PieChart, BarChart3 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLDivElement>(null);
  const { t, isRTL } = useLanguage();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        setMousePosition({
          x: (e.clientX - rect.left - rect.width / 2) / 20,
          y: (e.clientY - rect.top - rect.height / 2) / 20,
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const floatingIcons = [
    { Icon: TrendingUp, delay: 0, position: isRTL ? 'top-20 right-10' : 'top-20 left-10' },
    { Icon: PieChart, delay: 0.5, position: isRTL ? 'top-40 left-20' : 'top-40 right-20' },
    { Icon: BarChart3, delay: 1, position: isRTL ? 'bottom-32 right-20' : 'bottom-32 left-20' },
  ];

  return (
    <div
      id="home"
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)]"></div>

      <div className="absolute inset-0 overflow-hidden">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-blue-400/20"
            style={{
              width: Math.random() * 4 + 1 + 'px',
              height: Math.random() * 4 + 1 + 'px',
              top: Math.random() * 100 + '%',
              left: Math.random() * 100 + '%',
              animation: `float ${Math.random() * 10 + 10}s linear infinite`,
              animationDelay: Math.random() * 5 + 's',
            }}
          ></div>
        ))}
      </div>

      {floatingIcons.map(({ Icon, delay, position }, index) => (
        <div
          key={index}
          className={`absolute ${position} hidden lg:block`}
          style={{
            transform: `translate(${mousePosition.x * (index + 1)}px, ${mousePosition.y * (index + 1)}px)`,
            transition: 'transform 0.3s ease-out',
          }}
        >
          <div
            className="w-20 h-20 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 backdrop-blur-sm rounded-2xl flex items-center justify-center"
            style={{
              animation: `float ${3 + index}s ease-in-out infinite`,
              animationDelay: `${delay}s`,
            }}
          >
            <Icon className="w-10 h-10 text-cyan-300" />
          </div>
        </div>
      ))}

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div
          className="inline-block mb-6 px-4 py-2 bg-blue-500/20 backdrop-blur-sm rounded-full border border-blue-400/30"
          style={{
            animation: 'fadeInUp 0.8s ease-out',
          }}
        >
          <span className="text-cyan-300 text-sm font-medium">
            {t('hero.badge')}
          </span>
        </div>

        <h1
          className="text-5xl md:text-7xl font-bold text-white mb-6"
          style={{
            animation: 'fadeInUp 1s ease-out 0.2s backwards',
          }}
        >
          {t('hero.title1')}
          <span className="block bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-400 bg-clip-text text-transparent mt-2">
            {t('hero.title2')}
          </span>
        </h1>

        <p
          className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto"
          style={{
            animation: 'fadeInUp 1.2s ease-out 0.4s backwards',
          }}
        >
          {t('hero.description')}
        </p>

        <div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          style={{
            animation: 'fadeInUp 1.4s ease-out 0.6s backwards',
          }}
        >
          <button className="group px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-400 text-white rounded-xl font-semibold transform hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/50 flex items-center gap-2">
            {t('hero.cta1')}
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          <button className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-xl font-semibold border border-white/20 hover:bg-white/20 transition-all duration-300">
            {t('hero.cta2')}
          </button>
        </div>

        <div
          className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
          style={{
            animation: 'fadeInUp 1.6s ease-out 0.8s backwards',
          }}
        >
          {[
            { number: t('hero.clients'), label: t('hero.stat1') },
            { number: t('hero.accuracy'), label: t('hero.stat2') },
            { number: t('hero.support'), label: t('hero.stat3') },
          ].map((stat, index) => (
            <div
              key={index}
              className="p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                {stat.number}
              </div>
              <div className="text-gray-400 mt-2">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
