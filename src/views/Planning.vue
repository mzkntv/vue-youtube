<template>
  <div>
    <div class="page-title">
      <h3>Планирование</h3>
      <h4>{{info.bill | currency}}</h4>
    </div>

    <Loader v-if="loading"/>

    <p v-else-if="!categories.length" class="center">Категорий пока нет</p>

    <section v-else>
      <div
        v-for="cat in categories"
        :key="cat.id"
      >
        <p>
          <strong>{{cat.title}}:</strong>
          {{cat.spend | currency}} из {{cat.limit | currency}}
        </p>
        <div class="progress">
          <div
              class="determinate"
              :class="[cat.progressColor]"
              :style="{width: cat.progressPercent + '%'}"
          ></div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  metaInfo() {
    return {
      title: this.$title('ProfileTitle'),
    };
  },
  name: 'planning',
  data() {
    return {
      loading: true,
      categories: [],
    };
  },
  computed: {
    ...mapGetters(['info']),
  },
  async mounted() {
    const records = await this.$store.dispatch('fetchRecords');
    const categories = await this.$store.dispatch('fetchCategories');

    this.categories = categories.map((cat) => {
      const spend = records
        .filter((r) => r.categoryId === cat.id)
        .filter((r) => r.type === 'outcome')
        .reduce((total, record) => {
          let ttl = total;
          ttl += +record.amount;
          return ttl;
        }, 0);

      const percent = (100 * spend) / cat.limit;
      const progressPercent = percent > 100 ? 100 : percent;

      const progressColor = percent < 60
        ? 'green'
        : percent < 100
          ? 'yellow'
          : 'red';

      return {
        ...cat,
        progressPercent,
        progressColor,
        spend,
      };
    });

    this.loading = false;
  },
};
</script>
