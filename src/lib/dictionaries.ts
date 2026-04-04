import type { Locale } from "@/lib/locales";

type Dictionary = {
  siteName: string;
  tagline: string;
  nav: {
    home: string;
    destinations: string;
    circuits: string;
    events: string;
    news: string;
    gallery: string;
    ministry: string;
    ministryAbout: string;
    ministryPublications: string;
    ministryPartners: string;
    ministryPress: string;
    ministryAccessibility: string;
    niger: string;
    nigerVisa: string;
    nigerHotels: string;
    nigerTransport: string;
    nigerHealth: string;
    nigerFaq: string;
    contact: string;
    admin: string;
  };
  hero: {
    title: string;
    subtitle: string;
    ctaPrimary: string;
    ctaSecondary: string;
  };
  sections: {
    featuredDestinations: string;
    featuredCircuits: string;
    upcomingEvents: string;
    latestNews: string;
    visualJourney: string;
  };
  forms: {
    fullName: string;
    email: string;
    phone: string;
    message: string;
    submitContact: string;
    submitCircuit: string;
    success: string;
    error: string;
  };
  footer: {
    rights: string;
  };
  admin: {
    title: string;
    loginTitle: string;
    loginButton: string;
    email: string;
    password: string;
    logout: string;
    dashboard: string;
    content: string;
    leads: string;
  };
};

