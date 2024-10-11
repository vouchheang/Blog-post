// import { useEffect } from 'react';
// import { tsParticles } from "@tsparticles/engine";
// import { loadAll } from "@tsparticles/all";

// const ParticlesComponent = () => {
//   useEffect(() => {
//     const initParticles = async () => {
//       await loadAll(tsParticles);
      
//       await tsParticles.addPreset("lightdark", {
//         fullScreen: {
//           enable: false
//         },
//         particles: {
//           links: {
//             enable: true
//           },
//           move: {
//             enable: true
//           },
//           number: {
//             value: 50
//           },
//           opacity: {
//             value: { min: 0.3, max: 1 }
//           },
//           shape: {
//             type: ["circle", "square", "triangle", "polygon"],
//             options: {
//               polygon: [
//                 {
//                   sides: 5
//                 },
//                 {
//                   sides: 6
//                 },
//                 {
//                   sides: 8
//                 }
//               ]
//             }
//           },
//           size: {
//             value: { min: 1, max: 3 }
//           }
//         }
//       });

//       await tsParticles.load({
//         id: "light",
//         options: {
//           preset: "lightdark",
//           particles: {
//             color: {
//               value: "#191970"
//             },
//             links: {
//               color: "#191970"
//             }
//           }
//         }
//       });

//       await tsParticles.load({
//         id: "dark",
//         options: {
//           preset: "lightdark",
//           particles: {
//             color: {
//               value: "#E0FFFF"
//             },
//             links: {
//               color: "#E0FFFF"
//             }
//           }
//         }
//       });
//     };

//     initParticles();
//   }, []);

//   return (
//     <>
//       <div id="light" style={{ width: '100%', height: '300px' }}></div>
//       <div id="dark" style={{ width: '100%', height: '300px' }}></div>
//     </>
//   );
// };

// export default ParticlesComponent;