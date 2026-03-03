/**
 * POP Feedback — Form definitions
 * Each form has path A (rating 4-5) and path B (rating 1-3)
 */

const SERVICE_OPTIONS = [
  { id: 'shop', label: 'POPshop', subLabel: 'Shopping & orders' },
  { id: 'card', label: 'POP card', subLabel: 'Card application, management & rewards' },
  { id: 'bills', label: 'POP bills', subLabel: 'Bill payments & recharge' },
  { id: 'upi', label: 'POP UPI', subLabel: 'UPI payments' }
];

const CARD_SUB_SERVICES = [
  { id: 'card_application', label: 'Card application', formId: 'card_application' },
  { id: 'card_sdk', label: 'In-app card experience (viewing, managing card)', formId: 'card_sdk' },
  { id: 'card_reward', label: 'Reward claim', formId: 'card_reward' }
];

const BILLS_SUB_SERVICES = [
  { id: 'bill_payment', label: 'Bill payment', formId: 'rcbp_bill' },
  { id: 'recharge', label: 'Recharge', formId: 'rcbp_recharge' }
];

const FORMS = {
  shop: {
    id: 'shop',
    name: 'Shop — Post Order Placement',
    ratingQuestion: 'How was your experience placing an order?',
    pathA: {
      q2: {
        type: 'multiselect',
        question: 'What worked well?',
        options: [
          'Finding the product was easy',
          'Product details & images were clear',
          'Checkout was smooth and fast',
          'Payment went through without issues',
          'Order confirmation was clear'
        ]
      },
      q3: {
        type: 'multiselect',
        question: 'What was delightful?',
        options: [
          'The new design looked great',
          'Offers & deals were easy to spot',
          'Cart experience was seamless',
          'Felt faster than I expected',
          'Order summary was detailed and reassuring'
        ]
      },
      q4: {
        type: 'single',
        question: "Bug check — Did anything feel off even though your experience was good?",
        options: [
          'No issues at all',
          'Minor thing — page flickered or took a second to load',
          "A button didn't respond at first",
          'Something looked visually broken but I could still proceed'
        ]
      },
      q5: {
        type: 'freetext',
        question: 'Is there anything that would make you love POP even more?'
      }
    },
    pathB: {
      q2: {
        type: 'multiselect',
        question: 'What went wrong?',
        options: [
          "Couldn't find the product I was looking for",
          'Product information was incomplete',
          'Checkout had too many steps',
          'Payment failed or got stuck',
          'Order confirmation was missing or confusing'
        ]
      },
      q3: {
        type: 'multiselect',
        question: "Bug check — Did you face a bug?",
        options: [
          'App crashed',
          "Page didn't load",
          "Button didn't work",
          'Payment debited but order not confirmed',
          "Couldn't proceed past a step",
          'No bug — it was a design/experience issue'
        ],
        allowOther: true
      },
      q4: {
        type: 'single',
        question: 'How severely did it block you?',
        options: [
          'Minor — I could still complete the order',
          'Moderate — had to retry but eventually worked',
          "Severe — couldn't place the order at all"
        ]
      },
      q5: {
        type: 'multiselect',
        question: 'What would have made this a 4 or 5 for you?',
        options: [
          'Fewer steps to checkout',
          'More reliable payment',
          'Clearer product information',
          'Faster page loading',
          'Better error messages'
        ]
      },
      q6: {
        type: 'multiselect',
        question: 'Is there anything that would help us improve your experience?',
        options: [
          'Show estimated delivery before checkout',
          'Save cart across sessions',
          'Simplify the address entry',
          'Improve payment failure communication',
          'Make search results more relevant'
        ],
        allowOther: true
      }
    }
  },

  card_application: {
    id: 'card_application',
    name: 'Card — Post Application Journey',
    ratingQuestion: 'How was your card application experience?',
    pathA: {
      q2: { type: 'multiselect', question: 'What worked well?', options: ['Steps were clear throughout', 'Knew exactly what documents were needed', 'Progress indicator was helpful', 'Application submitted without issues', 'Status communication after submission was clear'] },
      q3: { type: 'multiselect', question: 'What was delightful?', options: ['Process felt quicker than expected', 'UI looked premium and trustworthy', "Didn't have to re-enter information", 'Got instant confirmation', 'Clear next steps after applying'] },
      q4: { type: 'multiselect', question: 'Bug check', options: ['No issues at all', 'Minor visual glitch but could continue', 'One step took longer to load', 'Something looked off but didn\'t block me'], allowOther: true },
      q5: { type: 'multiselect', question: 'Is there anything that would make you love this even more?', options: ['Real-time application status updates', 'Estimated approval timeline', 'Ability to save & resume application', 'Fewer fields to fill'], allowOther: true }
    },
    pathB: {
      q2: { type: 'multiselect', question: 'What went wrong?', options: ['Unclear what information was needed', 'Got stuck at a step with no guidance', 'Had to re-enter details multiple times', "Didn't know if application was submitted", 'Status after submission was unclear'] },
      q3: { type: 'single', question: 'Which step was most painful?', options: ['Personal details entry', 'KYC / Document upload', 'Review & submit screen', 'Post-submission status screen'] },
      q4: { type: 'multiselect', question: 'Bug check', options: ['App crashed mid-application', 'Document upload failed', 'Got an error with no explanation', 'Data I entered was lost', "Couldn't proceed past a step", 'No bug — it was a flow/design issue'] },
      q5: { type: 'single', question: 'How severely did it block you?', options: ['Minor — completed despite the issue', 'Moderate — had to restart once', 'Severe — could not complete the application'] },
      q6: { type: 'multiselect', question: 'What would have made this a 4 or 5 for you?', options: ['Clearer instructions at each step', 'Fewer fields / shorter form', 'Better error messages', 'Ability to save progress and return', 'Clearer post-submission status'], allowOther: true },
      q7: { type: 'multiselect', question: 'Is there anything that would help us improve your experience?', options: ["Show a checklist of what's needed before starting", 'Add a progress bar', 'Allow document re-upload without restarting', 'Send status update via notification'], allowOther: true }
    }
  },

  card_sdk: {
    id: 'card_sdk',
    name: 'Card — SDK / In-app Card Experience',
    ratingQuestion: 'How was your in-app card experience (viewing, managing, controlling your card)?',
    pathA: {
      q2: { type: 'multiselect', question: 'What worked well?', options: ['Card loaded quickly', 'Controls (block/unblock, limits) were easy to find', 'Transaction history was clear', 'Spending summary was useful', 'Card details were easy to access securely'] },
      q3: { type: 'multiselect', question: 'What was delightful?', options: ['Design felt premium', 'Felt in control of my card', 'Information was well organised', 'Faster than expected to navigate', 'Notifications were timely and helpful'] },
      q4: { type: 'multiselect', question: 'Bug check', options: ['No issues', 'Card section took a second to load', 'Minor visual glitch', 'Something looked off but didn\'t block me'] },
      q5: { type: 'multiselect', question: 'Is there anything that would make you love this even more?', options: ['More spending insights & analytics', 'Easier access to card controls', 'Instant card freeze/unfreeze confirmation', 'Clearer breakdown of charges'], allowOther: true }
    },
    pathB: {
      q2: { type: 'multiselect', question: 'What went wrong?', options: ["Card section didn't load", 'Controls were hard to find', 'Transaction history was confusing', "Couldn't perform the action I needed", 'Information felt incomplete or outdated'] },
      q3: { type: 'single', question: 'Which area felt most broken?', options: ['Loading the card section', 'Card controls (block/unblock/limits)', 'Transaction history', 'Spending summary', 'Card details view'] },
      q4: { type: 'multiselect', question: 'Bug check', options: ['Card section completely failed to load', "Controls didn't respond to taps", 'Showed wrong balance or transaction data', 'App crashed in the card section', 'Authentication failed', 'No bug — it was a UX/design issue'] },
      q5: { type: 'single', question: 'How severely did it block you?', options: ['Minor — could still use the card', 'Moderate — had to restart to fix', "Severe — couldn't access or use card features"] },
      q6: { type: 'multiselect', question: 'What would have made this a 4 or 5 for you?', options: ['Faster loading', 'Easier navigation to controls', 'More accurate transaction data', 'Better error handling', 'Clearer spending breakdown'] },
      q7: { type: 'multiselect', question: 'Is there anything that would help us improve your experience?', options: ['Add a quick-access card control widget', 'Improve load speed of the card section', 'Show real-time balance updates', 'Better categorisation of transactions', 'Clearer feedback when an action is performed'] }
    }
  },

  card_reward: {
    id: 'card_reward',
    name: 'Card — Post Successful Reward Claim',
    ratingQuestion: 'How was your reward claim experience?',
    pathA: {
      q2: { type: 'multiselect', question: 'What worked well?', options: ['Easy to find my reward points', 'Understood what rewards were available', 'Claim process was simple and fast', 'Reward confirmation was clear', 'Value of the reward was clearly shown'] },
      q3: { type: 'multiselect', question: 'What was delightful?', options: ['Reward felt genuinely valuable', 'Claim happened instantly', 'Nice confirmation / celebration moment', 'Easy to see my updated points balance', 'Felt rewarded for using the card'] },
      q4: { type: 'multiselect', question: 'Bug check', options: ['No issues', 'Points balance took a moment to update', 'Minor visual glitch', 'Confirmation screen was slow'] },
      q5: { type: 'multiselect', question: 'Is there anything that would make you love this even more?', options: ['More reward options to choose from', 'Clearer points expiry information', 'Faster points crediting after transactions', 'Personalised reward suggestions', 'Nothing — loved the experience'] }
    },
    pathB: {
      q2: { type: 'multiselect', question: 'What went wrong?', options: ["Couldn't find my reward points easily", "Didn't understand how points work", 'Reward options were limited or unclear', 'Claim process had too many steps', "Didn't receive confirmation after claiming"] },
      q3: { type: 'single', question: 'Where did the experience break down?', options: ['Finding my points balance', 'Understanding what I could redeem', 'The claim / redemption steps', 'Post-claim confirmation', 'Points didn\'t reflect correctly'] },
      q4: { type: 'multiselect', question: 'Bug check', options: ['Points balance showed incorrectly', 'Claim failed with no reason given', 'App crashed during redemption', "Reward wasn't applied after claiming", 'No bug — it was a flow/design issue'] },
      q5: { type: 'single', question: 'How severely did it block you?', options: ['Minor — still managed to claim', 'Moderate — had to retry', "Severe — couldn't claim the reward at all"] },
      q6: { type: 'multiselect', question: 'What would have made this a 4 or 5 for you?', options: ['Clearer explanation of how points work', 'Simpler claim process', 'More reward options', 'Instant points update after transactions', 'Better post-claim confirmation'] },
      q7: { type: 'multiselect', question: 'Is there anything that would help us improve your experience?', options: ['Show points balance on the home screen', 'Add points expiry reminders', 'Make reward categories easier to browse', 'Show how many points each transaction earns', 'Improve error messaging during claim failures'] }
    }
  },

  rcbp_bill: {
    id: 'rcbp_bill',
    name: 'RCBP — Post Successful Bill Payment',
    ratingQuestion: 'How was your bill payment experience?',
    pathA: {
      q2: { type: 'multiselect', question: 'What worked well?', options: ['Found my biller quickly', 'Bill amount was auto-fetched correctly', 'Payment went through smoothly', 'Confirmation was instant and clear', 'Saved billers made it faster'] },
      q3: { type: 'multiselect', question: 'What was delightful?', options: ['Faster than I expected', 'Auto-fill saved me time', 'Offers/cashback were clearly shown', 'Payment receipt was detailed', 'Felt reliable and trustworthy'] },
      q4: { type: 'multiselect', question: 'Bug check', options: ['No issues', 'Bill fetch had a slight delay', 'Minor visual glitch on confirmation screen', 'Something looked off but didn\'t block me'] },
      q5: { type: 'multiselect', question: 'Is there anything that would make you love this even more?', options: ['Bill due date reminders', 'Auto-pay option', 'More biller categories', 'Faster bill amount fetch', 'Nothing — it was perfect'] }
    },
    pathB: {
      q2: { type: 'multiselect', question: 'What went wrong?', options: ["Couldn't find my biller", "Bill amount wasn't fetched / was incorrect", 'Payment failed or timed out', 'Confirmation was missing or delayed', 'Had to enter too many details manually'] },
      q3: { type: 'single', question: 'Where did it go wrong?', options: ['Finding the biller / category', 'Bill fetch step', 'Payment step', 'Post-payment confirmation', 'Viewing payment history'] },
      q4: { type: 'multiselect', question: 'Bug check', options: ['Payment debited but not confirmed', 'Wrong bill amount shown', 'App crashed during payment', 'Biller not found despite being correct', 'No receipt generated', 'No bug — it was a flow/design issue'] },
      q5: { type: 'single', question: 'How severely did it block you?', options: ['Minor — still paid successfully', 'Moderate — had to retry', "Severe — payment didn't go through"] },
      q6: { type: 'multiselect', question: 'What would have made this a 4 or 5 for you?', options: ['Faster bill fetch', 'Better biller search', 'Clearer payment failure message', 'Instant confirmation', 'Fewer steps overall'] },
      q7: { type: 'multiselect', question: 'Is there anything that would help us improve your experience?', options: ['Add due date reminders for saved billers', 'Show last payment details for quick repeat', 'Improve bill fetch reliability', 'Add more payment failure resolution options', 'Show cashback/offers before payment'] }
    }
  },

  rcbp_recharge: {
    id: 'rcbp_recharge',
    name: 'RCBP — Post Successful Recharge',
    ratingQuestion: 'How was your recharge experience?',
    pathA: {
      q2: { type: 'multiselect', question: 'What worked well?', options: ['Found my operator quickly', 'Recharge plans were easy to browse', 'Payment went through instantly', 'Confirmation was clear', 'Last recharge details were pre-filled'] },
      q3: { type: 'multiselect', question: 'What was delightful?', options: ['Plan recommendations were helpful', 'Recharge happened instantly', 'Cashback or offer was clearly highlighted', 'Interface was clean and easy to scan', 'Felt faster than other apps'] },
      q4: { type: 'multiselect', question: 'Bug check', options: ['No issues', 'Plans took a moment to load', 'Minor visual glitch', 'Something looked off but didn\'t stop me'] },
      q5: { type: 'multiselect', question: 'Is there anything that would make you love this even more?', options: ['Better plan filtering (data/calls/validity)', 'Recharge reminders when plan expires', 'More cashback offers', 'Faster plan loading', 'Nothing — it was great'] }
    },
    pathB: {
      q2: { type: 'multiselect', question: 'What went wrong?', options: ["Couldn't find my operator", "Plans didn't load or were outdated", 'Payment failed', "Recharge didn't reflect on my number", 'Confirmation was unclear or missing'] },
      q3: { type: 'single', question: 'Where did it go wrong?', options: ['Selecting operator / number', 'Browsing and selecting a plan', 'Payment step', 'Post-recharge confirmation', "Recharge didn't actually go through"] },
      q4: { type: 'multiselect', question: 'Bug check', options: ['Payment debited but recharge not done', 'Plans showed incorrect pricing', 'App crashed during recharge', 'Operator detection was wrong', 'No confirmation received', 'No bug — it was a flow/design issue'] },
      q5: { type: 'single', question: 'How severely did it block you?', options: ['Minor — still completed the recharge', 'Moderate — had to retry', "Severe — recharge didn't go through at all"] },
      q6: { type: 'multiselect', question: 'What would have made this a 4 or 5 for you?', options: ['Easier plan discovery', 'Faster payment processing', 'Clearer recharge confirmation', 'Correct operator auto-detection', 'Better failure resolution'] },
      q7: { type: 'multiselect', question: 'Is there anything that would help us improve your experience?', options: ['Add plan expiry reminders', 'Show data/call breakdown clearly per plan', 'Pre-fill last recharged number', 'Add more operator support', 'Improve failure and refund communication'] }
    }
  },

  upi: {
    id: 'upi',
    name: 'UPI — Post 5 Successful Transactions',
    ratingQuestion: "Now that you've made 5 payments, how would you rate the UPI experience overall?",
    pathA: {
      q2: { type: 'multiselect', question: 'What worked well consistently?', options: ['Sending money was fast every time', 'Easy to find contacts or enter UPI IDs', 'Payment confirmation was instant and clear', 'Transaction history was easy to read', 'Felt secure throughout'] },
      q3: { type: 'multiselect', question: 'What was delightful?', options: ['Faster than other UPI apps I\'ve used', 'Smooth QR scan experience', 'Clean and uncluttered payment screen', 'Failure was handled well when it happened', 'Liked how transaction history is presented'] },
      q4: { type: 'multiselect', question: "Bug check — across your 5 transactions, did anything feel off?", options: ['No issues across all 5', 'One transaction had a slight delay', 'Confirmation took longer once or twice', 'Minor UI glitch but payments went through'] },
      q5: { type: 'multiselect', question: 'Is there anything that would make you love this even more?', options: ['Spending summary by category', 'Scheduled / recurring payments', 'Faster repeat payments to frequent contacts', 'Better transaction search & filters', 'Nothing — loved the experience'] }
    },
    pathB: {
      q2: { type: 'multiselect', question: 'What went wrong?', options: ['Payments took too long to process', "Wasn't sure if payment went through", 'Hard to find or add payees', 'Transaction history was confusing', 'Had to retry multiple transactions'] },
      q3: { type: 'single', question: 'Which issue came up most often across your 5 transactions?', options: ['Slow processing', 'Unclear payment confirmation', 'Finding/adding a payee', 'Failed transactions with no clear reason', 'UI confusion during payment flow'] },
      q4: { type: 'multiselect', question: 'Bug check', options: ['Payment debited but not received by payee', 'Transaction stuck in pending for too long', 'App crashed during a payment', "QR scan didn't work", 'Bank authentication failed repeatedly', 'Wrong amount processed', 'No bug — it was a UX/design issue'] },
      q5: { type: 'single', question: 'How frequently did issues occur across 5 transactions?', options: ['Only once', '2–3 times', 'More than 3 times'] },
      q6: { type: 'multiselect', question: 'What would have made this a 4 or 5 for you?', options: ['Faster payment processing', 'Clearer success / failure confirmation', 'Better handling of failed transactions', 'Easier payee discovery', 'More reliable bank authentication'] },
      q7: { type: 'multiselect', question: 'Is there anything that would help us improve your experience?', options: ['Show real-time payment status', 'Add a retry option for failed payments', 'Improve failed transaction resolution & refund clarity', 'Make payee search smarter', 'Add transaction spend insights'] }
    }
  }
};
