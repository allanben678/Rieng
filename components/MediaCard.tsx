import Image from 'next/image';

export default function MediaCard({
  category = 'Updates',
  title = 'Untitled',
  link = '#',
  image = '/placeholder.jpg',
}: {
  category?: string
  title: string
  link?: string
  image?: string
}) {
  return (
    <a 
      href={link} 
      target="_blank" 
      rel="noopener noreferrer" 
      className="group relative bg-[#080808] border border-white/5 rounded-[2rem] overflow-hidden hover:border-primary/50 hover:shadow-[0_0_30px_rgba(255,107,53,0.15)] transition-all duration-300 flex flex-col h-[340px] cursor-pointer"
    >
      <div className="relative h-[220px] w-full overflow-hidden flex-shrink-0">
        <div className="absolute inset-0 bg-primary/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 mix-blend-overlay"></div>
        <Image 
          src={image} 
          alt={category} 
          fill 
          className="object-cover transition-transform duration-700 group-hover:scale-110" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/60 to-transparent z-10"></div>
        {/* Category Pill */}
        <div className="absolute top-5 left-5 bg-primary/80 backdrop-blur-sm border border-primary text-white text-[10px] font-black uppercase tracking-[0.2em] px-4 py-1.5 rounded-full shadow-[0_0_15px_rgba(255,107,53,0.5)] z-20">
          {category}
        </div>
      </div>
      <div className="p-6 md:p-8 pt-0 flex flex-col flex-1 transform transition-transform duration-300 group-hover:-translate-y-2 relative z-20 -mt-8">
        <h3 className="text-lg md:text-xl font-bold text-white group-hover:text-primary transition-colors leading-snug line-clamp-3">
          {title}
        </h3>
        <div className="mt-auto flex items-center text-primary font-black text-xs tracking-widest uppercase transition-transform group-hover:translate-x-2">
          {category.toLowerCase() === 'music' ? 'Listen' : 'Read Story'} <span className="ml-2 text-lg">→</span>
        </div>
      </div>
    </a>
  )
}
