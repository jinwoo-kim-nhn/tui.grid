ne.util.defineNamespace("fedoc.content", {});
fedoc.content["grid.js.html"] = "      <div id=\"main\" class=\"main\">\n\n\n\n    \n    <section>\n        <article>\n            <pre class=\"prettyprint source linenums\"><code>/**\n * @fileoverview The tui.Grid class for the external API.\n * @author NHN Ent. FE Development Team\n */\n'use strict';\n\n/**\n * Grid public API\n *\n * @param {Object} options\n *      @param {number} [options.columnFixCount=0] - Column index for fixed column. The columns indexed from 0 to this value will always be shown on the left side. {@link tui.Grid#setColumnFixCount|setColumnFixCount} can be used for setting this value dynamically.\n *      @param {string} [options.selectType=''] - Type of buttons shown next to the _number(rowKey) column. The string value 'checkbox' or 'radiobox' can be used. If not specified, the button column will not be shown.\n *      @param {boolean} [options.autoNumbering=true] - Specifies whether to assign a auto increasing number to each rows when rendering time.\n *      @param {number} [options.headerHeight=35] - The height of header area. When rows in header are multiple (merged column), this value must be the total height of rows.\n *      @param {number} [options.rowHeight=27] - The height of each rows.\n *      @param {number} [options.displayRowCount=10] - The number of rows to be shown in the table area. Total height of grid will be set based on this value.\n *      @param {number} [options.minimumColumnWidth=50] - Minimum width of each columns.\n *      @param {boolean} [options.useClientSort=true] - If set to true, sorting will be executed by client itself without server.\n *      @param {boolean} [options.singleClickEdit=false] - If set to true, text-convertible cell will be changed to edit-mode with a single click.\n *      @param {boolean} [options.scrollX=true] - Specifies whether to show horizontal scrollbar.\n *      @param {boolean} [options.scrollY=true] - Specifies whether to show vertical scrollbar.\n *      @param {string} [options.keyColumnName=null] - The name of the column to be used to identify each rows. If not specified, unique value for each rows will be created internally.\n *      @param {Object} [options.toolbar] - The object for configuring toolbar UI.\n *          @param {boolean} [options.toolbar.hasResizeHandler=true] - Specifies whether to use the resize hendler.\n *          @param {boolean} [options.toolbar.hasControlPanel=true] - Specifies whether to use the control panel.\n *          @param {boolean} [options.toolbar.hasPagination=true] - Specifies whether to use the pagination.\n *      @param {array} options.columnModelList - The configuration of the grid columns.\n *          @param {string} options.columnModelList.columnName - The name of the column.\n *          @param {boolean} [options.columnModelList.isEllipsis=false] - If set to true, ellipsis will be used for overflowing content.\n *          @param {string} [options.columnModelList.align=left] - Horizontal alignment of the column content. Available values are 'left', 'center', 'right'.\n *          @param {string} [options.columnModelList.className] - The name of the class to be used for all cells of the column.\n *          @param {string} [options.columnModelList.title] - The title of the column to be shown on the header.\n *          @param {number} [options.columnModelList.width] - The width of the column. The unit is pixel.\n *          @param {boolean} [options.columnModelList.isHidden] - If set to true, the column will not be shown.\n *          @param {boolean} [options.columnModelList.isFixedWidth=false] - If set to true, the width of the column will not be changed.\n *          @param {string} [options.columnModelList.defaultValue] - The default value to be shown when the column doesn't have a value.\n *          @param {function} [options.columnModelList.formatter] - The function that formats the value of the cell. The retrurn value of the function will be shown as the value of the cell.\n *          @param {boolean} [options.columnModelList.notUseHtmlEntity=false] - If set to true, the value of the cell will not be encoded as HTML entities.\n *          @param {boolean} [options.columnModelList.isIgnore=false] - If set to true, the value of the column will be ignored when setting up the list of modified rows.\n *          @param {boolean} [options.columnModelList.isSortable=false] - If set to true, sort button will be shown on the right side of the column header, which executes the sort action when clicked.\n *          @param {Array} [options.columnModelList.editOption] - The object for configuring editing UI.\n *              @param {string} [options.columnModelList.editOption.type='normal'] - The string value that specifies the type of the editing UI. Available values are 'text', 'text-password', 'text-convertible', 'select', 'radio', 'checkbox'.\n *              @param {Array} [options.columnModelList.editOption.list] - Specifies the option list for the 'select', 'radio', 'checkbox' type. The item of the array must contain properties named 'text' and 'value'. (e.g. [{text: 'option1', value: 1}, {...}])\n *              @param {function} [options.columnModelList.editOption.changeBeforeCallback] - The function that will be called before changing the value of the cell. If returns false, the changing will be canceled.\n *              @param {function} [options.columnModelList.editOption.changeAfterCallback] - The function that will be called after changing the value of the cell.\n *              @param {string} [options.columnModelList.editOption.beforeText] &lt;em>Deprecated&lt;/em>. (replaced with {@link beforeContent})\n *              @param {(string|function)} [options.columnModelList.editOption.beforeContent] - The HTML string to be shown left to the value. If it's a function, the return value will be used.\n *              @param {string} [options.columnModelList.editOption.afterText] &lt;em>Deprecated&lt;/em>. (replaced with {@link afterContent})\n *              @param {(string|function)} [options.columnModelList.editOption.afterContent] - The HTML string to be shown right to the value. If it's a function, the return value will be used.\n *              @param {function} [options.columnModelList.editOption.converter] - The function whose return value (HTML) represents the UI of the cell. If the return value is falsy(null|undefined|false), default UI will be shown. This option is available for the 'text', 'text-password', 'select', 'checkbox', 'radio' type.\n *              @param {Object} [options.columnModelList.editOption.inputEvents] - The object that has an event name as a key and event handler as a value for events on input element.\n *          @param {Array} [options.columnModelList.relationList] - Specifies relation between this and other column.\n *              @param {array} [options.columnModelList.relationList.columnList] - Array of the names of target columns.\n *              @param {function} [options.columnModelList.relationList.isDisabled] - If returns true, target columns will be disabled.\n *              @param {function} [options.columnModelList.relationList.isEditable] - If returns true, target columns will be editable.\n *              @param {function} [options.columnModelList.relationList.optionListChange] - The function whose return value specifies the option list for the 'select', 'radio', 'checkbox' type. The options list of target columns will be replaced with the return value of this function.\n *      @param {array} options.columnMerge - The array that specifies the merged column. This options does not merge the cells of multiple columns into a single cell. This options only effects to the headers of the multiple columns, creates a new parent header that includes the headers of spcified columns, and sets up the hierarchy.\n * @constructor tui.Grid\n * @example\n     &lt;div id='grid'>&lt;/div>\n     &lt;script>\n var grid = new tui.Grid({\n    el: $('#grid'),\n    columnFixCount: 2,  //(default=0)\n    selectType: 'checkbox', //(default='')\n    autoNumbering: true, //(default=true)\n    headerHeight: 100, //(default=35)\n    rowHeight: 27, // (default=27)\n    displayRowCount: 10, //(default=10)\n    minimumColumnWidth: 50, //(default=50)\n    scrollX: true, //(default:true)\n    scrollY: true, //(default:true)\n    keyColumnName: 'column1', //(default:null)\n    toolbar: {\n        hasResizeHandler: true, //(default:true)\n        hasControlPanel: true,  //(default:true)\n        hasPagination: true     //(default:true)\n    },\n    columnModelList: [\n        {\n            title: 'normal title',\n            columnName: 'column0',\n            className: 'bg_red',\n            width: 100,\n            isEllipsis: false,\n            notUseHtmlEntity: false,\n            defaultValue: 'empty',\n            isIgnore: false\n        },\n        {\n            title: 'hidden column',\n            columnName: 'column1',\n            isHidden: true\n        },\n        {\n            title: 'formatter example',\n            columnName: 'column2',\n            formatter: function(value, row) {\n                return '&lt;img src=\"' + value + '\" />';\n            }\n        },\n        {\n            title: 'converter example',\n            columnName: 'column3',\n            editOption: {\n                type: 'text',\n                converter: function(value, row) {\n                    if (row.rowKey % 2 === 0) {\n                        return 'Plain text value : ' + value;\n                    }\n                }\n            }\n        },\n        {\n            title: 'normal text input column',\n            columnName: 'column4',\n            editOption: {\n                type: 'text',\n                beforeContent: 'price:',\n                afterContent: '$'\n            },\n            // - param {Object}  changeEvent\n            //      - param {(number|string)} changeEvent.rowKey - The rowKey of the target cell\n            //      - param {(number|string)} changeEvent.columnName - The field(column) name of the target cell\n            //      - param {*} changeEvent.value - The changed value of the target cell\n            //      - param {Object} changeEvent.instance - The instance of the Grid\n            // - returns {boolean}\n            changeBeforeCallback: function(changeEvent) {\n                if (!/[0-9]+/.test(changeEvent.value)) {\n                    alert('Integer only.');\n                    return false;\n                }\n            },\n            // - param {Object}  changeEvent\n            //      - param {(number|string)} changeEvent.rowKey - The rowKey of the target cell\n            //      - param {(number|string)} changeEvent.columnName - The field(column) name of the target\n            //      - param {*} changeEvent.value - The changed value of the target cell\n            //      - param {Object} changeEvent.instance - - The instance of the Grid\n            // - returns {boolean}\n            //\n            changeAfterCallback: function(changeEvent) {}\n        },\n        {\n            title: 'password input column',\n            columnName: 'column5',\n            width: 100,\n            isFixedWidth: true,\n            editOption: {\n                type: 'text-password',\n                beforeContent: 'password:'\n            }\n        },\n        {\n            title: 'text input when editing mode',\n            columnName: 'column6',\n            editOption: {\n                type: 'text-convertible'\n            },\n            isIgnore: true\n        },\n        {\n            title: 'select box',\n            columnName: 'column7',\n            editOption: {\n                type: 'select',\n                list: [\n                    {text: '1', value: 1},\n                    {text: '2', value: 2},\n                    {text: '3', value: 3},\n                    {text: '4', value: 4}\n                ]\n            },\n            relationList: [\n                {\n                    columnList: ['column8', 'column9'],\n                    // - param {*} value - The changed value of the target cell\n                    // - param {Object} rowData - The data of the row that contains the target cell\n                    // - return {boolean}\n                    isDisabled: function(value, rowData) {\n                        return value == 2;\n                    },\n                    // - param {*} value - The changed value of the target cell\n                    // - param {Object} rowData - The data of the row that contains the target cell\n                    // - return {boolean}\n                    //\n                    isEditable: function(value, rowData) {\n                        return value != 3;\n                    },\n                    // - param {*} value - The changed value of the target cell\n                    // - param {Object} rowData - The data of the row that contains the target cell\n                    // - return {{text: string, value: number}[]}\n                    optionListChange: function(value, rowData) {\n                        if (value == 1) {\n                            console.log('changev return');\n                            return [\n                                { text: 'option 1', value: 1},\n                                { text: 'option 2', value: 2},\n                                { text: 'option 3', value: 3},\n                                { text: 'option 4', value: 4}\n                            ];\n                        }\n                    }\n                }\n            ]\n        },\n        {\n            title: 'checkbox',\n            columnName: 'column8',\n            editOption: {\n                type: 'checkbox',\n                list: [\n                    {text: 'option 1', value: 1},\n                    {text: 'option 2', value: 2},\n                    {text: 'option 3', value: 3},\n                    {text: 'option 4', value: 4}\n                ]\n            }\n        },\n        {\n            title: 'radio button',\n            columnName: 'column9',\n            editOption: {\n                type: 'radio',\n                list: [\n                    {text: 'option 1', value: 1},\n                    {text: 'option 2', value: 2},\n                    {text: 'option 3', value: 3},\n                    {text: 'option 4', value: 4}\n                ]\n            }\n        },\n    ],\n    columnMerge: [\n        {\n            'columnName' : 'mergeColumn1',\n            'title' : '1 + 2',\n            'columnNameList' : ['column1', 'column2']\n        },\n        {\n            'columnName' : 'mergeColumn2',\n            'title' : '1 + 2 + 3',\n            'columnNameList' : ['mergeColumn1', 'column3']\n        },\n        {\n            'columnName' : 'mergeColumn3',\n            'title' : '1 + 2 + 3 + 4 + 5',\n            'columnNameList' : ['mergeColumn2', 'column4', 'column5']\n        }\n    ]\n});\n\n     &lt;/script>\n *\n */\n\nvar View = require('./base/view');\nvar Core = require('./core');\n\n /**\n  * Toast UI \n  * @namespace\n  */\ntui = window.tui = tui || {};\n\ntui.Grid = View.extend(/**@lends tui.Grid.prototype */{\n    /**\n     * Initializes the instance.\n     * @param {Object} options - Options for the constructor\n     */\n    initialize: function(options) {\n        //grid 에서 public instance 를 참조할 수 있도록 자신의 참조 추가\n        options.publicInstance = this;\n        this.core = new Core(options);\n        this.listenTo(this.core, 'all', this._relayEvent, this);\n    },\n    /**\n     * Relay the internal events to the external.\n     * @private\n     */\n    _relayEvent: function() {\n        this.trigger.apply(this, arguments);\n    },\n    /**\n     * Disables the row identified by the rowkey.\n     * @param {(number|string)} rowKey - The unique key of the target row\n     */\n    disableRow: function(rowKey) {\n        this.core.disableRow(rowKey);\n    },\n    /**\n     * Enables the row identified by the rowKey.\n     * @param {(number|string)} rowKey - The unique key of the target row\n     */\n    enableRow: function(rowKey) {\n        this.core.enableRow(rowKey);\n    },\n    /**\n     * Returns the value of the cell identified by the rowKey and columnName.\n     * @param {(number|string)} rowKey - The unique key of the target row.\n     * @param {string} columnName - The name of the column\n     * @param {boolean} [isOriginal] - It set to true, the original value will be return.\n     * @return {(number|string)} - The value of the cell\n     */\n    getValue: function(rowKey, columnName, isOriginal) {\n        return this.core.getValue(rowKey, columnName, isOriginal);\n    },\n    /**\n     * Returns a list of all values in the specified column.\n     * @param {string} columnName - The name of the column\n     * @param {boolean} [isJsonString=false] - It set to true, return value will be converted to JSON string.\n     * @return {(Array|string)} - A List of all values in the specified column. (or JSON string of the list)\n     */\n    getColumnValues: function(columnName, isJsonString) {\n        return this.core.getColumnValues(columnName, isJsonString);\n    },\n    /**\n     * Returns the object that contains all values in the specified row.\n     * @param {(number|string)} rowKey - The unique key of the target row\n     * @param {boolean} [isJsonString=false] - If set to true, return value will be converted to JSON string.\n     * @return {(Object|string)} - The object that contains all values in the row. (or JSON string of the object)\n     */\n    getRow: function(rowKey, isJsonString) {\n        return this.core.getRow(rowKey, isJsonString);\n    },\n    /**\n     * Returns the object that contains all values in the row at specified index.\n     * @param {number} index - The index of the row\n     * @param {Boolean} [isJsonString=false] - If set to true, return value will be converted to JSON string.\n     * @return {Object|string} - The object that contains all values in the row. (or JSON string of the object)\n     */\n    getRowAt: function(index, isJsonString) {\n        return this.core.getRowAt(index, isJsonString);\n    },\n    /**\n     * Returns the total number of the rows.\n     * @return {number} - The total number of the rows\n     */\n    getRowCount: function() {\n        return this.core.getRowCount();\n    },\n    /**\n     * Returns the rowKey of the currently selected row.\n     * @return {(number|string)} - The rowKey of the row\n     */\n    getSelectedRowKey: function() {\n        return this.core.focusModel.which().rowKey;\n    },\n    /**\n     * Returns the jquery object of the cell identified by the rowKey and columnName.\n     * @param {(number|string)} rowKey - The unique key of the row\n     * @param {string} columnName - The name of the column\n     * @return {jQuery} - The jquery object of the cell element\n     */\n    getElement: function(rowKey, columnName) {\n        return this.core.getElement(rowKey, columnName);\n    },\n    /**\n     * Sets the value of the cell identified by the specified rowKey and columnName.\n     * @param {(number|string)} rowKey - The unique key of the row\n     * @param {string} columnName - The name of the column\n     * @param {(number|string)} columnValue - The value to be set\n     */\n    setValue: function(rowKey, columnName, columnValue) {\n        this.core.setValue(rowKey, columnName, columnValue);\n    },\n    /**\n     * Sets the all values in the specified column.\n     * @param {string} columnName - The name of the column\n     * @param {(number|string)} columnValue - The value to be set\n     * @param {Boolean} [isCheckCellState=true] - If set to true, only editable and not disabled cells will be affected.\n     */\n    setColumnValues: function(columnName, columnValue, isCheckCellState) {\n        this.core.setColumnValues(columnName, columnValue, isCheckCellState);\n    },\n    /**\n     * Replace all rows with the specified list. This will not change the original data.\n     * @param {Array} rowList - A list of new rows\n     */\n    replaceRowList: function(rowList) {\n        this.core.replaceRowList(rowList);\n    },\n    /**\n     * Replace all rows with the specified list. This will change the original data.\n     * @param {Array} rowList - A list of new rows\n     * @param {function} callback - The function that will be called when done.\n     */\n    setRowList: function(rowList, callback) {\n        this.core.setRowList(rowList, true, callback);\n    },\n    /**\n     * Sets focus on the cell identified by the specified rowKey and columnName.\n     * @param {(number|string)} rowKey - The unique key of the row\n     * @param {string} columnName - The name of the column\n     * @param {boolean} [isScrollable=false] - If set to true, the view will scroll to the cell element.\n     */\n    focus: function(rowKey, columnName, isScrollable) {\n        this.core.focusClipboard();\n        this.core.focus(rowKey, columnName, isScrollable);\n    },\n    /**\n     * Sets focus on the cell at the specified index of row and column.\n     * @param {(number|string)} rowIndex - The index of the row\n     * @param {string} columnIndex - The index of the column\n     * @param {boolean} [isScrollable=false] - If set to true, the view will scroll to the cell element.\n     */\n    focusAt: function(rowIndex, columnIndex, isScrollable) {\n        this.core.focusAt(rowIndex, columnIndex, isScrollable);\n    },\n    /**\n     * Sets focus on the cell at the specified index of row and column and starts to edit.\n     * @param {(number|string)} rowKey - The unique key of the row\n     * @param {string} columnName - The name of the column\n     * @param {boolean} [isScrollable=false] - If set to true, the view will scroll to the cell element.\n     */\n    focusIn: function(rowKey, columnName, isScrollable) {\n        this.core.focusIn(rowKey, columnName, isScrollable);\n    },\n    /**\n     * Sets focus on the cell at the specified index of row and column and starts to edit.\n     * @param {(number|string)} rowIndex - The index of the row\n     * @param {string} columnIndex - The index of the column\n     * @param {boolean} [isScrollable=false] - If set to true, the view will scroll to the cell element.     */\n    focusInAt: function(rowIndex, columnIndex, isScrollable) {\n        this.core.focusInAt(rowIndex, columnIndex, isScrollable);\n    },\n    /**\n     * Makes view ready to get keyboard input.\n     */\n    readyForKeyControl: function() {\n        this.core.readyForKeyControl();\n    },\n    /**\n     * Removes focus from the focused cell.\n     */\n    blur: function() {\n        this.core.blur();\n    },\n    /**\n     * Checks all rows.\n     */\n    checkAll: function() {\n        this.core.checkAll();\n    },\n    /**\n     * Checks the row identified by the specified rowKey.\n     * @param {(number|string)} rowKey - The unique key of the row\n     */\n    check: function(rowKey) {\n        this.core.check(rowKey);\n    },\n    /**\n     * Unchecks all rows.\n     */\n    uncheckAll: function() {\n        this.core.uncheckAll();\n    },\n    /**\n     * Unchecks the row identified by the specified rowKey.\n     * @param {(number|string)} rowKey - The unique key of the row\n     */\n    uncheck: function(rowKey) {\n        this.core.uncheck(rowKey);\n    },\n    /**\n     * Removes all rows.\n     */\n    clear: function() {\n        this.core.clear();\n    },\n    /**\n     * Removes the row identified by the specified rowKey.\n     * @param {(number|string)} rowKey - The unique key of the row\n     * @param {(boolean|object)} [options] - Options. If the type is boolean, this value is equivalent to  options.removeOriginalData.\n     * @param {boolean} [options.removeOriginalData] - If set to true, the original data will be removed.\n     * @param {boolean} [options.keepRowSpanData] - If set to true, the value of the merged cells will not be removed although the target is first cell of them.\n     */\n    removeRow: function(rowKey, options) {\n        if (tui.util.isBoolean(options) &amp;&amp; options) {\n            options = {\n                removeOriginalData: true\n            };\n        }\n        this.core.removeRow(rowKey, options);\n    },\n    /**\n     * Removes all checked rows.\n     * @param {boolean} isConfirm - If set to true, confirm message will be shown before remove.\n     * @return {boolean} - True if there's at least one row removed.\n     */\n    removeCheckedRows: function(isConfirm) {\n        return this.core.removeCheckedRows(isConfirm);\n    },\n    /**\n     * Enables the row identified by the rowKey to be able to check.\n     * @param {(number|string)} rowKey - The unique key of the row\n     */\n    enableCheck: function(rowKey) {\n        this.core.enableCheck(rowKey);\n    },\n    /**\n      * Disables the row identified by the spcified rowKey to not be abled to check.\n     * @param {(number|string)} rowKey - The unique keyof the row.\n     */\n    disableCheck: function(rowKey) {\n        this.core.disableCheck(rowKey);\n    },\n    /**\n     * Returns a list of the rowKey of checked rows.\n     * @param {Boolean} [isJsonString=false] - If set to true, return value will be converted to JSON string.\n     * @return {Array|string} - A list of the rowKey. (or JSON string of the list)\n     */\n    getCheckedRowKeyList: function(isJsonString) {\n        var checkedRowKeyList = this.core.getCheckedRowKeyList();\n        return isJsonString ? $.toJSON(checkedRowKeyList) : checkedRowKeyList;\n    },\n    /**\n     * Returns a list of the checked rows.\n     * @param {Boolean} [isJsonString=false] - If set to true, return value will be converted to JSON string.\n     * @return {Array|string} - A list of the checked rows. (or JSON string of the list)\n     */\n    getCheckedRowList: function(isJsonString) {\n        var checkedRowList = this.core.getCheckedRowList();\n        return isJsonString ? $.toJSON(checkedRowList) : checkedRowList;\n    },\n    /**\n     * Returns a list of the column model.\n     * @return {Array} - A list of the column model.\n     */\n    getColumnModelList: function() {\n        return this.core.getColumnModelList();\n    },\n    /**\n     * Returns the object that contains the lists of changed data compared to the original data.\n     * The object has properties 'createList', 'updateList', 'deleteList'.\n     * @param {Object} [options] Options\n     *      @param {boolean} [options.isOnlyChecked=false] - If set to true, only checked rows will be considered.\n     *      @param {boolean} [options.isRaw=false] - If set to true, the data will contains the row data for internal use.\n     *      @param {boolean} [options.isOnlyRowKeyList=false] - If set to true, only keys of the changed rows will be returned.\n     *      @param {Array} [options.filteringColumnList] - A list of column name to be excluded.\n     * @return {{createList: Array, updateList: Array, deleteList: Array}} - Object that contains the result list.\n     */\n    getModifiedRowList: function(options) {\n        return this.core.getModifiedRowList(options);\n    },\n    /**\n     * Insert the new row with specified data to the end of table.\n     * @param {object} [row] - The data for the new row\n     * @param {object} [options] - Options\n     * @param {number} [options.at] - The index at which new row will be inserted\n     * @param {boolean} [options.extendPrevRowSpan] - If set to true and the previous row at target index has a rowspan data, the new row will extend the existing rowspan data.\n     */\n    appendRow: function(row, options) {\n        this.core.appendRow(row, options);\n    },\n    /**\n     * Insert the new row with specified data to the beginning of table.\n     * @param {object} [row] - The data for the new row\n     */\n    prependRow: function(row) {\n        this.core.prependRow(row);\n    },\n    /**\n     * Returns true if there are at least one row changed.\n     * @return {boolean} - True if there are at least one row changed.\n     */\n    isChanged: function() {\n        return this.core.isChanged();\n    },\n    /**\n     * Returns the instance of specified AddOn.\n     * @param {string} name - The name of the AddOn\n     * @return {instance} addOn - The instance of the AddOn\n     */\n    getAddOn: function(name) {\n        return name ? this.core.addOn[name] : this.core.addOn;\n    },\n    /**\n     * Restores the data to the original data.\n     * (Original data is set by {@link tui.Grid#setRowList|setRowList}\n     */\n    restore: function() {\n        this.core.restore();\n    },\n    /**\n     * Selects the row identified by the rowKey.\n     * @param {(number|string)} rowKey - The unique key of the row\n     */\n    select: function(rowKey) {\n        this.core.select(rowKey);\n    },\n    /**\n     * Unselects selected rows.\n     */\n    unselect: function() {\n        this.core.unselect();\n    },\n    /**\n     * Sets the index of fixed column.\n     * @param {number} index - The index of column to be fixed\n     */\n    setColumnFixCount: function(index) {\n        this.core.setColumnFixCount(index);\n    },\n    /**\n     * Sets the list of column model.\n     * @param {Array} columnModelList - A new list of column model\n     */\n    setColumnModelList: function(columnModelList) {\n        this.core.setColumnModelList(columnModelList);\n    },\n    /**\n     * Create an specified AddOn and use it on this instance.\n     * @param {string} name - The name of the AddOn to use.\n     * @param {object} options - The option objects for configuring the AddON.\n     * @return {tui.Grid} - This instance.\n     */\n    use: function(name, options) {\n        this.core.use(name, options);\n        return this;\n    },\n    /**\n     * Returns a list of all rows.\n     * @return {Array} - A list of all rows\n     */\n    getRowList: function() {\n        return this.core.getRowList();\n    },\n    /**\n     * Sorts all rows by the specified column.\n     * @param {string} columnName - The name of the column to be used to compare the rows\n     */\n    sort: function(columnName) {\n        this.core.sort(columnName);\n    },\n    /**\n     * Unsorts all rows. (Sorts by rowKey).\n     */\n    unSort: function() {\n        this.core.sort('rowKey');\n    },\n    /**\n     * Adds the specified css class to cell element identified by the rowKey and className\n     * @param {(number|string)} rowKey - The unique key of the row\n     * @param {string} columnName - The name of the column\n     * @param {string} className - The css class name to add\n     */\n    addCellClassName: function(rowKey, columnName, className) {\n        this.core.addCellClassName(rowKey, columnName, className);\n    },\n    /**\n     * Adds the specified css class to all cell elements in the row identified by the rowKey\n     * @param {(number|string)} rowKey - The unique key of the row\n     * @param {string} className - The css class name to add\n     */\n    addRowClassName: function(rowKey, className) {\n        this.core.addRowClassName(rowKey, className);\n    },\n    /**\n     * Removes the specified css class from the cell element indentified by the rowKey and columnName.\n     * @param {(number|string)} rowKey - The unique key of the row\n     * @param {string} columnName - The name of the column\n     * @param {string} className - The css class name to be removed\n     */\n    removeCellClassName: function(rowKey, columnName, className) {\n        this.core.removeCellClassName(rowKey, columnName, className);\n    },\n    /**\n     * Removes the specified css class from all cell elements in the row identified by the rowKey.\n     * @param {(number|string)} rowKey - The unique key of the row\n     * @param {string} className - The css class name to be removed\n     */\n    removeRowClassName: function(rowKey, className) {\n        this.core.removeRowClassName(rowKey, className);\n    },\n    /**\n     * Returns the rowspan data of the cell identified by the rowKey and columnName.\n     * @param {(number|string)} rowKey - The unique key of the row\n     * @param {string} columnName - The name of the column\n     */\n    getRowSpanData: function(rowKey, columnName) {\n        this.core.getRowSpanData(rowKey, columnName);\n    },\n    /**\n     * Returns the index of the row indentified by the rowKey.\n     * @param {number|string} rowKey - The unique key of the row\n     * @return {number} - The index of the row\n     */\n    getIndexOfRow: function(rowKey) {\n        return this.core.getIndexOfRow(rowKey);\n    },\n    /**\n     * Sets the number of rows to be shown in the table area.\n     * @param {number} count - The number of rows\n     */\n    setDisplayRowCount: function(count) {\n        this.core.setDisplayRowCount(count);\n    },\n     /**\n      * Sets the width and height of the dimension.\n      * @param  {(number|null)} width - The width of the dimension\n      * @param  {(number|null)} height - The height of the dimension\n      */\n    setSize: function(width, height) {\n        this.core.setSize(width, height);\n    },\n    /**\n     * Refresh the layout view. Use this method when the view was rendered while hidden.\n     */\n    refreshLayout: function() {\n        this.core.updateLayoutData();\n    },\n    /**\n     * Show columns\n     * @param {...string} arguments - Column names to show\n     */\n    showColumn: function() {\n        var args = tui.util.toArray(arguments);\n        this.core.columnModel.setHidden(args, false);\n    },\n    /**\n     * Hide columns\n     * @param {...string} arguments - Column names to hide\n     */\n    hideColumn: function() {\n        var args = tui.util.toArray(arguments);\n        this.core.columnModel.setHidden(args, true);\n    },\n    /**\n     * Destroys the instance.\n     */\n    destroy: function() {\n        this.core.destroy();\n        this.core = null;\n    }\n});\n\ntui.Grid.getInstanceById = function(id) {\n    return Core.prototype.__instance[id];\n};\n</code></pre>\n        </article>\n    </section>\n\n\n\n</div>\n\n"