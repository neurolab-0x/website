import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import partnerData from '@/content/partners/data.json';

type Partner = { name: string; domain?: string; icon?: string; logo?: string };

const PartnerLogo = ({ partner }: { partner: Partner }) => {
    return (
        <div className="flex items-center gap-3 text-muted-foreground transition-all duration-300 hover:text-foreground">
            {partner.logo ? (
                <img
                    src={partner.logo}
                    alt={`${partner.name} logo`}
                    className="h-7 w-auto object-contain rounded-sm filter dark:invert dark:brightness-200 transition-opacity opacity-75 hover:opacity-100"
                />
            ) : (
                <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-border/60 bg-secondary/60 text-xs font-semibold text-foreground/80">
                    {partner.name.slice(0, 2).toUpperCase()}
                </div>
            )}
            <span className="text-base sm:text-lg font-medium tracking-tight whitespace-nowrap">{partner.name}</span>
        </div>
    );
};

const PartnersSection = () => {    const [partners, setPartners] = useState<Partner[]>([]);

    const partners: Partner[] = partnerData.partners || [];

    if (partners.length === 0) return null;

    return (
        <section className="border-t border-border/50 bg-background py-20 sm:py-24">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl text-center">
                    <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-500">
                        Trusted by pioneering institutions worldwide
                    </h2>
                    <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                        Our Partners
                    </p>
                </div>

                <div className="mx-auto mt-12 max-w-6xl relative overflow-hidden flex" style={{ maskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)' }}>
                    <motion.div
                        className="flex flex-none gap-16 pr-16"
                        animate={{ x: '-100%' }}
                        transition={{
                            duration: 35,
                            repeat: Infinity,
                            ease: 'linear',
                        }}
                    >
                        {[...partners, ...partners].map((partner, index) => (
                            <PartnerLogo key={`${partner.name}-${index}`} partner={partner} />
                        ))}
                    </motion.div>
                    {/* Duplicate for seamless infinite scroll */}
                    <motion.div
                        className="flex flex-none gap-16 pr-16"
                        animate={{ x: '-100%' }}
                        transition={{
                            duration: 50,
                            repeat: Infinity,
                            ease: 'linear',
                        }}
                    >
                        {[...partners, ...partners].map((partner, index) => (
                            <PartnerLogo key={`second-${partner.name}-${index}`} partner={partner} />
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default PartnersSection;
