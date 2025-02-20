// import React from "react";
// import { GridIcon } from "lucide-react"; 
// // or any icon that matches the Figma design

// export default function MenuHeader() {
//   return (
//     <div className="flex items-center gap-3 px-6 py-4 ml-6">
//       {/* Blue circle with an icon inside */}
//       <div className="w-8 h-8 bg-[#2D37FF] rounded-full flex items-center justify-center">
//       <svg width="62" height="62" viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
// <circle cx="26" cy="26" r="26" fill="#253BFF"/>
// <rect x="17.6562" y="17.6699" width="6.69214" height="6.69336" rx="1" fill="white"/>
// <rect x="17.6562" y="27.6523" width="6.69214" height="6.69336" rx="1" fill="white"/>
// <rect x="27.6539" y="27.6523" width="6.69214" height="6.69336" rx="1" fill="white"/>
// <circle cx="30.9871" cy="21.041" r="3.69067" fill="white"/>
// </svg>

//       </div>

//       {/* Title text */}
//       <h1 className="text-lg font-semibold text-[#1A1A1A]">
//         Menus
//       </h1>
//     </div>
//   );
// }


import React from "react";
import { GridIcon } from "lucide-react"; 
// or any icon that matches the Figma design

export default function MenuHeader() {
  return (
    <div className="flex items-center gap-4 px-6 py-4 ml-6">
      {/* Larger container to display the bigger SVG */}
      <div className="w-10 h-10 flex items-center justify-center">
        <svg
          width="62"
          height="62"
          viewBox="0 0 52 52"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="26" cy="26" r="26" fill="#253BFF" />
          <rect
            x="17.6562"
            y="17.6699"
            width="6.69214"
            height="6.69336"
            rx="1"
            fill="white"
          />
          <rect
            x="17.6562"
            y="27.6523"
            width="6.69214"
            height="6.69336"
            rx="1"
            fill="white"
          />
          <rect
            x="27.6539"
            y="27.6523"
            width="6.69214"
            height="6.69336"
            rx="1"
            fill="white"
          />
          <circle cx="30.9871" cy="21.041" r="3.69067" fill="white" />
        </svg>
      </div>

      {/* Bigger Title Text */}
      <h1 className="text-2xl font-bold text-[#1A1A1A]">
        Menus
      </h1>
    </div>
  );
}
