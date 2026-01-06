
import { Product } from './types';

export const SHOP_NAME = "TechNova საქართველო";

export const PRODUCTS: Product[] = [
  {
    id: 'x98q-tv-box',
    name: 'X98Q Smart Android TV Box',
    model: 'X98Q',
    price: 59.99,
    description: 'აღმოაჩინეთ 4K სტრიმინგის ახალი შესაძლებლობები X98Q-სთან ერთად. Android 11 სისტემა უზრუნველყოფს სწრაფ და სტაბილურ მუშაობას. იდეალურია სახლის კინოთეატრისთვის და თამაშებისთვის.',
    specs: {
      type: 'TV Box',
      system: 'Android 11.0',
      cpu: 'Amlogic S905 W2',
      core: 'Quad Core ARM Cortex A53',
      gpu: 'Mali G31 MP2',
      ram: '2GB DDR3',
      rom: '16GB'
    },
    images: [
      'https://images.unsplash.com/photo-1544244015-0cd4b3ff569d?q=80&w=1000&auto=format&fit=crop', // Better placeholder for TV box feel
      'https://picsum.photos/id/2/800/600',
      'https://picsum.photos/id/3/800/600',
      'https://picsum.photos/id/4/800/600'
    ],
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
  }
];

export const DELIVERY_INFO = {
  time: '24-48 საათი',
  cost: 'უფასო 100$-ზე მეტ შენაძენზე',
  standardCost: '5.00$'
};
