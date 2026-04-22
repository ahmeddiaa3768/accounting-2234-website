import { Calculator, FileText, TrendingUp, Users, Shield, LineChart } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function Services() {
  const { t } = useLanguage();

  const services = [
    {
      icon: Calculator,
      titleKey: 'services.tax.title',
      descKey: 'services.tax.description',
      color: 'from-blue-500 to-cyan-400',
    },
    {
      icon: FileText,
      titleKey: 'services.bookkeeping.title',
      descKey: 'services.bookkeeping.description',
      color: 'from-cyan-500 to-teal-400',
    },
    {
      icon: TrendingUp,
      titleKey: 'services.reporting.title',
      descKey: 'services.reporting.description',
      color: 'from-teal-500 to-emerald-400',
    },
    {
      icon: Users,
      titleKey: 'services.payroll.title',
      descKey: 'services.payroll.description',
      color: 'from-blue-600 to-blue-400',
    },
    {
      icon: Shield,
      titleKey: 'services.audit.title',
      descKey: 'services.audit.description',
      color: 'from-cyan-600 to-cyan-400',
    },
    {
      icon: LineChart,
      titleKey: 'services.consulting.title',
      descKey: 'services.consulting.description',
      color: 'from-teal-600 to-teal-400',
    },
  ];

  return (
    <section id="services" className="py-24 bg-gradient-to-b from-slate-50 to-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-100 rounded-full filter blur-3xl opacity-30 -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-100 rounded-full filter blur-3xl opacity-30 translate-x-1/2 translate-y-1/2"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 bg-blue-100 rounded-full mb-4">
            <span className="text-blue-600 font-semibold text-sm">{t('services.title')}</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {t('services.description')}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
              style={{
                animation: `fadeInUp 0.6s ease-out ${index * 0.1}s backwards`,
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <div className="relative z-10">
                <div className={`w-16 h-16 bg-gradient-to-br ${service.color} rounded-xl flex items-center justify-center mb-6 transform group-hover:rotate-6 group-hover:scale-110 transition-all duration-500`}>
                  <service.icon className="w-8 h-8 text-white" />
                </div>

                <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">
                  {t(service.titleKey)}
                </h3>

                <p className="text-gray-600 leading-relaxed mb-6">
                  {t(service.descKey)}
                </p>

                <button className="text-blue-600 font-semibold flex items-center gap-2 group-hover:gap-3 transition-all duration-300">
                  {t('services.learnMore')}
                  <span className="transform group-hover:translate-x-1 transition-transform duration-300">→</span>
                </button>
              </div>

              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-400/10 to-cyan-400/10 rounded-full filter blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
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
