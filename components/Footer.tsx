"use client";

import { Youtube, Linkedin, Instagram, Music2 } from "lucide-react";  // Keep the other icons
import { Button } from "@/components/ui/button";

// Custom Spotify Icon Component
const CustomSpotifyIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="50" height="30" viewBox="0 0 32 32">
    <path d="M 16 4 C 9.371094 4 4 9.371094 4 16 C 4 22.628906 9.371094 28 16 28 C 22.628906 28 28 22.628906 28 16 C 28 9.371094 22.628906 4 16 4 Z M 16 6 C 21.554688 6 26 10.445313 26 16 C 26 21.554688 21.554688 26 16 26 C 10.445313 26 6 21.554688 6 16 C 6 10.445313 10.445313 6 16 6 Z M 14.40625 10.75 C 12.460938 10.75 10.765625 10.929688 9.15625 11.4375 C 8.730469 11.523438 8.375 11.84375 8.375 12.4375 C 8.375 13.03125 8.8125 13.554688 9.40625 13.46875 C 9.660156 13.46875 9.832031 13.375 10 13.375 C 11.355469 13.035156 12.882813 12.875 14.40625 12.875 C 17.367188 12.875 20.40625 13.535156 22.4375 14.71875 C 22.691406 14.804688 22.777344 14.90625 23.03125 14.90625 C 23.625 14.90625 24.039063 14.46875 24.125 13.875 C 24.125 13.367188 23.871094 13.042969 23.53125 12.875 C 20.992188 11.4375 17.621094 10.75 14.40625 10.75 Z M 14.125 14.46875 C 12.347656 14.46875 11.082031 14.722656 9.8125 15.0625 C 9.390625 15.230469 9.15625 15.492188 9.15625 16 C 9.15625 16.421875 9.492188 16.84375 10 16.84375 C 10.171875 16.84375 10.246094 16.835938 10.5 16.75 C 11.429688 16.496094 12.707031 16.34375 14.0625 16.34375 C 16.855469 16.34375 19.285156 17.023438 21.0625 18.125 C 21.230469 18.210938 21.402344 18.28125 21.65625 18.28125 C 22.164063 18.28125 22.5 17.851563 22.5 17.34375 C 22.5 17.003906 22.339844 16.667969 22 16.5 C 19.800781 15.144531 17.003906 14.46875 14.125 14.46875 Z M 14.40625 18.125 C 12.96875 18.125 11.605469 18.285156 10.25 18.625 C 9.910156 18.710938 9.65625 18.953125 9.65625 19.375 C 9.65625 19.714844 9.921875 20.0625 10.34375 20.0625 C 10.429688 20.0625 10.675781 19.96875 10.84375 19.96875 C 11.945313 19.714844 13.128906 19.5625 14.3125 19.5625 C 16.425781 19.5625 18.359375 20.070313 19.96875 21 C 20.140625 21.085938 20.332031 21.15625 20.5 21.15625 C 20.839844 21.15625 21.164063 20.902344 21.25 20.5625 C 21.25 20.136719 21.066406 19.980469 20.8125 19.8125 C 18.949219 18.710938 16.773438 18.125 14.40625 18.125 Z"></path>
  </svg>
);

export default function Footer() {
  const handleSocialMediaClick = (platform: string) => {
    let url = '';
    switch (platform) {
      case 'youtube':
        url = 'https://www.youtube.com/@Learningsoflifeofan18yrold';
        break;
      case 'spotify':
        url = 'https://open.spotify.com/show/2OJxCOaKWoiRH3RJZmKyYT';
        break;
      case 'linkedin':
        url = 'https://www.linkedin.com/in/saniya-mazumder-a73452285';
        break;
      case 'instagram':
        url = 'https://www.instagram.com/learnings_oflife_of_an_18yrold?igsh=NWY5OGMxNzc3eXg3';
        break;
      case 'music':
        url = 'https://music.amazon.in/podcasts/7f850437-f3a1-441c-8026-cba9fe1d15a4/learnings-of-life-of-an-18yr-old';
        break;
      default:
        return;
    }
    window.open(url, '_blank'); // Open in a new tab
  };

  return (
    <footer id="contact" className="py-12 bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">Contact</h3>
            <p>Email: saniyasimplifies@gmail.com</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
            <div className="flex gap-4">
              {[{Icon: Youtube, platform: 'youtube'}, {Icon: CustomSpotifyIcon, platform: 'spotify'}, {Icon: Linkedin, platform: 'linkedin'}, {Icon: Instagram, platform: 'instagram'}, {Icon: Music2, platform: 'music'}].map(({ Icon, platform }, index) => (
                <Button 
                  key={index}
                  variant="ghost" 
                  size="icon"
                  className="hover:bg-purple-800 transform hover:scale-110 transition-all"
                  onClick={() => handleSocialMediaClick(platform)} // Add onClick here
                >
                  <Icon className="h-5 w-5" />
                </Button>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/episodes" className="hover:text-purple-400 transition-colors">Episodes</a></li>
              <li><a href="#about" className="hover:text-purple-400 transition-colors">About</a></li>
              <li><a href="#contact" className="hover:text-purple-400 transition-colors">Contact</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-gray-800 text-center">
          <p>&copy; {new Date().getFullYear()} Learnings of Life of an 18yr Old. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
