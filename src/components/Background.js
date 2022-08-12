import React from 'react';
import Svg, {
    Path,
    Defs,
    G,
    LinearGradient,
    Stop,
    Circle,
    Rect
} from 'react-native-svg';


export default function Background(props) {
    return (
        <Svg
            viewBox="0 0 540 960"
            width={540}
            height={960}
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <Path fill="#4f36e9" d="M0 0H540V960H0z" />
            <Defs>
                <LinearGradient x1="0%" y1="100%" x2="100%" y2="0%">
                    <Stop offset="30%" stopColor="#4f36e9" />
                    <Stop offset="70%" stopColor="#4f36e9" />
                </LinearGradient>
            </Defs>
            <Defs>
                <LinearGradient x1="0%" y1="100%" x2="100%" y2="0%">
                    <Stop offset="30%" stopColor="#4f36e9" />
                    <Stop offset="70%" stopColor="#4f36e9" />
                </LinearGradient>
            </Defs>
            <Path
                d="M-351 0c8.1-63.2 16.3-126.4 47-175.5 30.8-49.1 84.1-84.2 138.5-111.2 54.4-26.9 110-45.6 165.5-64.3V0z"
                fill="#3521b5"
                transform="translate(540 960)"
            />
            <Path
                d="M351 0c-8.1 63.2-16.3 126.4-47 175.5-30.8 49.1-84.1 84.2-138.5 111.2C111.1 313.6 55.5 332.3 0 351V0z"
                fill="#3521b5"
            />
        </Svg>
    );
}

