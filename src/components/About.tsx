import { useEffect, useRef, useState } from 'react';
import { Award, Target, Zap, Heart } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function About() {
  const [isVisible, setIsVisible] = useState(false);
  const [counters, setCounters] = useState({ years: 0, clients: 0, team: 0, satisfaction: 0 });
  const sectionRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
          animateCounters();
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  const animateCounters = () => {
    const targets = { years: 15, clients: 10000, team: 50, satisfaction: 98 };
    const duration = 2000;
    const steps = 60;
    const interval = duration / steps;

    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = step / steps;

      setCounters({
        years: Math.floor(targets.years * progress),
        clients: Math.floor(targets.clients * progress),
        team: Math.floor(targets.team * progress),
        satisfaction: Math.floor(targets.satisfaction * progress),
      });

      if (step >= steps) {
        clearInterval(timer);
        setCounters(targets);
      }
    }, interval);
  };

  const values = [
    {
      icon: Award,
      titleKey: 'about.excellence',
      descKey: 'about.excellenceDesc',
    },
    {
      icon: Target,
      titleKey: 'about.precision',
      descKey: 'about.precisionDesc',
    },
    {
      icon: Zap,
      titleKey: 'about.innovation',
      descKey: 'about.innovationDesc',
    },
    {
      icon: Heart,
      titleKey: 'about.integrity',
      descKey: 'about.integrityDesc',
    },
  ];

  return (
    <section id="about" ref={sectionRef} className="py-24 bg-white relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-white to-cyan-50/50"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          <div>
            <div className="inline-block px-4 py-2 bg-blue-100 rounded-full mb-4">
              <span className="text-blue-600 font-semibold text-sm">{t('about.title')}</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {t('about.heading')}
            </h2>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              {t('about.description1')}
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              {t('about.description2')}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {[
              { labelKey: 'about.yearExp', value: counters.years, suffix: '+' },
              { labelKey: 'about.happyClients', value: counters.clients.toLocaleString(), suffix: '+' },
              { labelKey: 'about.teamMembers', value: counters.team, suffix: '+' },
              { labelKey: 'about.satisfaction', value: counters.satisfaction, suffix: '%' },
            ].map((stat, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-blue-500 to-cyan-400 rounded-2xl p-8 text-white transform hover:scale-105 transition-all duration-300 hover:shadow-2xl"
                style={{
                  animation: isVisible ? `scaleIn 0.6s ease-out ${index * 0.1}s backwards` : 'none',
                }}
              >
                <div className="text-4xl font-bold mb-2">
                  {stat.value}{stat.suffix}
                </div>
                <div className="text-blue-100 font-medium">{t(stat.labelKey)}</div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-3xl font-bold text-gray-900 text-center mb-12">
            {t('about.values')}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="text-center group"
                style={{
                  animation: isVisible ? `fadeInUp 0.6s ease-out ${index * 0.1 + 0.4}s backwards` : 'none',
                }}
              >
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-2xl flex items-center justify-center mx-auto mb-4 transform group-hover:rotate-12 group-hover:scale-110 transition-all duration-500">
                  <value.icon className="w-10 h-10 text-white" />
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-2">{t(value.titleKey)}</h4>
                <p className="text-gray-600">{t(value.descKey)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
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
    </section>
  );
}
