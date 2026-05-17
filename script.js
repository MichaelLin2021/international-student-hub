// Main JavaScript file for the International Student Hub prototype.
// The site is static HTML/CSS, so this file adds the browser-side behaviour:
// language switching, search, filters, checklist progress, campus map updates
// and the rule-based Hub Assistant chatbot.

// Languages that are fully supported in this prototype.
const workingLanguages = ["en", "zh"];

// Languages shown as future-work options in the dropdown.
const futureLanguages = ["th", "vi"];

// Display names used in toast messages and language selection.
const languageNames = {
    en: "English",
    zh: "Chinese",
    th: "Thai",
    vi: "Vietnamese"
};

// Search index used by the homepage search box.
// Each item maps searchable keywords to one of the website pages.
const searchItems = [
    {
        title: "New Student Guide",
        url: "guide.html",
        description: "First-week steps for registration, accommodation, banking and healthcare.",
        tags: "arrival registration gp nhs first week checklist student id"
    },
    {
        title: "Accommodation",
        url: "accommodation.html",
        description: "Compare on-campus rooms, private halls, contract checks and safety tips.",
        tags: "housing rent deposit bills campus private accommodation"
    },
    {
        title: "Banking",
        url: "banking.html",
        description: "Documents, bank options and a checklist for opening a UK account.",
        tags: "bank account passport proof address hsbc barclays lloyds natwest money"
    },
    {
        title: "Transport",
        url: "transport.html",
        description: "UEA bus routes, train links, apps, cycling and travel recommendations.",
        tags: "bus route 25 26 26a train first bus greater anglia cycling railcard"
    },
    {
        title: "Campus Map",
        url: "map.html",
        description: "Key UEA locations for support, study, health, buses and student life.",
        tags: "map library students union medical centre bus stop square campus"
    },
    {
        title: "Student Events",
        url: "events.html",
        description: "Find welcome events, societies, culture, wellbeing and volunteering.",
        tags: "events societies social welcome union culture wellbeing volunteering"
    },
    {
        title: "Visa Support",
        url: "visa.html",
        description: "Where to get immigration support and what official sources to check.",
        tags: "visa immigration student route ukvi right to study work conditions"
    },
    {
        title: "FAQ",
        url: "faq.html",
        description: "Quick answers for arrival, healthcare, accommodation, transport and daily life.",
        tags: "questions help emergency faq arrival healthcare accommodation transport"
    }
];

