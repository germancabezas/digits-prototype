<template>
  <div class="h-screen bg-slate-50 dark:bg-gray-900 flex flex-col">
    <!-- Main Content -->
    <div class="flex-1 flex">
      <!-- Desktop Layout -->
      <div v-if="!isMobile" class="flex w-full">
      <!-- Sidebar -->
      <NavigationSidebar 
        :current-view="currentView" 
        :user-type="userType"
        @navigate="handleNavigation"
      />
      
      <!-- Main Content -->
      <div class="flex-1 flex flex-col">
        <ExpensesDashboard 
          v-if="currentView === 'expenses'"
          :transactions="transactions"
        />
        
        <!-- Other views placeholder -->
        <div v-else class="flex-1 flex items-center justify-center">
          <div class="text-center">
            <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-2">{{ currentView.charAt(0).toUpperCase() + currentView.slice(1) }}</h2>
            <p class="text-gray-500 dark:text-gray-400">This view is not implemented yet.</p>
          </div>
        </div>
      </div>
      </div>

      <!-- Mobile Layout -->
      <div v-else class="w-full">
      <!-- Mobile Header -->
      <div class="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-3">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-3">
            <div class="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center">
              <span class="text-white text-sm font-bold">LS</span>
              <svg height="30" width="30" data-icon="header-icons/digits-logo-mark" data-astro-cid-yfxihdp7="true"><symbol id="ai:local:header-icons/digits-logo-mark" viewBox="0 0 100 100"><path d="M87.8 79.2c-1.2 1.6-3.5 1.6-4.8.4-1.6-1.2-1.6-3.5-.4-4.8 5.5-6.7 8.9-15.2 8.9-24.6.1-16-9.7-29.7-23.3-35.5 0 0-.1 0-.1-.1-1.7-.8-2.5-2.8-1.7-4.6s2.8-2.5 4.6-1.7c16.1 6.8 27.5 23 27.5 41.7 0 11.1-4 21.2-10.7 29.2M55.6 11.6l-24-.1h-.1c-1.9 0-3.5-1.6-3.5-3.6.1-1.8 1.6-3.4 3.6-3.4H53c1 0 2 0 3 .1 1.8.1 3.3 1.6 3.3 3.4v.4c0 1.9-1.7 3.5-3.7 3.2m16.8 13.6c.8.7 1.3 1.6 1.5 2.6 0 .9-.2 1.7-.8 2.4-1.2 1.6-3.4 1.7-4.9.6-4.2-3.3-9.3-5.1-14.9-5.1H13.2c-1.9 0-3.5-1.6-3.5-3.6s1.6-3.5 3.6-3.5h39.9c7.2 0 14 2.5 19.2 6.6M70.5 50c0 9.6-7.9 17.6-17.5 17.5H39.9c-1.9 0-3.5-1.6-3.5-3.6V50c0-1.9 1.6-3.5 3.5-3.6h.1c1.9 0 3.5 1.6 3.5 3.6v10.5H53c5.8 0 10.4-4.7 10.4-10.5 0-5.7-4.7-10.5-10.4-10.5H5c-1.9 0-3.5-1.6-3.5-3.6 0-1.9 1.6-3.5 3.6-3.5h48.1c9.5 0 17.3 8 17.3 17.6m-46.3 3.6H13.4c-1.9 0-3.5-1.6-3.4-3.6 0-1.9 1.6-3.5 3.6-3.4h10.7c1.9 0 3.5 1.6 3.5 3.5v.1c-.1 1.9-1.7 3.5-3.6 3.4M5.5 60.5h18.8c1.9 0 3.5 1.6 3.6 3.5v.1c0 1.9-1.6 3.5-3.6 3.5H5.4c-1.9 0-3.5-1.6-3.5-3.6.1-2 1.7-3.5 3.6-3.5m7.7 13.9h39.9c13.6 0 24.4-10.9 24.4-24.4 0-2.8-.6-5.5-1.5-8.1-.7-1.8.3-3.8 2.1-4.5s3.8.3 4.5 2.1c1.2 3.3 1.8 6.9 1.8 10.5 0 17.4-14.1 31.4-31.3 31.4h-40c-1.9 0-3.5-1.6-3.5-3.6.1-1.8 1.8-3.4 3.6-3.4m18.6 14h21.3c6.7 0 13-1.7 18.4-4.7.6-.3 1.1-.4 1.6-.4 1.9 0 3.5 1.6 3.6 3.5 0 1.3-.7 2.5-1.8 3.1-6.4 3.6-13.9 5.5-21.8 5.5H31.7c-1.9 0-3.5-1.6-3.5-3.6.1-1.8 1.6-3.4 3.6-3.4" fill="currentColor"></path></symbol><use href="#ai:local:header-icons/digits-logo-mark"></use></svg>
            </div>
            <svg height="30" width="64" data-icon="header-icons/digits-logo-text" data-astro-cid-yfxihdp7="true"><symbol id="ai:local:header-icons/digits-logo-text" viewBox="0 0 212 100"><path d="M0 17.1h22.8c18.5 0 30.9 12.2 30.9 30.4S41.3 77.9 22.8 77.9H0zm22.7 54.1c13.4 0 22.2-9.4 22.2-23.6S36.1 24 22.7 24H8.6v47.2zm41.8-55.8c3.4 0 5.8 2.6 5.8 5.9s-2.6 5.9-5.8 5.9c-3.4 0-5.9-2.5-5.9-5.9s2.4-5.9 5.9-5.9m-4.3 19.2h8.3V78h-8.3zm15.4 44.6 8.1-.4c.9 6.1 6.2 10.4 13.6 10.4 8.1 0 13.5-5.2 13.5-13.8v-8.3c-2.5 5.4-8.5 9.6-15.7 9.6-11.8 0-21.1-9.2-21.1-21.8s9.1-21.7 21.1-21.7c7.1 0 13.5 4 15.9 9.8v-8.5h7.9v39.6c0 13.6-8.4 21.7-21.8 21.7-12 0-20.6-6.6-21.5-16.6m21.5-9.3c8 0 14.4-6.2 14.4-15S105.5 40 97.1 40s-14.5 6.5-14.5 14.9c-.1 8.4 6.3 15 14.5 15m35-54.5c3.4 0 5.8 2.6 5.8 5.9s-2.6 5.9-5.8 5.9c-3.4 0-5.9-2.5-5.9-5.9s2.5-5.9 5.9-5.9m-4.2 19.2h8.3V78h-8.3zm22.9 30V41.4h-8.4v-6.8h8.4V23.7h8.3v10.9h11.3v6.8h-11.3V64c0 7.6 5.2 8.4 10 6.7l.2 6.8c-8.5 2.8-18.5.5-18.5-12.9m22-.4 7.7-.3c.5 5.9 5.2 9.7 11.6 9.7 5.2 0 9.6-2.4 9.6-6.8 0-3.4-2.7-5.3-7.8-6.3l-7.4-1.4C178 57.7 174 53.2 174 46.8c0-8.4 7.1-13.8 16.8-13.8s17.4 6 17.9 15.2l-7.4.4c-.4-5.6-4.7-9.7-10.5-9.7-5 0-8.8 2.7-8.8 7 0 3.2 2.2 5.2 6.1 5.9l7.4 1.4c9.2 1.7 14.3 5.8 14.3 12.7 0 8.3-7.5 13.5-17.6 13.5-11.1.1-18.8-5.9-19.4-15.2" fill="currentColor"></path></symbol><use href="#ai:local:header-icons/digits-logo-text"></use></svg>
          </div>
          <button @click="toggleUserType" class="text-sm text-slate-600 dark:text-slate-300 hover:text-slate-800 dark:hover:text-slate-100">
            Switch to {{ userType === 'client' ? 'Accountant' : 'Client' }} View
          </button>
        </div>
      </div>

      <!-- Mobile Content -->
      <div class="p-4">
        <!-- Client Mobile View -->
        <div v-if="userType === 'client'">
          <VerificationQueue 
            :transactions="transactions"
            @accept-transaction="handleAcceptTransaction"
            @reject-transaction="handleRejectTransaction"
            @accept-all="handleAcceptAll"
            @need-more-info="handleNeedMoreInfo"
          />
        </div>

        <!-- Accountant Mobile View -->
        <div v-else>
          <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
            <div class="p-4 border-b border-gray-200 dark:border-gray-700">
              <h2 class="text-lg font-semibold text-gray-900 dark:text-white">Expenses Overview</h2>
            </div>
            <div class="p-4">
              <div class="grid grid-cols-2 gap-4 mb-4">
                <div class="bg-amber-50 p-3 rounded-lg">
                  <div class="text-2xl font-bold text-amber-800">{{ needsVerificationCount }}</div>
                  <div class="text-sm text-amber-600">Need Verification</div>
                </div>
                <div class="bg-green-50 p-3 rounded-lg">
                  <div class="text-2xl font-bold text-green-800">{{ automaticCount }}</div>
                  <div class="text-sm text-green-600">Auto Categorized</div>
                </div>
              </div>
              <button 
                @click="toggleUserType"
                class="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
              >
                Switch to Client View
              </button>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>

    <!-- View Toggle (for demo purposes) -->
    <!-- <div class="fixed bottom-4 right-4 z-50">
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-3">
        <div class="text-xs text-gray-500 dark:text-gray-400 mb-2">Demo Controls</div>
        <div class="flex flex-col space-y-2">
          <button 
            @click="toggleMobile"
            class="text-xs bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 px-3 py-1 rounded"
          >
            {{ isMobile ? 'Desktop' : 'Mobile' }} View
          </button>
          <button 
            @click="toggleUserType"
            class="text-xs bg-emerald-100 dark:bg-emerald-800 hover:bg-emerald-200 dark:hover:bg-emerald-700 text-slate-700 dark:text-slate-200 px-3 py-1 rounded"
          >
            {{ userType === 'client' ? 'Accountant' : 'Client' }} Mode
          </button>
        </div>
      </div>
    </div> -->
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import Header from './shared/Header.vue';
import NavigationSidebar from './components/NavigationSidebar.vue';
import ExpensesDashboard from './components/ExpensesDashboard.vue';
import VerificationQueue from './components/VerificationQueue.vue';
import { mockTransactions } from './data/mockData.js';

