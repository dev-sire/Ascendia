### Ascendia: Next-Gen Learning Platform

Under-Development, a modular, open-source LMS platform featuring dynamic course creation and deep progress tracking.

```
Ascendia/
├── .env.example
├── .eslintrc.json
├── .gitignore
├── .prettierrc
├── .vscode/
│   └── settings.json
├── LICENSE
├── README.md
├── bun.lock
├── commitlint.config.ts
├── components.json
├── next.config.mjs
├── package-lock.json
├── package.json
├── postcss.config.mjs
├── prisma/
│   └── schema.prisma
├── public/
│   ├── dashboard-snippet.png
│   ├── file-text.svg
│   ├── globe.svg
│   ├── next.svg
│   ├── stripe.png
│   ├── vercel.svg
│   └── window.svg
├── src/
│   ├── actions/
│   │   ├── auth.ts
│   │   ├── channel.ts
│   │   ├── channels.ts
│   │   ├── course.ts
│   │   ├── groups.ts
│   │   └── payment.ts
│   ├── app/
│   │   ├── (auth)/
│   │   │   ├── layout.tsx
│   │   │   ├── sign-in/
│   │   │   │   └── page.tsx
│   │   │   └── sign-up/
│   │   │       └── page.tsx
│   │   ├── (discover)/
│   │   │   ├── _components/
│   │   │   │   └── navbar/
│   │   │   │       ├── group-dropdown.tsx
│   │   │   │       └── index.tsx
│   │   │   ├── about/
│   │   │   │   ├── [groupId]/
│   │   │   │   │   └── page.tsx
│   │   │   │   └── _components/
│   │   │   │       ├── about/
│   │   │   │       │   └── index.tsx
│   │   │   │       ├── gallery/
│   │   │   │       │   └── index.tsx
│   │   │   │       └── join-button/
│   │   │   │           └── index.tsx
│   │   │   ├── explore/
│   │   │   │   ├── [category]/
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── _components/
│   │   │   │   │   ├── explore-content.tsx
│   │   │   │   │   ├── explore-slider.tsx
│   │   │   │   │   ├── group-card.tsx
│   │   │   │   │   ├── group-cards.tsx
│   │   │   │   │   ├── group-list.tsx
│   │   │   │   │   ├── paginated-groups.tsx
│   │   │   │   │   └── searched-groups.tsx
│   │   │   │   ├── layout.tsx
│   │   │   │   └── page.tsx
│   │   │   ├── layout.tsx
│   │   │   └── loading.tsx
│   │   ├── (landing)/
│   │   │   ├── _components/
│   │   │   │   ├── call-to-action/
│   │   │   │   │   └── index.tsx
│   │   │   │   ├── dashboard-snippet/
│   │   │   │   │   ├── dashboard-snippet.tsx
│   │   │   │   │   └── index.tsx
│   │   │   │   ├── navbar/
│   │   │   │   │   ├── index.tsx
│   │   │   │   │   └── menu.tsx
│   │   │   │   ├── pricing-section/
│   │   │   │   │   └── index.tsx
│   │   │   │   └── pricing/
│   │   │   │       └── index.tsx
│   │   │   ├── layout.tsx
│   │   │   └── page.tsx
│   │   ├── affiliates/
│   │   │   └── [Id]/
│   │   │       ├── loading.tsx
│   │   │       └── page.tsx
│   │   ├── api/
│   │   │   └── stripe/
│   │   │       └── connect/
│   │   │           └── route.ts
│   │   ├── callback/
│   │   │   ├── complete/
│   │   │   │   ├── page.ts
│   │   │   │   └── page.tsx
│   │   │   ├── loading.tsx
│   │   │   ├── page.tsx
│   │   │   └── sign-in/
│   │   │       ├── page.ts
│   │   │       └── page.tsx
│   │   ├── favicon.ico
│   │   ├── globals.css
│   │   ├── group/
│   │   │   ├── [groupid]/
│   │   │   │   ├── _components/
│   │   │   │   │   ├── group-navbar/
│   │   │   │   │   │   └── index.tsx
│   │   │   │   │   ├── leader-board/
│   │   │   │   │   │   └── index.tsx
│   │   │   │   │   └── mobile-nav/
│   │   │   │   │       └── index.tsx
│   │   │   │   ├── channel/
│   │   │   │   │   └── [channelid]/
│   │   │   │   │       ├── [postId]/
│   │   │   │   │       │   ├── _components/
│   │   │   │   │       │   │   ├── comments/
│   │   │   │   │       │   │   │   ├── index.tsx
│   │   │   │   │       │   │   │   └── user-comment.tsx
│   │   │   │   │       │   │   └── post-info/
│   │   │   │   │       │   │       └── index.tsx
│   │   │   │   │       │   └── page.tsx
│   │   │   │   │       ├── _components/
│   │   │   │   │       │   ├── create-post/
│   │   │   │   │       │   │   └── index.tsx
│   │   │   │   │       │   ├── paginates-posts/
│   │   │   │   │       │   │   └── index.tsx
│   │   │   │   │       │   └── post-feed/
│   │   │   │   │       │       ├── index.tsx
│   │   │   │   │       │       ├── interactions.tsx
│   │   │   │   │       │       ├── post-author.tsx
│   │   │   │   │       │       └── post-card.tsx
│   │   │   │   │       └── page.tsx
│   │   │   │   ├── courses/
│   │   │   │   │   ├── [courseId]/
│   │   │   │   │   │   ├── [sectionId]/
│   │   │   │   │   │   │   ├── _components/
│   │   │   │   │   │   │   │   └── section-navbar/
│   │   │   │   │   │   │   │       └── index.tsx
│   │   │   │   │   │   │   ├── layout.tsx
│   │   │   │   │   │   │   └── page.tsx
│   │   │   │   │   │   ├── layout.tsx
│   │   │   │   │   │   └── page.tsx
│   │   │   │   │   ├── _components/
│   │   │   │   │   │   ├── course-list/
│   │   │   │   │   │   │   └── index.tsx
│   │   │   │   │   │   ├── create-module/
│   │   │   │   │   │   │   └── index.tsx
│   │   │   │   │   │   └── module-list/
│   │   │   │   │   │       └── index.tsx
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── layout.tsx
│   │   │   │   └── settings/
│   │   │   │       ├── affiliates/
│   │   │   │       │   └── page.tsx
│   │   │   │       ├── domains/
│   │   │   │       │   └── page.tsx
│   │   │   │       ├── integrations/
│   │   │   │       │   ├── _components/
│   │   │   │       │   │   ├── connet/
│   │   │   │       │   │   │   └── index.tsx
│   │   │   │       │   │   └── integration-trigger/
│   │   │   │       │   │       └── index.tsx
│   │   │   │       │   └── page.tsx
│   │   │   │       ├── messages/
│   │   │   │       │   ├── _components/
│   │   │   │       │   │   ├── chat-bubble/
│   │   │   │       │   │   │   └── index.tsx
│   │   │   │       │   │   ├── chat-menu/
│   │   │   │       │   │   │   └── index.tsx
│   │   │   │       │   │   └── chat/
│   │   │   │       │   │       └── index.tsx
│   │   │   │       │   ├── index.tsx
│   │   │   │       │   └── layout.tsx
│   │   │   │       ├── page.tsx
│   │   │   │       └── subscriptions/
│   │   │   │           ├── _components/
│   │   │   │           │   ├── card/
│   │   │   │           │   │   └── index.tsx
│   │   │   │           │   └── subscription/
│   │   │   │           │       └── index.tsx
│   │   │   │           └── page.tsx
│   │   │   ├── _components/
│   │   │   │   └── navbar/
│   │   │   │       └── index.tsx
│   │   │   └── create/
│   │   │       ├── layout.tsx
│   │   │       ├── loading.tsx
│   │   │       └── page.tsx
│   │   └── layout.tsx
│   ├── components/
│   │   ├── forms/
│   │   │   ├── course-content/
│   │   │   │   ├── index.tsx
│   │   │   │   └── schema.ts
│   │   │   ├── create-group/
│   │   │   │   ├── index.tsx
│   │   │   │   ├── payment-form.tsx
│   │   │   │   └── schema.ts
│   │   │   ├── domain/
│   │   │   │   ├── index.tsx
│   │   │   │   └── schema.ts
│   │   │   ├── group-settings/
│   │   │   │   ├── index.tsx
│   │   │   │   └── schema.ts
│   │   │   ├── huddles/
│   │   │   │   ├── index.tsx
│   │   │   │   └── schema.ts
│   │   │   ├── media-gallery/
│   │   │   │   ├── index.tsx
│   │   │   │   └── schema.ts
│   │   │   ├── sign-in/
│   │   │   │   ├── index.tsx
│   │   │   │   └── schema.ts
│   │   │   ├── sign-up/
│   │   │   │   ├── index.tsx
│   │   │   │   └── schema.ts
│   │   │   └── subscription/
│   │   │       ├── index.tsx
│   │   │       └── schema.ts
│   │   ├── global/
│   │   │   ├── backdrop-gradient/
│   │   │   │   └── index.tsx
│   │   │   ├── copy-button/
│   │   │   │   └── index.tsx
│   │   │   ├── create-course/
│   │   │   │   ├── index.tsx
│   │   │   │   └── schema.ts
│   │   │   ├── drop-down/
│   │   │   │   └── index.tsx
│   │   │   ├── form-generator/
│   │   │   │   └── index.tsx
│   │   │   ├── glass-card/
│   │   │   │   └── index.tsx
│   │   │   ├── glass-modal/
│   │   │   │   └── index.tsx
│   │   │   ├── glass-sheet/
│   │   │   │   └── index.tsx
│   │   │   ├── global-oauth-button/
│   │   │   │   └── index.tsx
│   │   │   ├── globle-accordion/
│   │   │   │   └── index.tsx
│   │   │   ├── google-0auth-button/
│   │   │   │   └── index.tsx
│   │   │   ├── gradient-text/
│   │   │   │   └── index.tsx
│   │   │   ├── group-list-slider/
│   │   │   │   ├── index.tsx
│   │   │   │   └── list-item.tsx
│   │   │   ├── group-side-widget/
│   │   │   │   └── index.tsx
│   │   │   ├── html-parser/
│   │   │   │   └── index.tsx
│   │   │   ├── icon-renderer/
│   │   │   │   └── index.tsx
│   │   │   ├── infinite-scroll/
│   │   │   │   └── index.tsx
│   │   │   ├── join-group/
│   │   │   │   └── index.tsx
│   │   │   ├── loader/
│   │   │   │   └── index.tsx
│   │   │   ├── otp-input/
│   │   │   │   └── index.tsx
│   │   │   ├── post-comments/
│   │   │   │   ├── index.tsx
│   │   │   │   └── schema.ts
│   │   │   ├── post-content/
│   │   │   │   ├── index.tsx
│   │   │   │   └── schema.ts
│   │   │   ├── post-reply/
│   │   │   │   └── index.tsx
│   │   │   ├── rich-text-editor/
│   │   │   │   ├── color-selector.tsx
│   │   │   │   ├── extensions.tsx
│   │   │   │   ├── image.ts
│   │   │   │   ├── index.tsx
│   │   │   │   ├── link-selector.tsx
│   │   │   │   ├── node-selector.tsx
│   │   │   │   ├── slash-command.tsx
│   │   │   │   ├── text-slector.tsx
│   │   │   │   └── video.ts
│   │   │   ├── search/
│   │   │   │   ├── index.tsx
│   │   │   │   └── no-results.tsx
│   │   │   ├── sidebar/
│   │   │   │   ├── icon-dropdown.tsx
│   │   │   │   ├── index.tsx
│   │   │   │   └── menu.tsx
│   │   │   ├── simple-modal/
│   │   │   │   └── index.tsx
│   │   │   ├── skeleton/
│   │   │   │   └── index.tsx
│   │   │   ├── slider/
│   │   │   │   └── index.tsx
│   │   │   ├── stripe/
│   │   │   │   └── elements.tsx
│   │   │   └── user-widget/
│   │   │       ├── index.tsx
│   │   │       ├── notification.tsx
│   │   │       └── user.tsx
│   │   ├── theme/
│   │   │   └── index.tsx
│   │   └── ui/
│   │       ├── accordion.tsx
│   │       ├── alert-dialog.tsx
│   │       ├── alert.tsx
│   │       ├── aspect-ratio.tsx
│   │       ├── avatar.tsx
│   │       ├── badge.tsx
│   │       ├── breadcrumb.tsx
│   │       ├── button.tsx
│   │       ├── calendar.tsx
│   │       ├── card.tsx
│   │       ├── carousel.tsx
│   │       ├── chart.tsx
│   │       ├── checkbox.tsx
│   │       ├── collapsible.tsx
│   │       ├── command.tsx
│   │       ├── context-menu.tsx
│   │       ├── dialog.tsx
│   │       ├── drawer.tsx
│   │       ├── dropdown-menu.tsx
│   │       ├── form.tsx
│   │       ├── hover-card.tsx
│   │       ├── input-otp.tsx
│   │       ├── input.tsx
│   │       ├── label.tsx
│   │       ├── menubar.tsx
│   │       ├── navigation-menu.tsx
│   │       ├── pagination.tsx
│   │       ├── popover.tsx
│   │       ├── progress.tsx
│   │       ├── radio-group.tsx
│   │       ├── resizable.tsx
│   │       ├── scroll-area.tsx
│   │       ├── select.tsx
│   │       ├── separator.tsx
│   │       ├── sheet.tsx
│   │       ├── skeleton.tsx
│   │       ├── slider.tsx
│   │       ├── sonner.tsx
│   │       ├── switch.tsx
│   │       ├── table.tsx
│   │       ├── tabs.tsx
│   │       ├── textarea.tsx
│   │       ├── toast.tsx
│   │       ├── toaster.tsx
│   │       ├── toggle-group.tsx
│   │       ├── toggle.tsx
│   │       ├── tooltip.tsx
│   │       └── use-toast.ts
│   ├── constant/
│   │   ├── forms.ts
│   │   ├── icons.ts
│   │   ├── index.ts
│   │   ├── menus.tsx
│   │   ├── placeholder.tsx
│   │   └── slider.tsx
│   ├── constants/
│   │   ├── forms.ts
│   │   ├── icons.ts
│   │   ├── index.ts
│   │   ├── menu.tsx
│   │   ├── menus.tsx
│   │   ├── placeholder.tsx
│   │   └── slider.tsx
│   ├── hooks/
│   │   ├── authentication/
│   │   │   └── index.ts
│   │   ├── channels/
│   │   │   └── index.ts
│   │   ├── course/
│   │   │   └── index.ts
│   │   ├── groups/
│   │   │   └── index.ts
│   │   ├── infinite-scroll/
│   │   │   └── index.tsx
│   │   ├── navigation/
│   │   │   └── index.ts
│   │   └── payment/
│   │       └── index.ts
│   ├── icons/
│   │   ├── about.tsx
│   │   ├── affiliate-duotone-black.tsx
│   │   ├── badge-plus.tsx
│   │   ├── bell.tsx
│   │   ├── brief-case-duotone-black.tsx
│   │   ├── briefcase-duotone-white.tsx
│   │   ├── buisness.tsx
│   │   ├── carot-sort.tsx
│   │   ├── chat.tsx
│   │   ├── check-badge.tsx
│   │   ├── check.tsx
│   │   ├── comment.tsx
│   │   ├── compass.tsx
│   │   ├── courses.tsx
│   │   ├── credit-card.tsx
│   │   ├── dashboard.tsx
│   │   ├── document.tsx
│   │   ├── empty-circle.tsx
│   │   ├── empty.tsx
│   │   ├── envalope.tsx
│   │   ├── exclaimation-mark.tsx
│   │   ├── explore.tsx
│   │   ├── file-duotone-black.tsx
│   │   ├── file-duotone-white.tsx
│   │   ├── fitness.tsx
│   │   ├── globe-duotone-black.tsx
│   │   ├── google.tsx
│   │   ├── grid.tsx
│   │   ├── heart.tsx
│   │   ├── home-duo-tone-white.tsx
│   │   ├── home.tsx
│   │   ├── i-duotone-black.tsx
│   │   ├── index.tsx
│   │   ├── life-style.tsx
│   │   ├── like.tsx
│   │   ├── links.tsx
│   │   ├── logout.tsx
│   │   ├── mega-phone.tsx
│   │   ├── megaphone-duo-tone-black.tsx
│   │   ├── megaphone-duo-tone-white.tsx
│   │   ├── message.tsx
│   │   ├── music.tsx
│   │   ├── personal-development.tsx
│   │   ├── purple-check.tsx
│   │   ├── settings.tsx
│   │   ├── social-media.tsx
│   │   ├── tech.tsx
│   │   ├── unlike.tsx
│   │   ├── white-label.tsx
│   │   └── zap-duotone-black.tsx
│   ├── lib/
│   │   ├── prisma.ts
│   │   ├── upload-care.ts
│   │   ├── uploadcare.ts
│   │   └── utils.ts
│   ├── middleware.ts
│   ├── react-query/
│   │   └── provider.tsx
│   └── redux/
│       ├── provider.tsx
│       ├── slices/
│       │   ├── chat-slices.ts
│       │   ├── infinite-scroll-slice.ts
│       │   ├── online-member-slice.ts
│       │   └── search-slice.ts
│       └── store.ts
├── tailwind.config.ts
├── tsconfig.json
└── yarn.lock

```