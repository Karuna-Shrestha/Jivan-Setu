import React from 'react';

const MainContent = () => {
  const blogs = [
    {
      id: 1,
      title: "Diabetes can impact oral health - here's what you need to know",
      snippet: "People with diabetes are at an increased risk of developing dental problems, including gum diseases.",
      img: "/path-to-blog-img1.jpg" // Placeholder path
    },
    {
      id: 2,
      title: "Ensuring Adequate Blood Supply: Vitality of Blood Donation Campaigns",
      snippet: "Blood donation campaigns are essential to maintain a steady supply of blood, save lives, and promote community health.",
      img: "/path-to-blog-img2.jpg"
    },
    {
      id: 3,
      title: "No clear evidence that meditation or mindfulness makes you happy",
      snippet: "No clear proof that meditation or mindfulness boosts happiness. Approach such claims with a balanced, open, and critical perspective.",
      img: "/path-to-blog-img3.jpg"
    },
    {
      id: 4,
      title: "What is blood and importance of blood donation?",
      snippet: "Blood donation campaigns are aimed at finding a healthy donor who would donate blood that is safe and would not be harmed himself in this process.",
      img: "/path-to-blog-img4.jpg"
    }
  ];

  return (
    <div className="w-full lg:w-2/3 pr-0 lg:pr-8">
      
      {/* Welcome Section */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold text-blue-700 mb-4 border-b-2 border-gray-100 pb-2">
          Welcome to Jivan Setu: <span className="text-xl font-normal">online blood bank</span>
        </h2>
        <div className="text-gray-700 text-sm space-y-3 leading-relaxed">
          <p>
            Jivan Setu is an online blood bank service that works to encourage and inspire people to donate blood and provide fresh blood to needy ones to save their life. Our main objective is to act as a bridge between the blood donor and patient. Welfare of the society is our motto.
          </p>
          <p>
            This website can match you with a donor near you in fraction of second. You can also register as a donor in this site and save someone's life. The need is constant, and your contribution is important for a healthy and reliable blood supply.
          </p>
          <p>
            Let us join together to save the world by donating blood. Moreover, you will feel good knowing you saved a life.
          </p>
        </div>
      </section>

      {/* Why Donate Blood Section */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold text-blue-700 mb-4 border-b-2 border-gray-100 pb-2">
          Why Donate Blood?
        </h2>
        <ul className="list-disc pl-5 text-sm text-gray-700 space-y-2">
          <li>Till date there no substitute for blood. Only donated blood can provide adequate supply of blood to save life of those who need it. You give a second chance to someone unknown to you. Sometimes it one who need blood could be a friend, family member or yourself.</li>
          <li>Whenever you donate blood, the body can easily replenish the lost blood within 24-48 hours. Hence you are welcoming new blood into your body. In that way there no loss.</li>
          <li>Donating blood helps to maintain iron content in blood.</li>
          <li>Whenever you donate you will be losing excess cholesterol accumulated in blood. Hence reducing the proximity of Heart Attacks.</li>
          <li>A one unit of donated blood can save upto 3 people when supplied into three different components as Red blood cells, Fresh frozen plasma and Platelet concentrate/platelet rich plasma.</li>
          <li>A self fulfillment for a lifetime of saving a person life during emergency.</li>
        </ul>
      </section>

      {/* Who Need Blood Section */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold text-blue-700 mb-4 border-b-2 border-gray-100 pb-2">
          Who Need Blood?
        </h2>
        <p className="text-gray-700 text-sm leading-relaxed">
          Under normal circumstances, every two seconds someone needs a blood transfusion. Blood transfusions are used for trauma victims - due to accidents and burns - heart surgery, organ transplants, women with complications during childbirth, newborns and premature babies, and patients receiving treatment for leukemia, cancer or other diseases, such as sickle cell disease and thalassemia.
        </p>
      </section>

      {/* Latest Blogs/News Section */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold text-blue-700 mb-4 border-b-2 border-gray-100 pb-2">
          Latest Blogs/News
        </h2>
        <div className="space-y-4">
          {blogs.map((blog) => (
            <div key={blog.id} className="flex gap-4 p-4 border rounded-md shadow-sm bg-gray-50 hover:bg-gray-100 transition">
              <div className="w-24 h-24 flex-shrink-0 bg-gray-300 rounded overflow-hidden">
                {/* Fallback color if image path is not set yet */}
                <img src={blog.img} alt={blog.title} className="w-full h-full object-cover" />
              </div>
              <div>
                <h3 className="text-blue-700 font-semibold mb-1 cursor-pointer hover:underline">
                  {blog.title}
                </h3>
                <p className="text-xs text-gray-600 line-clamp-2">
                  {blog.snippet}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};

export default MainContent;