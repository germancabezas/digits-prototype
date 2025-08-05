<template>
  <div class="flex items-center gap-3 bg-white rounded-lg">
    <!-- Filter Tags -->
    <div class="flex flex-wrap items-center gap-2">
      <!-- Client Filter Tag -->
      <div v-if="filters.selectedClient" class="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
        <span class="font-medium">Client:</span>
        <span>{{ filters.selectedClient }}</span>
        <button @click="removeFilter('selectedClient')" class="ml-1 hover:bg-blue-200 rounded-full p-0.5">
          <XMarkIcon class="w-3 h-3" />
        </button>
      </div>

      <!-- Project Filter Tag -->
      <div v-if="filters.selectedProject" class="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">
        <span class="font-medium">Project:</span>
        <span>{{ filters.selectedProject }}</span>
        <button @click="removeFilter('selectedProject')" class="ml-1 hover:bg-green-200 rounded-full p-0.5">
          <XMarkIcon class="w-3 h-3" />
        </button>
      </div>

      <!-- Vendor Filter Tag -->
      <div v-if="filters.selectedVendor" class="inline-flex items-center gap-1 px-3 py-1 bg-purple-100 text-purple-800 text-sm rounded-full">
        <span class="font-medium">Vendor:</span>
        <span>{{ filters.selectedVendor }}</span>
        <button @click="removeFilter('selectedVendor')" class="ml-1 hover:bg-purple-200 rounded-full p-0.5">
          <XMarkIcon class="w-3 h-3" />
        </button>
      </div>

      <!-- Date Range Filter Tag -->
      <div v-if="filters.dateFrom || filters.dateTo" class="inline-flex items-center gap-1 px-3 py-1 bg-orange-100 text-orange-800 text-sm rounded-full">
        <span class="font-medium">Date:</span>
        <span>{{ formatDateRange() }}</span>
        <button @click="removeDateFilter()" class="ml-1 hover:bg-orange-200 rounded-full p-0.5">
          <XMarkIcon class="w-3 h-3" />
        </button>
      </div>

      <!-- Amount Range Filter Tag -->
      <div v-if="filters.amountMin || filters.amountMax" class="inline-flex items-center gap-1 px-3 py-1 bg-yellow-100 text-yellow-800 text-sm rounded-full">
        <span class="font-medium">Amount:</span>
        <span>{{ formatAmountRange() }}</span>
        <button @click="removeAmountFilter()" class="ml-1 hover:bg-yellow-200 rounded-full p-0.5">
          <XMarkIcon class="w-3 h-3" />
        </button>
      </div>

      <!-- Category Filter Tag -->
      <div v-if="filters.selectedCategory" class="inline-flex items-center gap-1 px-3 py-1 bg-indigo-100 text-indigo-800 text-sm rounded-full">
        <span class="font-medium">Category:</span>
        <span>{{ filters.selectedCategory }}</span>
        <button @click="removeFilter('selectedCategory')" class="ml-1 hover:bg-indigo-200 rounded-full p-0.5">
          <XMarkIcon class="w-3 h-3" />
        </button>
      </div>
    </div>

    <!-- Filter Button -->
    <button
      @click="showModal = true"
      class="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
    >
      <FunnelIcon class="w-4 h-4" />
      Filters
    </button>

    <!-- Clear All Button (only show if filters are active) -->
    <button
      v-if="hasActiveFilters"
      @click="clearFilters"
      class="text-sm text-gray-500 hover:text-gray-700 underline"
    >
      Clear all
    </button>
  </div>

  <!-- Filter Modal -->
  <Teleport to="body">
    <div v-if="showModal" class="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <!-- Background overlay -->
      <div class="fixed inset-0 bg-black opacity-50 transition-opacity" @click="closeModal"></div>
      
      <!-- Modal container -->
      <div class="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
        <!-- Modal panel -->
        <div class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg" @click.stop>
          <!-- Modal Header -->
          <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                Filter Options
              </h3>
              <button @click="closeModal" class="text-gray-400 hover:text-gray-600 focus:outline-none">
                <XMarkIcon class="w-6 h-6" />
              </button>
            </div>
            
            <!-- Modal Content -->
            <div class="space-y-4">
              <!-- Client Name Filter -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Client Name</label>
                <select v-model="filters.selectedClient" class="block w-full rounded-md border-gray-300 focus:border-emerald-500 focus:ring-emerald-500 text-sm">
                  <option value="">All Clients</option>
                  <option value="Client A">Client A</option>
                  <option value="Client B">Client B</option>
                  <option value="Client C">Client C</option>
                </select>
              </div>

              <!-- Project Filter -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Project</label>
                <select v-model="filters.selectedProject" class="block w-full rounded-md border-gray-300 focus:border-emerald-500 focus:ring-emerald-500 text-sm">
                  <option value="">All Projects</option>
                  <option v-for="project in projects" :key="project" :value="project">{{ project }}</option>
                </select>
              </div>

              <!-- Vendor Filter -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Vendor</label>
                <input
                  type="text"
                  v-model="filters.selectedVendor"
                  placeholder="Search vendor..."
                  class="block w-full rounded-md border-gray-300 focus:border-emerald-500 focus:ring-emerald-500 text-sm"
                />
              </div>

              <!-- Date Range Filter -->
              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Date From</label>
                  <input
                    type="date"
                    v-model="filters.dateFrom"
                    class="block w-full rounded-md border-gray-300 focus:border-emerald-500 focus:ring-emerald-500 text-sm"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Date To</label>
                  <input
                    type="date"
                    v-model="filters.dateTo"
                    class="block w-full rounded-md border-gray-300 focus:border-emerald-500 focus:ring-emerald-500 text-sm"
                  />
                </div>
              </div>

              <!-- Amount Range Filter -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Amount Range</label>
                <div class="grid grid-cols-2 gap-3">
                  <input
                    type="number"
                    v-model="filters.amountMin"
                    placeholder="Min"
                    class="block w-full rounded-md border-gray-300 focus:border-emerald-500 focus:ring-emerald-500 text-sm"
                  />
                  <input
                    type="number"
                    v-model="filters.amountMax"
                    placeholder="Max"
                    class="block w-full rounded-md border-gray-300 focus:border-emerald-500 focus:ring-emerald-500 text-sm"
                  />
                </div>
              </div>

              <!-- Category Filter -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select v-model="filters.selectedCategory" class="block w-full rounded-md border-gray-300 focus:border-emerald-500 focus:ring-emerald-500 text-sm">
                  <option value="">All Categories</option>
                  <option v-for="category in categories" :key="category" :value="category">{{ category }}</option>
                </select>
              </div>
            </div>
          </div>
          
          <!-- Modal Footer -->
          <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              @click="applyFilters"
              type="button"
              class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-emerald-600 text-base font-medium text-white hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Apply Filters
            </button>
            <button
              @click="clearFilters"
              type="button"
              class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Clear All
            </button>
            <button
              @click="closeModal"
              type="button"
              class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 sm:mt-0 sm:w-auto sm:text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { ref, reactive, computed } from 'vue';