const dictionaries: Record<Locale, Dictionary> = {
  fr: {
    siteName: "Ministere du Tourisme du Niger",
    tagline: "Explorer. Preserver. Rayonner.",
    nav: {
      home: "Accueil",
      destinations: "Destinations",
      circuits: "Circuits",
      events: "Evenements",
      news: "Actualites",
      gallery: "Galerie",
      ministry: "Le Ministere",
      ministryAbout: "A propos du Ministere",
      ministryPublications: "Publications officielles",
      ministryPartners: "Partenaires & bailleurs",
      ministryPress: "Presse & medias",
      ministryAccessibility: "Accessibilite",
      niger: "Le Niger",
      nigerVisa: "Visa & entree au Niger",
      nigerHotels: "Hebergements",
      nigerTransport: "Transport & mobilite",
      nigerHealth: "Sante & securite",
      nigerFaq: "FAQ voyageurs",
      contact: "Contact",
      admin: "Admin",
    },
    hero: {
      title: "Le Niger, destination d'exception",
      subtitle:
        "Une plateforme officielle pour decouvrir les paysages, cultures et experiences du Niger.",
      ctaPrimary: "Demander un circuit",
      ctaSecondary: "Voir les destinations",
    },
    sections: {
      featuredDestinations: "Destinations en avant",
      featuredCircuits: "Circuits recommandes",
      upcomingEvents: "Evenements a venir",
      latestNews: "Actualites",
      visualJourney: "Voyage visuel",
    },
    forms: {
      fullName: "Nom complet",
      email: "Email",
      phone: "Telephone",
      message: "Message",
      submitContact: "Envoyer le message",
      submitCircuit: "Envoyer la demande",
      success: "Votre demande a ete envoyee.",
      error: "Une erreur est survenue. Reessayez.",
    },
    footer: {
      rights: "Tous droits reserves.",
    },
    admin: {
      title: "Back-office Tourisme Niger",
      loginTitle: "Connexion administrateur",
      loginButton: "Se connecter",
      email: "Email",
      password: "Mot de passe",
      logout: "Se deconnecter",
      dashboard: "Tableau de bord",
      content: "Contenus",
      leads: "Leads",
    },
  },
  en: {
    siteName: "Niger Ministry of Tourism",
    tagline: "Explore. Preserve. Shine.",
    nav: {
      home: "Home",
      destinations: "Destinations",
      circuits: "Circuits",
      events: "Events",
      news: "News",
      gallery: "Gallery",
      ministry: "Ministry",
      ministryAbout: "About the Ministry",
      ministryPublications: "Official publications",
      ministryPartners: "Partners & donors",
      ministryPress: "Press & media",
      ministryAccessibility: "Accessibility",
      niger: "Niger",
      nigerVisa: "Visa & entry to Niger",
      nigerHotels: "Accommodation",
      nigerTransport: "Transport & mobility",
      nigerHealth: "Health & safety",
      nigerFaq: "Traveler FAQ",
      contact: "Contact",
      admin: "Admin",
    },
    hero: {
      title: "Niger, a destination of distinction",
      subtitle:
        "An official platform to discover Niger's landscapes, cultures, and travel experiences.",
      ctaPrimary: "Request a circuit",
      ctaSecondary: "Browse destinations",
    },
    sections: {
      featuredDestinations: "Featured destinations",
      featuredCircuits: "Recommended circuits",
      upcomingEvents: "Upcoming events",
      latestNews: "Latest news",
      visualJourney: "Visual journey",
    },
    forms: {
      fullName: "Full name",
      email: "Email",
      phone: "Phone",
      message: "Message",
      submitContact: "Send message",
      submitCircuit: "Send request",
      success: "Your request has been sent.",
      error: "Something went wrong. Please retry.",
    },
    footer: {
      rights: "All rights reserved.",
    },
    admin: {
      title: "Tourism Niger Back Office",
      loginTitle: "Administrator login",
      loginButton: "Sign in",
      email: "Email",
      password: "Password",
      logout: "Sign out",
      dashboard: "Dashboard",
      content: "Content",
      leads: "Leads",
    },
  },
  ha: {
    siteName: "Ma'aikatar Yawon Bude Ido ta Nijar",
    tagline: "Bincika. Kare. Bayyana.",
    nav: {
      home: "Gida",
      destinations: "Wurare",
      circuits: "Shirye-shirye",
      events: "Abubuwan da ke tafe",
      news: "Labarai",
      gallery: "Hotuna",
      ministry: "Ma'aikatar",
      ministryAbout: "Game da Ma'aikatar",
      ministryPublications: "Wallafe-wallafen hukuma",
      ministryPartners: "Abokan hulda",
      ministryPress: "Presse & media",
      ministryAccessibility: "Damar shiga",
      niger: "Nijar",
      nigerVisa: "Visa & shiga Nijar",
      nigerHotels: "Wuraren zama",
      nigerTransport: "Sufuri & motsi",
      nigerHealth: "Lafiya & tsaro",
      nigerFaq: "Tambayoyin matafiya",
      contact: "Tuntuba",
      admin: "Gudanarwa",
    },
    hero: {
      title: "Nijar, wuri na musamman",
      subtitle:
        "Shafin hukuma don gano yanayi, al'adu, da kwarewar yawon bude ido a Nijar.",
      ctaPrimary: "Nemi shirin yawon bude ido",
      ctaSecondary: "Duba wuraren yawon bude ido",
    },
    sections: {
      featuredDestinations: "Shahararrun wurare",
      featuredCircuits: "Shirye-shiryen da aka ba da shawara",
      upcomingEvents: "Abubuwan da ke tafe",
      latestNews: "Sabbin labarai",
      visualJourney: "Tafiya ta gani",
    },
    forms: {
      fullName: "Cikakken suna",
      email: "Imel",
      phone: "Lambar waya",
      message: "Sako",
      submitContact: "Aika sako",
      submitCircuit: "Aika bukata",
      success: "An aika bukatarka.",
      error: "An samu matsala. A sake gwadawa.",
    },
    footer: {
      rights: "An kiyaye dukkan hakkoki.",
    },
    admin: {
      title: "Bangaren Gudanarwa",
      loginTitle: "Shiga na mai gudanarwa",
      loginButton: "Shiga",
      email: "Imel",
      password: "Kalmar sirri",
      logout: "Fita",
      dashboard: "Babban allo",
      content: "Abubuwan ciki",
      leads: "Bukatu",
    },
  },
};

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
