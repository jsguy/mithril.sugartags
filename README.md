mithril.sugartags
=================

Sugar'd tags for mithril templating system - less code, less clutter, more awesome.

With sugar tags

    view: function(ctrl) {
        return [
            UL({class: "listy"}, [
                LI(A({href: '#'}, "item 1")),
                LI(A({href: '#'}, "item 2")),
                LI(A({href: '#'}, "item 3"))
            ])
        ];
    },

Without sugar tags

    view: function(ctrl) {
        return [
            m("ul", {class: "listy"}, [
                m("li", m("a", {href: '#'}, "item 1")),
                m("li", m("a", {href: '#'}, "item 2")),
                m("li", m("a", {href: '#'}, "item 3"))
            ])
        ];
    }

It works the same as normal mithril tags, and can be compiled just the same.

You can also use lowercase tags by doing:

    with(m.sugarTags.lower()) {

Note: if you prefer to not pollute the global namespace with the methods to create tags, you can do:

    m.localSugarTags

And then in the template:

    with(m.sugarTags) { 

This might have some performance implications in some circumstances.