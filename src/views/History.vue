<template>
  <div>
    <div class="page-title">
      <h3>История записей</h3>
    </div>

    <div class="history-chart">
      <!-- <Chart :chartdata="chartdata" :options="options"/> -->
    </div>

    <Loader v-if="loading" />
    <p class="center" v-else-if="!records.length">Записей пока нет</p>
    <section v-else>
      <HistoryTable :records="items" />

      <Paginate
        v-model="page"
        :page-count="pageCount"
        :click-handler="pageChangeHandler"
        :prev-text="'Назад'"
        :next-text="'Вперед'"
        :class="'pagination'"
        :page-class="'waves-effect'"
      />
    </section>
  </div>
</template>

<script>
import HistoryTable from '@/components/app/HistoryTable.vue';
import paginationMixin from '@/mixins/pagination.mixin';
// import Chart from '@/components/app/Chart.vue';

export default {
  metaInfo() {
    return {
      title: this.$title('ProfileTitle'),
    };
  },
  name: 'history',
  mixins: [paginationMixin],
  data() {
    return {
      loading: true,
      records: [],
      chartdata: {
        labels: ['January', 'February'],
        datasets: [
          {
            label: 'Data One',
            backgroundColor: '#f87979',
            data: [40, 20],
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
      },
    };
  },
  async mounted() {
    this.records = await this.$store.dispatch('fetchRecords');
    const categories = await this.$store.dispatch('fetchCategories');

    this.setup(categories);
    this.loading = false;
  },
  methods: {
    setup(categories) {
      this.setupPagination(this.records.map((record) => {
        return {
          ...record,
          categoryName: categories.find((c) => c.id === record.categoryId).title,
          typeClass: record.type === 'income' ? 'green' : 'red',
          typeText: record.type === 'income' ? 'Доход' : 'Расход',
        };
      }));
    },
  },
  components: {
    HistoryTable,
  },
};
</script>