// Chinese translations for key interface and content text.
// The English text in the HTML is used as the lookup key.
const zhTranslations = {
    "Skip to main content": "跳到主要内容",
    "International Student Hub": "国际学生中心",
    "UEA arrival support": "UEA 到达支持",
    "Home": "首页",
    "Guide": "指南",
    "New Student Guide": "新生指南",
    "Accommodation": "住宿",
    "Banking": "银行",
    "Transport": "交通",
    "Campus Map": "校园地图",
    "FAQ": "常见问题",
    "Events": "活动",
    "Visa": "签证",
    "Ask Hub": "询问中心",
    "English": "英语",
    "Chinese": "中文",
    "Thai (future work)": "泰语（未来工作）",
    "Vietnamese (future work)": "越南语（未来工作）",
    "UEA international student support prototype": "UEA 国际学生支持原型",
    "A central place for new international students to find the practical information they need before arrival, during registration and throughout the first weeks in Norwich.": "为新国际学生集中提供到达前、注册期间以及在诺里奇最初几周所需的实用信息。",
    "Find support quickly": "快速查找支持",
    "Search": "搜索",
    "Start here": "从这里开始",
    "Priority Tasks": "优先任务",
    "Quick routes for the tasks students usually need to complete first.": "学生通常需要先完成的任务入口。",
    "Open full guide": "打开完整指南",
    "First week": "第一周",
    "Follow the arrival checklist": "按照到达清单操作",
    "Registration, student ID, GP registration, email, accommodation and core university systems.": "注册、学生证、GP 注册、邮箱、住宿和核心大学系统。",
    "Housing": "住房",
    "Compare accommodation options": "比较住宿选择",
    "Check contract length, bills, location, transport and safety before choosing where to live.": "选择住处前检查合同期限、账单、位置、交通和安全。",
    "Money": "资金",
    "Prepare for a UK bank account": "准备英国银行账户",
    "Review documents, compare banks and use the checklist before applying online or in branch.": "申请前查看文件、比较银行并使用清单。",
    "Designed from user needs": "基于用户需求设计",
    "What the Hub Solves": "中心解决的问题",
    "The project responds to the problem of useful information being spread across too many platforms.": "本项目回应了有用信息分散在过多平台上的问题。",
    "Student life": "学生生活",
    "Support Beyond Arrival": "到达后的支持",
    "Student events": "学生活动",
    "Transport guide": "交通指南",
    "Campus map": "校园地图",
    "Final Year Project - Qi Lin": "毕业项目 - Qi Lin",
    "Prototype for usability evaluation. Students should confirm live requirements with official UEA, UK government and provider websites.": "用于可用性评估的原型。学生应通过 UEA、英国政府和服务提供方官网确认最新要求。",
    "Accommodation Guide": "住宿指南",
    "Accommodation Finder": "住宿查找器",
    "All": "全部",
    "On campus": "校内",
    "City centre": "市中心",
    "Budget aware": "预算优先",
    "Social facilities": "社交设施",
    "Decision guide": "选择指南",
    "How to Choose": "如何选择",
    "Before You Pay": "付款前",
    "Bank Account Setup": "银行账户设置",
    "Step-by-Step Banking Plan": "银行办理步骤",
    "Documents Ready?": "文件准备好了吗？",
    "Passport or national identity document": "护照或身份证件",
    "UEA enrolment or student status confirmation": "UEA 入学或学生身份确认",
    "UK address or accommodation confirmation": "英国地址或住宿确认",
    "Visa or immigration status information if requested": "如被要求，提供签证或移民状态信息",
    "Phone number and email access for verification": "用于验证的手机号和邮箱",
    "Examples to Compare": "可比较的例子",
    "Transport Guide": "交通指南",
    "Choose a Travel Mode": "选择出行方式",
    "Bus": "公交",
    "Train": "火车",
    "Cycling": "骑行",
    "Apps": "应用",
    "Common Student Journeys": "常见学生路线",
    "Student Events": "学生活动",
    "Event Types": "活动类型",
    "Welcome": "欢迎",
    "Social": "社交",
    "Wellbeing": "身心健康",
    "Skills": "技能",
    "Frequently Asked Questions": "常见问题",
    "Quick answers": "快速答案",
    "Arrival and Visa": "到达与签证",
    "Do I need a visa?": "我需要签证吗？",
    "Where can I get visa support?": "哪里可以获得签证支持？",
    "Healthcare": "医疗保健",
    "GP and Emergency Help": "GP 和紧急帮助",
    "How do I register with a GP?": "如何注册 GP？",
    "What should I do in an emergency?": "紧急情况该怎么办？",
    "Visa and Immigration Support": "签证和移民支持",
    "Common Support Topics": "常见支持主题",
    "Important Reminder": "重要提醒",
    "Key Campus Locations": "校园关键地点",
    "Interactive prototype": "交互式原型",
    "Library": "图书馆",
    "Students' Union": "学生会",
    "Medical Centre": "医疗中心",
    "Bus Stops": "公交站",
    "Hub Assistant": "中心助手",
    "Prototype support chatbot": "原型支持聊天机器人",
    "Open Hub Assistant": "打开中心助手",
    "Close": "关闭",
    "Close chatbot": "关闭聊天机器人",
    "Bank documents": "银行文件",
    "Should I live on campus or in the city?": "我应该住校内还是市中心？",
    "How do I get to Norwich city centre?": "如何去诺里奇市中心？",
    "Where can I get visa help?": "哪里可以获得签证帮助？",
    "Send": "发送",
    "Open banking guide": "打开银行指南",
    "Compare accommodation": "比较住宿",
    "Open transport guide": "打开交通指南",
    "Open visa support": "打开签证支持",
    "Open FAQ": "打开常见问题",
    "Open campus map": "打开校园地图",
    "Open events page": "打开活动页面",
    "Open student guide": "打开学生指南",
    "No exact match found. Try banking, visa, bus, accommodation or GP.": "没有找到完全匹配。请尝试搜索银行、签证、公交、住宿或 GP。"
};