export function Background1(props) {

    return (
        <Svg
            viewBox="0 0 540 960"
            width={540}
            height={960}
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <Path fill="#4f36e9" d="M0 0H540V960H0z" />
            <Defs>
                <LinearGradient x1="0%" y1="0%" x2="100%" y2="100%">
                    <Stop offset="30%" stopColor="#3521b5" />
                    <Stop offset="70%" stopColor="#3521b5" />
                </LinearGradient>
            </Defs>
            <Defs>
                <LinearGradient x1="0%" y1="0%" x2="100%" y2="100%">
                    <Stop offset="30%" stopColor="#3521b5" />
                    <Stop offset="70%" stopColor="#3924bd" />
                </LinearGradient>
            </Defs>
            <Defs>
                <LinearGradient x1="0%" y1="0%" x2="100%" y2="100%">
                    <Stop offset="30%" stopColor="#3e28c6" />
                    <Stop offset="70%" stopColor="#3924bd" />
                </LinearGradient>
            </Defs>
            <Defs>
                <LinearGradient x1="0%" y1="0%" x2="100%" y2="100%">
                    <Stop offset="30%" stopColor="#3e28c6" />
                    <Stop offset="70%" stopColor="#422bcf" />
                </LinearGradient>
            </Defs>
            <Defs>
                <LinearGradient x1="0%" y1="0%" x2="100%" y2="100%">
                    <Stop offset="30%" stopColor="#462fd7" />
                    <Stop offset="70%" stopColor="#422bcf" />
                </LinearGradient>
            </Defs>
            <Defs>
                <LinearGradient x1="0%" y1="0%" x2="100%" y2="100%">
                    <Stop offset="30%" stopColor="#462fd7" />
                    <Stop offset="70%" stopColor="#4b32e0" />
                </LinearGradient>
            </Defs>
            <Defs>
                <LinearGradient x1="0%" y1="0%" x2="100%" y2="100%">
                    <Stop offset="30%" stopColor="#4f36e9" />
                    <Stop offset="70%" stopColor="#4b32e0" />
                </LinearGradient>
            </Defs>
            <Defs>
                <LinearGradient x1="0%" y1="0%" x2="100%" y2="100%">
                    <Stop offset="30%" stopColor="#3521b5" />
                    <Stop offset="70%" stopColor="#3521b5" />
                </LinearGradient>
            </Defs>
            <Defs>
                <LinearGradient x1="0%" y1="0%" x2="100%" y2="100%">
                    <Stop offset="30%" stopColor="#3924bd" />
                    <Stop offset="70%" stopColor="#3521b5" />
                </LinearGradient>
            </Defs>
            <Defs>
                <LinearGradient x1="0%" y1="0%" x2="100%" y2="100%">
                    <Stop offset="30%" stopColor="#3924bd" />
                    <Stop offset="70%" stopColor="#3e28c6" />
                </LinearGradient>
            </Defs>
            <Defs>
                <LinearGradient x1="0%" y1="0%" x2="100%" y2="100%">
                    <Stop offset="30%" stopColor="#422bcf" />
                    <Stop offset="70%" stopColor="#3e28c6" />
                </LinearGradient>
            </Defs>
            <Defs>
                <LinearGradient x1="0%" y1="0%" x2="100%" y2="100%">
                    <Stop offset="30%" stopColor="#422bcf" />
                    <Stop offset="70%" stopColor="#462fd7" />
                </LinearGradient>
            </Defs>
            <Defs>
                <LinearGradient x1="0%" y1="0%" x2="100%" y2="100%">
                    <Stop offset="30%" stopColor="#4b32e0" />
                    <Stop offset="70%" stopColor="#462fd7" />
                </LinearGradient>
            </Defs>
            <Defs>
                <LinearGradient x1="0%" y1="0%" x2="100%" y2="100%">
                    <Stop offset="30%" stopColor="#4b32e0" />
                    <Stop offset="70%" stopColor="#4f36e9" />
                </LinearGradient>
            </Defs>
            <Path
                d="M0 459c-81.3-11.4-162.7-22.8-229.5-61.5-66.8-38.7-119.2-104.7-155-175.5S-439.7 75.6-459 0H0z"
                fill="#4d34e5"
                transform="translate(540)"
            />
            <Path
                d="M0 393.4c-69.7-9.7-139.4-19.5-196.7-52.7-57.3-33.2-102.2-89.7-132.9-150.4-30.7-60.7-47.3-125.5-63.8-190.3H0z"
                fill="#4931dc"
                transform="translate(540)"
            />
            <Path
                d="M0 327.9c-58.1-8.2-116.2-16.3-163.9-44-47.8-27.6-85.2-74.8-110.8-125.3C-300.2 108-314.1 54-327.9 0H0z"
                fill="#442dd3"
                transform="translate(540)"
            />
            <Path
                d="M0 262.3c-46.5-6.5-93-13-131.1-35.2-38.2-22.1-68.1-59.8-88.6-100.2-20.5-40.5-31.5-83.7-42.6-126.9H0z"
                fill="#402aca"
                transform="translate(540)"
            />
            <Path
                d="M0 196.7c-34.9-4.9-69.7-9.8-98.4-26.3-28.6-16.6-51-44.9-66.4-75.3-15.3-30.3-23.6-62.7-31.9-95.1H0z"
                fill="#3c26c2"
                transform="translate(540)"
            />
            <Path
                d="M0 131.1c-23.2-3.2-46.5-6.5-65.6-17.5-19.1-11.1-34-29.9-44.3-50.2-10.2-20.2-15.7-41.8-21.2-63.4H0z"
                fill="#3723b9"
                transform="translate(540)"
            />
            <Path
                d="M0 65.6c-11.6-1.7-23.2-3.3-32.8-8.8-9.5-5.5-17-15-22.1-25.1C-60 21.6-62.8 10.8-65.6 0H0z"
                fill="#3521b5"
                transform="translate(540)"
            />
            <G>
                <Path
                    d="M0-459c83.2 10.3 166.4 20.7 229.5 61.5 63.1 40.8 106.2 112.2 141.2 183.5C405.6-142.7 432.3-71.3 459 0H0z"
                    fill="#4d34e5"
                    transform="translate(0 960)"
                />
                <Path
                    d="M0-393.4c71.3 8.8 142.6 17.7 196.7 52.7 54.1 35 91.1 96.1 121 157.3C347.6-122.3 370.5-61.1 393.4 0H0z"
                    fill="#4931dc"
                    transform="translate(0 960)"
                />
                <Path
                    d="M0-327.9c59.4 7.4 118.8 14.8 163.9 44 45.1 29.1 75.9 80.1 100.9 131 24.9 51 44 101.9 63.1 152.9H0z"
                    fill="#442dd3"
                    transform="translate(0 960)"
                />
                <Path
                    d="M0-262.3c47.5 5.9 95.1 11.8 131.1 35.2 36.1 23.3 60.8 64.1 80.7 104.8C231.8-81.5 247-40.8 262.3 0H0z"
                    fill="#402aca"
                    transform="translate(0 960)"
                />
                <Path
                    d="M0-196.7c35.6 4.4 71.3 8.8 98.4 26.3 27 17.5 45.5 48.1 60.5 78.7 14.9 30.6 26.4 61.1 37.8 91.7H0z"
                    fill="#3c26c2"
                    transform="translate(0 960)"
                />
                <Path
                    d="M0-131.1c23.8 2.9 47.5 5.9 65.6 17.5 18 11.7 30.3 32.1 40.3 52.5 10 20.3 17.6 40.7 25.2 61.1H0z"
                    fill="#3723b9"
                    transform="translate(0 960)"
                />
                <Path
                    d="M0-65.6c11.9 1.5 23.8 3 32.8 8.8 9 5.8 15.2 16 20.2 26.2C57.9-20.4 61.8-10.2 65.6 0H0z"
                    fill="#3521b5"
                    transform="translate(0 960)"
                />
            </G>
        </Svg>
    )

}


