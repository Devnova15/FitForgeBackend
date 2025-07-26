const awardsData = [
    {
        id: 1,
        title: "Early Bird",
        description: "You started your day early 5 times in a row!",
        type: "streak",                 // Награда за ранний подъём 5 дней подряд
        threshold: 5,
        icon: "AlarmClock",
        imageUrl: "../awardsImg/alarm-clock-time-svgrepo-com.svg",
        content: "Early Bird Award - You started your day early 5 times in a row!",
        color: "blue"
    },
    {
        id: 2,
        title: "First Badge",
        description: "You've earned your very first badge!",
        type: "achievement",            // Награда за получение первой ачивки
        threshold: 1,
        icon: "Badge",
        imageUrl: "../awardsImg/badge-svgrepo-com.svg",
        content: "First Badge Award - You've earned your very first badge!",
        color: "green"
    },
    {
        id: 3,
        title: "10-Day Streak",
        description: "You have logged in for 10 days in a row!",
        type: "streak",                 // Награда за вход в приложение 10 дней подряд
        threshold: 10,
        icon: "Calendar",
        imageUrl: "../awardsImg/calendar-svgrepo-com.svg",
        content: "10-Day Streak Award - You have logged in for 10 days in a row!",
        color: "yellow"
    },
    {
        id: 4,
        title: "On Fire",
        description: "You maintained high activity for a whole week!",
        type: "activity",               // Награда за высокую активность 7 дней подряд
        threshold: 7,
        icon: "Fire",
        imageUrl: "../awardsImg/fire-svgrepo-com.svg",
        content: "On Fire Award - You maintained high activity for a whole week!",
        color: "orange"
    },
    {
        id: 5,
        title: "Flame Keeper",
        description: "Your motivation is burning bright!",
        type: "motivation",             // Награда за поддержание мотивации 30 дней
        threshold: 30,
        icon: "Flame",
        imageUrl: "../awardsImg/flame-svgrepo-com.svg",
        content: "Flame Keeper Award - Your motivation is burning bright!",
        color: "red"
    },
    {
        id: 6,
        title: "Strong Start",
        description: "You completed your first workout session!",
        type: "workout",                // Награда за первую тренировку
        threshold: 1,
        icon: "FlexedBiceps",
        imageUrl: "../awardsImg/flexed-biceps-medium-light-skin-tone-svgrepo-com.svg",
        content: "Strong Start Award - You completed your first workout session!",
        color: "purple"
    },
    {
        id: 7,
        title: "Healthy Meal",
        description: "Logged your first healthy meal!",
        type: "nutrition",              // Награда за первый приём здоровой пищи
        threshold: 1,
        icon: "Meal",
        imageUrl: "../awardsImg/meal-easter-svgrepo-com.svg",
        content: "Healthy Meal Award - Logged your first healthy meal!",
        color: "teal"
    },
    {
        id: 8,
        title: "Medalist",
        description: "Earned 5 medals for achievements!",
        type: "achievement",            // Награда за получение 5 достижений
        threshold: 5,
        icon: "Medal",
        imageUrl: "../awardsImg/medal-svgrepo-com.svg",
        content: "Medalist Award - Earned 5 medals for achievements!",
        color: "gold"
    },
    {
        id: 9,
        title: "Hydration Master",
        description: "Tracked your water intake for 7 days straight!",
        type: "streak",                 // Награда за учёт воды 7 дней подряд
        threshold: 7,
        icon: "WaterDrop",
        imageUrl: "../awardsImg/water-drop-svgrepo-com.svg",
        content: "Hydration Master Award - Tracked your water intake for 7 days straight!",
        color: "cyan"
    }
];

module.exports = { awardsData };