// Placeholder text needs separate handling because it is stored in attributes, not text nodes.
const zhPlaceholders = {
    "Search banking, visa, GP, buses, accommodation...": "搜索银行、签证、GP、公交、住宿...",
    "Ask about banking, buses, GP, visa...": "询问银行、公交、GP、签证..."
};

// First chatbot message shown when the Hub Assistant is opened.
const chatbotIntro = {
    en: "Hi, I can help you find information in this student hub. Ask me about accommodation, banking, transport, campus map, FAQ, GP, events or visa support.",
    zh: "你好，我可以帮你查找这个学生中心的信息。你可以问我住宿、银行、交通、校园地图、常见问题、GP、活动或签证支持。"
};

// Default chatbot answer when a question does not match a known topic.
const chatbotFallback = {
    en: "I can help with banking, accommodation, transport, visa support, GP registration, events, campus locations and first-week tasks. Try asking a more specific question.",
    zh: "我可以帮助你了解银行、住宿、交通、签证支持、GP 注册、活动、校园地点和第一周任务。请尝试问得更具体一些。"
};

// Rule-based chatbot knowledge base.
// Keywords are matched against the user's question and return a relevant answer/page link.
const chatbotAnswers = [
    {
        keywords: ["bank", "money", "account", "document", "proof", "passport"],
        link: "banking.html",
        linkText: "Open banking guide",
        en: "For a UK bank account, prepare your passport or ID, student status confirmation, UK address or accommodation confirmation, and visa information if the bank asks for it.",
        zh: "开英国银行账户通常需要护照或身份证件、学生身份确认、英国地址或住宿确认，以及银行要求时提供签证信息。"
    },
    {
        keywords: ["accommodation", "housing", "rent", "campus", "city", "deposit", "bills"],
        link: "accommodation.html",
        linkText: "Compare accommodation",
        en: "For accommodation, compare campus and city options by rent, bills, contract length, travel time, facilities and safety. On-campus housing is often simpler for the first year.",
        zh: "选择住宿时，比较校内和市中心选项的租金、账单、合同期限、通勤时间、设施和安全。第一年住校内通常更简单。"
    },
    {
        keywords: ["bus", "transport", "train", "travel", "city centre", "railway", "station", "cycling"],
        link: "transport.html",
        linkText: "Open transport guide",
        en: "For travel around UEA, Blue Line buses 25, 26 and 26A are useful for the city centre and railway station. Check live times before leaving.",
        zh: "在 UEA 周边出行，Blue Line 25、26 和 26A 公交可前往市中心和火车站。出发前请查看实时班次。"
    },
    {
        keywords: ["visa", "immigration", "ukvi", "right to study", "student route", "work"],
        link: "visa.html",
        linkText: "Open visa support",
        en: "For visa or immigration questions, use official UEA and UK government guidance. UEA International Student Advisers can help with student visa support.",
        zh: "签证或移民问题请使用 UEA 和英国政府官方指导。UEA 国际学生顾问可以提供学生签证支持。"
    },
    {
        keywords: ["gp", "doctor", "health", "medical", "nhs", "emergency", "111", "999"],
        link: "faq.html",
        linkText: "Open FAQ",
        en: "Register with a GP early so you can access non-emergency healthcare. Call 999 for emergencies and use NHS 111 for urgent medical advice that is not life-threatening.",
        zh: "请尽早注册 GP，以便获得非紧急医疗服务。紧急情况拨打 999，非生命危险的紧急医疗建议可使用 NHS 111。"
    },
    {
        keywords: ["map", "library", "union", "campus", "medical centre", "square", "where"],
        link: "map.html",
        linkText: "Open campus map",
        en: "The map page highlights key places such as the Library, Students' Union, Medical Centre, bus stops and The Square.",
        zh: "地图页面标出图书馆、学生会、医疗中心、公交站和 The Square 等重要地点。"
    },
    {
        keywords: ["event", "society", "social", "friends", "welcome", "community"],
        link: "events.html",
        linkText: "Open events page",
        en: "Events and societies can help international students meet people, practise English and feel more connected to campus life.",
        zh: "活动和社团可以帮助国际学生认识朋友、练习英语并更好融入校园生活。"
    },
    {
        keywords: ["guide", "first week", "arrival", "registration", "student id", "blackboard", "evision"],
        link: "guide.html",
        linkText: "Open student guide",
        en: "Start with the New Student Guide for arrival tasks: registration, student ID, accommodation, banking, healthcare and university systems.",
        zh: "请从新生指南开始，了解注册、学生证、住宿、银行、医疗和大学系统等到达任务。"
    }
];

