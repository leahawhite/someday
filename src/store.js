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
        password: "demo123" 
      }
    ],
    notes: [
      {
        id: 1,
        what: "Los Espookys",
        how: "HBO",
        who: "Me",
        link: "https://www.hbo.com/los-espookys",
        thoughts: "Julio Torres! Looks promising, but the subtitles were quick!",
        favorite: true,
        author: 1,
        date_created: new Date("8-31-2019").toISOString(),
        date_edited: null,
        folder: 1
      },
      {
        id: 2,
        what: "On Becoming a God in Central Florida",
        how: "Showtime",
        who: "Me",
        link: "https://www.sho.com/on-becoming-a-god-in-central-florida",
        thoughts: "Kirsten Dunst pyramid scheme series",
        favorite: true,
        author: 1,
        date_created: new Date("9-1-2019").toISOString(),
        date_edited: null,
        folder: 1
      },
      {
        id: 3,
        what: "Fosse/Verdon",
        how: "Hulu",
        who: "Me",
        link: "https://www.fxnetworks.com/shows/fosse-verdon",
        thoughts: "Bob Fosse/Gwen Verdon series with Sam Rockwell and Michelle Williams.",
        favorite: false,
        author: 1,
        date_created: new Date("9-2-2019").toISOString(),
        date_edited: null,
        folder: 1
      },
      {
        id: 4,
        what: "Schitt's Creek",
        how: "Netflix",
        who: "Emily",
        link: "",
        thoughts: "She's asked me twice if I have seen this. I should?",
        favorite: true,
        author: 1,
        date_created: new Date("9-2-2019").toISOString(),
        date_edited: null,
        folder: 1
      },
      {
        id: 5,
        what: "Oyatsupan Bakers",
        how: "",
        who: "Eater PDX",
        link: "https://www.oyatsupan.com/",
        thoughts: "Bring to brunch with Pangos sometime",
        favorite: false,
        author: 1,
        date_created: new Date("9-12-2019").toISOString(),
        date_edited: null,
        folder: 4
      },
      {
        id: 6,
        what: "Magna",
        how: "2525 SE Clinton St",
        who: "",
        link: "https://www.magnapdx.com/",
        thoughts: "New Filipino restaurant on Clinton",
        favorite: false,
        author: 1,
        date_created: new Date("9-12-2019").toISOString(),
        date_edited: null,
        folder: 4
      },
      {
        id: 7,
        what: "Trick Mirror: Reflections on Self-Delusion, by Jia Tolentino",
        how: "",
        who: "Fresh Air",
        link: "https://www.penguinrandomhouse.com/books/567511/trick-mirror-by-jia-tolentino/9780525510543/",
        thoughts: "Personal essays by the Hairpin writer",
        favorite: false,
        author: 1,
        date_created: new Date("9-12-2019").toISOString(),
        date_edited: null,
        folder: 2
      },
      {
        id: 8,
        what: "Call Them By Their True Names, by Rebecca Solnit",
        how: "library",
        who: "me",
        link: "https://www.amazon.com/Call-Them-Their-True-Names/dp/1608469468",
        thoughts: `The one I didn't have time to finish from the library`,
        favorite: false,
        author: 1,
        date_created: new Date("9-12-2019").toISOString(),
        date_edited: null,
        folder: 2
      },
      {
        id: 9,
        what: "Fascism: A Warning, by Madeleine Albright",
        how: "library",
        who: "Fresh Air",
        link: "https://www.harpercollins.com/9780062802187/fascism-a-warning/",
        thoughts: "Got great reviews, need to know this stuff",
        favorite: false,
        author: 1,
        date_created: new Date("9-12-2019").toISOString(),
        date_edited: null,
        folder: 2
      },
      {
        id: 10,
        what: "'The Stakes: A History of Persuasion' podcast",
        how: "WNYC/Podkicker",
        who: "Stuart",
        link: "https://www.wnycstudios.org/story/the-stakes-history-persuasion-part-1",
        thoughts: "Three-part series on technology",
        favorite: true,
        author: 1,
        date_created: new Date("9-12-2019").toISOString(),
        date_edited: null,
        folder: 3
      },
      {
        id: 11,
        what: "Golden Hour, by Kacey Musgraves",
        how: "",
        who: "Pop Culture Happy Hour",
        link: "https://open.spotify.com/album/7f6xPqyaolTiziKf5R5Z0c",
        thoughts: "Need to listen to the rest of the album'",
        favorite: true,
        author: 1,
        date_created: new Date("9-12-2019").toISOString(),
        date_edited: null,
        folder: 3
      },
      {
        id: 12,
        what: "Scappoose Bay Paddling Center",
        how: "Warren, OR",
        who: "Sharon",
        link: "https://www.yelp.com/biz/scappoose-bay-paddling-center-warren",
        thoughts: "The SUP place Sharon was telling me about",
        favorite: true,
        author: 1,
        date_created: new Date("9-12-2019").toISOString(),
        date_edited: null,
        folder: 5
      }
    ]
}