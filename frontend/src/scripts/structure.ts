export class structure {
  public createElement(tagName: string, attributes: { [s: string]: unknown } | Array<unknown>) {
    const element = document.createElement(tagName);
    const arrayAttributes = Object.entries(attributes);

    arrayAttributes.forEach(([key, value]) => {
      element.setAttribute(key, value);
    });

    return element;
  }
}
