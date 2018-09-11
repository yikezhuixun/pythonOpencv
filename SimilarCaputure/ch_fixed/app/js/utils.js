var Util = {
    getElementTranslate(ele, view = null) {
        if (ele instanceof HTMLElement) {
            var matrix = getComputedStyle(ele, view).transform;
            var m = matrix.replace(/[^0-9.\-,]/g, '').split(',');
            if (m.length > 5) {

                return {
                    x: parseInt(m[4]),
                    y: parseInt(m[5])
                };
            } else {
                var m2x = matrix.match(/translateX\(([\d.-]+)\w+\)/);
                var m2y = matrix.match(/translateY\(([\d.-]+)\w+\)/);
                return {
                    x: m2x ? parseInt(m2x[1]) : 0,
                    y: m2y ? parseInt(m2y[1]) : 0
                }
            }

        }
    },
    hasClass(elements, cName) {
        return !!elements.className.match(new RegExp("(\\s|^)" + cName + "(\\s|$)"));
    },

    addClass(elements, cName) {
        if (!this.hasClass(elements, cName)) {
            elements.className += " " + cName;
        };
    },

    removeClass(elements, cName) {
        if (this.hasClass(elements, cName)) {
            elements.className = elements.className.replace(new RegExp("(\\s|^)" + cName + "(\\s|$)"), " ");
        };
    },
    parents(ele, selector) {
        var list = document.querySelectorAll(selector);
        var p = ele.parentNode;
        do {
            if (p.nodeType == 9) return null;
            for (var i = 0; i < list.length; i++) {
                if (list.item(i) == p) return p;
            }
        } while (p = p.parentNode)
    }
}
export default Util;