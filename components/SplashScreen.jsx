// import { View, Animated } from 'react-native';
// import { useEffect, useRef } from 'react';
// import { router } from 'expo-router';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import Svg, { Path } from 'react-native-svg';
// import { qluelessPath } from '../assets/svg/qluelesStroke'; // Import your actual path

// export default function SplashScreen() {
//   const strokeAnim = useRef(new Animated.Value(1)).current; // Start fully hidden

//   useEffect(() => {
//     Animated.timing(strokeAnim, {
//       toValue: 0, // Reveal the full stroke
//       duration: 2500, // Adjust animation speed
//       useNativeDriver: false,
//     }).start(() => {
//       setTimeout(() => {
//         router.replace('/sign-in');
//       }, 500);
//     });
//   }, []);

//   const strokeDasharray = 500; // Adjust to match actual path length
//   const strokeDashoffset = strokeAnim.interpolate({
//     inputRange: [0, 1],
//     outputRange: [0, strokeDasharray], // Animates from invisible to drawn
//   });

//   return (
//     <SafeAreaView className="bg-primary h-full flex justify-center items-center">
//       <Animated.View>
//         <Svg width={300} height={100} viewBox="0 0 300 100">
//           <Path
//             d={qluelessPath} // SVG path of "Qlueless"
//             stroke="white"
//             strokeWidth={3}
//             fill="none"
//             strokeDasharray={strokeDasharray}
//             strokeDashoffset={strokeDashoffset}
//           />
//         </Svg>
//       </Animated.View>
//     </SafeAreaView>
//   );
// }



import { View, Animated } from 'react-native';
import { useEffect, useRef } from 'react';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import LogoName from '../assets/svg/logoName.svg'; // Import your SVG logo

export default function SplashScreen() {
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Animate opacity from 0 to 1
    Animated.timing(opacityAnim, {
      toValue: 1,
      duration: 1500, // 1.5 seconds fade-in effect
      useNativeDriver: true,
    }).start();

    // Navigate to sign-in after 2 seconds
    const timeout = setTimeout(() => {
      router.replace('/qsign-in');
    }, 2000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <SafeAreaView className="bg-dark h-full flex justify-center items-center">
      <Animated.View className="mt-[-15%]" style={{ opacity: opacityAnim }}>
        <LogoName width={250} height={120} />
      </Animated.View>
    </SafeAreaView>
  );
}
