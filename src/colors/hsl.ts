type HslColor = {
    h: number;
    s: number;
    l: number;
    a: number;
};

class Hsl {
    public readonly h: number;
    public readonly s: number;
    public readonly l: number;
    public readonly a: number;
    public readonly alphaAsPercentage: boolean;

    constructor(h: number, s: number, l: number, a: number = 1, alphaAsPercentage: boolean = false) {
        this.h = this.validateHue(h);
        this.s = this.validatePercentage(s);
        this.l = this.validatePercentage(l);
        this.alphaAsPercentage = a > 1 || alphaAsPercentage;
        this.a = this.alphaAsPercentage ? this.validatePercentage(a) : this.validateAlpha(a);
    }

    setHue(hue: number): Hsl {
        return new Hsl(hue % 360, this.s, this.l, this.a);
    }

    setSaturation(saturation: number): Hsl {
        return new Hsl(this.h, ColorUtils.constrain100(saturation), this.l, this.a);
    }

    setLightness(lightness: number): Hsl {
        return new Hsl(this.h, this.s, ColorUtils.constrain100(lightness), this.a);
    }

    setAlpha(alpha: number): Hsl {
        return new Hsl(this.h, this.s, this.l, ColorUtils.constrain01(alpha));
    }

    private validateHue(hue: number): number {
        return hue % 360;
    }

    private validatePercentage(value: number): number {
        if (value < 0 || value > 100) {
            throw new Error(`Invalid percentage value: ${value}. Must be between 0 and 100.`);
        }
        return value;
    }

    private validateAlpha(alpha: number): number {
        if (alpha < 0 || alpha > 1) {
            throw new Error(`Invalid alpha value: ${alpha}. Must be between 0 and 1.`);
        }
        return alpha;
    }

    public toString(): string {
        const h = this.h.toFixed(2);
        const s = `${this.s.toFixed(2)}%`;
        const l = `${this.l.toFixed(2)}%`;
        const a = this.alphaAsPercentage ? `${(this.a * 100).toFixed(2)}%` : this.a.toFixed(2);

        return `hsl(${h}, ${s}, ${l}${this.a !== 1 ? `, ${a}` : ''})`;
    }

    public static parse(colorString: string): Hsl {
        const hslRegex = /^hsl\((\d+),\s*([\d.]+)%,\s*([\d.]+)%\)$/i;
        const hslaRegex = /^hsla\((\d+),\s*([\d.]+)%,\s*([\d.]+)%,\s*([\d.]+)\)$/i;

        let match = colorString.match(hslRegex);
        if (match) {
            const h = parseFloat(match[1]);
            const s = parseFloat(match[2]);
            const l = parseFloat(match[3]);
            return new Hsl(h, s, l);
        }

        match = colorString.match(hslaRegex);
        if (match) {
            const h = parseFloat(match[1]);
            const s = parseFloat(match[2]);
            const l = parseFloat(match[3]);
            const a = parseFloat(match[4]);
            return new Hsl(h, s, l, a);
        }

        throw new Error(`Invalid HSL(A) color string: ${colorString}`);
    }

    toRgb(): Rgb {
        const h = this.h / 360.0;
        const s = this.s / 100.0;
        const l = this.l / 100.0;
        const a = this.alphaAsPercentage ? this.a / 100 : this.a;

        let r, g, b;

        if (s === 0) {
            r = g = b = l;
        } else {
            const chromaHigh = l < 0.5 ? l * (1 + s) : l + s - l * s;
            const chromaLow = 2 * l - chromaHigh;
            r = hueToRgb(chromaLow, chromaHigh, h + 1.0 / 3);
            g = hueToRgb(chromaLow, chromaHigh, h);
            b = hueToRgb(chromaLow, chromaHigh, h - 1.0 / 3);
        }

        return new Rgb(Math.round(r * 255), Math.round(g * 255), Math.round(b * 255), a);
    }

    toHex(): Hex {
        return this.toRgb().toHex();
    }

    static getRandomHsl(): Hsl {
        return new Hsl(
            Math.floor(Math.random() * 361),
            Math.floor(Math.random() * 101),
            Math.floor(Math.random() * 101)
        );
    }

    invertColor(): Hsl {
        return new Hsl(
            (360 - this.h) % 360,
            100 - this.s,
            100 - this.l,
            this.a
        );
    }

    getComplementaryColor(): Hsl {
        return new Hsl((this.h + 180) % 360, this.s, this.l, this.a);
    }

    getLighterColor(amount: number = 0.2): Hsl {
        return new Hsl(this.h, this.s, Math.min(100, this.l + amount * 100), this.a);
    }

    getDarkerColor(amount: number = 0.2): Hsl {
        return new Hsl(this.h, this.s, Math.max(0, this.l - amount * 100), this.a);
    }

    getAnalogousColor(amount: number = 30): Hsl {
        return new Hsl((this.h + amount) % 360, this.s, this.l, this.a);
    }

    getTriadicColor(): Hsl {
        return new Hsl((this.h + 120) % 360, this.s, this.l, this.a);
    }

    getTetradicColor(): Hsl {
        return new Hsl((this.h + 90) % 360, this.s, this.l, this.a);
    }

    getSplitComplementaryColor(): Hsl {
        return new Hsl((this.h + 150) % 360, this.s, this.l, this.a);
    }

    getMonoChromaticColor(amount: number = 0.2): Hsl {
        return new Hsl(this.h, 0, Math.min(100, this.l + amount * 100), this.a);
    }

    getGolden(): Hsl {
        return new Hsl((this.h * ColorUtils.GoldenRatio) % 360, this.s, this.l, this.a);
    }

    blendColors(overlayColor: Hsl, weight: number): Hsl {
        return new Hsl(
            this.h + (overlayColor.h - this.h) * weight,
            this.s + (overlayColor.s - this.s) * weight,
            this.l + (overlayColor.l - this.l) * weight,
            this.a + (overlayColor.a - this.a) * weight
        );
    }
}

function hueToRgb(chromaLow: number, chromaHigh: number, hueAdjusted: number): number {
    if (hueAdjusted < 0) hueAdjusted += 1;
    if (hueAdjusted > 1) hueAdjusted -= 1;
    if (hueAdjusted < 1 / 6) return chromaLow + (chromaHigh - chromaLow) * 6 * hueAdjusted;
    if (hueAdjusted < 1 / 2) return chromaHigh;
    if (hueAdjusted < 2 / 3) return chromaLow + (chromaHigh - chromaLow) * (2 / 3 - hueAdjusted) * 6;
    return chromaLow;
}

// Usage example
try {
    const color = new Hsl(120, 50, 50);
    console.log(color.toString());
} catch (error) {
    console.error(error);
}
