<template>
  <div class="space-y-6">
    <!-- Need Verification Section -->
    <div v-if="needVerificationTransactions.length > 0" class="bg-white rounded-lg border border-gray-200">
      <div class="px-6 py-4 border-b border-gray-200">
        <div class="flex items-center justify-between">
          <h3 class="text-lg font-medium text-gray-900">Need Verification</h3>
          <span class="text-sm text-gray-500">
            {{ needVerificationTransactions.length }} expenses need verification. Accept our AI category suggestion or ask for more details.
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
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
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
                  <span class="text-sm text-gray-900">{{ transaction.category }}</span>
                  <button class="text-gray-400 hover:text-gray-600">
                    <CheckIcon class="w-4 h-4" />
                  </button>
                  <button class="text-gray-400 hover:text-gray-600">
                    <QuestionMarkCircleIcon class="w-4 h-4" />
                  </button>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center space-x-2">
                  <button class="text-gray-400 hover:text-gray-600">
                    <EnvelopeIcon class="w-4 h-4" />
                  </button>
                  <span v-if="transaction.activity > 0" class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-slate-800">
                    {{ transaction.activity }} New
                  </span>
                  <span v-if="transaction.activity > 0" class="w-2 h-2 bg-emerald-500 rounded-full"></span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Automatic Categorization Section -->
    <div v-if="automaticTransactions.length > 0" class="bg-white rounded-lg border border-gray-200">
      <div class="px-6 py-4 border-b border-gray-200">
        <div class="flex items-center justify-between">
          <h3 class="text-lg font-medium text-gray-900">Automatic Categorization</h3>
          <span class="text-sm text-gray-500">
            {{ automaticTransactions.length }} expenses were automatically categorized by our AI agent. Auto categorization happens when the degree of confidence is 90%+
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
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
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
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ transaction.category }}</td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center space-x-2">
                  <button class="text-gray-400 hover:text-gray-600">
                    <EnvelopeIcon class="w-4 h-4" />
                  </button>
                  <span v-if="transaction.activity > 0" class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-slate-800">
                    {{ transaction.activity }} New
                  </span>
                  <span v-if="transaction.activity > 0" class="w-2 h-2 bg-emerald-500 rounded-full"></span>
                </div>
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
import { CheckIcon, QuestionMarkCircleIcon, EnvelopeIcon, BuildingStorefrontIcon } from '@heroicons/vue/24/outline';
import vendorLabel from '../shared/vendorLabel.vue';

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