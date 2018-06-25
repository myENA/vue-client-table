<template>
  <div>
    <slot name="filter">
      <div>
        <div class="row">
          <div class="col-md-2">
            <slot name="filters">
              <div class="form-group">
                <label>Search</label>
                <div class="input-group">
                  <input type="text" class="form-control" placeholder="Search by keyword" v-on:input="search($event.target.value)" />
                  <span class="input-group-addon"><i class="fa fa-search"></i></span>
                </div>
              </div>
            </slot>
          </div>
          <div class="col-md-10">
            <div class="pull-right">
              <div class="form-group">
                <label>&nbsp;</label>
                <div>
                  <slot name="buttons"></slot>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </slot>
    <div class="table-responsive">
      <table class="table">
        <thead>
          <tr>
            <th v-for="key in columns" :key="key" @click="sortBy(key)"
              :class="{ sortable: opts.sortable[key], sorted: sortKey === key }">
              <slot :name="'heading_' + key">
                {{ key | heading(opts.headings) }}
              </slot>
              <i v-if="opts.sortable[key]" class="fa"
                :class="{
                  'fa-sort': sortKey !== key,
                  'fa-sort-asc': sortKey === key && sortOrders[key] > 0,
                  'fa-sort-desc': sortKey === key && sortOrders[key] < 0,
                }">
              </i>
            </th>
            <th v-if="opts.toggleGroups"></th>
          </tr>
        </thead>
        <tbody v-for="(group, groupKey) in pageData" :key="groupKey">
          <tr v-if="groupKey !== 'all'">
            <th :colspan="columns.length + (opts.childRow ? 1 : 0)">
              <a href="#" @click.prevent="toggleGroup(groupKey)">
                <i class="fa" :class="{
                  'fa-chevron-down': isShown(groupKey),
                  'fa-chevron-right': !isShown(groupKey),
                }"></i>
              </a>
              <slot name="__group_meta" v-bind:data="opts.groupMeta[groupKey]">
                {{groupKey}}
              </slot>
            </th>
          </tr>
          <template v-for="(entry, index) in group">
            <tr
              v-if="isShown(groupKey)"
              :key="'row_'+entry[opts.uniqueKey]"
              :data-id="entry[opts.uniqueKey]"
              >
              <td v-for="key in columns" :key="'cell_'+key">
                <slot :name="'column_' + key" v-bind:row="entry">
                  <component v-if="opts.templates[key]" v-bind:is="opts.templates[key]" :data="entry" :column="key" :index="index"></component>
                  <template v-else>{{entry[key]}}</template>
                </slot>
              </td>
              <td v-if="opts.childRow">
                <a href="#" @click.prevent="toggleRow(entry[opts.uniqueKey])">{{isRowExpanded(entry[opts.uniqueKey]) ? 'Hide details' : 'Show details'}}</a>
              </td>
            </tr>
            <tr
              v-show="opts.childRow && isShown(groupKey) && isRowExpanded(entry[opts.uniqueKey])"
              :key="'child_row_'+entry[opts.uniqueKey]"
              :data-child="entry[opts.uniqueKey]"
              >
              <td :colspan="columns.length + (opts.childRow ? 1 : 0)">
                <slot name="child_row" v-bind:row="entry">
                </slot>
              </td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>
    <div class="row" v-if="opts.pagination">
      <div class="col-md-6">
        <nav aria-label="Page navigation">
          <ul class="pagination">
            <li :class="{ disabled: currentPage === 1}">
              <a href="#" aria-label="Firs" @click.prevent="goToPage(1)">
                <span aria-hidden="true"><i class="fa fa-angle-double-left"></i></span>
              </a>
            </li>
            <li :class="{ disabled: currentPage === 1}">
              <a href="#" aria-label="Previous" @click.prevent="goToPage(currentPage-1)">
                <span aria-hidden="true"><i class="fa fa-angle-left"></i></span>
              </a>
            </li>
            <li v-for="page in pagesToShow"
              :key="page"
              :class="{ active: page === currentPage }">
              <a href="#" @click.prevent="goToPage(page)">{{page}}</a>
            </li>
            <li :class="{ disabled: currentPage === totalPages }">
              <a href="#" aria-label="Next" @click.prevent="goToPage(currentPage+1)">
                <span aria-hidden="true"><i class="fa fa-angle-right"></i></span>
              </a>
            </li>
            <li :class="{ disabled: currentPage === totalPages }">
              <a href="#" aria-label="Last" @click.prevent="goToPage(totalPages)">
                <span aria-hidden="true"><i class="fa fa-angle-double-right"></i></span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
      <div class="col-md-6">
        <div class="form-inline recordsInfo">
          <div class="form-group">
            <p class="form-control-static">
              Showing {{startRow+1}} to {{endRow}} of {{totalRows}} rows
            </p>
          </div>
          <div class="form-group">
            <select v-model="perPage" class="perPageSelector form-control">
              <option
                v-for="perPageValue in opts.perPageValues"
                :value="perPageValue"
                :key="perPageValue"
                >
                {{perPageValue}}
              </option>
            </select>
          </div>
          <div class="form-group">
            <p class="form-control-static">
              records per page
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less">
.table {
  border-bottom: 1px solid #ddd;
  > thead:first-child > tr:first-child > th {
    border-top: 1px solid #333;
    border-bottom: 1px solid #333;
  }
  tbody > tr:first-child > th {
    background-color: #F2F2F2;
    a + span {
      margin-left: 5px;
    }
    a {
      color: #333;
      font-size: 16px;
      display: inline-block;
      width: 20px;
      text-align: center;
    }
  }
  .checkbox {
    margin: 0;
    label {
      min-height: 18px;
    }
  }
  .sort-handle {
    color: #333;
    font-size: 12px;
    display: inline-block;
    width: 20px;
    text-align: center;
    cursor: move;
  }
}
th.sortable {
  cursor: pointer;
  i {
    margin-top: 5px;
    margin-left: 5px;
  }
}
.pagination {
  margin: 0;
}
.recordsInfo{
  .perPageSelector{
    margin-left: 20px;
    margin-right: 10px;
  }
  float: right;
}
</style>

