# Vue Client Table

Vue component for rendering a client side table with pagination, grouping, sorting, filtering, details row

## Install

`npm i ssh://git@bitbucket.ena.net:7999/ecl/vue-client-table.git`

## Usage:

```html
<client-table :columns="columns" :options="options" :data="data"></client-table>
```

### As plugin (or in Browser)

```javascript
// this will add create the global (window) object "VueClientTable"
import 'ena-caf-vue-client-table/dist/vue-client-table.min';
// or include as script in html : <script type="text/javascript" src="node_modules/ena-caf-vue-client-table/dist/vue-client-table.min.js"></script>

// registers the component globally
Vue.use(window.VueClientTable);

// in the view that contains the table
const MyView = new Vue({
	data() {
    	return {
    		columns: ['column1', 'column2'],
    	};
    },
    computed: {
	    data() {
	      return this.$store.state.myListData; // or any other source that has all data
	    },
	},
    options: {
        // key-value pairs with the headings to overwrite (label to display)
		// can also be overwritten with slot: "heading_colname"
		headings: {},
		// key-value pairs with templates (components) for the column value
		templates: {},
		// key-value pairs with custom search function per column
		search: {},
		groupBy: false,
		toggleGroups: false,
		groupMeta: {},
		uniqueKey: 'id',
		childRow: false,
        sortable: {}, // empty object to disable sorting for all, or define what columns are sortable; defaults to all sortable
        pagination: false, // false, to disable pagination - show all; defaults to true
		perPage: 10, // number of items per page
		pageInterval: 9, // how many pages to show in the paginator. Odd number
		perPageValues: [1, 2, 5, 10, 20, 50],
    },
});
```

### As module/local component

```javascript
import ClientTable from 'ena-caf-vue-client-table';

// in the view that contains the table
const MyView = new Vue({
	components: {
		ClientTable
	},
	data() {
    	return {
    		columns: ['column1', 'column2'],
    	};
    },
    computed: {
	    data() {
	      return this.$store.state.myListData; // or any other source that has all data
	    },
	},
    options: {
        // key-value pairs with the headings to overwrite (label to display)
		// can also be overwritten with slot: "heading_colname"
		headings: {},
		// key-value pairs with templates (components) for the column value
		templates: {},
		// key-value pairs with custom search function per column
		search: {},
		groupBy: false,
		toggleGroups: false,
		groupMeta: {},
		uniqueKey: 'id',
		childRow: false,
        sortable: {}, // empty object to disable sorting for all, or define what columns are sortable; defaults to all sortable
        pagination: false, // false, to disable pagination - show all; defaults to true
		perPage: 10, // number of items per page
		pageInterval: 9, // how many pages to show in the paginator. Odd number
		perPageValues: [1, 2, 5, 10, 20, 50],
    },
});
```

