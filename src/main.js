/**
 * Apply dark/light text-color based on the background-color
 * 
 * @author karavaX <karavax@atomyde.net>
 * @version 1.0.0
 */
export default class ReadableText {

    static #config = {
        threshold: 128,
        brightColor: 'rgba(255, 255, 255, 1)',
        darkColor: 'rgba(0, 0, 0, 1)',
        topTag: 'html'
    };

    static getConfig() {
        return this.#config;
    }

    static setConfig(config = {}) {
        Object.keys(config).forEach(function (key, index) {
            if (key in this.#config)
                // There is no control of the new value, please don't introduce dick pics
                this.#config[key] = config[key];
            else
                console.error("Unknown configuration key '" + key + "'");
        });
    }

    static setThreshold(threshold) {
        this.#config.threshold = this.#ensureRange(threshold, 1, 255);
    }

    static setBrightColor(red, green, blue, alpha = 1) {
        this.setBrightColorRGBA(`rgba(${this.#ensureRange(red, 1, 255)}, ${this.#ensureRange(green, 1, 255)}, ${this.#ensureRange(blue, 1, 255)}, ${this.#ensureRange(alpha, 0, 1)}`);
    }

    static setBrightColorHex(hex, alpha = 1) {
        this.setBrightColorRGBA(`rgba(${this.#hexToRgb(hex)}, ${this.#ensureRange(alpha, 0, 1)})`);
    }

    static setBrightColorRGBA(rgba) {
        this.#config.brightColor = rgba;
    }

    static setDarkColor(red, green, blue, alpha = 1) {
        this.setDarkColorRGBA(`rgba(${this.#ensureRange(red, 1, 255)}, ${this.#ensureRange(green, 1, 255)}, ${this.#ensureRange(blue, 1, 255)}, ${this.#ensureRange(alpha, 0, 1)}`);
    }

    static setDarkColorHex(hex, alpha = 1) {
        this.setDarkColorRGBA(`rgba(${this.#hexToRgb(hex)}, ${this.#ensureRange(alpha, 0, 1)})`);
    }

    static setDarkColorRGBA(rgba) {
        this.#config.darkColor = rgba;
    }

    static setTopTag(tag) {
        this.#config.topTag = tag;
    }

    static byId(id) {
        this.byElements([document.getElementById(id)]);
    }

    static byClass(className) {
        this.byElements(document.getElementsByClassName(className));
    }

    static byTagName(tagName) {
        this.byElements(document.getElementsByTagName(tagName));
    }

    static byElement(element) {
        this.byElements([element]);
    }

    static byElements(elements) {
        for (let index = 0; index < elements.length; index++) {
            const element = elements[index];
            let parent = element;

            // Go up the tree to the first element with background color
            while (parent.style.backgroundColor == '') {
                parent = parent.parentElement;

                if (parent.tagName === this.#config.topTag)
                    throw new Error("Top tag reached and no background color found");
            }

            // Compute final color
            let rgb = parent.style.backgroundColor.match(/\d+/g);
            let gray = this.#rgbToGray(rgb[0], rgb[1], rgb[2]);

            // Apply color to current element
            element.style.color = gray > this.#config.threshold ? this.#config.darkColor : this.#config.brightColor;
        }
    }

    static #ensureRange(value, min, max) {
        return Math.max(Math.min(value, max), min);
    }

    static #hexToRgb(hex) {
        return [(bigint = parseInt(hex, 16)) >> 16 & 255, bigint >> 8 & 255, bigint & 255].join();
    }

    static #rgbToGray(red, green, blue) {
        return red * 0.299 + green * 0.587 + blue * 0.114;
    }
}