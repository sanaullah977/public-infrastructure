import React from 'react';
import Navber from '../../Component/Navber/Navber';
import Footer from '../../Component/Footer/Footer';
import Banner from '../../Component/Banner/Banner';
import AllIssues from '../AllIssues/AllIssues';
import LetestIssues from '../AllIssues/LetestIssues'; // assuming typo in file name → LatestIssues
import { FcInspection, FcProcess, FcPositiveDynamic } from 'react-icons/fc';
import Covarage from '../../Component/Covarage/Covarage'; // assuming typo → Coverage

const Home = () => {
  
  return (
   <div className="min-h-screen py-4 bg-amber-50/70 dark:bg-slate-900 transition-colors duration-300">
  
  <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    
    <Banner />

    <section className="py-10 md:py-16">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg dark:shadow-slate-900/40 p-6 md:p-8 text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
          <div className="flex justify-center mb-4">
            <FcInspection size={48} className="text-orange-600 dark:text-amber-400" />
          </div>
          <h3 className="text-xl md:text-2xl font-semibold text-gray-800 dark:text-white mb-3 transition-colors">
            Quick Reporting
          </h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm md:text-base transition-colors">
            Report issues in seconds <br className="hidden sm:inline" />
            using your phone
          </p>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg dark:shadow-slate-900/40 p-6 md:p-8 text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
          <div className="flex justify-center mb-4">
            <FcProcess size={48} className="text-orange-600 dark:text-amber-400" />
          </div>
          <h3 className="text-xl md:text-2xl font-semibold text-gray-800 dark:text-white mb-3 transition-colors">
            Track Progress
          </h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm md:text-base transition-colors">
            See real-time updates <br className="hidden sm:inline" />
            on your reported issues
          </p>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg dark:shadow-slate-900/40 p-6 md:p-8 text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
          <div className="flex justify-center mb-4">
            <FcPositiveDynamic size={48} className="text-orange-600 dark:text-amber-400" />
          </div>
          <h3 className="text-xl md:text-2xl font-semibold text-gray-800 dark:text-white mb-3 transition-colors">
            Improve Your City
          </h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm md:text-base transition-colors">
            Help keep your city safe, <br className="hidden sm:inline" />
            clean and well maintained
          </p>
        </div>

      </div>
    </section>

    <section className="py-10 md:py-16">
      <LetestIssues />
    </section>

  </main>
</div>
  );
};

export default Home;