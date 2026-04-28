export default function ReviewCard({
  albumTitle,
  artist,
  rating,
}: {
  albumTitle: string
  artist: string
  rating: string
}) {
  return (
    <div className="group bg-[#080808] border border-white/5 rounded-[2rem] overflow-hidden hover:border-primary/50 hover:shadow-[0_0_30px_rgba(255,107,53,0.15)] transition-all duration-300 cursor-pointer flex flex-col p-8 md:p-10 justify-between min-h-[220px]">
      <div className="relative z-20 w-full mb-8">
        <h3 className="text-2xl md:text-3xl font-black text-white mb-2 uppercase tracking-tight group-hover:text-primary transition-colors line-clamp-2">{albumTitle}</h3>
        <p className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em]">{artist}</p>
      </div>

      <div className="flex items-center justify-end mt-auto">
        {/* Rating Badge */}
        <div className="bg-white/5 border border-white/10 px-3 py-1.5 rounded-full z-20 flex items-center gap-1.5 shadow-lg shadow-black/50 flex-shrink-0">
          <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 24 24"><path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z"/></svg>
          <span className="text-white font-black text-xs">{rating}<span className="text-gray-500">/5</span></span>
        </div>
      </div>
    </div>
  )
}
