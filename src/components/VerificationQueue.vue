<template>
  <div class="bg-white rounded-lg shadow-sm border border-gray-200 max-w-sm mx-auto">
    <!-- Header -->
    <div class="px-4 py-3 border-b border-gray-200 bg-gray-50 rounded-t-lg bg-gradient-to-b from-yellow-50 via-white to-fuchsia-50">
      <h2 class="text-lg font-semibold text-gray-900">Verification Needed</h2>
    </div>

    <!-- Verification Items -->
    <div class="divide-y divide-gray-200">
      <div 
        v-for="transaction in verificationTransactions" 
        :key="transaction.id"
        class="p-4"
      >
        <!-- Transaction Info -->
        <div class="mb-3">
          <div class="flex items-center justify-between mb-2">
            <span class="text-sm text-gray-500">Was this purchase related to</span>
            <span class="text-sm font-medium text-gray-900">{{ transaction.category }}</span>
            <button class="text-gray-400 hover:text-gray-600">
              <QuestionMarkCircleIcon class="w-4 h-4" />
            </button>
          </div>
          
          <div class="bg-gray-50 rounded-lg p-3 mb-3">
            <vendor-label :name="transaction.vendor" />
          </div>

          <!-- Action Buttons -->
          <div class="flex space-x-2 mb-3">
            <button 
              @click="acceptTransaction(transaction.id)"
              class="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded-lg transition-colors"
            >
              Yes
            </button>
            <button 
              @click="rejectTransaction(transaction.id)"
              class="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded-lg transition-colors"
            >
              No
            </button>
          </div>

          <!-- Message from Casey -->
          <div class="bg-emerald-50 rounded-lg p-3 text-sm">
            <p class="text-slate-800">
              <span class="font-medium">Casey:</span> Hi Avery, Can you please provide more details on this transaction? AI is suggesting this should be categorized as <span class="font-medium">{{ transaction.category }}</span>. Thanks.
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-if="verificationTransactions.length === 0" class="p-8 text-center">
      <CheckCircleIcon class="w-12 h-12 text-gray-400 mx-auto mb-4" />
      <h3 class="text-lg font-medium text-gray-900 mb-2">All caught up!</h3>
      <p class="text-gray-500">No transactions need verification at this time.</p>
    </div>

    <!-- Bulk Actions -->
    <div v-if="verificationTransactions.length > 1" class="px-4 py-3 border-t border-gray-200 bg-gray-50 rounded-b-lg">
      <div class="flex space-x-2">
        <button 
          @click="acceptAll"
          class="flex-1 bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
        >
          Accept All
        </button>
        <button 
          @click="needMoreInfo"
          class="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
        >
          Need More Info
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { QuestionMarkCircleIcon, CheckCircleIcon } from '@heroicons/vue/24/outline';
import vendorLabel from '../shared/vendorLabel.vue';

const props = defineProps({
  transactions: {
    type: Array,
    default: () => []
  }
});

const emit = defineEmits(['accept-transaction', 'reject-transaction', 'accept-all', 'need-more-info']);

const verificationTransactions = computed(() => {
  return props.transactions.filter(t => t.needsVerification);
});

const acceptTransaction = (id) => {
  emit('accept-transaction', id);
};

const rejectTransaction = (id) => {
  emit('reject-transaction', id);
};

const acceptAll = () => {
  emit('accept-all');
};

const needMoreInfo = () => {
  emit('need-more-info');
};
</script>