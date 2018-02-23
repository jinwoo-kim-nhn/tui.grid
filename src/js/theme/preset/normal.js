/**
* @fileoverview default theme preset
* @author NHN Ent. FE Development Team
*/

'use strict';

module.exports = {
    selection: {
        background: '#4daaf9',
        border: '#004082'
    },
    heightResizeHandle: {
        border: '#ccc',
        background: '#fff'
    },
    pagination: {
        border: 'transparent',
        background: 'transparent'
    },
    scrollbar: {
        border: '#eee',
        background: '#fff',
        foreground: '#eee',
        thumb: '#eee',
        active: '#eee'
    },
    area: {
        header: {
            background: '#eee',
            border: '#aaa',
            showVerticalBorder: false
        },
        body: {
            background: '#eee',
            border: '#aaa',
            showVerticalBorder: false
        },
        summary: {
            background: '#fff',
            showVerticalBorder: false
        }
    },
    cell: {
        normal: {
            background: '#f4f4f4',
            border: '#eee',
            text: '#333',
            showVerticalBorder: false,
            showHorizontalBorder: true
        },
        head: {
            background: '#fff',
            border: '#eee',
            text: '#222',
            showVerticalBorder: true,
            showHorizontalBorder: true
        },
        rowHead: {
            background: '#fff',
            border: '#eee',
            text: '#333',
            showVerticalBorder: true,
            showHorizontalBorder: true
        },
        summary: {
            background: '#fff',
            border: '#eee',
            text: '#333',
            showVerticalBorder: false,
            showHorizontalBorder: true
        },
        selectedHead: {
            background: '#d8d8d8'
        },
        focused: {
            border: '#418ed4'
        },
        focusedInactive: {
            border: '#aaa'
        },
        required: {
            background: '#fffdeb'
        },
        editable: {
            background: '#fff'
        },
        disabled: {
            text: '#b0b0b0'
        },
        dummy: {
            background: '#fff'
        },
        invalid: {
            background: '#ff8080'
        },
        evenRow: {},
        oddRow: {},
        currentRow: {}
    }
};
