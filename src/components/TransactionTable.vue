<template>
  <div class="space-y-6">
    <!-- Need Verification Section -->
    <div 
      v-if="needVerificationTransactions.length > 0" 
      class="bg-white rounded-lg border border-green-300 shadow-sm shadow-emerald-300 overflow-x-hidden"
    >
      <div class="px-6 py-4 border-b border-gray-200">
        <div class="flex items-center justify-between relative">
          <span class="absolute -m-0.5 h-4 w-4 animate-ping rounded-full bg-sky-400 opacity-75"></span>
          <h3 class="text-lg font-medium text-gray-900">
            {{ needVerificationTransactions.length }} <span class="ml-2">Items Need Verification</span></h3>
          <span class="text-sm ml-4 text-emerald-600">AI generated categories: 70% + confidence</span>
        </div>
      </div>
      
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vendor</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category -V</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Activity</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="transaction in needVerificationTransactions" :key="transaction.id" class="hover:bg-gray-50">
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ transaction.date }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ transaction.time }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 flex items-center space-x-2">
                <vendor-label :name="transaction.vendor" />
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${{ transaction.amount.toFixed(2) }}</td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center space-x-2">
                  <div class="text-sm w-full text-gray-900 bg-emerald-50 flex items-center justify-between rounded-full border border-dashed border-emerald-300 pl-3 pr-0.5">
                    <div class="flex items-center space-x-1 p-2">
                      {{ transaction.aiCategory }}
                    </div>
                    <div class="flex items-center space-x-0.5">
                      <div class="bg-emerald-300 p-2 w-8 h-8 rounded-l-full">
                        <CheckIcon class="w-4 h-4" />
                      </div>
                      <div class="bg-red-300 p-2 w-8 h-8 rounded-r-full">
                        <XMarkIcon class="w-4 h-4" />
                      </div>
                      </div>
                    </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center justify-between space-x-2">
                  <div>
                    <span v-if="transaction.activity > 0" class="inline-flex gap-2 items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-slate-800">
                      <span v-if="transaction.activity > 0" class="w-2 h-2 bg-emerald-500 rounded-full"></span>
                      {{ transaction.activity }} New asas
                    </span>
                  </div>
                  <FwbButton color="light"><EnvelopeIcon class="w-4 h-4" /></FwbButton>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Automatic Categorization Section -->
    <div v-if="automaticTransactions.length > 0" class="bg-white rounded-lg border border-gray-200 transaction-table">
      <div class="px-6 py-4 border-b border-gray-200">
        <div class="flex items-center justify-between">
          <h3 class="text-lg font-medium text-gray-900">Automatic Categorization</h3>
          <span class="text-sm text-emerald-600">
            {{ automaticTransactions.length }} AI generated categories: 90% Confidence
          </span>
        </div>
      </div>
      
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vendor</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category -T</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Activity</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="transaction in automaticTransactions" :key="transaction.id" class="hover:bg-gray-50">
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ transaction.date }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ transaction.time }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                <vendor-label :name="transaction.vendor" />
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${{ transaction.amount.toFixed(2) }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                <select 
                      v-model="transaction.aiCategory" 
                      class="block w-full rounded-md border-gray-300 focus:border-emerald-500 focus:ring-emerald-500 text-sm"
                    >
                      <option v-for="category in categories" :key="category" :value="category">{{ category }}</option>
                    </select>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { CheckIcon, XMarkIcon, QuestionMarkCircleIcon, EnvelopeIcon, BuildingStorefrontIcon } from '@heroicons/vue/24/outline';
import vendorLabel from '../shared/vendorLabel.vue';
import { FwbButton, FwbBadge } from 'flowbite-vue';
import { projects, categories } from '../data/mockData.js';


const props = defineProps({
  transactions: {
    type: Array,
    default: () => []
  }
});

const needVerificationTransactions = computed(() => {
  return props.transactions.filter(t => t.needsVerification);
});

const automaticTransactions = computed(() => {
  return props.transactions.filter(t => !t.needsVerification);
});
</script>