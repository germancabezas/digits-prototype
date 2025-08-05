<template>
  <div class="flex-1 flex flex-col h-full">
    <!-- Header -->
    <div class="border-b border-gray-200 px-6 py-4 bg-gradient-to-r from-white via-fuchsia-50 to-emerald-50 flex items-center justify-between">
      <h1 class="text-2xl font-normal text-gray-900">Expenses</h1>
      <div class="mt-2 flex items-center gap-4">
        <label for="client-select" class="text-sm text-gray-700">Client:</label>
        <select
          id="client-select"
          v-model="currentFilters.selectedClient"
          class="block w-48 rounded-md border-gray-300 text-sm"
        >
          <option value="">All Clients</option>
          <option value="LionSnacks">LionSnacks</option>
          <option value="Durward Reynolds">Durward Reynolds</option>
          <option value="Kenton Towne">Kenton Towne</option>
          <option value="Therese Wunsch">Therese Wunsch</option>
          <option value="Benedict Kessler">Benedict Kessler</option>
          <option value="Katelyn Rohan">Katelyn Rohan</option>
        </select>
      </div>
    </div>

    <!-- <fwb-alert type="success">
      Success! You can now use Flowbite Vue in your Vue application 🎉
    </fwb-alert> -->

    <!-- Tabs -->
    <div class="bg-white border-b border-gray-200">
      <nav class="flex space-x-8 px-6" aria-label="Tabs">
        <button
          @click="activeTab = 'ai'"
          :class="[
            'py-4 px-1 border-b-2 font-medium text-sm',
            activeTab === 'ai'
              ? 'border-emerald-500 text-slate-600'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          ]"
        >
          <SparklesIcon class="w-4 h-4 inline-block mr-1" />
          AI Categorization
        </button>
        <button
          @click="activeTab = 'manual'"
          :class="[
            'py-4 px-1 border-b-2 font-medium text-sm',
            activeTab === 'manual'
              ? 'border-emerald-500 text-slate-600'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          ]"
        >
          All Expenses
        </button>
      </nav>
    </div>

    <!-- Content Area -->
    <div class="flex-1 overflow-auto manual">
      <!-- AI Categorization Tab -->
      <div v-if="activeTab === 'ai'" class="p-6 flex gap-6">
        <!-- Sub-tabs for AI Categorization -->
        <div class="flex-1">
          <!-- Transaction Table -->
          <TransactionTable :transactions="filteredTransactions" @toggleMessages="toggleMessages" />
        </div>
        <MessageSidePanel
          v-if="toggleMessageSidePanel && selectedTransaction"
          :transaction="selectedTransaction"
          @close="closeMessages"
        />
      </div>

      <!-- Manual Categorization Tab -->
       <div v-if="activeTab !== 'ai'" class="mx-6 mt-6 mb-0 px-6 py-4 border rounded-t-lg border-gray-200 bg-white">
        <div class="flex items-center justify-between relative">
          <div>
            <h3 class="text-lg font-medium text-gray-900">All Expenses</h3>
            <span class="text-sm text-slate-600">Some items were auto-categorized by AI.</span>
          </div>
          <ExpenseFilters
          :initialFilters="currentFilters"
          @filtersChanged="handleFiltersChanged"
          />
        </div>
      </div>


      <div v-if="activeTab === 'manual'" class="p-6 pt-0 flex gap-6">
        <!-- Project Filter -->

        <!-- Manual Transaction Table -->
        <div class="bg-white rounded-lg rounded-t-none border-x border-b border-gray-200 grow">
          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200 need-verification">
              <thead class="bg-gray-50">
                <tr>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vendor</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category -M</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Activity</th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr v-for="transaction in manualTransactions" :key="transaction.id" class="hover:bg-gray-50">
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ transaction.date }}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ transaction.time }}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <vendor-label :name="transaction.vendor" />
                </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${{ transaction.amount.toFixed(2) }}</td>
                  <td class="px-6 py-4 whitespace-nowrap">

                    <select 
                      v-model="transaction.category" 
                      :class="[
                      'all-cat-select block w-full rounded-md border-gray-300 text-sm',
                      transaction.category === 'Uncategorized' ? 'border-red-500' : '',
                      ]"
                    >
                      <option v-for="category in categories" :key="category" :value="category">{{ category }}</option>
                    </select>
                    <div v-if="transaction.aiConfidence > 90" class="text-slate-500 ml-2 text-xs pt-2">
                      AI auto-categorized : {{ transaction.aiConfidence }}% confidence.
                    </div>
                    <div v-if="transaction.aiConfidence < 90 && transaction.category === 'Uncategorized'" class="text-emerald-600 ml-2 text-xs flex gap-2 items-center pt-2">
                      AI suggested : <b>{{ transaction.aiCategory }}</b> - {{ transaction.aiConfidence }}% confidence. 
                      <a class="underline-none inline-block bg-emerald-100 px-2 py-1 rounded cursor-pointer">Accept.</a>
                      <a class="underline-none inline-block bg-slate-200 px-2 py-1 rounded cursor-pointer text-slate-600">View Analysis.</a>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center justify-between space-x-2">
                      <div>
                        <span v-if="transaction.activity > 0" class="inline-flex gap-2 items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-slate-800">
                          <span v-if="transaction.activity > 0" class="w-2 h-2 bg-emerald-500 rounded-full"></span>
                          {{ transaction.activity }} New
                        </span>
                      </div>
                      <FwbButton color="light" @click="toggleMessages(transaction)"><EnvelopeIcon class="w-4 h-4 open-messages" /></FwbButton>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <MessageSidePanel
          v-if="toggleMessageSidePanel && selectedTransaction"
          :transaction="selectedTransaction"
          @close="closeMessages"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import TransactionTable from './TransactionTable.vue';
