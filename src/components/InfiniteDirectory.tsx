import { useState } from 'react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { ChevronRight } from 'lucide-react';

const easing = 'cubic-bezier(0.4, 0, 0.2, 1)';

const specs = [
    {
        id: 'electrodes',
        label: 'Electrode Array',
        index: '01',
        detail: '256 dry-contact EEG electrodes with active shielding. Gold-plated titanium contacts with <5kΩ impedance. Custom radial layout optimized for 10-20 system coverage with 4× density in motor and frontal cortex regions.',
        stat: '256ch / 24-bit',
    },
    {
        id: 'amplifier',
        label: 'Signal Amplifier',
        index: '02',
        detail: 'Multi-stage instrumentation amplifier with 120dB CMRR. Programmable gain from 1× to 12,000×. On-chip digital filtering with 0.1–500Hz bandpass and 50/60Hz adaptive notch rejection.',
        stat: 'SNR 94dB',
    },
    {
        id: 'processor',
        label: 'Neural Processor',
        index: '03',
        detail: 'Custom RISC-V SoC with dedicated DSP cores for real-time FFT, wavelet decomposition, and spike sorting. 512KB on-chip SRAM for zero-latency buffer management. 180nm low-power process node.',
        stat: '0.02ms inference',
    },
    {
        id: 'wireless',
        label: 'Wireless Module',
        index: '04',
        detail: 'Dual-band 2.4GHz / 5GHz radio with adaptive frequency hopping. AES-256 hardware encryption. Sustained throughput of 4Mbps with <1ms jitter. BLE 5.3 for low-power configuration channel.',
        stat: 'Zero packet loss',
    },
    {
        id: 'battery',
        label: 'Power System',
        index: '05',
        detail: 'Medical-grade 3.7V / 2000mAh Li-polymer cell with TI BQ25895 charge management. Wireless Qi charging pad included. Real-time power telemetry with 0.1% state-of-charge accuracy.',
        stat: '48hr runtime',
    },
    {
        id: 'housing',
        label: 'Biocompatible Housing',
        index: '06',
        detail: 'CNC-machined titanium frame with laser-sintered nylon headband. ISO 10993-compliant skin-contact surfaces. IP54 ingress protection. Total system weight: 287g with balanced center of gravity.',
        stat: '287g total',
    },
];

const InfiniteDirectory = () => {
    const [expanded, setExpanded] = useState<string | null>(null);
    const { ref: headerRef, isVisible: headerVis } = useScrollReveal(0.2);

    const toggle = (id: string) => {
        setExpanded((prev) => (prev === id ? null : id));
    };

    return (
        <section id="specifications" className="bg-background px-6 py-28 sm:py-32 transition-colors duration-300">
            <div className="mx-auto max-w-4xl">
                {/* Section header */}
                <div
                    ref={headerRef}
                    className="mb-16"
                    style={{
                        opacity: headerVis ? 1 : 0,
                        transform: headerVis ? 'translateY(0)' : 'translateY(16px)',
                        transition: `all 700ms ${easing}`,
                    }}
                >
                    <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                        Deep Tech
                    </p>
                    <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground leading-tight">
                        Anatomy of Precision
                    </h2>
                    <p className="mt-4 max-w-lg text-base leading-relaxed text-muted-foreground">
                        Every subsystem engineered to clinical-grade tolerances. Select to inspect hardware specifications.
                    </p>
                </div>

                {/* Directory rows */}
                <div className="border-b border-border/60">
                    {specs.map((spec, i) => (
                        <DirectoryRow
                            key={spec.id}
                            spec={spec}
                            index={i}
                            expanded={expanded === spec.id}
                            onToggle={() => toggle(spec.id)}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

const DirectoryRow = ({
    spec,
    index,
    expanded,
    onToggle,
}: {
    spec: (typeof specs)[number];
    index: number;
    expanded: boolean;
    onToggle: () => void;
}) => {
    const { ref, isVisible } = useScrollReveal(0.1);

    return (
        <div
            ref={ref}
            className="border-t border-border/60"
            style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(8px)',
                transition: `all 600ms ${easing}`,
                transitionDelay: `${index * 60}ms`,
            }}
        >
            <button
                onClick={onToggle}
                className="group flex w-full items-center justify-between py-6 text-left transition-colors duration-300"
            >
                <div className="flex items-center gap-6">
                    <span className="text-xs font-mono tabular-nums text-muted-foreground" style={{ minWidth: '20px' }}>
                        {spec.index}
                    </span>
                    <span className="text-base sm:text-lg font-medium text-foreground transition-opacity duration-300 group-hover:text-primary">
                        {spec.label}
                    </span>
                </div>
                <div className="flex items-center gap-4">
                    <span className="hidden text-xs font-mono tabular-nums text-muted-foreground sm:inline">
                        {spec.stat}
                    </span>
                    <ChevronRight
                        size={16}
                        strokeWidth={1.5}
                        className="text-muted-foreground transition-transform duration-300"
                        style={{
                            transform: expanded ? 'rotate(90deg)' : 'rotate(0deg)',
                            transitionTimingFunction: easing,
                        }}
                    />
                </div>
            </button>

            {/* Expandable detail */}
            <div
                className="overflow-hidden transition-all duration-500"
                style={{
                    maxHeight: expanded ? '200px' : '0',
                    opacity: expanded ? 1 : 0,
                    transitionTimingFunction: easing,
                }}
            >
                <div className="pb-8 pl-[44px]">
                    <p className="max-w-xl text-sm leading-relaxed text-muted-foreground">
                        {spec.detail}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default InfiniteDirectory;
