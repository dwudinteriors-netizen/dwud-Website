export const DRIVE_IMAGE_FOLDER = 'https://drive.google.com/drive/folders/1x-7pxl8Y18ddyKU1UmW4D7rcs8WX7H3F?usp=sharing';

import driveService from '../services/driveService';

/**
 * Populate project image URLs from a Drive folder. Matches files by name (without extension)
 * to the `title` of each project. Files must be accessible (shared) for direct linking.
 * Call `await loadDriveImages()` at app start (after sign-in if files are private).
 */
export async function loadDriveImages(folderUrl?: string) {
  const folderId = driveService.extractFolderIdFromUrl(folderUrl || DRIVE_IMAGE_FOLDER);
  if (!folderId) return;

  // Ensure Drive client is initialized. If not, try to init using Vite env vars.
  if (!window.gapi || !window.gapi.client || !window.gapi.client.drive) {
    const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;
    const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
    if (!apiKey || !clientId) {
      throw new Error('VITE_GOOGLE_API_KEY or VITE_GOOGLE_CLIENT_ID not set. Add them to .env and restart the dev server.');
    }
    await driveService.initDrive({ apiKey, clientId });
  }

  let files;
  try {
    files = await driveService.listFilesRecursive(folderId, 1000);
  } catch (err: any) {
    throw new Error(`Drive list failed: ${err?.message || String(err)}`);
  }
  console.info('Drive: files found', files.length);
  const map = new Map<string, any>();
  files.forEach((f: any) => {
    const nameKey = String(f.name || '').replace(/\.[^.]+$/, '').trim().toLowerCase();
    map.set(nameKey, f);
  });

  PROJECTS.forEach((p) => {
    const key = String(p.title).trim().toLowerCase();
    const file = map.get(key);
    if (file) {
      console.debug('Drive file object for match:', file);
      const resolved = driveService.getPublicFileUrl(file.id) || file.webContentLink || file.webViewLink || file.thumbnailLink || p.image;
      p.image = resolved;
      console.info(`Drive: matched ${p.title} -> ${file.name} (using ${resolved.includes(file.id) ? 'uc?id' : 'web link'})`);
    }
  });
}

export const PROCESS_STEPS = [
 {
  number: '01',
  title: 'Discover Your Vision',
  description: 'We start by understanding your lifestyle, family needs, preferences, budget, and design aspirations.'
},
{
  number: '02',
  title: 'Creative Concept Development',
  description: 'Our team presents mood boards, layouts, and detailed visuals so you can see your dream space taking shape.'
},

{
  number: '03',
  title: 'Design Detailing & Refinement',
  description: 'From furniture placement to material selection, every detail is perfected for elegance and functionality.'
},
{
  number: '04',
  title: 'Premium Production',
  description: 'Your approved designs are crafted at our manufacturing facility with the finest quality materials and craftsmanship.'
},
{
  number: '05',
  title: 'Flawless On-Site Execution',
  description: 'Our experts ensure seamless installation, regular site checks, and finishing touches that bring your vision to life.'
}
];

export const whyChooseUs = [
  {
    icon: '👩‍🎨',
    title: 'Expert Design Team',
    description: 'Creative minds dedicated to crafting spaces that inspire.'
  },
  {
    icon: '🛠️',
    title: 'Quality Craftsmanship',
    description: 'Premium materials and meticulous detailing for lasting beauty.'
  },
  {
    icon: '⏱️',
    title: 'Timely Execution',
    description: 'Projects delivered on schedule without compromising excellence.'
  },
  {
    icon: '📞',
    title: '24/7 Support',
    description: 'Always available to guide, assist, and ensure peace of mind.'
  }
];


export const OFFERS = [
  {
    id: 'essential',
    name: 'ESSENTIAL',
    price: '₹ 8.85 Lac',
    discountedPrice: '₹ 6.37 Lac',
    description: 'Essential woodwork for a 2BHK',
    image: 'https://via.placeholder.com/300x300/2596BE/FFFFFF?text=Essential+Package'
  },
  {
    id: 'eleganza',
    name: 'ELEGANZA',
    price: '₹ 15.84 Lac',
    discountedPrice: '₹ 11.41 Lac',
    description: 'Detailed woodwork for a 3BHK',
    image: 'https://via.placeholder.com/300x300/142365/FFFFFF?text=Eleganza+Package'
  },
  {
    id: 'eleganza-plus',
    name: 'ELEGANZA PLUS',
    price: '₹ 24.03 Lac',
    discountedPrice: '₹ 16.82 Lac',
    description: 'Woodwork & beautifications for a 3BHK',
    image: 'https://via.placeholder.com/300x300/4338CA/FFFFFF?text=Eleganza+Plus'
  }
];

export const TESTIMONIALS = [
  {
    id: 1,
    name: 'Rajesh Kumar',
    project: 'Residential Interior Design',
    text: 'Excellent service and quality! The team understood our vision perfectly and delivered beyond expectations.',
    avatar: 'https://via.placeholder.com/80x80/2596BE/FFFFFF?text=RK'
  },
  {
    id: 2,
    name: 'Priya Singh',
    project: 'Home Renovation',
    text: 'Professional approach and timely execution. Our home looks absolutely amazing now!',
    avatar: 'https://via.placeholder.com/80x80/142365/FFFFFF?text=PS'
  },
  {
    id: 3,
    name: 'Amit Patel',
    project: 'Modern Living Space',
    text: 'Great attention to detail and outstanding customer support throughout the project.',
    avatar: 'https://via.placeholder.com/80x80/4338CA/FFFFFF?text=AP'
  }
];

export const SHOWROOMS = [
  {
    city: 'Vyttila',
    address: '51/24A-2, 1st Floor, Tharayil Tower, Poonithura, Vyttila-682019',
    phone: '+91 956 723 1111'
  },
  {
    city: 'Edappally',
    address: '31/361 A1, First Floor, near Metro Pillar Number 377, Edappally Toll, Kochi',
    phone: '+91 755 984 1111'
  }
];

export const PROJECTS = [
  {
    id: 1,
    title: 'Modern Living Room',
    category: 'Residential',
    image: 'https://via.placeholder.com/400x300/2596BE/FFFFFF?text=Modern+Living+Room'
  },
  {
    id: 2,
    title: 'Kitchen Design',
    category: 'Interior Design',
    image: 'https://via.placeholder.com/400x300/142365/FFFFFF?text=Kitchen+Design'
  },
  {
    id: 3,
    title: 'Master Bedroom',
    category: 'Residential',
    image: 'https://via.placeholder.com/400x300/4338CA/FFFFFF?text=Master+Bedroom'
  },
  {
    id: 4,
    title: 'Home Office',
    category: 'Modern',
    image: 'https://via.placeholder.com/400x300/2596BE/FFFFFF?text=Home+Office'
  },
  {
    id: 5,
    title: 'Dining Area',
    category: 'Renovation',
    image: 'https://via.placeholder.com/400x300/142365/FFFFFF?text=Dining+Area'
  },
  {
    id: 6,
    title: 'Full Apartment',
    category: 'Complete Design',
    image: 'https://via.placeholder.com/400x300/4338CA/FFFFFF?text=Full+Apartment'
  }
];

export const CONTACT_INFO = {
  phone: '+91 9567 524 459, +91 8075 169 903',
  email: 'Dwudinteriors@gmail.com',
  website: 'dwudinteriors.com',
  address: 'Fortune Interiors, 470B Anita warehouse, Tharangini junction, Vazhayila-Kallayam Road'
};
