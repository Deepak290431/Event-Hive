import Event from "../models/Event.js";

const samples = [
  {
    title: "Tech Startup Summit Mumbai",
    description: "Join India's biggest startup conference featuring keynote speakers, networking sessions, and pitch competitions. Discover the latest trends in technology and entrepreneurship.",
    location: "Nehru Centre, Mumbai",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=500&fit=crop",
    startTime: new Date(Date.now() + 1000 * 60 * 60 * 24 * 5),
    endTime: new Date(Date.now() + 1000 * 60 * 60 * 24 * 5 + 1000 * 60 * 60 * 8),
    capacity: 500,
    tags: ["Technology", "Startup", "Conference"],
  },
  {
    title: "Bollywood Music Night",
    description: "Experience an electrifying evening with live performances by top Bollywood singers. Dance to your favorite Hindi hits and enjoy delicious food stalls.",
    location: "India Habitat Centre, Delhi",
    image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&h=500&fit=crop",
    startTime: new Date(Date.now() + 1000 * 60 * 60 * 24 * 3),
    endTime: new Date(Date.now() + 1000 * 60 * 60 * 24 * 3 + 1000 * 60 * 60 * 4),
    capacity: 800,
    tags: ["Music", "Bollywood", "Entertainment"],
  },
  {
    title: "AI & Machine Learning Workshop",
    description: "Hands-on workshop covering Python, TensorFlow, and real-world AI applications. Perfect for developers and data scientists looking to upskill.",
    location: "IIT Bombay, Mumbai",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=500&fit=crop",
    startTime: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
    endTime: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7 + 1000 * 60 * 60 * 6),
    capacity: 200,
    tags: ["AI", "Workshop", "Technology"],
  },
  {
    title: "Classical Dance Performance",
    description: "Mesmerizing Bharatanatyam and Kathak performances by renowned artists. A cultural evening celebrating Indian classical dance traditions.",
    location: "Chowdiah Memorial Hall, Bengaluru",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=500&fit=crop",
    startTime: new Date(Date.now() + 1000 * 60 * 60 * 24 * 10),
    endTime: new Date(Date.now() + 1000 * 60 * 60 * 24 * 10 + 1000 * 60 * 60 * 3),
    capacity: 400,
    tags: ["Dance", "Culture", "Classical"],
  },
  {
    title: "Food & Wine Festival",
    description: "Indulge in gourmet cuisine from top chefs across India. Wine tastings, live cooking demonstrations, and food stalls featuring regional specialties.",
    location: "Kala Academy, Goa",
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561404?w=800&h=500&fit=crop",
    startTime: new Date(Date.now() + 1000 * 60 * 60 * 24 * 12),
    endTime: new Date(Date.now() + 1000 * 60 * 60 * 24 * 12 + 1000 * 60 * 60 * 5),
    capacity: 600,
    tags: ["Food", "Wine", "Festival"],
  },
  {
    title: "Web Development Bootcamp",
    description: "Intensive 2-day bootcamp covering React, Node.js, and MongoDB. Build a full-stack application from scratch with expert guidance.",
    location: "Online / Remote",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=500&fit=crop",
    startTime: new Date(Date.now() + 1000 * 60 * 60 * 24 * 14),
    endTime: new Date(Date.now() + 1000 * 60 * 60 * 24 * 15 + 1000 * 60 * 60 * 8),
    capacity: 150,
    tags: ["Web Development", "Bootcamp", "Programming"],
  },
  {
    title: "Yoga & Meditation Retreat",
    description: "Rejuvenate your mind and body with daily yoga sessions, meditation workshops, and wellness activities in a serene environment.",
    location: "Rishikesh, Uttarakhand",
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&h=500&fit=crop",
    startTime: new Date(Date.now() + 1000 * 60 * 60 * 24 * 20),
    endTime: new Date(Date.now() + 1000 * 60 * 60 * 24 * 22 + 1000 * 60 * 60 * 6),
    capacity: 100,
    tags: ["Yoga", "Wellness", "Retreat"],
  },
  {
    title: "Stand-up Comedy Night",
    description: "Laugh your heart out with India's funniest comedians. An evening of hilarious jokes, witty observations, and non-stop entertainment.",
    location: "Comedy Store, Mumbai",
    image: "https://images.unsplash.com/photo-1501281668479-f3afd8723e47?w=800&h=500&fit=crop",
    startTime: new Date(Date.now() + 1000 * 60 * 60 * 24 * 4),
    endTime: new Date(Date.now() + 1000 * 60 * 60 * 24 * 4 + 1000 * 60 * 60 * 3),
    capacity: 300,
    tags: ["Comedy", "Entertainment", "Stand-up"],
  },
  {
    title: "Photography Workshop",
    description: "Learn professional photography techniques from award-winning photographers. Covers portrait, landscape, and street photography.",
    location: "Delhi Photography Club, Delhi",
    image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=800&h=500&fit=crop",
    startTime: new Date(Date.now() + 1000 * 60 * 60 * 24 * 8),
    endTime: new Date(Date.now() + 1000 * 60 * 60 * 24 * 8 + 1000 * 60 * 60 * 5),
    capacity: 80,
    tags: ["Photography", "Workshop", "Arts"],
  },
  {
    title: "Business Networking Meetup",
    description: "Connect with entrepreneurs, investors, and business leaders. Expand your network and discover new opportunities in the startup ecosystem.",
    location: "WeWork, Bengaluru",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=500&fit=crop",
    startTime: new Date(Date.now() + 1000 * 60 * 60 * 24 * 6),
    endTime: new Date(Date.now() + 1000 * 60 * 60 * 24 * 6 + 1000 * 60 * 60 * 3),
    capacity: 250,
    tags: ["Networking", "Business", "Startup"],
  },
  {
    title: "Jazz Music Concert",
    description: "Experience smooth jazz performances by international and Indian jazz artists. An evening of soulful music and great vibes.",
    location: "Blue Frog, Mumbai",
    image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&h=500&fit=crop",
    startTime: new Date(Date.now() + 1000 * 60 * 60 * 24 * 9),
    endTime: new Date(Date.now() + 1000 * 60 * 60 * 24 * 9 + 1000 * 60 * 60 * 4),
    capacity: 350,
    tags: ["Jazz", "Music", "Concert"],
  },
  {
    title: "Data Science Conference",
    description: "Explore the latest trends in data science, machine learning, and analytics. Featuring industry experts and hands-on sessions.",
    location: "Hyderabad Convention Centre",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=500&fit=crop",
    startTime: new Date(Date.now() + 1000 * 60 * 60 * 24 * 15),
    endTime: new Date(Date.now() + 1000 * 60 * 60 * 24 * 15 + 1000 * 60 * 60 * 7),
    capacity: 450,
    tags: ["Data Science", "Conference", "Technology"],
  },
  {
    title: "Graphic Design Masterclass",
    description: "Learn UI/UX design principles and master Adobe Creative Suite. Create stunning designs for web and mobile applications.",
    location: "Design Hub, Pune",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=500&fit=crop",
    startTime: new Date(Date.now() + 1000 * 60 * 60 * 24 * 11),
    endTime: new Date(Date.now() + 1000 * 60 * 60 * 24 * 11 + 1000 * 60 * 60 * 6),
    capacity: 120,
    tags: ["Design", "Masterclass", "Creative"],
  },
  {
    title: "Indie Film Festival",
    description: "Celebrate independent cinema with screenings of award-winning indie films. Q&A sessions with filmmakers and industry professionals.",
    location: "NCPA, Mumbai",
    image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=800&h=500&fit=crop",
    startTime: new Date(Date.now() + 1000 * 60 * 60 * 24 * 18),
    endTime: new Date(Date.now() + 1000 * 60 * 60 * 24 * 19 + 1000 * 60 * 60 * 8),
    capacity: 500,
    tags: ["Film", "Festival", "Cinema"],
  },
  {
    title: "Blockchain & Crypto Summit",
    description: "Deep dive into blockchain technology, cryptocurrencies, and DeFi. Network with crypto entrepreneurs and investors.",
    location: "Bangalore Tech Park",
    image: "https://images.unsplash.com/photo-1639762681033-6461502107c6?w=800&h=500&fit=crop",
    startTime: new Date(Date.now() + 1000 * 60 * 60 * 24 * 21),
    endTime: new Date(Date.now() + 1000 * 60 * 60 * 24 * 21 + 1000 * 60 * 60 * 8),
    capacity: 400,
    tags: ["Blockchain", "Crypto", "Technology"],
  },
  {
    title: "Fashion Week Showcase",
    description: "Experience the latest fashion trends with runway shows from emerging and established designers. Shop exclusive collections.",
    location: "Lalit Kala Akademi, Delhi",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=500&fit=crop",
    startTime: new Date(Date.now() + 1000 * 60 * 60 * 24 * 25),
    endTime: new Date(Date.now() + 1000 * 60 * 60 * 24 * 26 + 1000 * 60 * 60 * 6),
    capacity: 700,
    tags: ["Fashion", "Showcase", "Style"],
  },
];

const seedEvents = async (force = false) => {
  const count = await Event.countDocuments();
  
  if (count > 0 && !force) {
    console.log(`Database already has ${count} events. Use force=true to reseed.`);
    // If we have less than expected events, add more
    if (count < samples.length) {
      const existingTitles = await Event.distinct("title");
      const newSamples = samples.filter(s => !existingTitles.includes(s.title));
      if (newSamples.length > 0) {
        const added = await Event.insertMany(newSamples.map((s) => ({ ...s, organizer: null })));
        console.log(`✅ Added ${added.length} more events to database`);
      }
    }
    return;
  }

  // If force is true or database is empty, clear and reseed
  if (force && count > 0) {
    await Event.deleteMany({ organizer: null }); // Only delete sample events
    console.log(`Cleared existing sample events`);
  }

  // Organizer field is optional for sample events
  const seeded = await Event.insertMany(samples.map((s) => ({ ...s, organizer: null })));
  console.log(`✅ Seeded ${seeded.length} sample events to database`);
};

export default seedEvents;


