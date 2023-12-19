type RgbColor = {
    r: number;
    g: number;
    b: number;
    a: number;
};

class Rgb {
    public readonly r: number;
    public readonly g: number;
    public readonly b: number;
    public readonly a: number;

    constructor(r: number, g: number, b: number, a: number = 1) {
        this.r = this.validateValue(r, 'r');
        this.g = this.validateValue(g, 'g');
        this.b = this.validateValue(b, 'b');
        this.a = this.validateAlpha(a);
    }

    setRed(red: number): Rgb {
        return new Rgb(ColorUtils.constrain255(red), this.g, this.b, this.a);
    }

    setGreen(green: number): Rgb {
        return new Rgb(this.r, ColorUtils.constrain255(green), this.b, this.a);
    }

    setBlue(blue: number): Rgb {
        return new Rgb(this.r, this.g, ColorUtils.constrain255(blue), this.a);
    }

    setAlpha(alpha: number): Rgb {
        return new Rgb(this.r, this.g, this.b, ColorUtils.constrain01(alpha));
    }

    private validateValue(value: number, name: string): number {
        if (value < 0 || value > 255) {
            throw new Error(`Invalid value for ${name}: ${value}. Must be between 0 and 255.`);
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
        return `rgba(${this.r}, ${this.g}, ${this.b}, ${this.a})`;
    }

    public static parse(colorString: string): Rgb {
        const rgbRegex = /^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/i;
        const rgbaRegex = /^rgba\((\d+),\s*(\d+),\s*(\d+),\s*([\d.]+)\)$/i;

        let match = colorString.match(rgbRegex);
        if (match) {
            const r = parseInt(match[1], 10);
            const g = parseInt(match[2], 10);
            const b = parseInt(match[3], 10);
            return new Rgb(r, g, b);
        }

        match = colorString.match(rgbaRegex);
        if (match) {
            const r = parseInt(match[1], 10);
            const g = parseInt(match[2], 10);
            const b = parseInt(match[3], 10);
            const a = parseFloat(match[4]);
            return new Rgb(r, g, b, a);
        }

        throw new Error(`Invalid RGB(A) color string: ${colorString}`);
    }

    toHsl(): Hsl {
        const r = this.r / 255.0;
        const g = this.g / 255.0;
        const b = this.b / 255.0;
        const a = this.a;

        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        let h, s, l = (max + min) / 2;

        if (max === min) {
            h = s = 0;
        } else {
            const d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            if (max === r) {
                h = (g - b) / d + (g < b ? 6 : 0);
            } else if (max === g) {
                h = (b - r) / d + 2;
            } else {
                h = (r - g) / d + 4;
            }
            h /= 6;
        }

        return new Hsl(h * 360, s * 100, l * 100, a);
    }

    toHex(): Hex {
        const r = Math.round(this.r);
        const g = Math.round(this.g);
        const b = Math.round(this.b);
        const a = Math.round(this.a * 255);
        return new Hex(`#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}${a === 255 ? '' : a.toString(16).padStart(2, '0')}`);
    }

    static getRandomRgb(): Rgb {
        return new Rgb(
            Math.floor(Math.random() * 256),
            Math.floor(Math.random() * 256),
            Math.floor(Math.random() * 256)
        );
    }

    invertColor(): Rgb {
        return new Rgb(
            255 - this.r,
            255 - this.g,
            255 - this.b,
            this.a
        );
    }

    getComplementaryColor(): Rgb {
        return this.toHsl().getComplementaryColor().toRgb();
    }

    getLighterColor(amount: number = 0.2): Rgb {
        return this.toHsl().getLighterColor(amount).toRgb();
    }

    getDarkerColor(amount: number = 0.2): Rgb {
        return this.toHsl().getDarkerColor(amount).toRgb();
    }

    getAnalogousColor(amount: number = 30): Rgb {
        return this.toHsl().getAnalogousColor(amount).toRgb();
    }

    getTriadicColor(): Rgb {
        return this.toHsl().getTriadicColor().toRgb();
    }

    getTetradicColor(): Rgb {
        return this.toHsl().getTetradicColor().toRgb();
    }

    getSplitComplementaryColor(): Rgb {
        return this.toHsl().getSplitComplementaryColor().toRgb();
    }

    getMonoChromaticColor(amount: number = 0.2): Rgb {
        return this.toHsl().getMonoChromaticColor(amount).toRgb();
    }

    getGolden(): Rgb {
        return new Rgb(
            Math.round(this.r * ColorUtils.GoldenRatio),
            Math.round(this.g * ColorUtils.GoldenRatio),
            Math.round(this.b * ColorUtils.GoldenRatio),
            this.a
        );
    }

    blendColors(overlayColor: Rgb, weight: number): Rgb {
        return this.toHsl().blendColors(overlayColor.toHsl(), weight).toRgb();
    }
}

try {
    const color = new Rgb(255, 0, 0);
    console.log(color.toString());
} catch (error) {
    console.error(error);
}