<script type="text/javascript">
export default {
  props: {
    data: Array,
    columns: Array,
    searchQuery: String,
    options: {
      type: Object,
      default() {
        return {};
      },
    },
    defaults: {
      type: Object,
      default() {
        return {
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
          sortable: false,
          pagination: true,
          perPage: 1,
          pageInterval: 5,
          perPageValues: [1, 2, 5, 10, 20],
        };
      },
    },
  },
  data() {
    const sortOrders = {};
    this.columns.forEach((key) => {
      sortOrders[key] = 1;
    });
    return {
      sortOrders,
      sortKey: '',
      searchBy: '',
      shown: {},
      expandedRows: {},
      currentPage: 1,
      perPage: this.options.perPage || this.defaults.perPage,
    };
  },
  computed: {
    opts() {
      const opts = Object.assign(
        {},
        this.defaults,
        this.options
      );
      const sortable = {};
      this.columns.forEach((key) => {
        if (opts.sortable === false || opts.sortable[key]) {
          sortable[key] = true;
        }
      });
      return Object.assign(
        opts,
        {
          sortable,
        }
      );
    },
    pagesToShow() {
      const halfInterval = (this.opts.pageInterval - 1) / 2;
      let startPage = Math.max(1, this.currentPage - halfInterval);
      let endPage = Math.min(this.totalPages, this.currentPage + halfInterval);
      if (this.totalPages <= this.opts.pageInterval) {
        startPage = 1;
        endPage = this.totalPages;
      } else {
        while (endPage - startPage < this.opts.pageInterval - 1) {
          // stabilize the interval
          endPage = Math.min(this.totalPages, startPage + this.opts.pageInterval - 1);
          startPage = Math.max(1, endPage - this.opts.pageInterval + 1);
        }
      }
      const pages = [];
      for (let i = startPage; i <= endPage; i += 1) {
        pages.push(i);
      }
      return pages;
    },
    totalPages() {
      return Math.ceil(this.filteredData.length / this.perPage);
    },
    startRow() {
      return (this.currentPage - 1) * this.perPage;
    },
    endRow() {
      return Math.min(this.startRow + this.perPage, this.totalRows);
    },
    totalRows() {
      return this.filteredData.length;
    },
    filteredData() {
      let { data } = this;
      const searchQuery = this.searchBy && this.searchBy.toLowerCase();
      if (searchQuery) {
        data = data.filter(
          row => Object.keys(row).some(
            (key) => {
              if (this.opts.search[key]) {
                return this.opts.search[key](row, key, searchQuery);
              }
              return String(row[key]).toLowerCase().indexOf(searchQuery) > -1;
            }
          )
        );
      }
      return data;
    },
    pageData() {
      const { sortKey } = this;
      let data = this.filteredData;
      const order = this.sortOrders[sortKey] || 1;
      if (sortKey) {
        data = data.slice().sort((a, b) => {
          const aF = a[sortKey];
          const bF = b[sortKey];
          return (aF === bF ? 0 : aF > bF ? 1 : -1) * order;
        });
      }
      if (this.opts.pagination) {
        // slice the data if pagionation is enabled
        data = data.slice(this.startRow, this.endRow);
      }
      if (this.opts.groupBy) {
        return data.reduce((accumulator, row) => {
          (accumulator[row[this.opts.groupBy]] = accumulator[row[this.opts.groupBy]] || [])
            .push(row);
          return accumulator;
        }, {});
      }
      return { all: data };
    },
  },
  filters: {
    heading(key, headings) {
      if (undefined !== headings[key]) {
        return headings[key];
      }
      return key.charAt(0).toUpperCase() + key.slice(1);
    },
  },
  methods: {
    search(value) {
      this.searchBy = value;
    },
    sortBy(key) {
      if (this.opts.sortable[key]) {
        this.sortKey = key;
        this.sortOrders[key] = this.sortOrders[key] * -1;
      }
    },
    isShown(key) {
      return typeof this.shown[key] === 'undefined' || this.shown[key];
    },
    toggleGroup(key) {
      this.shown[key] = typeof this.shown[key] === 'undefined' ? false : !this.shown[key];
      this.shown = Object.assign({}, this.shown);
    },
    toggleRow(id) {
      this.expandedRows[id] = !this.expandedRows[id];
      this.expandedRows = Object.assign({}, this.expandedRows);
    },
    isRowExpanded(id) {
      return this.expandedRows[id];
    },
    goToPage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page;
      }
    },
  },
  watch: {
    searchQuery(query) {
      this.searchBy = query;
    },
    searchBy() {
      // go to first page when search query changes
      this.currentPage = 1;
    },
  },
};
</script>
