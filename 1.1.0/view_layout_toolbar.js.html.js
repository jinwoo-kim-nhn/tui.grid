ne.util.defineNamespace("fedoc.content", {});
fedoc.content["view_layout_toolbar.js.html"] = "      <div id=\"main\" class=\"main\">\n\n\n\n    \n    <section>\n        <article>\n            <pre class=\"prettyprint source linenums\"><code>/**\n * @fileoverview 툴바영역 클래스\n * @author NHN Ent. FE Development Team\n */\n'use strict';\n\nvar View = require('../../base/view');\nvar ControlPanel = require('./toolbar/controlPanel');\nvar Pagination = require('./toolbar/pagination');\nvar ResizeHandler = require('./toolbar/resizeHandler');\n\n/**\n *  툴바 영역\n *  @module view/layout/toolbar\n */\nvar Toolbar = View.extend(/**@lends module:view/layout/toolbar.prototype */{\n    /**\n     * @constructs\n     * @extends module:base/view\n     */\n    initialize: function() {\n        View.prototype.initialize.apply(this, arguments);\n        this.setOwnProperties({\n            controlPanel: null,\n            resizeHandler: null,\n            pagination: null\n        });\n    },\n\n    tagName: 'div',\n\n    className: 'toolbar',\n\n    /**\n     * 랜더링한다.\n     * @return {View.Layout.Toolbar} this object\n     */\n    render: function() {\n        var option = this.grid.option('toolbar'),\n            toolbarHeight = this.grid.dimensionModel.get('toolbarHeight'),\n            resizeHandler, controlPanel, pagination;\n\n        this.destroyChildren();\n        this.$el.empty();\n\n        if (option) {\n            if (option.hasControlPanel) {\n                controlPanel = this.createView(ControlPanel, {\n                    grid: this.grid\n                });\n                this.$el.append(controlPanel.render().el);\n            }\n\n            if (option.hasResizeHandler) {\n                resizeHandler = this.createView(ResizeHandler, {\n                    grid: this.grid\n                });\n                this.$el.append(resizeHandler.render().el);\n            }\n\n            if (option.hasPagination) {\n                pagination = this.createView(Pagination, {\n                    grid: this.grid\n                });\n                this.$el.append(pagination.render().el);\n            }\n        }\n        this.setOwnProperties({\n            controlPanel: controlPanel,\n            resizeHandler: resizeHandler,\n            pagination: pagination\n        });\n\n        this.$el.height(toolbarHeight);\n        if (toolbarHeight) {\n            this.$el.show();\n        }\n        \n        return this;\n    }\n});\n\nmodule.exports = Toolbar;\n</code></pre>\n        </article>\n    </section>\n\n\n\n</div>\n\n"