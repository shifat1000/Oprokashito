# অপ্রকাশিত — সম্পূর্ণ ওয়েবসাইট + গল্প প্রকাশ CMS

এই ফোল্ডারে ওয়েবসাইট চালু করার সব মূল ফাইল আছে। GitHub Pages-এ ওয়েবসাইটটি দেখাবে; Pages CMS দিয়ে গল্প যোগ/সম্পাদনা/মুছতে পারবে।

## ফাইল পরিচিতি
- `index.html` — ওয়েবসাইটের পেজ
- `style.css` — ডিজাইন ও মোবাইল লেআউট
- `script.js` — সার্চ, বিভাগ, গল্প পড়ার প্যানেল এবং `stories.json` লোড
- `stories.json` — গল্পের তথ্য ও সম্পূর্ণ লেখা
- `.pages.yml` — Pages CMS-এ গল্প সম্পাদনার ফর্মের সেটিং
- `README.md` — এই নির্দেশিকা

## ফোন দিয়ে GitHub-এ আপলোড

### ধাপ ১: ZIP খোলো
1. ZIP ফাইলটি ফোনে ডাউনলোড করো।
2. Files / File Manager অ্যাপে Downloads-এ গিয়ে ZIP-এ চাপ দিয়ে Extract করো।
3. `oprokashi-complete` ফোল্ডারের ভেতরের ফাইলগুলো দেখতে পাবে। ZIP-কে সরাসরি ওয়েবসাইট হিসেবে আপলোড করবে না।

### ধাপ ২: রিপোজিটরিতে ঢোকো
1. Chrome-এ `https://github.com/shifat1000/oprokashi-to` খোলো এবং GitHub-এ সাইন ইন করো।
2. `Add file` → `Upload files` চাপো।
3. Extract করা ফোল্ডার থেকে `index.html`, `style.css`, `script.js`, `stories.json` এবং `README.md` নির্বাচন করে আপলোড করো। এগুলো রিপোজিটরির মূল পাতায় (root) থাকতে হবে, আরেকটি ফোল্ডারের ভেতরে নয়।
4. `Commit changes` চাপো। Commit message-এ `Add Oprokashi website files` লিখতে পারো। আবার `Commit changes` চাপো।

### ধাপ ৩: `.pages.yml` আপলোড
`.pages.yml` একটি hidden file, তাই ফোনের File Manager-এ দেখা নাও যেতে পারে। যদি দেখা যায়, সেটিও `Upload files` দিয়ে রিপোজিটরির root-এ আপলোড করো। যদি দেখা না যায়:
1. রিপোজিটরির `Add file` → `Create new file` চাপো।
2. ফাইলের নাম হিসেবে হুবহু `.pages.yml` লিখো।
3. এই ফোল্ডারের `.pages.yml` ফাইলের সম্পূর্ণ লেখা কপি করে নতুন ফাইলে পেস্ট করো।
4. `Commit changes` চাপো।

### ধাপ ৪: GitHub Pages চালু/পরীক্ষা
1. রিপোজিটরির `Settings` → `Pages` খোলো।
2. `Build and deployment`-এ `Deploy from a branch` বেছে নাও।
3. Branch `main`, folder `/(root)` নির্বাচন করে `Save` চাপো। যদি আগে থেকেই চালু থাকে, আবার সেট করার দরকার নেই।
4. কিছুক্ষণ পর ওয়েবসাইট খোলো: `https://shifat1000.github.io/oprokashi-to/`

## গল্প প্রকাশের ড্যাশবোর্ড চালু করা
1. `https://app.pagescms.org/` খোলো।
2. `Continue with GitHub` দিয়ে সাইন ইন করো।
3. Pages CMS-কে GitHub-এ অনুমতি দিতে বললে শুধু `shifat1000/oprokashi-to` রিপোজিটরিতে প্রয়োজনীয় access দাও।
4. রিপোজিটরি খুলে `গল্প প্রকাশ` collection খুঁজে বের করো।
5. নতুন গল্প যোগ করতে `New` / `Create` চাপো; পুরোনো গল্প সম্পাদনা বা মুছতেও পারবে।
6. `Save` / `Commit` করে দাও। GitHub-এ পরিবর্তন commit হবে; কয়েক মিনিট পর ওয়েবসাইটে দেখা যাবে।

## নতুন গল্পের জন্য গুরুত্বপূর্ণ
- `Story ID` ইংরেজি ছোট হাতের অক্ষর ও হাইফেন দিয়ে লেখো, যেমন `amar-notun-golpo`। প্রতিটি গল্পের ID আলাদা হতে হবে।
- বিভাগ: `প্রেম`, `জীবন` অথবা `রহস্য`—এই তিনটির একটি বেছে নাও।
- `পড়ার সময়`: যেমন `৪ মিনিট`।
- কভারের রং না জানলে আগের গল্পের `color` ও `accent`-এর মান রেখে দিতে পারো।
- গল্পের অনুচ্ছেদের মাঝে একটি ফাঁকা লাইন রাখো।
- `popular` চালু করলে গল্পটি জনপ্রিয় হিসেবে দেখাবে।

## যদি গল্প না আসে
- `stories.json` ও `script.js` দুটোই root-এ আছে কি না দেখো।
- `stories.json`-এ কমা/কোটেশন চিহ্ন ভুল হলে JSON লোড হবে না।
- GitHub Pages-এ commit শেষ হওয়ার পর কয়েক মিনিট অপেক্ষা করে পেজ refresh করো।
- ওয়েবসাইটটি GitHub Pages-এ দেখবে; `index.html` ফোনের ফাইল ম্যানেজার থেকে সরাসরি খুললে `fetch`-এর কারণে গল্প লোড নাও হতে পারে।

## নিরাপত্তা
Pages CMS-এ GitHub account দিয়ে লগইন করবে। অপরিচিত কাউকে GitHub password বা verification code দেবে না।