// Stores the original page text so the site can switch between English and Chinese
// without permanently replacing the English content in the HTML.
let staticTextNodes = [];

// Initialise all interactive features after the page has loaded.
document.addEventListener("DOMContentLoaded", () => {
    // Save original text before any translation is applied.
    collectStaticTextNodes();

    // Set up shared navigation and page-specific tools.
    initNavigationDropdown();
    setActiveNavigation();
    initLanguagePreference();
    initSearch();
    initFilters();
    initChecklist();
    initCampusMap();
    initChatbot();
});

// Return the saved language, falling back to English if the saved option is unsupported.
function currentLanguage() {
    const saved = localStorage.getItem("hubLanguage") || "en";
    return workingLanguages.includes(saved) ? saved : "en";
}

// Translate normal visible text. If no translation exists, keep the original English.
function translate(text, language = currentLanguage()) {
    return language === "zh" ? zhTranslations[text] || text : text;
}

// Translate input placeholders separately from normal text.
function translatePlaceholder(text, language = currentLanguage()) {
    return language === "zh" ? zhPlaceholders[text] || text : text;
}

// Collect visible text nodes from the page so language switching can update them later.
function collectStaticTextNodes() {
    // SCRIPT and STYLE text should never be translated, only visible page copy.
    const ignoredTags = new Set(["SCRIPT", "STYLE", "NOSCRIPT"]);
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
        acceptNode(node) {
            const parent = node.parentElement;
            if (!parent || ignoredTags.has(parent.tagName) || !node.nodeValue.trim()) {
                return NodeFilter.FILTER_REJECT;
            }
            return NodeFilter.FILTER_ACCEPT;
        }
    });

    staticTextNodes = [];
    let node = walker.nextNode();
    while (node) {
        // Keep both the node reference and the original English text.
        staticTextNodes.push({ node, original: node.nodeValue });
        node = walker.nextNode();
    }
}

// Apply a selected language to the page.
// Thai and Vietnamese are intentionally future-work options and do not change page text.
function applyLanguage(language) {
    // Future-work languages stay visible in the dropdown, but they do not change content yet.
    if (futureLanguages.includes(language)) {
        resetLanguageSelects();
        showToast(`${languageNames[language]} translation is planned for future work.`);
        return;
    }

    if (!workingLanguages.includes(language)) {
        language = "en";
    }

    localStorage.setItem("hubLanguage", language);
    document.documentElement.lang = language;
    document.documentElement.dir = "ltr";

    // Replace each saved text node with the matching translation when available.
    staticTextNodes.forEach(({ node, original }) => {
        const trimmed = original.trim();
        node.nodeValue = original.replace(trimmed, translate(trimmed, language));
    });

    // Placeholder text lives inside attributes, so it is updated separately.
    document.querySelectorAll("[placeholder]").forEach((input) => {
        const original = input.dataset.originalPlaceholder || input.getAttribute("placeholder");
        input.dataset.originalPlaceholder = original;
        input.setAttribute("placeholder", translatePlaceholder(original, language));
    });

    // Dynamic interface parts are refreshed after the language changes.
    resetLanguageSelects(language);
    updateChecklistLabels();
    updateSearchResults();
    updateChatbotLanguage();
}

// Keep every language dropdown on the current selected language.
function resetLanguageSelects(language = currentLanguage()) {
    document.querySelectorAll(".language-select").forEach((select) => {
        select.value = language;
    });
}

// Connect the language dropdown to the translation system.
function initLanguagePreference() {
    document.querySelectorAll(".language-select").forEach((select) => {
        select.value = currentLanguage();
        select.addEventListener("change", () => {
            const selected = select.value;
            applyLanguage(selected);
            if (workingLanguages.includes(selected)) {
                // Confirm that the working language has been saved for the next visit.
                showToast(`${languageNames[selected]} preference saved.`);
            }
        });
    });

    applyLanguage(currentLanguage());
}