import MessageSidePanel from './MessageSidePanel.vue';
import ExpenseFilters from './ExpenseFilters.vue';
import { projects, categories } from '../data/mockData.js';
import vendorLabel from '../shared/vendorLabel.vue';
import { FwbButton, FwbBadge } from 'flowbite-vue';
import { EnvelopeIcon, CreditCardIcon, ChartBarIcon, ChatBubbleLeftRightIcon, SparklesIcon, XCircleIcon } from '@heroicons/vue/24/outline';


  const people = [
    'Durward Reynolds',
    'Kenton Towne',
    'Therese Wunsch',
    'Benedict Kessler',
    'Katelyn Rohan',
  ]
  const selectedPerson = ref(people[0])
  const query = ref('')

  const filteredPeople = computed(() =>
    query.value === ''
      ? people
      : people.filter((person) => {
          return person.toLowerCase().includes(query.value.toLowerCase())
        })
  )

const toggleMessageSidePanel = ref(false);
const selectedTransaction = ref(null);

const toggleMessages = (transaction) => {
  if (selectedTransaction.value?.id === transaction.id && toggleMessageSidePanel.value) {
    // If clicking the same transaction, close the panel
    toggleMessageSidePanel.value = false;
    selectedTransaction.value = null;
  } else {
    // Open panel with new transaction
    selectedTransaction.value = transaction;
    toggleMessageSidePanel.value = true;
  }
};

const closeMessages = () => {
  toggleMessageSidePanel.value = false;
  selectedTransaction.value = null;
};

const props = defineProps({
  transactions: {
    type: Array,
    default: () => []
  }
});

const activeTab = ref('ai');
const activeSubTab = ref('verification');

// Current filters state
const currentFilters = ref({
  selectedClient: 'LionSnacks',
  selectedProject: '',
  selectedVendor: '',
  dateFrom: '',
  dateTo: '',
  amountMin: '',
  amountMax: '',
  selectedCategory: ''
});

// Handle filters changed from ExpenseFilters component
const handleFiltersChanged = (newFilters) => {
  currentFilters.value = { ...newFilters };
  // Here you can add filtering logic when needed
};

const filteredTransactions = computed(() => {
  if (activeSubTab.value === 'verification') {
    return props.transactions.filter(t => t.needsVerification);
  } else {
    return props.transactions.filter(t => !t.needsVerification);
  }
});

const manualTransactions = computed(() => {
  // For manual categorization, show all transactions
  return props.transactions;
});
</script>