import { XMarkIcon, FunnelIcon } from '@heroicons/vue/24/outline';
import { projects, categories } from '../data/mockData.js';

// Define props
const props = defineProps({
  initialFilters: {
    type: Object,
    default: () => ({
      selectedClient: '',
      selectedProject: '',
      selectedVendor: '',
      dateFrom: '',
      dateTo: '',
      amountMin: '',
      amountMax: '',
      selectedCategory: ''
    })
  }
});

// Define emits
const emit = defineEmits(['filtersChanged']);

// Modal state
const showModal = ref(false);

// Reactive filters object
const filters = reactive({
  selectedClient: props.initialFilters.selectedClient || '',
  selectedProject: props.initialFilters.selectedProject || '',
  selectedVendor: props.initialFilters.selectedVendor || '',
  dateFrom: props.initialFilters.dateFrom || '',
  dateTo: props.initialFilters.dateTo || '',
  amountMin: props.initialFilters.amountMin || '',
  amountMax: props.initialFilters.amountMax || '',
  selectedCategory: props.initialFilters.selectedCategory || ''
});

// Check if any filters are active
const hasActiveFilters = computed(() => {
  return filters.selectedClient ||
         filters.selectedProject ||
         filters.selectedVendor ||
         filters.dateFrom ||
         filters.dateTo ||
         filters.amountMin ||
         filters.amountMax ||
         filters.selectedCategory;
});

// Format date range for display
const formatDateRange = () => {
  if (filters.dateFrom && filters.dateTo) {
    return `${filters.dateFrom} to ${filters.dateTo}`;
  } else if (filters.dateFrom) {
    return `From ${filters.dateFrom}`;
  } else if (filters.dateTo) {
    return `Until ${filters.dateTo}`;
  }
  return '';
};

// Format amount range for display
const formatAmountRange = () => {
  if (filters.amountMin && filters.amountMax) {
    return `$${filters.amountMin} - $${filters.amountMax}`;
  } else if (filters.amountMin) {
    return `Min $${filters.amountMin}`;
  } else if (filters.amountMax) {
    return `Max $${filters.amountMax}`;
  }
  return '';
};

// Remove individual filter
const removeFilter = (filterKey) => {
  filters[filterKey] = '';
  emitFilters();
};

// Remove date filter
const removeDateFilter = () => {
  filters.dateFrom = '';
  filters.dateTo = '';
  emitFilters();
};

// Remove amount filter
const removeAmountFilter = () => {
  filters.amountMin = '';
  filters.amountMax = '';
  emitFilters();
};


// Close modal
const closeModal = () => {
  showModal.value = false;
};

// Apply filters and close modal
const applyFilters = () => {
  emitFilters();
  closeModal();
};

// Clear all filters
const clearFilters = () => {
  filters.selectedClient = '';
  filters.selectedProject = '';
  filters.selectedVendor = '';
  filters.dateFrom = '';
  filters.dateTo = '';
  filters.amountMin = '';
  filters.amountMax = '';
  filters.selectedCategory = '';
  emitFilters();
  closeModal();
};

// Emit filters to parent component
const emitFilters = () => {
  emit('filtersChanged', { ...filters });
};
</script>