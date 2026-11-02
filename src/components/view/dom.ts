export function getRequiredElement<T extends Element>(
    root: ParentNode,
    selector: string,
    elementClass: new () => T
): T {
    const element = root.querySelector(selector);

    if (!(element instanceof elementClass)) {
        throw new Error(`Required element "${selector}" is missing or has an unexpected type.`);
    }

    return element;
}
