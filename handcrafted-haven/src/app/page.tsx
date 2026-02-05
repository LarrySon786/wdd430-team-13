import './globals.css';
import Footer from '@/components/Footer';
import Image from 'next/image'

export default function Home() {
  return (
    <main>
      <div className="hero-container">
        {/* <img src='../public/hero.webp'></img> */}
        <Image src='/hero.webp' alt='Hero Image of webpage' fill priority className='hero-image' sizes="100vw" style={{ objectFit: 'cover'}} />
        <h1>{/* <span>Welcome To</span> */}HOME PAGE</h1>
        <div>
          <a href='/login'>Login Box</a>
        </div>
      </div>

      <div className='blank-text-area'>
        <h2>About Us</h2>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo quam quasi sint consectetur quis error qui temporibus esse,
          quaerat ipsa laudantium, molestiae ducimus ipsum consequatur aut neque. Eaque in voluptate sapiente aliquid asperiores voluptatum
          quaerat molestiae deserunt fugit inventore, consequatur ad saepe doloremque veniam a, dolor modi optio suscipit velit ut, mollitia
          aperiam eos praesentium voluptas! Asperiores nemo atque quidem distinctio rerum quae dolores laborum earum facere nostrum, accusantium
          saepe optio consequuntur adipisci? Vel necessitatibus sed illum! Dolore quia, saepe nostrum recusandae sit expedita voluptates, earum.</p>
      </div>
    </main>
  );
}
