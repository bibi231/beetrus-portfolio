"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { fadeInUp, ambientFade, staggerContainer } from "@/lib/animations";
import { toast } from "sonner";
import {
    CheckCircle,
    Send,
    Globe,
    Smartphone,
    ShoppingCart,
    Layout,
    Lock,
    BarChart3,
    Palette,
    Database,
    Zap,
    ArrowRight
} from "lucide-react";
import { MockupGallery } from "@/components/sections/MockupGallery";

const projectTypes = [
    { value: "landing", label: "Landing Page", icon: Layout },
    { value: "webapp", label: "Web Application", icon: Globe },
    { value: "portfolio", label: "Portfolio Site", icon: Palette },
    { value: "ecommerce", label: "E-Commerce", icon: ShoppingCart },
    { value: "mobile", label: "Mobile App", icon: Smartphone },
    { value: "other", label: "Other / Custom", icon: Zap },
];

const features = [
    { id: "responsive", label: "Responsive Design", icon: Smartphone },
    { id: "cms", label: "CMS / Admin Panel", icon: Database },
    { id: "auth", label: "User Authentication", icon: Lock },
    { id: "payments", label: "Payment Integration", icon: ShoppingCart },
    { id: "analytics", label: "Analytics Dashboard", icon: BarChart3 },
    { id: "seo", label: "SEO Optimization", icon: Globe },
];

const budgetRanges = [
    { value: "", label: "SELECT_BUDGET_RANGE" },
    { value: "under-500", label: "Under $500" },
    { value: "500-1000", label: "$500 - $1,000" },
    { value: "1000-3000", label: "$1,000 - $3,000" },
    { value: "3000-5000", label: "$3,000 - $5,000" },
    { value: "5000-plus", label: "$5,000+" },
    { value: "discuss", label: "Let's Discuss" },
];

