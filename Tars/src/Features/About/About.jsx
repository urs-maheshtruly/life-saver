import React from 'react';

const AboutMeAndProject = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fff6eb] to-[#ffe5e5] flex flex-col items-center justify-center px-4 py-12">
      
      {/* Profile Card */}
      <div className="w-full max-w-3xl bg-white rounded-3xl shadow-xl p-8 border border-red-200 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-red-600 mb-4">Mahesh</h1>
        <p className="text-gray-700 mb-6">
          Aspiring Full Stack Developer | Building <span className="font-semibold">"Life Saver"</span> — a smart blood donation platform.
        </p>

        {/* Editable Contact Info */}
        <div className="space-y-3 text-gray-800">
          <p><span className="font-semibold text-red-500">📧 Email:</span> mahesh@example.com</p>
          <p><span className="font-semibold text-red-500">📱 Phone:</span> +91-98765 43210</p>
          <p><span className="font-semibold text-red-500">🔗 LinkedIn:</span> linkedin.com/in/mahesh</p>
          <p><span className="font-semibold text-red-500">💻 GitHub:</span> github.com/mahesh</p>
        </div>
      </div>

      {/* Project Description */}
      <div className="mt-12 max-w-5xl text-center">
        <h2 className="text-2xl font-semibold text-red-500 mb-4">🔍 About the "Life Saver" Project</h2>
        <div className="text-gray-700 text-md space-y-4">
          <p>
            <strong>Life Saver</strong> is a modern blood donation web application that bridges the gap between <span className="font-semibold">donors, recipients, blood banks, hospitals,</span> and <span className="font-semibold">donation camps</span>.
          </p>

          <ul className="list-disc text-left mx-auto max-w-2xl pl-6">
            <li><span className="text-red-500 font-medium">📍 Maps Integration:</span> Users can view nearby blood banks and donation camps in real-time using location-based services.</li>

            <li><span className="text-red-500 font-medium">🩸 Broadcast Requests:</span> Need blood? Just fill in the details and broadcast your request. All suitable and nearby donors will be notified.</li>

            <li><span className="text-red-500 font-medium">📞 Direct Contact:</span> Once a donor accepts your request, the requester can view their phone number and connect immediately to coordinate the donation.</li>

            <li><span className="text-red-500 font-medium">🏥 Camp Linking:</span> Blood donation camp data is also linked and shown on maps so that people can voluntarily join ongoing or upcoming events.</li>

            <li><span className="text-red-500 font-medium">🌐 Real-Time Updates:</span> Blood request and acceptance notifications are updated in real time across the platform.</li>

            <li><span className="text-red-500 font-medium">🔐 Secure Access:</span> Contact details and sensitive data are shared only after a match is confirmed, ensuring privacy.</li>
          </ul>

          <p className="mt-6">
            <span className="font-semibold text-red-600">Goal:</span> Make blood donation more accessible, transparent, and quicker than ever before. Life Saver aims to save lives through smart technology and real-time connectivity.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutMeAndProject;
