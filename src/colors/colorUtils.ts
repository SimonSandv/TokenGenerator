class ColorUtils
{
    static constrain255(value: number): number {
        return Math.min(255, Math.max(0, value));
    }

    static constrain100(value: number): number {
        return Math.min(100, Math.max(0, value));
    }

    static constrain01(value: number): number {
        return Math.min(1, Math.max(0, value));
    }

    static readonly GoldenRatio = 0.618033988749895;

    static hueToRgb(chromaLow: number, chromaHigh: number, hueAdjusted: number): number {
    if (hueAdjusted < 0) hueAdjusted += 1;
    if (hueAdjusted > 1) hueAdjusted -= 1;
    if (hueAdjusted < 1 / 6) return chromaLow + (chromaHigh - chromaLow) * 6 * hueAdjusted;
    if (hueAdjusted < 1 / 2) return chromaHigh;
    if (hueAdjusted < 2 / 3) return chromaLow + (chromaHigh - chromaLow) * (2 / 3 - hueAdjusted) * 6;
    return chromaLow;
    }
}