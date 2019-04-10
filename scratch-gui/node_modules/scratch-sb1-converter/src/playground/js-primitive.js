const PRIMITIVE_TYPEOFS = ['undefined', 'string', 'number', 'boolean'];

class JSPrimitiveRenderer {
    static check (data) {
        return PRIMITIVE_TYPEOFS.includes(typeof data) || data === null;
    }

    render (data, view) {
        view.renderTitle(String(data));
    }
}

export {JSPrimitiveRenderer};
