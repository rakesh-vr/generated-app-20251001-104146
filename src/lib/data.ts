export interface Exercise {
  name: string;
  sets: string;
  reps: string;
  description: string;
  media: string;
}
export interface WorkoutDay {
  day: number;
  title: string;
  focus: string;
  calories: number;
  exercises: Exercise[];
  isRestDay?: boolean;
}
export const WORKOUT_PLAN: WorkoutDay[] = [
  {
    day: 1,
    title: "Chest & Triceps",
    focus: "Push Day",
    calories: 450,
    exercises: [
      {
        name: "Bench Press",
        sets: "4",
        reps: "8-12",
        description: "Lie on a flat bench, grip the barbell with hands slightly wider than shoulder-width apart. Lower the bar to your chest, then press it back up.",
        media: "https://i.imgur.com/n15y4a1.gif"
      },
      {
        name: "Incline Dumbbell Press",
        sets: "3",
        reps: "10-12",
        description: "Sit on an incline bench holding a dumbbell in each hand at shoulder height. Press the dumbbells up until your arms are fully extended.",
        media: "https://i.imgur.com/64z2a7p.gif"
      },
      {
        name: "Tricep Dips",
        sets: "3",
        reps: "12-15",
        description: "Use parallel bars. Lower your body until your elbows are at a 90-degree angle, then push back up to the starting position.",
        media: "https://i.imgur.com/nLd2gB5.gif"
      },
      {
        name: "Cable Pushdowns",
        sets: "3",
        reps: "12-15",
        description: "Attach a straight bar to a high pulley. Grip the bar with an overhand grip, and push down until your arms are fully extended.",
        media: "https://i.imgur.com/U2d674T.gif"
      }
    ]
  },
  {
    day: 2,
    title: "Back & Biceps",
    focus: "Pull Day",
    calories: 480,
    exercises: [
      {
        name: "Deadlifts",
        sets: "4",
        reps: "5-8",
        description: "Stand with your mid-foot under the barbell. Bend over and grab the bar with a shoulder-width grip. Lift the bar by extending your hips and knees.",
        media: "https://i.imgur.com/kGv3v2B.gif"
      },
      {
        name: "Pull-Ups",
        sets: "3",
        reps: "To Failure",
        description: "Grasp the bar with an overhand grip, hands shoulder-width apart. Pull your body up until your chin is over the bar.",
        media: "https://i.imgur.com/sOB82aI.gif"
      },
      {
        name: "Barbell Rows",
        sets: "4",
        reps: "8-10",
        description: "Bend at your hips and knees and grab a barbell with an overhand grip. Pull the barbell up to your upper waist.",
        media: "https://i.imgur.com/Lq3A32m.gif"
      },
      {
        name: "Dumbbell Curls",
        sets: "3",
        reps: "10-12",
        description: "Stand or sit holding a dumbbell in each hand with an underhand grip. Curl the weights up, keeping your elbows stationary.",
        media: "https://i.imgur.com/xG0b35f.gif"
      }
    ]
  },
  {
    day: 3,
    title: "Legs & Forearms",
    focus: "Leg Day",
    calories: 550,
    exercises: [
      {
        name: "Squats",
        sets: "4",
        reps: "8-12",
        description: "Stand with your feet shoulder-width apart. Lower your hips as if sitting in a chair, keeping your chest up and back straight.",
        media: "https://i.imgur.com/Jp2M0a5.gif"
      },
      {
        name: "Leg Press",
        sets: "3",
        reps: "10-15",
        description: "Sit on the machine with your feet on the platform. Push the platform away from you by extending your knees.",
        media: "https://i.imgur.com/VFb2p6X.gif"
      },
      {
        name: "Romanian Deadlifts",
        sets: "3",
        reps: "10-12",
        description: "Hold a barbell with an overhand grip. Hinge at your hips, keeping your legs straight but not locked. Lower the bar, then return to the starting position.",
        media: "https://i.imgur.com/qgD1Qy3.gif"
      },
      {
        name: "Farmer's Walk",
        sets: "3",
        reps: "50 meters",
        description: "Hold a heavy dumbbell or kettlebell in each hand. Walk for a set distance, maintaining an upright posture.",
        media: "https://i.imgur.com/pOM0a5s.gif"
      }
    ]
  },
  {
    day: 4,
    title: "Shoulders & Traps",
    focus: "Upper Body",
    calories: 420,
    exercises: [
      {
        name: "Overhead Press",
        sets: "4",
        reps: "8-10",
        description: "Stand with the barbell at your front shoulders. Press the bar overhead until your arms are fully extended.",
        media: "https://i.imgur.com/w7aL6e1.gif"
      },
      {
        name: "Lateral Raises",
        sets: "3",
        reps: "12-15",
        description: "Stand holding a dumbbell in each hand at your sides. Raise the weights out to the sides until they are at shoulder height.",
        media: "https://i.imgur.com/uFdedoA.gif"
      },
      {
        name: "Face Pulls",
        sets: "3",
        reps: "15-20",
        description: "Use a rope attachment on a cable machine. Pull the rope towards your face, separating your hands as you pull.",
        media: "https://i.imgur.com/VABzJv2.gif"
      },
      {
        name: "Barbell Shrugs",
        sets: "4",
        reps: "10-12",
        description: "Hold a barbell with an overhand grip. Elevate your shoulders as high as possible, then lower them back down.",
        media: "https://i.imgur.com/1n3Jg62.gif"
      }
    ]
  },
  {
    day: 5,
    title: "Cardio & Full Body",
    focus: "Conditioning",
    calories: 600,
    exercises: [
      {
        name: "Running (Treadmill)",
        sets: "1",
        reps: "30 minutes",
        description: "Maintain a steady pace that elevates your heart rate. Adjust incline for added difficulty.",
        media: "https://i.imgur.com/gC2zD9Z.gif"
      },
      {
        name: "Kettlebell Swings",
        sets: "4",
        reps: "20",
        description: "Hinge at your hips and swing the kettlebell up to shoulder height. This is a powerful, explosive movement.",
        media: "https://i.imgur.com/bL5p6V5.gif"
      },
      {
        name: "Box Jumps",
        sets: "3",
        reps: "10",
        description: "Stand in front of a sturdy box. Jump up onto the box, landing softly. Step back down.",
        media: "https://i.imgur.com/sCjB4Jt.gif"
      },
      {
        name: "Burpees",
        sets: "3",
        reps: "15",
        description: "A full-body exercise. From a standing position, drop into a squat, kick your feet back to a plank, do a push-up, return to the squat, and jump up.",
        media: "https://i.imgur.com/E0h8i1T.gif"
      }
    ]
  },
  {
    day: 6,
    title: "Core",
    focus: "Abs & Stability",
    calories: 300,
    exercises: [
      {
        name: "Plank",
        sets: "3",
        reps: "60 seconds",
        description: "Hold a push-up position, but with your weight on your forearms. Keep your body in a straight line.",
        media: "https://i.imgur.com/W2a5k2A.gif"
      },
      {
        name: "Leg Raises",
        sets: "3",
        reps: "15-20",
        description: "Lie on your back, legs straight. Raise your legs until they are perpendicular to the floor, then slowly lower them.",
        media: "https://i.imgur.com/yfxfI1A.gif"
      },
      {
        name: "Russian Twists",
        sets: "3",
        reps: "20 (each side)",
        description: "Sit on the floor, lean back slightly, and lift your feet. Twist your torso from side to side, optionally holding a weight.",
        media: "https://i.imgur.com/L3K1x3A.gif"
      },
      {
        name: "Cable Crunches",
        sets: "3",
        reps: "15-20",
        description: "Kneel in front of a high pulley with a rope attachment. Hold the rope by your head and crunch down, contracting your abs.",
        media: "https://i.imgur.com/P0M8d5t.gif"
      }
    ]
  },
  {
    day: 7,
    title: "Rest Day",
    focus: "Recovery",
    calories: 0,
    isRestDay: true,
    exercises: []
  }
];