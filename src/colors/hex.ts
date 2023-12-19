class Hex {
    private static hexRegex = /^#([A-Fa-f0-9]{8}|[A-Fa-f0-9]{6}|[A-Fa-f0-9]{4}|[A-Fa-f0-9]{3})$/;

    public red: string;
    public green: string;
    public blue: string;
    public alpha: string;

    constructor(input: string | Rgb | Hsl) {
        if (typeof input === 'string') {
            const hex = input.startsWith('#') ? input.slice(1) : input;
            if (!/^([A-Fa-f0-9]{3,4}|[A-Fa-f0-9]{6}|[A-Fa-f0-9]{8})$/.test(hex)) {
                throw new Error("Invalid hexadecimal color format.");
            }

            if (hex.length === 3 || hex.length === 4) {
                this.red = hex.charAt(0) + hex.charAt(0);
                this.green = hex.charAt(1) + hex.charAt(1);
                this.blue = hex.charAt(2) + hex.charAt(2);
                this.alpha = hex.length === 4 ? hex.charAt(3) + hex.charAt(3) : 'FF';
            } else {
                this.red = hex.substring(0, 2);
                this.green = hex.substring(2, 4);
                this.blue = hex.substring(4, 6);
                this.alpha = hex.length === 8 ? hex.substring(6, 8) : 'FF';
            }
        } else if (input instanceof Rgb) {
            this.red = input.r.toString(16).padStart(2, '0');
            this.green = input.g.toString(16).padStart(2, '0');
            this.blue = input.b.toString(16).padStart(2, '0');
            this.alpha = Math.round(input.a * 255).toString(16).padStart(2, '0');
        } else if (input instanceof Hsl) {
            const rgb = input.toRgb();
            this.red = rgb.r.toString(16).padStart(2, '0');
            this.green = rgb.g.toString(16).padStart(2, '0');
            this.blue = rgb.b.toString(16).padStart(2, '0');
            this.alpha = Math.round(rgb.a * 255).toString(16).padStart(2, '0');
        } else {
            throw new Error("Invalid input type for Hex constructor.");
        }
    }

    setRed(redHex: string): Hex {
        if (!/^[A-Fa-f0-9]{2}$/.test(redHex)) {
            throw new Error("Invalid red hex value.");
        }
        return new Hex(`#${redHex}${this.green}${this.blue}${this.alpha}`);
    }

    setGreen(greenHex: string): Hex {
        if (!/^[A-Fa-f0-9]{2}$/.test(greenHex)) {
            throw new Error("Invalid green hex value.");
        }
        return new Hex(`#${this.red}${greenHex}${this.blue}${this.alpha}`);
    }

    setBlue(blueHex: string): Hex {
        if (!/^[A-Fa-f0-9]{2}$/.test(blueHex)) {
            throw new Error("Invalid blue hex value.");
        }
        return new Hex(`#${this.red}${this.green}${blueHex}${this.alpha}`);
    }

    setAlpha(alphaHex: string): Hex {
        if (!/^[A-Fa-f0-9]{2}$/.test(alphaHex)) {
            throw new Error("Invalid alpha hex value.");
        }
        return new Hex(`#${this.red}${this.green}${this.blue}${alphaHex}`);
    }

    public toString(): string {
        return `#${this.red}${this.green}${this.blue}${this.alpha}`;
    }

    toRgb(): Rgb {
        const r = parseInt(this.red, 16);
        const g = parseInt(this.green, 16);
        const b = parseInt(this.blue, 16);
        const a = parseInt(this.alpha, 16) / 255.0;

        return new Rgb(r, g, b, a);
    }

    toHsl(): Hsl {
        return this.toRgb().toHsl();
    }

    static getRandomHex(): Hex {
        return Rgb.getRandomRgb().toHex();
    }

    invertColor(): Hex {
        const rgb = this.toRgb().invertColor();
        return rgb.toHex();
    }

    getComplementaryColor(): Hex {
        return this.toRgb().getComplementaryColor().toHex();
    }

    getLighterColor(amount: number = 0.2): Hex {
        return this.toRgb().getLighterColor(amount).toHex();
    }

    getDarkerColor(amount: number = 0.2): Hex {
        return this.toRgb().getDarkerColor(amount).toHex();
    }

    getAnalogousColor(amount: number = 30): Hex {
        return this.toRgb().getAnalogousColor(amount).toHex();
    }

    getTriadicColor(): Hex {
        return this.toRgb().getTriadicColor().toHex();
    }

    getTetradicColor(): Hex {
        return this.toRgb().getTetradicColor().toHex();
    }

    getSplitComplementaryColor(): Hex {
        return this.toRgb().getSplitComplementaryColor().toHex();
    }

    getMonoChromaticColor(amount: number = 0.2): Hex {
        return this.toRgb().getMonoChromaticColor(amount).toHex();
    }

    getGolden(): Hex {
        return this.toRgb().getGolden().toHex();
    }

    blendColors(overlayColor: Hex, weight: number): Hex {
        return this.toRgb().blendColors(overlayColor.toRgb(), weight).toHex();
    }
}

// Usage
try {
    const color = new Hex("#ff5733");
    console.log(color.toString()); // Outputs: #ff5733ff
} catch (error) {
    console.error(error);
}
