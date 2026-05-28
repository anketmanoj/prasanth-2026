export interface Chapter {
  id: number
  title: string
  subtitle: string
  year: string
  bg: string
  accent: string
  images: { src: string; caption: string; rotate?: number }[]
  heading: string
  text: string
}

export const chapters: Chapter[] = [
  {
    id: 1,
    title: 'The Original',
    subtitle: 'Chapter I',
    year: '~2004',
    bg: 'linear-gradient(135deg, #1c0a00 0%, #2d1200 50%, #1c0a00 100%)',
    accent: '#fbbf24',
    images: [
      {
        src: 'Picture 133_Original.jpg',
        caption: 'Father & daughter, matching taches',
        rotate: 0,
      },
    ],
    heading: 'Some dads are legends from day one.',
    text: 'Prasanth didn\'t just become a father — he became a partner in crime. A co-conspirator in chaos. The man who showed up with a drawn-on moustache and zero reservations about matching his toddler\'s energy. From day one, pure gold.',
  },
  {
    id: 2,
    title: 'Full Hands. Fuller Heart.',
    subtitle: 'Chapter II',
    year: 'Early years',
    bg: 'linear-gradient(135deg, #1a0010 0%, #2d0020 50%, #1a0010 100%)',
    accent: '#f472b6',
    images: [
      {
        src: 'IMG_8853_Original.jpg',
        caption: 'The whole world in his arms',
        rotate: 0,
      },
      {
        src: 'PHOTO-family-hallway.jpg',
        caption: 'Four of us, all of us',
        rotate: 0,
      },
    ],
    heading: 'He held the whole family in his arms.',
    text: 'Baby on one hip, the other daughter right beside him. Steady. Unshakeable. He made it look effortless — but we know better. He carried everything, and never once showed the weight.',
  },
  {
    id: 3,
    title: 'The Fun Era',
    subtitle: 'Chapter III',
    year: 'The good years',
    bg: 'linear-gradient(135deg, #0a0030 0%, #160050 50%, #0a0030 100%)',
    accent: '#a78bfa',
    images: [
      {
        src: 'IMG_2301_Original.jpg',
        caption: 'Wrestling at 8am? Sure.',
        rotate: 0,
      },
      {
        src: 'PHOTO-family-sunglasses.jpg',
        caption: 'Too cool. Always.',
        rotate: 0,
      },
    ],
    heading: 'Not a dull moment. Not once.',
    text: 'Daughters climbing on him at dawn. Sunglasses on for no reason at 3pm. The man brought the energy — every single day. This is what "fun dad" actually looks like, and it\'s exactly this.',
  },
  {
    id: 4,
    title: 'The World Was His',
    subtitle: 'Chapter IV',
    year: 'Travels & adventures',
    bg: 'linear-gradient(135deg, #001a20 0%, #003040 50%, #001a20 100%)',
    accent: '#38bdf8',
    images: [
      {
        src: 'Picture 038_Original.jpg',
        caption: 'Switzerland with his love',
        rotate: 0,
      },
      {
        src: 'IMG_5816_Original.jpg',
        caption: 'Still making memories',
        rotate: -90,
      },
    ],
    heading: 'From Switzerland to wherever life called.',
    text: 'Swiss cobblestones, warm smiles, and a quiet kind of pride. Prasanth showed up to every adventure the same way: fully present, completely himself, and somehow always the most stylish person in the frame.',
  },
  {
    id: 5,
    title: 'Cat Dad Era',
    subtitle: 'Chapter V',
    year: 'Recent days',
    bg: 'linear-gradient(135deg, #001a0a 0%, #003018 50%, #001a0a 100%)',
    accent: '#34d399',
    images: [
      {
        src: 'IMG_6673_Original.jpg',
        caption: '"I\'m not a cat person" — Prasanth',
        rotate: 0,
      },
      {
        src: 'IMG_7336_Original.jpg',
        caption: 'The cats strongly disagree',
        rotate: 0,
      },
    ],
    heading: 'He said he wasn\'t a cat person.',
    text: 'The cats never got that memo. And watching him snuggle them on the sofa tells you everything you need to know about Prasanth: his heart has no limits. He gives himself fully to the things he loves.',
  },
  {
    id: 6,
    title: '54 & Fabulous',
    subtitle: 'Chapter VI',
    year: 'May 28th, 2026',
    bg: 'linear-gradient(135deg, #1c1000 0%, #2d1e00 50%, #1c1000 100%)',
    accent: '#ffd700',
    images: [
      {
        src: 'bed93ecb-d6aa-4251-a6c5-acf16d07fab4_Original.jpg',
        caption: 'Still her dad. Always her hero.',
        rotate: 0,
      },
      {
        src: 'IMG_3176_Original.jpg',
        caption: 'The joy never fades',
        rotate: -90,
      },
    ],
    heading: 'Look at him now.',
    text: '54 years of living, loving, and laughing. The grey in his beard? That\'s wisdom. The sparkle in his eyes? Unchanged. Prasanth, you\'re not just getting older — you\'re getting more legendary.',
  },
]