// Controls the Guide dropdown in the navigation bar.
function initNavigationDropdown() {
    document.querySelectorAll(".nav-dropdown").forEach((dropdown) => {
        const button = dropdown.querySelector(".nav-dropdown-toggle");
        if (!button) {
            return;
        }

        button.addEventListener("click", (event) => {
            // Stop the page-level click handler from closing the menu immediately.
            event.stopPropagation();
            const isOpen = dropdown.classList.toggle("open");
            button.setAttribute("aria-expanded", String(isOpen));
        });
    });

    document.addEventListener("click", closeNavigationDropdowns);
    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            closeNavigationDropdowns();
        }
    });
}

// Close any open navigation dropdowns.
function closeNavigationDropdowns() {
    document.querySelectorAll(".nav-dropdown.open").forEach((dropdown) => {
        dropdown.classList.remove("open");
        const button = dropdown.querySelector(".nav-dropdown-toggle");
        if (button) {
            button.setAttribute("aria-expanded", "false");
        }
    });
}

// Highlight the current page in the navigation bar.
function setActiveNavigation() {
    const currentPage = location.pathname.split("/").pop() || "index.html";
    const guidePages = ["guide.html", "accommodation.html", "banking.html", "transport.html", "map.html", "faq.html"];

    document.querySelectorAll(".nav-links a").forEach((link) => {
        if (link.getAttribute("href") === currentPage) {
            link.classList.add("active");
            link.setAttribute("aria-current", "page");
        }
    });

    if (guidePages.includes(currentPage)) {
        // Any page inside the guide group should also highlight the Guide dropdown button.
        document.querySelectorAll(".nav-dropdown-toggle").forEach((button) => {
            button.classList.add("active");
            button.setAttribute("aria-current", "page");
        });
    }
}

// Set up the homepage search field and search button.
function initSearch() {
    const input = document.querySelector("[data-site-search]");
    const button = document.querySelector("[data-search-button]");
    if (!input) {
        // Only the homepage has the search box, so other pages skip this safely.
        return;
    }

    input.addEventListener("input", updateSearchResults);
    if (button) {
        button.addEventListener("click", updateSearchResults);
    }

    updateSearchResults();
}

// Render matching search results based on the user's query.
function updateSearchResults() {
    const input = document.querySelector("[data-site-search]");
    const results = document.querySelector("[data-search-results]");
    if (!input || !results) {
        return;
    }

    const query = input.value.trim().toLowerCase();
    // With no query, show the first three useful starting points.
    // With a query, search across titles, descriptions and hidden keyword tags.
    const matches = query
        ? searchItems.filter((item) => `${item.title} ${item.description} ${item.tags}`.toLowerCase().includes(query))
        : searchItems.slice(0, 3);

    results.innerHTML = "";

    if (matches.length === 0) {
        const empty = document.createElement("p");
        empty.className = "muted";
        empty.textContent = translate("No exact match found. Try banking, visa, bus, accommodation or GP.");
        results.appendChild(empty);
        return;
    }

    matches.slice(0, 6).forEach((item) => {
        // Build the result links with DOM nodes so they remain clickable and translatable.
        const link = document.createElement("a");
        link.className = "search-result";
        link.href = item.url;
        link.innerHTML = `<strong>${translate(item.title)}</strong><span>${translate(item.description)}</span>`;
        results.appendChild(link);
    });
}

// Enable filter buttons on pages such as Accommodation, Transport and Events.
function initFilters() {
    document.querySelectorAll(".filter-section").forEach((section) => {
        const chips = section.querySelectorAll("[data-filter]");
        const cards = section.querySelectorAll("[data-category]");

        chips.forEach((chip) => {
            chip.addEventListener("click", () => {
                const filter = chip.dataset.filter;

                // Move the active style onto the selected filter button.
                chips.forEach((item) => item.classList.remove("active"));
                chip.classList.add("active");

                cards.forEach((card) => {
                    // Cards can have more than one category, separated by spaces.
                    const categories = card.dataset.category.split(" ");
                    card.style.display = filter === "all" || categories.includes(filter) ? "" : "none";
                });
            });
        });
    });
}

