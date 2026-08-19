'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronUp, Sparkles, X } from 'lucide-react'

// Generăm cele 12 elemente. Pentru indexul 9 (care e lucrare_10) setăm tipul ca 'video', restul 'image'
const EXTRA_ITEMS = Array.from({ length: 12 }, (_, i) => {
  const numar = i + 1
  const esteVideo = numar === 10
  return {
    id: numar,
    type: esteVideo ? 'video' : 'image',
    src: esteVideo ? `/lucrari_stefan/lucrare_10.jpeg` : `/lucrari_stefan/lucrare_${numar}.jpeg`,
    title: esteVideo ? 'Video Special Old Forge' : `Lucrare Old Forge ${numar}`,
  }
})

export function VideoGallerySection() {
  const [showMore, setShowMore] = useState(false)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  return (
    <section className="mx-auto max-w-6xl px-5 py-2">
      {/* Partea cu cele 3 Video-uri principale */}
      <div className="mb-6">
        <div className="text-center md:text-left mb-4">
          <span className="text-xs font-semibold uppercase tracking-widest text-primary bg-primary/10 px-3 py-1 rounded-full border border-primary/20">
            În Acțiune
          </span>
          <h3 className="mt-2 font-serif text-3xl font-bold text-foreground">
             Vezi cum lucrează Ștefan
          </h3>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="relative aspect-video rounded-2xl overflow-hidden border border-border/80 bg-card/50 shadow-lg group"
          >
            <video src="/tuns-aranjat-barba.mp4" controls preload="metadata" className="w-full h-full object-cover" />
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative aspect-video rounded-2xl overflow-hidden border border-border/80 bg-card/50 shadow-lg group"
          >
            <video src="/low-fade.mp4" controls preload="metadata" className="w-full h-full object-cover" />
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative aspect-video rounded-2xl overflow-hidden border border-border/80 bg-card/50 shadow-lg group"
          >
            <video src="/levi-balan.mp4" controls preload="metadata" className="w-full h-full object-cover" />
          </motion.div>
        </div>
      </div>

      {/* Butonul de View More / Close */}
      <div className="flex justify-center">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowMore(!showMore)}
          className="flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-6 py-2.5 font-serif text-sm font-semibold text-primary transition-colors hover:bg-primary/25 cursor-pointer"
        >
          {showMore ? (
            <>
              <span>Ascunde galeria</span>
              <ChevronUp className="h-4 w-4" />
            </>
          ) : (
            <>
              <span>View More (Portofoliu Lucrări)</span>
              <Sparkles className="h-4 w-4" />
            </>
          )}
        </motion.button>
      </div>

      {/* Secțiunea expandabilă cu cele 12 elemente */}
      <AnimatePresence>
        {showMore && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="overflow-hidden"
          >
            <div className="mt-6 pt-4 border-t border-border/60">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-serif text-2xl font-bold text-foreground">Galerie Lucrări</h4>
                <button 
                  onClick={() => setShowMore(false)}
                  className="flex items-center gap-1 text-xs uppercase tracking-wider text-muted-foreground hover:text-primary transition-colors cursor-pointer"
                >
                  <X className="h-4 w-4" /> Close
                </button>
              </div>

              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {EXTRA_ITEMS.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 40, scale: 0.95 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: false, margin: "-30px" }}
                    transition={{ duration: 0.5, delay: (index % 4) * 0.08 }}
                    whileHover={{ scale: 1.03 }}
                    onClick={() => {
                      if (item.type === 'image') {
                        setSelectedImage(item.src)
                      }
                    }}
                    className="group relative h-60 overflow-hidden rounded-2xl border border-border/80 bg-card shadow-md cursor-pointer"
                  >
                    {item.type === 'video' ? (
                      <div className="relative w-full h-full">
                        <video 
                          src="/lucrari_stefan/lucrare_10.mp4" 
                          controls 
                          className="h-full w-full object-cover"
                        />
                      </div>
                    ) : (
                      <img 
                        src={item.src} 
                        alt={item.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" 
                      />
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal / Popup pentru poza mărită atunci când apeși pe ea */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md cursor-pointer"
          >
            <div className="relative max-w-4xl max-h-[90vh] overflow-hidden rounded-2xl">
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 z-10 rounded-full bg-black/60 p-2 text-white hover:bg-black transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
              <img
                src={selectedImage}
                alt="Lucrare mărită Old Forge"
                className="max-h-[85vh] w-auto object-contain rounded-xl shadow-2xl"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}