"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { storeProducts } from "@/data/store";
import { X, ArrowRight, Bell } from "lucide-react";
import { toast } from "sonner";

type Currency = 'NGN' | 'USD';

export default function StorePage() {
  const [currency, setCurrency] = useState<Currency>('NGN');
  const [selectedProduct, setSelectedProduct] = useState<typeof storeProducts[0] | null>(null);
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formatPrice = (price: { ngn: number, usd: number }) => {
    if (currency === 'NGN') {
      return new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', minimumFractionDigits: 0 }).format(price.ngn);
    }
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(price.usd);
  };

  const handleWaitlist = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !selectedProduct) return;
    
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/store-waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, productId: selectedProduct.id, productName: selectedProduct.name })
      });
      
      if (res.ok) {
        toast.success("You're on the list. We'll notify you when it's back.");
        setEmail("");
        setSelectedProduct(null);
      } else {
        toast.error("Failed to join waitlist. Try again later.");
      }
    } catch (err) {
      toast.error("Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-ink">
      {/* Header */}
      <section className="pt-12 pb-16 border-b border-wire bg-surface/30">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-8">
            <div>
              <h1 className="font-display text-5xl md:text-7xl font-bold tracking-tight mb-4">
                Store<span className="text-pulse">.</span>
              </h1>
              <p className="text-text-2 font-mono max-w-xl">
                Official merchandise, digital assets, and consulting services.
              </p>
            </div>
            
            {/* Currency Toggle */}
            <div className="flex items-center bg-surface border border-wire rounded-full p-1 shadow-inner">
              <button
                onClick={() => setCurrency('NGN')}
                className={`px-4 py-1.5 rounded-full font-mono text-xs transition-colors ${currency === 'NGN' ? 'bg-pulse text-ink font-bold' : 'text-text-2 hover:text-text-1'}`}
              >
                ₦ NGN
              </button>
              <button
                onClick={() => setCurrency('USD')}
                className={`px-4 py-1.5 rounded-full font-mono text-xs transition-colors ${currency === 'USD' ? 'bg-pulse text-ink font-bold' : 'text-text-2 hover:text-text-1'}`}
              >
                $ USD
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {storeProducts.map((product) => (
              <div 
                key={product.id} 
                className="card-premium group cursor-pointer flex flex-col"
                onClick={() => setSelectedProduct(product)}
              >
                {/* Image Placeholder */}
                <div className="aspect-square bg-surface border-b border-wire flex items-center justify-center text-7xl relative overflow-hidden group-hover:bg-ink transition-colors">
                  <div className="absolute top-4 right-4 z-10">
                    <span className={`font-mono text-[10px] px-2 py-1 rounded-sm uppercase tracking-widest ${product.inStock ? 'bg-lime text-ink' : 'bg-surface border border-wire text-text-2'}`}>
                      {product.tag}
                    </span>
                  </div>
                  <motion.div whileHover={{ scale: 1.1 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}>
                    {product.coverEmoji}
                  </motion.div>
                </div>
                
                {/* Details */}
                <div className="p-6 flex flex-col flex-1">
                  <p className="font-mono text-[10px] uppercase tracking-widest text-text-3 mb-2">{product.category}</p>
                  <h3 className="font-display text-xl font-bold text-text-1 mb-2">{product.name}</h3>
                  <div className="mt-auto pt-4 flex items-center justify-between">
                    <span className="font-mono text-pulse font-bold">{formatPrice(product.price)}</span>
                    <span className="text-text-2 group-hover:text-pulse transition-colors">
                      <ArrowRight size={18} />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-modal bg-ink/80 backdrop-blur-sm flex justify-center items-center p-4 md:p-6"
            onClick={() => setSelectedProduct(null)}
          >
            <motion.div 
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              className="bg-surface border border-wire rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex justify-between items-center p-4 md:p-6 border-b border-wire">
                <h3 className="font-mono text-sm tracking-widest uppercase text-text-2">{selectedProduct.category}</h3>
                <button 
                  onClick={() => setSelectedProduct(null)}
                  className="text-text-2 hover:text-text-1 transition-colors p-2 rounded-full hover:bg-ink"
                >
                  <X size={20} />
                </button>
              </div>
              
              <div className="flex flex-col md:flex-row">
                <div className="w-full md:w-2/5 aspect-square bg-ink flex items-center justify-center text-8xl md:border-r border-b md:border-b-0 border-wire">
                  {selectedProduct.coverEmoji}
                </div>
                
                <div className="w-full md:w-3/5 p-6 md:p-8 flex flex-col">
                  <h2 className="font-display text-3xl font-bold mb-2">{selectedProduct.name}</h2>
                  <p className="font-mono text-xl text-pulse mb-6">{formatPrice(selectedProduct.price)}</p>
                  
                  <p className="text-text-2 text-sm leading-relaxed mb-8">{selectedProduct.description}</p>
                  
                  {selectedProduct.sizes && (
                    <div className="mb-6">
                      <p className="font-mono text-xs uppercase text-text-3 mb-2">Sizes</p>
                      <div className="flex flex-wrap gap-2">
                        {selectedProduct.sizes.map(s => (
                          <span key={s} className="px-3 py-1 bg-ink border border-wire rounded font-mono text-xs text-text-2">{s}</span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="mt-auto pt-6 border-t border-wire">
                    {selectedProduct.inStock ? (
                      <a 
                        href={selectedProduct.paymentLink !== '#' ? selectedProduct.paymentLink : undefined}
                        onClick={(e) => {
                          if (selectedProduct.paymentLink === '#') {
                            e.preventDefault();
                            toast("Payment integration loading...");
                          }
                        }}
                        className="w-full btn-glow text-center block"
                      >
                        Purchase Now
                      </a>
                    ) : (
                      <form onSubmit={handleWaitlist} className="flex flex-col gap-3">
                        <p className="text-xs font-mono text-text-3 uppercase tracking-widest mb-2 flex items-center gap-2">
                          <Bell size={12} /> Join the waitlist
                        </p>
                        <div className="flex gap-2">
                          <input 
                            type="email" 
                            required
                            placeholder="your@email.com" 
                            className="flex-1 bg-ink border border-wire rounded-md px-4 py-2 font-mono text-sm focus:outline-none focus:border-pulse text-text-1"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                          />
                          <button 
                            type="submit" 
                            disabled={isSubmitting}
                            className="btn-glow shrink-0 px-6"
                          >
                            {isSubmitting ? "..." : "Notify Me"}
                          </button>
                        </div>
                      </form>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