// Set up the banking document checklist and progress bar.
function initChecklist() {
    document.querySelectorAll(".checklist-panel").forEach((panel) => {
        panel.querySelectorAll("input[type='checkbox']").forEach((box) => {
            box.addEventListener("change", () => updateChecklistPanel(panel));
        });
        updateChecklistPanel(panel);
    });
}

// Refresh checklist progress labels after language or checkbox changes.
function updateChecklistLabels() {
    document.querySelectorAll(".checklist-panel").forEach(updateChecklistPanel);
}

// Calculate checklist progress and update the visual progress bar.
function updateChecklistPanel(panel) {
    const boxes = [...panel.querySelectorAll("input[type='checkbox']")];
    const checked = boxes.filter((box) => box.checked).length;
    // Avoid division by zero in case the panel is reused without checkboxes.
    const percent = boxes.length ? Math.round((checked / boxes.length) * 100) : 0;
    const fill = panel.querySelector(".progress-fill");
    const label = panel.querySelector("[data-progress-label]");

    if (fill) {
        fill.style.width = `${percent}%`;
    }
    if (label) {
        // The progress label is generated in code because the numbers change live.
        label.textContent = currentLanguage() === "zh"
            ? `${checked}/${boxes.length} 份文件已准备`
            : `${checked} of ${boxes.length} documents ready`;
    }
}

// Make campus map pins update the information panel when clicked.
function initCampusMap() {
    const map = document.querySelector("[data-campus-map]");
    const detail = document.querySelector("[data-map-detail]");
    if (!map || !detail) {
        return;
    }

    map.querySelectorAll("[data-title]").forEach((pin) => {
        pin.addEventListener("click", () => {
            // Highlight the selected pin and show its stored data in the detail panel.
            map.querySelectorAll(".map-pin").forEach((item) => item.classList.remove("active"));
            pin.classList.add("active");
            detail.innerHTML = `
                <span class="badge">${pin.dataset.type}</span>
                <h3>${pin.dataset.title}</h3>
                <p>${pin.dataset.description}</p>
            `;
        });
    });
}

// Create the floating chatbot widget and attach all chat events.
function initChatbot() {
    // The chatbot is created with JavaScript so it appears on every page automatically.
    const widget = document.createElement("section");
    widget.className = "chatbot-widget";
    widget.setAttribute("aria-label", "Hub chatbot");
    widget.innerHTML = `
        <button class="chatbot-fab" type="button" data-chat-fab aria-label="${translate("Open Hub Assistant")}">${translate("Ask Hub")}</button>
        <div class="chatbot-panel" data-chat-panel hidden>
            <div class="chatbot-header">
                <div>
                    <strong data-chat-title>${translate("Hub Assistant")}</strong>
                    <span data-chat-subtitle>${translate("Prototype support chatbot")}</span>
                </div>
                <button type="button" data-chat-close aria-label="${translate("Close chatbot")}">${translate("Close")}</button>
            </div>
            <div class="chatbot-messages" data-chat-messages aria-live="polite"></div>
            <div class="chatbot-prompts" aria-label="Suggested questions">
                <button type="button" data-chat-prompt="What documents do I need for a bank account?" data-chat-label="Bank documents">${translate("Bank documents")}</button>
                <button type="button" data-chat-prompt="Should I live on campus or in the city?" data-chat-label="Accommodation">${translate("Accommodation")}</button>
                <button type="button" data-chat-prompt="How do I get to Norwich city centre?" data-chat-label="Transport">${translate("Transport")}</button>
                <button type="button" data-chat-prompt="Where can I get visa help?" data-chat-label="Visa">${translate("Visa")}</button>
            </div>
            <form class="chatbot-form" data-chat-form>
                <input type="text" data-chat-input data-original-placeholder="Ask about banking, buses, GP, visa..." placeholder="${translatePlaceholder("Ask about banking, buses, GP, visa...")}" aria-label="Chat question">
                <button type="submit" data-chat-send>${translate("Send")}</button>
            </form>
        </div>
    `;
    document.body.appendChild(widget);

    const panel = widget.querySelector("[data-chat-panel]");
    const messages = widget.querySelector("[data-chat-messages]");
    const input = widget.querySelector("[data-chat-input]");

    const openChat = () => {
        panel.hidden = false;
        widget.classList.add("open");
        if (!messages.dataset.started) {
            // Show the welcome message only once per page visit.
            addChatMessage(messages, "bot", localizedText(chatbotIntro));
            messages.dataset.started = "true";
        }
        input.focus();
    };

    widget.querySelector("[data-chat-fab]").addEventListener("click", openChat);
    widget.querySelector("[data-chat-close]").addEventListener("click", () => {
        widget.classList.remove("open");
        panel.hidden = true;
    });

    document.querySelectorAll("[data-chat-open]").forEach((button) => button.addEventListener("click", openChat));
    widget.querySelectorAll("[data-chat-prompt]").forEach((button) => {
        // Suggested question chips send predefined questions into the same answer logic.
        button.addEventListener("click", () => handleChatQuestion(messages, button.dataset.chatPrompt));
    });

    widget.querySelector("[data-chat-form]").addEventListener("submit", (event) => {
        event.preventDefault();
        const question = input.value.trim();
        if (!question) {
            return;
        }
        input.value = "";
        handleChatQuestion(messages, question);
    });
}

