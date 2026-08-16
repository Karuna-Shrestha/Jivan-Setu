import React from 'react';

const Foundation = () => {
  return (
    <div className="bg-blue-900 text-white py-12 mt-10 border-t-4 border-red-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          
          {/* Left Side: Intro */}
          <div>
            <h2 className="text-3xl font-extrabold mb-4 text-blue-100">
              Jivan Setu <span className="text-pink-400">Foundation</span>
            </h2>
            <p className="text-sm leading-relaxed text-blue-50 text-justify mb-6">
              True impact is driven by passion, not payrolls. At Jivan Setu Foundation, we operate as a 100% volunteer-driven organization. We believe that good things come in small packages—which means keeping our team lean and eliminating massive administrative overheads. Instead, every ounce of our volunteers' time, expertise, and collected resources goes directly toward uplifting vulnerable communities. By collaborating with major brands, dedicated ambassadors, and grassroots institutions, we bridge the gap between those who want to help and those who desperately need it.
            </p>
            <div className="bg-blue-800 p-5 rounded-lg border border-blue-700 shadow-inner">
              <p className="text-sm font-medium mb-1 text-blue-200">For inquiries, donations, or partnerships, connect with us:</p>
              <a href="mailto:donatejivansetu@jsetu.com" className="text-lg text-white font-bold hover:text-pink-400 transition-colors">
                donatejivansetu@jsetu.com
              </a>
            </div>
          </div>

          {/* Right Side: Core Areas & Ways to Help */}
          <div className="space-y-8 md:pl-10">
            <div>
              <h3 className="text-xl font-bold mb-3 border-b border-blue-700 pb-2 text-blue-200 flex items-center gap-2">
               Our Core Areas
              </h3>
              <ul className="list-disc list-inside text-sm text-blue-50 space-y-2 font-medium">
                <li>Medical & Health Care Services (Blood Banks, Camps)</li>
                <li>Education & Awareness Initiatives</li>
                <li>Food Security & Emergency Relief</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-3 border-b border-blue-700 pb-2 text-blue-200 flex items-center gap-2">
                 Other Ways to Help
              </h3>
              <ul className="list-disc list-inside text-sm text-blue-50 space-y-2 font-medium">
                <li>Volunteering & Ground Support</li>
                <li>Skill-based Pro Bono Practices</li>
                <li>Community Advocacy & Awareness</li>
              </ul>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Foundation;