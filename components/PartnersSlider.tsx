import Image from 'next/image';

const partners = [
  { 
    name: '22Bet', 
    src: 'https://dkmdvhzdixefykoojhgt.supabase.co/storage/v1/object/sign/Mp3/Sponsors/22Bet.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV81NTUxYTk2MC04YjVhLTRkNjEtOTJkMS1jMjVkNWNlY2IxMDMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJNcDMvU3BvbnNvcnMvMjJCZXQuanBnIiwiaWF0IjoxNzc4MzM5MDMxLCJleHAiOjE4MDk4NzUwMzF9.wZlUE9pgkWFexQMh8qeMpacN7zia4iQC-cU9V3R3EGE' 
  },
  { 
    name: 'Equity', 
    src: 'https://dkmdvhzdixefykoojhgt.supabase.co/storage/v1/object/sign/Mp3/Sponsors/Equity.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV81NTUxYTk2MC04YjVhLTRkNjEtOTJkMS1jMjVkNWNlY2IxMDMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJNcDMvU3BvbnNvcnMvRXF1aXR5LmpwZyIsImlhdCI6MTc3ODMzOTA1MSwiZXhwIjoxODA5ODc1MDUxfQ.rjv_kCzKna2bMuAtAYsiofhP09RJHU6xhXPm6VmK-QY' 
  },
  { 
    name: 'Quickmart', 
    src: 'https://dkmdvhzdixefykoojhgt.supabase.co/storage/v1/object/sign/Mp3/Sponsors/QuickMart.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV81NTUxYTk2MC04YjVhLTRkNjEtOTJkMS1jMjVkNWNlY2IxMDMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJNcDMvU3BvbnNvcnMvUXVpY2tNYXJ0LmpwZyIsImlhdCI6MTc3ODMzOTA2NiwiZXhwIjoxODA5ODc1MDY2fQ.CzkYA_R572DyKLyvbyovK80PSzvYZ2tjF_WIN-sN4iQ' 
  },
];

export default function PartnersSlider() {
  return (
    <section className="py-12 md:py-16 bg-[#030303] border-y border-white/5 flex flex-col items-center overflow-hidden">
       <div className="text-center mb-10 md:mb-12 px-4">
         <p className="text-xs font-bold tracking-[0.4em] text-primary uppercase mb-2">Streaming On &amp; Powered By</p>
         <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">
           Our <span className="text-primary italic">Partners</span>
         </h2>
       </div>
       
       <div className="relative w-full overflow-hidden">
         {/* Gradient Fades */}
         <div className="absolute inset-y-0 left-0 w-24 md:w-48 bg-gradient-to-r from-[#030303] to-transparent z-10 pointer-events-none"></div>
         <div className="absolute inset-y-0 right-0 w-24 md:w-48 bg-gradient-to-l from-[#030303] to-transparent z-10 pointer-events-none"></div>

         {/* Row 1 — scrolls left */}
         <div className="flex w-max marquee-left mb-6">
           {[...partners, ...partners, ...partners].map((partner, i) => (
             <div key={i} className="mx-6 partner-card bg-white/5 border border-white/10 rounded-2xl px-8 py-5 flex items-center justify-center transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,255,255,0.15)]"
               style={{ minWidth: '160px', height: '80px' }}>
               <div className="relative w-28 h-10">
                 <Image src={partner.src} alt={partner.name} fill className="object-contain" sizes="112px" />
               </div>
             </div>
           ))}
         </div>

         {/* Row 2 — scrolls right (reversed partners list) */}
         <div className="flex w-max marquee-right">
           {[...partners.slice().reverse(), ...partners.slice().reverse(), ...partners.slice().reverse()].map((partner, i) => (
             <div key={i} className="mx-6 partner-card bg-white/5 border border-white/10 rounded-2xl px-8 py-5 flex items-center justify-center transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,255,255,0.15)]"
               style={{ minWidth: '160px', height: '80px' }}>
               <div className="relative w-28 h-10">
                 <Image src={partner.src} alt={partner.name} fill className="object-contain" sizes="112px" />
               </div>
             </div>
           ))}
         </div>
       </div>
    </section>
  )
}