// Reactive state
const currentView = ref('expenses');
const userType = ref('accountant'); // 'accountant' or 'client'
const isMobile = ref(false);
const transactions = ref([...mockTransactions]);

// Computed properties
const needsVerificationCount = computed(() => {
  return transactions.value.filter(t => t.needsVerification).length;
});

const automaticCount = computed(() => {
  return transactions.value.filter(t => !t.needsVerification).length;
});

// Methods
const handleNavigation = (view) => {
  currentView.value = view;
};

const toggleUserType = () => {
  userType.value = userType.value === 'accountant' ? 'client' : 'accountant';
};

const toggleMobile = () => {
  isMobile.value = !isMobile.value;
};

const handleAcceptTransaction = (id) => {
  const transaction = transactions.value.find(t => t.id === id);
  if (transaction) {
    transaction.needsVerification = false;
    transaction.status = 'accepted';
  }
};

const handleRejectTransaction = (id) => {
  const transaction = transactions.value.find(t => t.id === id);
  if (transaction) {
    transaction.status = 'rejected';
    // In a real app, this might move to a different category or require manual categorization
  }
};

const handleAcceptAll = () => {
  transactions.value.forEach(t => {
    if (t.needsVerification) {
      t.needsVerification = false;
      t.status = 'accepted';
    }
  });
};

const handleNeedMoreInfo = () => {
  // In a real app, this would trigger a communication flow
  console.log('Need more info requested');
};

// Responsive detection
const checkMobile = () => {
  isMobile.value = window.innerWidth < 768;
};

onMounted(() => {
  checkMobile();
  window.addEventListener('resize', checkMobile);
});

onUnmounted(() => {
  window.removeEventListener('resize', checkMobile);
});
</script>

<style scoped>
/* Custom scrollbar for webkit browsers */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}
</style>
