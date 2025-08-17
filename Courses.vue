<template>
  <div class="courses-container">
    <header class="page-header">
      <h1>التدريبات النوعية المجانية</h1>
      <p>اختر مسارك التعليمي وابدأ رحلة التعلم</p>
    </header>

    <div class="filters">
      <select v-model="categoryFilter" @change="filterCourses">
        <option value="">جميع التصنيفات</option>
        <option v-for="cat in categories" :value="cat" :key="cat">{{ cat }}</option>
      </select>
      
      <select v-model="levelFilter" @change="filterCourses">
        <option value="">جميع المستويات</option>
        <option value="beginner">مبتدئ</option>
        <option value="intermediate">متوسط</option>
        <option value="advanced">متقدم</option>
      </select>
    </div>

    <div class="courses-grid">
      <div v-for="course in filteredCourses" :key="course.slug" class="course-card">
        <router-link :to="`/courses/${course.slug}`">
          <img :src="course.thumbnail" :alt="course.title" class="course-thumbnail">
          <div class="course-info">
            <h3>{{ course.title }}</h3>
            <p>{{ course.description.substring(0, 100) }}...</p>
            <div class="course-meta">
              <span class="level-badge" :class="course.level">{{ getLevelName(course.level) }}</span>
              <span class="resources-count">{{ course.resources.length }} مصادر</span>
            </div>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      courses: [],
      filteredCourses: [],
      categories: [],
      categoryFilter: '',
      levelFilter: ''
    }
  },
  async created() {
    const response = await this.$http.get('/api/courses');
    this.courses = response.data;
    this.filteredCourses = this.courses;
    this.extractCategories();
  },
  methods: {
    extractCategories() {
      const categories = new Set();
      this.courses.forEach(course => categories.add(course.category));
      this.categories = Array.from(categories);
    },
    filterCourses() {
      this.filteredCourses = this.courses.filter(course => {
        const categoryMatch = !this.categoryFilter || course.category === this.categoryFilter;
        const levelMatch = !this.levelFilter || course.level === this.levelFilter;
        return categoryMatch && levelMatch;
      });
    },
    getLevelName(level) {
      const levels = {
        beginner: 'مبتدئ',
        intermediate: 'متوسط',
        advanced: 'متقدم'
      };
      return levels[level];
    }
  }
}
</script>

<style scoped>
.courses-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.page-header {
  text-align: center;
  margin-bottom: 2rem;
}

.filters {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
}

select {
  padding: 0.5rem;
  border-radius: 4px;
  border: 1px solid #ddd;
}

.courses-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
}

.course-card {
  border: 1px solid #eee;
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.3s ease;
}

.course-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0,0,0,0.1);
}

.course-thumbnail {
  width: 100%;
  height: 180px;
  object-fit: cover;
}

.course-info {
  padding: 1rem;
}

.course-meta {
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
}

.level-badge {
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.8rem;
}

.level-badge.beginner {
  background-color: #e3f2fd;
  color: #1976d2;
}

.level-badge.intermediate {
  background-color: #e8f5e9;
  color: #388e3c;
}

.level-badge.advanced {
  background-color: #fce4ec;
  color: #d81b60;
}

.resources-count {
  color: #666;
  font-size: 0.8rem;
}
</style>
