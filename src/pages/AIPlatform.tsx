import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HeroHalo from '@/components/HeroHalo';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { Brain, Activity, Zap, Database } from 'lucide-react';

const stats = [
    { icon: Activity, value: '2,847', label: 'Active Sessions', delta: '+12.3%' },
    { icon: Zap, value: '1.2M', label: 'Processed Signals', delta: '+8.7%' },
    { icon: Database, value: '14ms', label: 'Avg Latency', delta: '-2.1ms' },
];

// Directive D: Keys match GET /api/analysis/user Postman response schema.
// When switching to live data, only the data source changes — not the component logic.
interface EegMetric {
    channel_id: string;
    frequency_hz: number;
    amplitude_uv: number;
    snr_db: number;
}

const eegData: EegMetric[] = [
    { channel_id: 'Fp1', frequency_hz: 10.24, amplitude_uv: 42.8, snr_db: 18.3 },
    { channel_id: 'Fp2', frequency_hz: 10.18, amplitude_uv: 41.2, snr_db: 17.9 },
    { channel_id: 'C3', frequency_hz: 12.50, amplitude_uv: 38.6, snr_db: 21.4 },
    { channel_id: 'C4', frequency_hz: 12.44, amplitude_uv: 39.1, snr_db: 20.8 },
    { channel_id: 'O1', frequency_hz: 9.76, amplitude_uv: 55.3, snr_db: 24.6 },
    { channel_id: 'O2', frequency_hz: 9.82, amplitude_uv: 54.7, snr_db: 23.9 },
];

const AIPlatform = () => {
    const { ref: heroRef, isVisible: heroVis } = useScrollReveal(0.2);
    const { ref: statsRef, isVisible: statsVis } = useScrollReveal(0.2);
    const { ref: tableRef, isVisible: tableVis } = useScrollReveal(0.2);

    return (
        <div className="min-h-screen bg-background">
            <Navbar />
            <main className="pt-12">
                {/* Hero — NeurAI */}
                <section className="relative overflow-hidden px-6 py-32">
                    <div
                        ref={heroRef}
                        className="mx-auto flex max-w-4xl flex-col items-center text-center transition-all duration-[600ms]"
                        style={{
                            opacity: heroVis ? 1 : 0,
                            transform: heroVis ? 'translateY(0)' : 'translateY(20px)',
                            transitionTimingFunction: 'var(--ease-apple)',
                        }}
                    >
                        <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-1.5 text-xs font-medium text-muted-foreground" style={{ border: '0.5px solid hsl(var(--surface-border))' }}>
                            <Brain size={14} strokeWidth={1.2} />
                            NeurAI Intelligence
                        </div>
                        <h1 className="mb-4 text-5xl font-bold tracking-display text-foreground sm:text-6xl lg:text-7xl">
                            NeurAI
                        </h1>
                        <p className="mb-16 max-w-lg text-lg text-muted-foreground">
                            Clinical Neural Intelligence Platform. Real-time EEG analysis, signal processing, and neural pattern recognition.
                        </p>

                        {/* Matte 3D Brain placeholder */}
                        <div className="relative mx-auto w-full max-w-sm">
                            <HeroHalo />
                            <div
                                className="relative z-10 mx-auto aspect-square w-64 rounded-full"
                                style={{
                                    background: 'radial-gradient(circle at 40% 35%, hsl(var(--secondary)), hsl(var(--card)) 50%, hsl(var(--muted)) 100%)',
                                    boxShadow: 'inset 0 4px 30px 0 hsl(var(--foreground) / 0.08), 0 0 0 0.5px hsl(var(--surface-border))',
                                }}
                            />
                            <div className="mt-4 text-center">
                                <p className="text-xs font-medium tracking-widest text-muted-foreground uppercase">Neural Cortex Model</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Stats Cards */}
                <section className="bg-secondary px-6 py-24">
                    <div
                        ref={statsRef}
                        className="mx-auto grid max-w-5xl grid-cols-1 gap-6 transition-all duration-[600ms] md:grid-cols-3"
                        style={{
                            opacity: statsVis ? 1 : 0,
                            transform: statsVis ? 'translateY(0)' : 'translateY(20px)',
                            transitionTimingFunction: 'var(--ease-apple)',
                        }}
                    >
                        {stats.map((stat) => (
                            <div
                                key={stat.label}
                                className="rounded-3xl bg-card p-8"
                                style={{ border: '0.5px solid hsl(var(--surface-border))' }}
                            >
                                <stat.icon size={20} strokeWidth={1.2} className="mb-4 text-muted-foreground" />
                                <div className="mb-1 flex items-baseline gap-3">
                                    <span className="text-3xl font-bold tabular-nums tracking-display text-foreground">{stat.value}</span>
                                    <span className="text-xs font-medium tabular-nums text-muted-foreground">{stat.delta}</span>
                                </div>
                                <p className="text-sm text-muted-foreground">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* EEG Data Table — Neural Session Dashboard */}
                <section className="px-6 py-24">
                    <div
                        ref={tableRef}
                        className="mx-auto max-w-5xl transition-all duration-[600ms]"
                        style={{
                            opacity: tableVis ? 1 : 0,
                            transform: tableVis ? 'translateY(0)' : 'translateY(20px)',
                            transitionTimingFunction: 'var(--ease-apple)',
                        }}
                    >
                        <div className="mb-8 flex items-center justify-between">
                            <div>
                                <h2 className="text-2xl font-bold tracking-display text-foreground">Neural Session Dashboard</h2>
                                <p className="mt-1 text-sm text-muted-foreground">Real-time EEG channel metrics</p>
                            </div>
                            <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                                <div className="h-2 w-2 rounded-full bg-green-500" />
                                Live
                            </div>
                        </div>

                        <div className="overflow-hidden rounded-3xl bg-card" style={{ border: '0.5px solid hsl(var(--surface-border))' }}>
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b" style={{ borderColor: 'hsl(var(--surface-border))' }}>
                                        <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">Channel</th>
                                        <th className="px-6 py-4 text-right text-xs font-medium uppercase tracking-wider text-muted-foreground">Frequency (Hz)</th>
                                        <th className="px-6 py-4 text-right text-xs font-medium uppercase tracking-wider text-muted-foreground">Amplitude (µV)</th>
                                        <th className="px-6 py-4 text-right text-xs font-medium uppercase tracking-wider text-muted-foreground">SNR (dB)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {eegData.map((row, i) => (
                                        <tr
                                            key={row.channel_id}
                                            className="transition-colors duration-300 hover:bg-secondary"
                                            style={{
                                                borderBottom: i < eegData.length - 1 ? '0.5px solid hsl(var(--surface-border))' : 'none',
                                            }}
                                        >
                                            <td className="px-6 py-4 text-sm font-medium text-foreground">{row.channel_id}</td>
                                            <td className="px-6 py-4 text-right text-sm tabular-nums text-muted-foreground">{row.frequency_hz.toFixed(2)}</td>
                                            <td className="px-6 py-4 text-right text-sm tabular-nums text-muted-foreground">{row.amplitude_uv.toFixed(1)}</td>
                                            <td className="px-6 py-4 text-right text-sm tabular-nums text-muted-foreground">{row.snr_db.toFixed(1)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default AIPlatform;
