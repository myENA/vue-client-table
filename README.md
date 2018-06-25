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
		headings: {},
		// key-value pairs with templates (components) for the column value
		templates: {},
		// key-value pairs with custom search function per column
		search: {},
		// field to group by
		groupBy: false,
		// expand/collapse groups
		toggleGroups: false,
		// object of data to use for each group "header" (key is the group value)
		groupMeta: {},
		// required, unique identifier
		uniqueKey: 'id',
		// show extra row for each row with details
		childRow: false,
		// empty object to disable sorting for all, or define what columns are sortable; defaults to all sortable
        sortable: {},
        // false, to disable pagination - show all; defaults to true
        pagination: false,
        // number of items per page
		perPage: 10,
		// how many pages to show in the paginator. Odd number
		pageInterval: 9,
		// values to show in the selector of items per page
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
    },
});
```

