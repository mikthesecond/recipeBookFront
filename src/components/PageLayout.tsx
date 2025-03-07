import  { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Leaf, Facebook, Instagram, Twitter } from 'lucide-react';

interface PageLayoutProps {
  title: string;
  children: ReactNode;
}

export function PageLayout({ title, children }: PageLayoutProps) {
  return (
    <div className="min-h-screen bg-[#e5e4db]">
      <header className="bg-[#f5f4f0] py-6 border-b border-[#4a5240]/20">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2 text-[#4a5240]">
            <ArrowLeft size={20} />
            <span>Back to Home</span>
          </Link>
          <Link to="/" className="flex items-center space-x-2">
            <div className="border border-[#4a5240] rounded-b-full w-10 h-10 flex items-center justify-center">
              <Leaf className="h-5 w-5 text-[#4a5240]" />
            </div>
            <span className="text-xl font-light text-[#4a5240] tracking-wider">THE LEAFY KITCHEN</span>
          </Link>
          <div className="flex space-x-4">
            <a href="#" className="text-[#4a5240] hover:text-[#6b7561] transition-colors">
              <Facebook size={20} />
            </a>
            <a href="#" className="text-[#4a5240] hover:text-[#6b7561] transition-colors">
              <Instagram size={20} />
            </a>
            <a href="#" className="text-[#4a5240] hover:text-[#6b7561] transition-colors">
              <Twitter size={20} />
            </a>
          </div>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-3xl md:text-4xl font-light text-[#4a5240] text-center mb-12">{title}</h1>
        {children}
      </main>
      
      <footer className="bg-[#4a5240] text-[#e5e4db] py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <div className="flex items-center justify-center md:justify-start space-x-2 mb-4">
                <div className="border border-[#e5e4db] rounded-b-full w-10 h-10 flex items-center justify-center">
                  <Leaf className="h-5 w-5 text-[#e5e4db]" />
                </div>
                <span className="text-xl font-light tracking-wider">THE LEAFY KITCHEN</span>
              </div>
              <p className="text-sm text-center md:text-left">
                123 Green Street, Portland, OR 97204<br />
                (503) 555-1234 • hello@leafykitchen.com
              </p>
            </div>
            
            <div className="flex flex-col items-center md:items-end">
              <div className="flex space-x-4 mb-4">
                <a href="#" className="text-[#e5e4db] hover:text-[#c1c0b9] transition-colors">
                  <Facebook size={20} />
                </a>
                <a href="#" className="text-[#e5e4db] hover:text-[#c1c0b9] transition-colors">
                  <Instagram size={20} />
                </a>
                <a href="#" className="text-[#e5e4db] hover:text-[#c1c0b9] transition-colors">
                  <Twitter size={20} />
                </a>
              </div>
              <p className="text-sm">
                Open Tuesday-Sunday, 11am-9pm
              </p>
            </div>
          </div>
          
          <div className="mt-8 pt-6 border-t border-[#e5e4db]/20 text-center text-sm">
            <p>© {new Date().getFullYear()} The Leafy Kitchen. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}