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
    <div className="min-h-screen  bg-amber-50/40">
      

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
        <Banner />

  
        <section className="py-10 md:py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <div className="flex justify-center mb-4">
                <FcInspection size={48} className="text-orange-600" />
              </div>
              <h3 className="text-xl md:text-2xl font-semibold text-gray-800 mb-3">
                Quick Reporting
              </h3>
              <p className="text-gray-600 text-sm md:text-base">
                Report issues in seconds <br className="hidden sm:inline" />
                using your phone
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <div className="flex justify-center mb-4">
                <FcProcess size={48} className="text-orange-600" />
              </div>
              <h3 className="text-xl md:text-2xl font-semibold text-gray-800 mb-3">
                Track Progress
              </h3>
              <p className="text-gray-600 text-sm md:text-base">
                See real-time updates <br className="hidden sm:inline" />
                on your reported issues
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <div className="flex justify-center mb-4">
                <FcPositiveDynamic size={48} className="text-orange-600" />
              </div>
              <h3 className="text-xl md:text-2xl font-semibold text-gray-800 mb-3">
                Improve Your City
              </h3>
              <p className="text-gray-600 text-sm md:text-base">
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