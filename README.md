# readable-text-color

> If the background color of some element that contains text is dynamically chaotic, don't worry, we got you!

This simple and lightweight package applies dark or light color to text based on it's background or the parent's background

It only supports the `background-color` attribute

## Installation

```shell
npm i @atomyde/readable-text-color
```

## Usage

Here is a simple example:

```js
import ReadableText from "@atomyde/readable-text-color";

// Choose the best method for you
ReadableText.byId("id")
ReadableText.byClass("class")
ReadableText.byTagName("tagName")
ReadableText.byElement(element)
ReadableText.byElements(elements)
```

### Configuration

The configuration contains the following keys and values (the defaults!):

```json
{
    "threshold": 128,
    "brightColor": "rgba(255, 255, 255, 1)",
    "darkColor": "rgba(0, 0, 0, 1)",
    "topTag": "html"
}
```

- `threshold` [1-255] determines, based on the grey equivalent of the color, the limit to apply wich color
- `brightColor` [RGBA/HEX] the bright color to apply on dark backgrounds
- `darkColor` [RGBA/HEX] the dark color to apply on light backgrounds
- `topTag` [HTMLTag] The upper tag to look for background-color (when it reahces `<html>` it stops)

You can obtain the configuration with:

```js
ReadableText.getConfig()
```

You can modify any configuration key with:

```js
ReadableText.setConfig({
    threshold: 182,
    brightColor: "rgba(255, 255, 255, 1)",
})
```

It is recommended to use the setters of the class instead of `ReadableText.setConfig()`

```js
// Threshold setter
ReadableText.setThreshold(182)

// Bright color setters
ReadableText.setBrightColor(255, 255, 255, 1)
ReadableText.setBrightColorHex("#FFFFFF", 1)
ReadableText.setBrightColorRGBA("rgba(255, 255, 255, 1)")

// Dark color setters
ReadableText.setDarkColor(0, 0, 0, 1)
ReadableText.setDarkColorHex("#000000", 1)
ReadableText.setDarkColorRGBA("rgba(0, 0, 0, 1)")

// Top tag setter
ReadableText.setTopTag("html")
```

## License

Use it whatever u want for :D

[MIT](http://opensource.org/licenses/MIT)