// Add the user's question and the bot's answer to the chat panel.
function handleChatQuestion(messages, question) {
    addChatMessage(messages, "user", question);
    const answer = getChatbotAnswer(question);
    addChatMessage(messages, "bot", answer.text, answer.link, answer.linkText);
}

// Pick the best chatbot answer by checking question keywords.
function getChatbotAnswer(question) {
    const lowerQuestion = question.toLowerCase();
    // This is a simple rule-based chatbot: it looks for topic keywords, not AI-generated answers.
    const answer = chatbotAnswers.find((item) => item.keywords.some((keyword) => lowerQuestion.includes(keyword)));

    if (!answer) {
        return { text: localizedText(chatbotFallback), link: "faq.html", linkText: translate("Open FAQ") };
    }

    return {
        text: localizedText(answer),
        link: answer.link,
        linkText: translate(answer.linkText)
    };
}

// Return either the English or Chinese version of a chatbot message.
function localizedText(copy) {
    return currentLanguage() === "zh" ? copy.zh || copy.en : copy.en;
}

// Add one message bubble to the chatbot conversation.
function addChatMessage(messages, role, text, link, linkText) {
    const message = document.createElement("div");
    message.className = `chatbot-message ${role}`;

    const paragraph = document.createElement("p");
    paragraph.textContent = text;
    message.appendChild(paragraph);

    if (link) {
        // Some answers include a page link so users can continue from the chat to the right section.
        const anchor = document.createElement("a");
        anchor.href = link;
        anchor.textContent = linkText;
        message.appendChild(anchor);
    }

    messages.appendChild(message);
    messages.scrollTop = messages.scrollHeight;
}

// Update chatbot labels when the language changes.
function updateChatbotLanguage() {
    const widget = document.querySelector(".chatbot-widget");
    if (!widget) {
        return;
    }

    widget.querySelector("[data-chat-fab]").textContent = translate("Ask Hub");
    widget.querySelector("[data-chat-fab]").setAttribute("aria-label", translate("Open Hub Assistant"));
    widget.querySelector("[data-chat-title]").textContent = translate("Hub Assistant");
    widget.querySelector("[data-chat-subtitle]").textContent = translate("Prototype support chatbot");
    widget.querySelector("[data-chat-close]").textContent = translate("Close");
    widget.querySelector("[data-chat-close]").setAttribute("aria-label", translate("Close chatbot"));
    widget.querySelector("[data-chat-send]").textContent = translate("Send");

    widget.querySelectorAll("[data-chat-label]").forEach((button) => {
        button.textContent = translate(button.dataset.chatLabel);
    });
}

// Show a short message in the bottom corner for language and future-work feedback.
function showToast(message) {
    let toast = document.querySelector("[data-toast]");
    if (!toast) {
        // Create the toast only when it is first needed, then reuse it.
        toast = document.createElement("div");
        toast.className = "toast";
        toast.dataset.toast = "";
        toast.setAttribute("role", "status");
        toast.setAttribute("aria-live", "polite");
        document.body.appendChild(toast);
    }

    toast.textContent = message;
    toast.classList.add("show");
    // Restart the timer so fast repeated messages do not overlap.
    window.clearTimeout(showToast.timeoutId);
    showToast.timeoutId = window.setTimeout(() => toast.classList.remove("show"), 3200);
}
