type ColorType = {
    Rgb(): Rgb,
    Hsl(): Hsl,
    
};

class Color
{
    private rgb: Rgb;
    private hsl: Hsl;
    private hex: Hex;

    constructor(color: Rgb | Hsl | Hex) {
        if (color instanceof Rgb) {
            this.rgb = color;
            this.hsl = color.toHsl();
            this.hex = color.toHex();
        } else if (color instanceof Hsl) {
            this.hsl = color;
            this.rgb = color.toRgb();
            this.hex = this.rgb.toHex();
        } else if (color instanceof Hex) {
            this.hex = color;
            this.rgb = color.toRgb();
            this.hsl = this.rgb.toHsl();
        } else {
            throw new Error("Invalid color type.");
        }
    }

    Rgb = (): Rgb =>  {
        return this.rgb;
    }

    Hsl = (): Hsl => {
        return this.hsl;
    }

    Hex = (): Hex => {
        return this.hex;
    }
}