export default function RequestPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        projectType: "",
        budget: "",
        description: "",
        referenceUrls: "",
        features: [] as string[],
        selectedStyle: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const response = await fetch("/api/leads", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error("FAILED_TO_SUBMIT_REQUEST");
            }

            setIsSubmitted(true);
            toast.success(`Request submitted for ${formData.selectedStyle || 'custom'} architecture! I'll review your project and get back to you within 24 hours.`);
        } catch (error) {
            console.error(error);
            toast.error("COMMUNICATION_ERROR: PLEASE_TRY_AGAIN_LATER");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const toggleFeature = (featureId: string) => {
        setFormData((prev) => ({
            ...prev,
            features: prev.features.includes(featureId)
                ? prev.features.filter((f) => f !== featureId)
                : [...prev.features, featureId],
        }));
    };

    return (
        <div className="relative min-h-screen">
            {/* Hero */}
            <section className="relative min-h-[60vh] flex flex-col justify-center pt-[var(--page-top-padding)]">
                {/* Animated background */}
                <div className="pointer-events-none absolute inset-0">
                    <div className="absolute top-1/3 left-1/4 h-[500px] w-[500px] bg-neon-red/8 rounded-full blur-[150px] animate-pulse" />
                    <div className="absolute bottom-1/4 right-1/4 h-[300px] w-[300px] bg-neon-red/5 rounded-full blur-[100px]" />
                </div>

                <div className="container-custom relative z-10">
                    <motion.div
                        className="max-w-3xl"
                        variants={staggerContainer}
                        initial="hidden"
                        animate="visible"
                    >
                        <motion.div className="flex items-center gap-3 mb-6" variants={fadeInUp}>
                            <Zap size={16} className="text-neon-red" />
                            <span className="text-xs font-mono font-bold uppercase tracking-[0.5em] text-neon-red animate-pulse">
                                REQUEST.BUILD()
                            </span>
                        </motion.div>
                        <motion.h1
                            className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tighter mb-6"
                            variants={fadeInUp}
                        >
                            Let&apos;s Build <br />
                            <span className="gradient-text">Your Vision</span>
                        </motion.h1>
                        <motion.p
                            className="text-lg text-foreground-muted max-w-xl leading-relaxed"
                            variants={ambientFade}
                        >
                            From concept to deployment — describe your project and I&apos;ll architect a solution that stands out. Premium quality, modern stack, delivered fast.
                        </motion.p>
                    </motion.div>
                </div>
            </section>

            {/* Form Section */}
            <section className="py-16 md:py-24">
                <div className="container-custom">
                    <div className="mx-auto max-w-5xl">
                        <AnimatePresence mode="wait">
                            {isSubmitted ? (
                                <motion.div
                                    key="success"
                                    className="flex flex-col items-center py-24 text-center rounded-3xl border border-neon-red/20 bg-black/60 p-12"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                >
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ type: "spring", delay: 0.2 }}
                                    >
                                        <CheckCircle className="h-20 w-20 text-neon-red mb-6" />
                                    </motion.div>
                                    <h2 className="text-3xl font-black mb-4">Request Received!</h2>
                                    <p className="text-foreground-muted max-w-md mb-8 leading-relaxed">
                                        Your project brief has been submitted. I&apos;ll review the details and reach out within 24 hours to discuss next steps.
                                    </p>
                                    <Button
                                        variant="outline"
                                        className="mt-4"
                                        onClick={() => {
                                            setIsSubmitted(false);
                                            setFormData({
                                                name: "", email: "", projectType: "", budget: "",
                                                description: "", referenceUrls: "", features: [],
                                                selectedStyle: "",
                                            });
                                        }}
                                    >
                                        Submit Another Request
                                    </Button>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="form-container"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    className="space-y-24"
                                >
                                    {/* Architectural Selection */}
                                    <MockupGallery
                                        selectedStyle={formData.selectedStyle}
                                        onSelect={(id) => setFormData(prev => ({ ...prev, selectedStyle: id }))}
                                    />

                                    <form onSubmit={handleSubmit} className="space-y-12">
                                        {/* Section 1: Contact */}
                                        <div className="rounded-2xl border border-white/5 bg-black/60 p-6 md:p-10 shadow-2xl relative overflow-hidden group">
                                            <div className="absolute top-0 right-0 h-24 w-px bg-gradient-to-b from-neon-red/50 to-transparent" />
                                            <div className="absolute top-0 right-0 w-24 h-px bg-gradient-to-l from-neon-red/50 to-transparent" />

                                            <h2 className="text-xl font-bold font-mono uppercase tracking-widest text-neon-red mb-8">
                                                01 // Contact_Info
                                            </h2>

                                            <div className="grid gap-6 sm:grid-cols-2">
                                                <div className="space-y-3">
                                                    <label htmlFor="name" className="text-[10px] font-mono uppercase tracking-[0.3em] text-foreground-muted pl-1">
                                                        Your_Name
                                                    </label>
                                                    <input
                                                        type="text" id="name" name="name"
                                                        value={formData.name} onChange={handleChange} required
                                                        className="h-14 w-full rounded-lg border border-white/5 bg-black/60 px-5 text-foreground placeholder:text-foreground-muted/30 focus:border-neon-red/50 focus:outline-none focus:ring-1 focus:ring-neon-red/20 transition-all font-mono text-sm"
                                                        placeholder="ENTER_NAME"
                                                    />
                                                </div>
                                                <div className="space-y-3">
                                                    <label htmlFor="email" className="text-[10px] font-mono uppercase tracking-[0.3em] text-foreground-muted pl-1">
                                                        Email_Address
                                                    </label>
                                                    <input
                                                        type="email" id="email" name="email"
                                                        value={formData.email} onChange={handleChange} required
                                                        className="h-14 w-full rounded-lg border border-white/5 bg-black/60 px-5 text-foreground placeholder:text-foreground-muted/30 focus:border-neon-red/50 focus:outline-none focus:ring-1 focus:ring-neon-red/20 transition-all font-mono text-sm"
                                                        placeholder="YOUR@EMAIL.COM"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Section 2: Project Type */}
                                        <div className="rounded-2xl border border-white/5 bg-black/60 p-6 md:p-10 shadow-2xl relative overflow-hidden">
                                            <div className="absolute bottom-0 left-0 w-24 h-px bg-gradient-to-r from-neon-red/50 to-transparent" />

                                            <h2 className="text-xl font-bold font-mono uppercase tracking-widest text-neon-red mb-8">
                                                02 // Project_Type
                                            </h2>

                                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                                {projectTypes.map((type) => (
                                                    <motion.button
                                                        key={type.value}
                                                        type="button"
                                                        onClick={() => setFormData(prev => ({ ...prev, projectType: type.value }))}
                                                        className={`relative flex flex-col items-center gap-3 rounded-xl p-4 md:p-6 border transition-all text-center ${formData.projectType === type.value
                                                            ? "border-neon-red/50 bg-neon-red/10 text-white shadow-[0_0_20px_-5px_rgba(255,45,45,0.3)]"
                                                            : "border-white/5 bg-white/[0.02] text-foreground-muted hover:border-white/20 hover:bg-white/[0.04]"
                                                            }`}
                                                        whileTap={{ scale: 0.97 }}
                                                    >
                                                        <type.icon size={24} className={formData.projectType === type.value ? "text-neon-red" : ""} />
                                                        <span className="text-[10px] md:text-xs font-mono uppercase tracking-widest font-bold">{type.label}</span>
                                                    </motion.button>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Section 3: Features */}
                                        <div className="rounded-2xl border border-white/5 bg-black/60 p-6 md:p-10 shadow-2xl relative overflow-hidden">
                                            <h2 className="text-xl font-bold font-mono uppercase tracking-widest text-neon-red mb-2">
                                                03 // Feature_Set
                                            </h2>
                                            <p className="text-foreground-muted text-sm mb-8">Select all features you need</p>

                                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                                {features.map((feature) => (
                                                    <motion.button
                                                        key={feature.id}
                                                        type="button"
                                                        onClick={() => toggleFeature(feature.id)}
                                                        className={`flex items-center gap-3 rounded-xl p-3 md:p-4 border transition-all ${formData.features.includes(feature.id)
                                                            ? "border-neon-red/50 bg-neon-red/10 text-white"
                                                            : "border-white/5 bg-white/[0.02] text-foreground-muted hover:border-white/20"
                                                            }`}
                                                        whileTap={{ scale: 0.97 }}
                                                    >
                                                        <feature.icon size={16} className={formData.features.includes(feature.id) ? "text-neon-red" : ""} />
                                                        <span className="text-[10px] md:text-xs font-mono uppercase tracking-wider font-bold">{feature.label}</span>
                                                    </motion.button>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Section 4: Details */}
                                        <div className="rounded-2xl border border-white/5 bg-black/60 p-6 md:p-10 shadow-2xl relative overflow-hidden group">
                                            <div className="absolute inset-0 bg-gradient-to-br from-neon-red/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                                            <h2 className="text-xl font-bold font-mono uppercase tracking-widest text-neon-red mb-8 relative z-10">
                                                04 // Project_Details
                                            </h2>

                                            <div className="space-y-6 relative z-10">
                                                <div className="space-y-3">
                                                    <label htmlFor="budget" className="text-[10px] font-mono uppercase tracking-[0.3em] text-foreground-muted pl-1">
                                                        Budget_Range
                                                    </label>
                                                    <select
                                                        id="budget" name="budget"
                                                        value={formData.budget} onChange={handleChange}
                                                        className="h-14 w-full rounded-lg border border-white/5 bg-black/60 px-5 text-foreground focus:border-neon-red/50 focus:outline-none focus:ring-1 focus:ring-neon-red/20 transition-all font-mono text-sm appearance-none"
                                                    >
                                                        {budgetRanges.map((range) => (
                                                            <option key={range.value} value={range.value} className="bg-black" disabled={range.value === ""}>
                                                                {range.label}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>

                                                <div className="space-y-3">
                                                    <label htmlFor="description" className="text-[10px] font-mono uppercase tracking-[0.3em] text-foreground-muted pl-1">
                                                        Project_Description
                                                    </label>
                                                    <textarea
                                                        id="description" name="description"
                                                        value={formData.description} onChange={handleChange} required
                                                        rows={5}
                                                        className="w-full rounded-lg border border-white/5 bg-black/60 px-5 py-4 text-foreground placeholder:text-foreground-muted/30 focus:border-neon-red/50 focus:outline-none focus:ring-1 focus:ring-neon-red/20 transition-all font-mono text-sm resize-none"
                                                        placeholder="DESCRIBE_YOUR_PROJECT..."
                                                    />
                                                </div>

                                                <div className="space-y-3">
                                                    <label htmlFor="referenceUrls" className="text-[10px] font-mono uppercase tracking-[0.3em] text-foreground-muted pl-1">
                                                        Reference_URLs [optional]
                                                    </label>
                                                    <input
                                                        type="text" id="referenceUrls" name="referenceUrls"
                                                        value={formData.referenceUrls} onChange={handleChange}
                                                        className="h-14 w-full rounded-lg border border-white/5 bg-black/60 px-5 text-foreground placeholder:text-foreground-muted/30 focus:border-neon-red/50 focus:outline-none focus:ring-1 focus:ring-neon-red/20 transition-all font-mono text-sm"
                                                        placeholder="HTTPS://INSPIRATION-SITE.COM"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Submit */}
                                        <Button
                                            type="submit"
                                            size="lg"
                                            className="w-full h-16 bg-black border border-neon-red/50 text-white shadow-[0_0_20px_-10px_rgba(255,45,45,0.4)] hover:bg-neon-red hover:shadow-[0_0_30px_rgba(255,45,45,0.3)] transition-all duration-500 font-bold uppercase tracking-widest"
                                            isLoading={isSubmitting}
                                            rightIcon={<Send size={20} />}
                                        >
                                            Submit_Architecture_Request
                                        </Button>
                                    </form>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </section>
        </div>
    );
}
