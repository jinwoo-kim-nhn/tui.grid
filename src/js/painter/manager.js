/**
 * @fileoverview Painter Manager
 * @author NHN Ent. FE Development Team
 */
'use strict';

var RowPainter = require('./row');
var CellPainter = require('./cell');
var DummyCellPainter = require('./dummyCell');
var TextPainter = require('./input/text');
var SelectPainter = require('./input/select');
var ButtonPainter = require('./input/button');

/**
 * Painter manager
 * @module painter/manager
 */
var PainterManager = tui.util.defineClass(/**@lends module:painter/manager.prototype */{
    /**
     * @constructs
     * @param {Object} options - Options
     */
    init: function(options) {
        this.gridId = options.gridId;
        this.selectType = options.selectType;

        this.inputPainters = this._createInputPainters(options.controller);
        this.cellPainters = this._createCellPainters(options.controller);
        this.rowPainter = this._createRowPainter();
    },

    /**
     * Creates instances of input painters and returns the object that stores them
     * using 'inputType' as keys.
     * @param {module:painter/controller} controller - painter controller
     * @returns {Object}
     * @private
     */
    _createInputPainters: function(controller) {
        return {
            text: new TextPainter({
                controller: controller,
                inputType: 'text'
            }),
            password: new TextPainter({
                controller: controller,
                inputType: 'password'
            }),
            checkbox: new ButtonPainter({
                controller: controller,
                inputType: 'checkbox'
            }),
            radio: new ButtonPainter({
                controller: controller,
                inputType: 'radio'
            }),
            select: new SelectPainter({
                controller: controller
            })
        };
    },

    /**
     * Creates instances of cell painters and returns the object that stores them
     * using 'editType' as keys.
     * @param {module:painter/controller} controller - painter controller
     * @returns {Object} Key-value object
     * @private
     */
    _createCellPainters: function(controller) {
        var cellPainters = {
            dummy: new DummyCellPainter({
                controller: controller
            }),
            normal: new CellPainter({
                controller: controller,
                editType: 'normal'
            })
        };

        _.each(this.inputPainters, function(inputPainter, editType) {
            cellPainters[editType] = new CellPainter({
                editType: editType,
                controller: controller,
                inputPainter: inputPainter
            });
        }, this);

        return cellPainters;
    },

    /**
     * Creates row painter and returns it.
     * @returns {module:painter/row} New row painter instance
     */
    _createRowPainter: function() {
        return new RowPainter({
            painterManager: this
        });
    },

    /**
     * Returns an instance of cell painter which has given editType
     * @param {String} editType - Edit type
     * @returns {Object} - Cell painter instance
     */
    getCellPainter: function(editType) {
        return this.cellPainters[editType];
    },

    /**
     * Returns all cell painters
     * @returns {Object} Object that has edit-type as a key and cell painter as a value
     */
    getCellPainters: function() {
        return this.cellPainters;
    },

    /**
     * Returns a row painter
     * @returns {module:painter/row} Row painter
     */
    getRowPainter: function() {
        return this.rowPainter;
    }
});

module.exports = PainterManager;
