<template>
  <div class="w-96 bg-white border rounded-lg overflow-hidden border-gray-200 flex flex-col h-full">
    <!-- Header -->
    <div class="px-4 py-3 border-b border-gray-200 bg-gray-50">
      <div class="flex items-center justify-between">
        <h3 class="text-lg font-medium text-gray-900">Transaction Discussion</h3>
        <button @click="$emit('close')" class="text-gray-400 hover:text-gray-600">
          <XMarkIcon class="w-5 h-5" />
        </button>
      </div>
      <div class="mt-2 text-sm text-gray-600">
        <div class="font-medium">{{ transaction.vendor }}</div>
        <div class="text-xs text-gray-500">
          {{ transaction.date }} • ${{ transaction.amount.toFixed(2) }}
        </div>
      </div>
    </div>

    <!-- Messages -->
    <div class="flex-1 overflow-y-auto p-4 space-y-4">
      <!-- Sample messages based on transaction activity -->
      <div v-for="message in messages" :key="message.id" class="flex space-x-3">
        <div class="flex-shrink-0">
          <div class="w-8 h-8 bg-slate-800 rounded-full flex items-center justify-center text-white text-sm font-medium">
            {{ message.sender.charAt(0) }}
          </div>
        </div>
        <div class="flex-1">
          <div class="flex items-center space-x-2">
            <span class="text-sm font-medium text-gray-900">{{ message.sender }}</span>
            <span class="text-xs text-gray-500">{{ message.timestamp }}</span>
          </div>
          <div class="mt-1 text-sm text-gray-700">
            {{ message.content }}
          </div>
          <!-- Attachment placeholder -->
          <div v-if="message.attachment" class="mt-2 p-3 bg-gray-50 rounded-lg border border-gray-200">
            <div class="flex items-center space-x-2">
              <PaperClipIcon class="w-4 h-4 text-gray-400" />
              <span class="text-sm text-gray-600">{{ message.attachment.name }}</span>
              <span class="text-xs text-gray-400">({{ message.attachment.size }})</span>
            </div>
            <div class="mt-1 text-xs text-gray-500">{{ message.attachment.type }}</div>
          </div>
        </div>
      </div>

      <!-- Activity indicator when there are new messages -->
      <div v-if="transaction.activity > 0" class="text-center py-2">
        <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
          {{ transaction.activity }} new message{{ transaction.activity > 1 ? 's' : '' }}
        </span>
      </div>
    </div>

    <!-- Message input -->
    <div class="border-t border-gray-200 p-4">
      <div class="flex space-x-2">
        <input
          v-model="newMessage"
          type="text"
          placeholder="Type a message..."
          class="flex-1 rounded-md border-gray-300 focus:border-emerald-500 focus:ring-emerald-500 text-sm"
          @keyup.enter="sendMessage"
        />
        <button
          @click="sendMessage"
          class="px-3 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
        >
          <PaperAirplaneIcon class="w-4 h-4" />
        </button>
      </div>
      <div class="mt-2 flex items-center space-x-2">
        <button class="text-xs text-gray-500 hover:text-gray-700 flex items-center space-x-1">
          <PaperClipIcon class="w-3 h-3" />
          <span>Attach receipt</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { XMarkIcon, PaperClipIcon, PaperAirplaneIcon } from '@heroicons/vue/24/outline';

const props = defineProps({
  transaction: {
    type: Object,
    required: true
  }
});

const emit = defineEmits(['close']);

const newMessage = ref('');

// Generate sample messages based on transaction data
const messages = computed(() => {
  const baseMessages = [
    {
      id: 1,
      sender: 'Avery',
      timestamp: '2 hours ago',
      content: `Hey, this ${props.transaction.vendor} transaction for $${props.transaction.amount.toFixed(2)} was for office supplies we discussed in the meeting.`,
      attachment: {
        name: 'receipt_' + props.transaction.vendor.toLowerCase().replace(/\s+/g, '_') + '.pdf',
        size: '245 KB',
        type: 'Receipt'
      }
    }
  ];

  // Add more messages if there's activity
  if (props.transaction.activity > 0) {
    baseMessages.push({
      id: 2,
      sender: 'Casey',
      timestamp: '1 hour ago',
      content: `Thanks for the clarification! I've updated the category to "${props.transaction.aiCategory || 'Office Supplies'}". The receipt looks good.`
    });
  }

  if (props.transaction.activity > 1) {
    baseMessages.push({
      id: 3,
      sender: 'Avery',
      timestamp: '30 minutes ago',
      content: 'Perfect! This should help with the quarterly expense report.'
    });
  }

  return baseMessages;
});

const sendMessage = () => {
  if (newMessage.value.trim()) {
    // In a real app, this would send the message to a backend
    console.log('Sending message:', newMessage.value);
    newMessage.value = '';
  }
};
</script>