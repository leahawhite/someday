export default {
  folders: [
      { 
        id: 1,
        text: "Watch",
        icon: "film" 
      },
      { 
        id: 2,
        text: "Read",
        icon: "book" 
      },
      { 
        id: 3,
        text: "Listen",
        icon: "volume-up" 
      },
      { 
        id: 4,
        text: "Eat",
        icon: "utensils" 
      },
      { 
        id: 5,
        text: "Do",
        icon: "hiking" 
      },
      { 
        id: 6,
        text: "Go",
        icon: "road" 
      },
      { 
        id: 7,
        text: "Archives",
        icon: "folder" 
      }
    ],
    users: [
      {
        id: 1,
        full_name: "Demo User",
        email: "demo@demo.com",
        password: "demo" 
      }
    ],
    notes: [
      {
        id: 1,
        what: "Los Espookys",
        where: "HBO",
        who: "Me",
        link: "https://www.hbo.com/los-espookys",
        notes: "Julio Torres! Looks promising, but the subtitles were quick!",
        favorite: true,
        date_created: 8-31-2019,
        date_edited: null,
        folder: 1,
      },
      {
        id: 2,
        what: "On Becoming a God in Central Florida",
        where: "Showtime",
        who: "Me",
        link: "https://www.sho.com/on-becoming-a-god-in-central-florida",
        notes: "Kirsten Dunst pyramid scheme series",
        favorite: true,
        date_created: 8-31-2019,
        date_edited: null,
        folder: 1,
      },
    ]
}